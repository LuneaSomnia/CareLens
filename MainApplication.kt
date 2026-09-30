package com.carelens.proj8ddbb836

import android.app.Application
import android.util.Log
import com.revenuecat.purchases.LogLevel
import com.revenuecat.purchases.Purchases
import com.revenuecat.purchases.PurchasesConfiguration

/**
 * MainApplication
 * 
 * Application-level entry point for CareLens.
 * RevenueCat needs to start tracking configuration data the exact millisecond the app boots up.
 * Initialized globally using Public API Key: test_BINLyCnnugNSkYtpGhkazqNnSfs
 */
class MainApplication : Application() {

    companion object {
        const val REVENUECAT_API_KEY = "test_BINLyCnnugNSkYtpGhkazqNnSfs"
        const val CONFIGURED_PACKAGE_ID = "proj8ddbb836"
    }

    override fun onCreate() {
        super.onCreate()

        // Set log level to DEBUG for transparent diagnostic output in Logcat
        Purchases.logLevel = LogLevel.DEBUG

        // Initialize RevenueCat SDK globally
        Purchases.configure(
            PurchasesConfiguration.Builder(this, REVENUECAT_API_KEY)
                .build()
        )

        Log.i("CareLens", "RevenueCat SDK initialized successfully at application boot.")
    }
}
