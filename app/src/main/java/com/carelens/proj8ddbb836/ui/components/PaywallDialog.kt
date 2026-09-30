package com.carelens.proj8ddbb836.ui.components

import android.app.Activity
import android.widget.Toast
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Diamond
import androidx.compose.material.icons.filled.Star
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.window.Dialog
import androidx.compose.ui.window.DialogProperties
import com.carelens.proj8ddbb836.ui.theme.*
import com.revenuecat.purchases.Package
import com.revenuecat.purchases.PurchaseParams
import com.revenuecat.purchases.Purchases
import com.revenuecat.purchases.PurchasesError
import com.revenuecat.purchases.purchaseWith

@Composable
fun PaywallDialog(
    selectedPackage: Package?,
    availablePackages: List<Package>,
    isLoading: Boolean,
    onDismiss: () -> Unit,
    onPurchaseSuccess: () -> Unit
) {
    val context = LocalContext.current
    val activity = context as? Activity
    var isPurchasing by remember { mutableStateOf(false) }
    var errorMessage by remember { mutableStateOf<String?>(null) }

    Dialog(
        onDismissRequest = { if (!isPurchasing) onDismiss() },
        properties = DialogProperties(usePlatformDefaultWidth = false)
    ) {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(Color.Black.copy(alpha = 0.85f))
                .padding(16.dp),
            contentAlignment = Alignment.Center
        ) {
            Card(
                modifier = Modifier
                    .fillMaxWidth(0.95f)
                    .fillMaxHeight(0.9f)
                    .clip(RoundedCornerShape(24.dp))
                    .border(
                        width = 1.5.dp,
                        brush = Brush.linearGradient(listOf(NeonCyan, NeonBlue, NeonPink)),
                        shape = RoundedCornerShape(24.dp)
                    ),
                colors = CardDefaults.cardColors(containerColor = SurfaceDark)
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(24.dp)
                        .verticalScroll(rememberScrollState()),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    // Close button row
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.End
                    ) {
                        IconButton(
                            onClick = { if (!isPurchasing) onDismiss() },
                            modifier = Modifier
                                .size(36.dp)
                                .background(SurfaceElevated, CircleShape)
                        ) {
                            Icon(
                                imageVector = Icons.Default.Close,
                                contentDescription = "Close",
                                tint = TextSecondary,
                                modifier = Modifier.size(18.dp)
                            )
                        }
                    }

                    // Diamond Icon with Neon Glow
                    Box(
                        modifier = Modifier
                            .size(72.dp)
                            .background(
                                brush = Brush.radialGradient(listOf(NeonBlue.copy(alpha = 0.5f), Color.Transparent)),
                                shape = CircleShape
                            )
                            .border(1.dp, NeonCyan, CircleShape),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = Icons.Default.Diamond,
                            contentDescription = "CareLens Pro",
                            tint = NeonCyan,
                            modifier = Modifier.size(36.dp)
                        )
                    }

                    Spacer(modifier = Modifier.height(16.dp))

                    Text(
                        text = "CARELENS PRO",
                        style = MaterialTheme.typography.headlineMedium.copy(
                            fontWeight = FontWeight.ExtraBold,
                            letterSpacing = 2.sp
                        ),
                        color = NeonCyan
                    )

                    Text(
                        text = "Unlock Complete Clinical Health Intelligence",
                        style = MaterialTheme.typography.bodyMedium,
                        color = TextSecondary,
                        textAlign = TextAlign.Center,
                        modifier = Modifier.padding(top = 4.dp, bottom = 20.dp)
                    )

                    // Pricing Card
                    Card(
                        modifier = Modifier
                            .fillMaxWidth()
                            .border(1.dp, NeonBlue.copy(alpha = 0.5f), RoundedCornerShape(16.dp)),
                        colors = CardDefaults.cardColors(containerColor = SurfaceElevated)
                    ) {
                        Column(
                            modifier = Modifier.padding(16.dp),
                            horizontalAlignment = Alignment.CenterHorizontally
                        ) {
                            val priceString = selectedPackage?.product?.price?.formatted
                                ?: "$9.99 / month"
                            val title = selectedPackage?.product?.title ?: "CareLens Premium (Package proj8ddbb836)"

                            Text(
                                text = title,
                                style = MaterialTheme.typography.titleMedium,
                                color = TextPrimary,
                                fontWeight = FontWeight.SemiBold
                            )

                            Spacer(modifier = Modifier.height(6.dp))

                            Text(
                                text = priceString,
                                style = MaterialTheme.typography.headlineMedium.copy(fontWeight = FontWeight.Bold),
                                color = NeonGreen
                            )

                            Text(
                                text = "Configured Package ID: ${selectedPackage?.identifier ?: "proj8ddbb836"}",
                                style = MaterialTheme.typography.labelSmall,
                                color = TextMuted,
                                modifier = Modifier.padding(top = 4.dp)
                            )
                        }
                    }

                    Spacer(modifier = Modifier.height(20.dp))

                    // Pro Features List
                    Column(
                        modifier = Modifier.fillMaxWidth(),
                        verticalArrangement = Arrangement.spacedBy(10.dp)
                    ) {
                        ProFeatureItem("AI Clinical Risk Matrix & Deep Analysis")
                        ProFeatureItem("Unlimited Stored Recommendations & Instant Updates")
                        ProFeatureItem("Smart Preventive Procedures Tracker & Feedback Sync")
                        ProFeatureItem("Automated Multi-Metric Health Trend Forecasts")
                        ProFeatureItem("Priority Support & Instant Clinical Export")
                    }

                    if (errorMessage != null) {
                        Spacer(modifier = Modifier.height(14.dp))
                        Text(
                            text = errorMessage ?: "",
                            color = ErrorRed,
                            style = MaterialTheme.typography.bodyMedium,
                            textAlign = TextAlign.Center
                        )
                    }

                    Spacer(modifier = Modifier.height(24.dp))

                    // Purchase Trigger Button
                    Button(
                        onClick = {
                            if (activity == null) {
                                errorMessage = "Activity context is unavailable"
                                return@Button
                            }

                            val pkgToBuy = selectedPackage ?: availablePackages.firstOrNull()
                            if (pkgToBuy == null) {
                                errorMessage = "No RevenueCat packages configured or found."
                                return@Button
                            }

                            isPurchasing = true
                            errorMessage = null

                            // Trigger RevenueCat purchase overlay
                            Purchases.sharedInstance.purchaseWith(
                                PurchaseParams.Builder(activity, pkgToBuy).build(),
                                onError = { error: PurchasesError, userCancelled: Boolean ->
                                    isPurchasing = false
                                    if (!userCancelled) {
                                        errorMessage = "Purchase error: ${error.message}"
                                    }
                                },
                                onSuccess = { storeTransaction, customerInfo ->
                                    isPurchasing = false
                                    Toast.makeText(
                                        context,
                                        "Welcome to CareLens Pro!",
                                        Toast.LENGTH_LONG
                                    ).show()
                                    onPurchaseSuccess()
                                }
                            )
                        },
                        enabled = !isPurchasing && !isLoading,
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(52.dp),
                        shape = RoundedCornerShape(12.dp),
                        colors = ButtonDefaults.buttonColors(
                            containerColor = NeonGreen,
                            contentColor = BackgroundDark
                        )
                    ) {
                        if (isPurchasing) {
                            CircularProgressIndicator(
                                modifier = Modifier.size(22.dp),
                                color = BackgroundDark,
                                strokeWidth = 2.5.dp
                            )
                        } else {
                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.Center
                            ) {
                                Icon(
                                    imageVector = Icons.Default.Star,
                                    contentDescription = null,
                                    modifier = Modifier.size(18.dp)
                                )
                                Spacer(modifier = Modifier.width(8.dp))
                                Text(
                                    text = "UPGRADE NOW",
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 15.sp,
                                    letterSpacing = 1.sp
                                )
                            }
                        }
                    }

                    // Restore purchases
                    TextButton(
                        onClick = {
                            isPurchasing = true
                            Purchases.sharedInstance.restorePurchasesWith(
                                onError = { error ->
                                    isPurchasing = false
                                    errorMessage = "Restore failed: ${error.message}"
                                },
                                onSuccess = { customerInfo ->
                                    isPurchasing = false
                                    val isPro = customerInfo.entitlements["pro"]?.isActive == true ||
                                            customerInfo.entitlements["proj8ddbb836"]?.isActive == true ||
                                            customerInfo.activeSubscriptions.isNotEmpty()
                                    if (isPro) {
                                        Toast.makeText(context, "Purchases restored successfully!", Toast.LENGTH_SHORT).show()
                                        onPurchaseSuccess()
                                    } else {
                                        Toast.makeText(context, "No active subscriptions found.", Toast.LENGTH_SHORT).show()
                                    }
                                }
                            )
                        },
                        modifier = Modifier.padding(top = 8.dp)
                    ) {
                        Text(
                            text = "Restore Purchases",
                            color = TextSecondary,
                            style = MaterialTheme.typography.bodyMedium
                        )
                    }

                    Text(
                        text = "Secured by Google Play Billing & RevenueCat. Cancel anytime in Google Play settings.",
                        color = TextMuted,
                        style = MaterialTheme.typography.labelSmall,
                        textAlign = TextAlign.Center,
                        modifier = Modifier.padding(top = 8.dp)
                    )
                }
            }
        }
    }
}

@Composable
private fun ProFeatureItem(title: String) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Box(
            modifier = Modifier
                .size(20.dp)
                .background(NeonCyan.copy(alpha = 0.2f), CircleShape),
            contentAlignment = Alignment.Center
        ) {
            Icon(
                imageVector = Icons.Default.Check,
                contentDescription = null,
                tint = NeonCyan,
                modifier = Modifier.size(12.dp)
            )
        }
        Spacer(modifier = Modifier.width(10.dp))
        Text(
            text = title,
            style = MaterialTheme.typography.bodyMedium,
            color = TextPrimary
        )
    }
}
