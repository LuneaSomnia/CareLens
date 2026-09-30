package com.carelens.proj8ddbb836

import android.app.Activity
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Surface
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import com.carelens.proj8ddbb836.data.CareLensRepository
import com.carelens.proj8ddbb836.ui.components.PaywallDialog
import com.carelens.proj8ddbb836.ui.screens.*
import com.carelens.proj8ddbb836.ui.theme.BackgroundDark
import com.carelens.proj8ddbb836.ui.theme.CareLensTheme
import com.revenuecat.purchases.CustomerInfo
import com.revenuecat.purchases.Package
import com.revenuecat.purchases.PurchaseParams
import com.revenuecat.purchases.Purchases
import com.revenuecat.purchases.PurchasesError
import com.revenuecat.purchases.getCustomerInfoWith
import com.revenuecat.purchases.getOfferingsWith
import com.revenuecat.purchases.models.StoreTransaction
import com.revenuecat.purchases.purchaseWith

enum class Screen {
    HOME,
    PROFILE,
    PREVENTION,
    MANAGEMENT,
    ANALYSIS,
    SETTINGS
}

/**
 * MainActivity
 *
 * CareLens Native Android (Kotlin + Jetpack Compose) Implementation.
 * Contains:
 * - RevenueCat Offering Fetching Logic (queries packages configured with Package ID: proj8ddbb836)
 * - Purchase Overlay Triggering Logic (triggers Google Play / RevenueCat purchase flow on "Upgrade")
 * - Navigation across Home, Profile, Prevention, Management, Analysis, and Settings
 * - Notification badge pop-up for unaddressed procedures count on Settings gear icon
 */
class MainActivity : ComponentActivity() {

    companion object {
        private const val TAG = "CareLensMainActivity"
        // Target Package ID provided for RevenueCat
        const val TARGET_PACKAGE_ID = "proj8ddbb836"
    }

    private val repository = CareLensRepository()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContent {
            CareLensTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = BackgroundDark
                ) {
                    CareLensApp(
                        activity = this@MainActivity,
                        repository = repository
                    )
                }
            }
        }
    }
}

@Composable
fun CareLensApp(
    activity: Activity,
    repository: CareLensRepository
) {
    var currentScreen by remember { mutableStateOf(Screen.HOME) }
    var showPaywall by remember { mutableStateOf(false) }

    // RevenueCat State
    var configuredPackage by remember { mutableStateOf<Package?>(null) }
    var availablePackages by remember { mutableStateOf<List<Package>>(emptyList()) }
    var isLoadingOfferings by remember { mutableStateOf(true) }

    /**
     * UI Fetching Logic: Queries the configured packages (paywalls) from RevenueCat.
     * Looks for package with Package ID "proj8ddbb836" or first available package.
     */
    fun fetchRevenueCatOfferings() {
        isLoadingOfferings = true
        Purchases.sharedInstance.getOfferingsWith(
            onError = { error: PurchasesError ->
                isLoadingOfferings = false
                Log.e("RevenueCat", "Failed to fetch offerings: ${error.message} (code: ${error.code})")
            },
            onSuccess = { offerings ->
                isLoadingOfferings = false
                val currentOffering = offerings.current
                val packages = currentOffering?.availablePackages ?: emptyList()
                availablePackages = packages

                // Search for package matching the target package ID "proj8ddbb836"
                val matchedPackage = packages.find { it.identifier == MainActivity.TARGET_PACKAGE_ID }
                    ?: packages.firstOrNull()

                configuredPackage = matchedPackage
                Log.i(
                    "RevenueCat",
                    "Fetched offerings successfully. Selected package: ${matchedPackage?.identifier} (Price: ${matchedPackage?.product?.price?.formatted})"
                )
            }
        )
    }

    /**
     * Entitlement & Customer Info check on launch
     */
    fun checkCustomerEntitlements() {
        Purchases.sharedInstance.getCustomerInfoWith(
            onError = { error ->
                Log.w("RevenueCat", "Failed to fetch customer info: ${error.message}")
            },
            onSuccess = { customerInfo: CustomerInfo ->
                val isPro = customerInfo.entitlements["pro"]?.isActive == true ||
                        customerInfo.entitlements[MainActivity.TARGET_PACKAGE_ID]?.isActive == true ||
                        customerInfo.activeSubscriptions.isNotEmpty()

                repository.setProSubscriber(isPro)
                Log.i("RevenueCat", "Customer entitlement status: isPro = $isPro")
            }
        )
    }

    /**
     * Purchase Trigger function:
     * Triggers the Google Play / RevenueCat purchase overlay when user clicks "Upgrade"
     */
    fun triggerPurchase(packageToPurchase: Package) {
        Purchases.sharedInstance.purchaseWith(
            PurchaseParams.Builder(activity, packageToPurchase).build(),
            onError = { error: PurchasesError, userCancelled: Boolean ->
                if (!userCancelled) {
                    Toast.makeText(
                        activity,
                        "Purchase failed: ${error.message}",
                        Toast.LENGTH_LONG
                    ).show()
                }
            },
            onSuccess = { storeTransaction: StoreTransaction, customerInfo: CustomerInfo ->
                repository.setProSubscriber(true)
                showPaywall = false
                Toast.makeText(
                    activity,
                    "🎉 Upgrade successful! CareLens Pro is now activated.",
                    Toast.LENGTH_LONG
                ).show()
            }
        )
    }

    // Initial Fetch
    LaunchedEffect(Unit) {
        fetchRevenueCatOfferings()
        checkCustomerEntitlements()
    }

    // Navigation and Screen Routing
    when (currentScreen) {
        Screen.HOME -> {
            HomeScreen(
                repository = repository,
                onNavigateProfile = { currentScreen = Screen.PROFILE },
                onNavigatePrevention = { currentScreen = Screen.PREVENTION },
                onNavigateManagement = { currentScreen = Screen.MANAGEMENT },
                onNavigateAnalysis = { currentScreen = Screen.ANALYSIS },
                onNavigateSettings = { currentScreen = Screen.SETTINGS },
                onOpenPaywall = { showPaywall = true }
            )
        }
        Screen.PROFILE -> {
            ProfileScreen(
                repository = repository,
                onBack = { currentScreen = Screen.HOME }
            )
        }
        Screen.PREVENTION -> {
            PreventionScreen(
                repository = repository,
                onBack = { currentScreen = Screen.HOME }
            )
        }
        Screen.MANAGEMENT -> {
            ManagementScreen(
                repository = repository,
                onBack = { currentScreen = Screen.HOME }
            )
        }
        Screen.ANALYSIS -> {
            AnalysisRiskScreen(
                repository = repository,
                onBack = { currentScreen = Screen.HOME },
                onOpenPaywall = { showPaywall = true }
            )
        }
        Screen.SETTINGS -> {
            SettingsScreen(
                repository = repository,
                onBack = { currentScreen = Screen.HOME }
            )
        }
    }

    // RevenueCat Upgrade Paywall Overlay Dialog
    if (showPaywall) {
        PaywallDialog(
            selectedPackage = configuredPackage,
            availablePackages = availablePackages,
            isLoading = isLoadingOfferings,
            onDismiss = { showPaywall = false },
            onPurchaseSuccess = {
                repository.setProSubscriber(true)
                showPaywall = false
            }
        )
    }
}
