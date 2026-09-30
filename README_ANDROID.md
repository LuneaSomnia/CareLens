# CareLens Native Android (Kotlin + Jetpack Compose)

This codebase contains the complete restructuring and rewrite of the CareLens application into a native Android architecture using modern Kotlin, Jetpack Compose (Material 3), Coroutines/Flow, and the **RevenueCat Android SDK**.

---

## Project Details & RevenueCat Configuration

- **RevenueCat Public API Key**: `test_BINLyCnnugNSkYtpGhkazqNnSfs`
- **Configured Package ID**: `proj8ddbb836`
- **Application Package / Namespace**: `com.carelens.proj8ddbb836`
- **Target SDK**: Android 35 (Android 15)
- **Minimum SDK**: Android 26 (Android 8.0 Oreo)
- **Language / UI Toolkit**: Kotlin 2.0.21 + Jetpack Compose BOM 2024.10.01

---

## Key Files Implemented

### 1. The Dependency Declaration (`build.gradle.kts` & `app/build.gradle.kts`)
- Fetches the RevenueCat SDK (`com.revenuecat.purchases:purchases:8.12.2`) and Compose Paywall UI (`com.revenuecat.purchases:purchases-ui:8.12.2`).
- Configures Jetpack Compose, Material 3, AndroidX Lifecycle, and Kotlin Coroutines.

### 2. Network & Billing Permissions (`AndroidManifest.xml` & `app/src/main/AndroidManifest.xml`)
- Declares `android.permission.INTERNET` allowing RevenueCat to validate transactions against secure servers.
- Declares `android.permission.ACCESS_NETWORK_STATE` and `com.android.vending.BILLING` for Google Play Billing support.
- Configures `MainApplication` as the application class and `MainActivity` as the exported launcher activity.

### 3. Application-Level Initialization (`MainApplication.kt` & `app/src/main/java/com/carelens/proj8ddbb836/MainApplication.kt`)
- Initializes `Purchases.configure(PurchasesConfiguration.Builder(this, "test_BINLyCnnugNSkYtpGhkazqNnSfs").build())` at application startup.
- Sets `Purchases.logLevel = LogLevel.DEBUG` for transparency during testing and development.

### 4. UI Fetching & Purchase Logic (`MainActivity.kt` & `app/src/main/java/com/carelens/proj8ddbb836/MainActivity.kt`)
- **Querying Configured Packages**: `fetchRevenueCatOfferings()` invokes `Purchases.sharedInstance.getOfferingsWith(...)` and locates the configured package matching ID `proj8ddbb836` (or current offering packages).
- **Triggering Purchase Overlay**: `triggerPurchase()` builds `PurchaseParams` and executes `Purchases.sharedInstance.purchaseWith(activity, package)` when the user taps "Upgrade Now".
- **Entitlement Checks**: Listens for customer entitlement updates (`pro` / `proj8ddbb836`) and toggles Pro status across the app.

---

## App Features & Sub-Features Included

### 1. Settings Feature
- **Recommendations Sub-Feature**:
  - Displays and stores a maximum of **5 recommendations** at a time.
  - With every new addition, the oldest recommendation is deleted to make room.
  - Recommendations have a 7-day expiration lifetime.
- **Recommended Procedures Sub-Feature (Self-Filing)**:
  - Screenings, tests, vaccines, and procedures are interactive and clickable.
  - Three user actions: `"Undertaken"`, `"Not undertaken"`, and `"Prefer not to say"`.
  - When `"Not undertaken"` or `"Prefer not to say"` is chosen, the item is removed from the pending list.
  - When `"Undertaken"` is selected:
    - If a **Test** or **Screening**: Displays an input prompt for findings, test results, and physician feedback.
    - If a **Vaccine**: Automatically marked complete and synced.
  - Completed items are filed directly into the user profile data and the **Prevention Dashboard** alongside conducted dates.
  - Unaddressed procedures show a live count badge on the **Settings gear icon (⚙️)** on the main dashboard.
  - Push notifications toggle to alert the user of unaddressed screenings and procedures.

### 2. Main Dashboard & Futuristic Crystal Nodes
- **User Profile**: Demographics, clinical history, organ donor status, lifestyle.
- **Prevention Dashboard**: Synchronized clinical milestones, vaccines, and completed lab findings.
- **Management & Care**: Vitals telemetry (BP, HR, weight) and symptom logging with severity scale.
- **Analysis & Risk**: Composite Clinical Health Index, cardiovascular, metabolic, and lifestyle stratification, with direct upgrade paths to Pro.
- **Paywall Dialog**: Cyber-neon glassmorphic modal with pricing, package ID breakdown, and purchase flow.

---

## How to Open in Android Studio

1. Open **Android Studio** (Ladybug or newer recommended).
2. Select **File > Open...** and select this directory.
3. Gradle will automatically sync and download:
   - Android SDK 35
   - RevenueCat Purchases SDK 8.12.2
   - Jetpack Compose dependencies
4. Connect an Android device or launch an emulator (API 26+) and click **Run (Shift + F10)**.
