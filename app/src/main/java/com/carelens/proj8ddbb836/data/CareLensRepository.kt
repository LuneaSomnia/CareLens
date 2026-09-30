package com.carelens.proj8ddbb836.data

import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

class CareLensRepository {

    private val _userProfile = MutableStateFlow(UserProfile())
    val userProfile: StateFlow<UserProfile> = _userProfile.asStateFlow()

    // Enforce 5 recommendations limit strictly, oldest deleted to make room, 7-day TTL
    private val _recommendations = MutableStateFlow<List<Recommendation>>(
        listOf(
            Recommendation(
                text = "Schedule an annual lipid panel to monitor cardiovascular health.",
                category = RecommendationCategory.PREVENTION
            ),
            Recommendation(
                text = "Aim for 30 minutes of moderate aerobic activity 5 days a week.",
                category = RecommendationCategory.MANAGEMENT
            ),
            Recommendation(
                text = "Boost dietary fiber intake to 30g daily via legumes and whole grains.",
                category = RecommendationCategory.PREVENTION
            ),
            Recommendation(
                text = "Maintain consistent sleep cycle targeting 7-8 hours nightly.",
                category = RecommendationCategory.MANAGEMENT
            ),
            Recommendation(
                text = "Screening due: Annual dermatological skin exam.",
                category = RecommendationCategory.ANALYSIS
            )
        )
    )
    val recommendations: StateFlow<List<Recommendation>> = _recommendations.asStateFlow()

    // Unaddressed Recommended Procedures (interactive: undertaken, not undertaken, prefer not to say)
    private val _pendingProcedures = MutableStateFlow<List<ProcedureRecord>>(
        listOf(
            ProcedureRecord(
                type = ProcedureType.TEST,
                name = "Comprehensive Metabolic Panel (CMP)",
                facility = "City Diagnostics Center",
                procedureDate = "2026-10-15"
            ),
            ProcedureRecord(
                type = ProcedureType.SCREENING,
                name = "Bilateral Mammography / Ultrasound",
                facility = "Advanced Women's Health Clinic",
                procedureDate = "2026-10-20"
            ),
            ProcedureRecord(
                type = ProcedureType.VACCINE,
                name = "Seasonal Quadrivalent Influenza Booster",
                facility = "Neighborhood Pharmacy Care",
                procedureDate = "2026-10-05"
            ),
            ProcedureRecord(
                type = ProcedureType.SCREENING,
                name = "Colonoscopy Preventive Screening",
                facility = "Metro Gastroenterology Associates",
                procedureDate = "2026-11-01"
            )
        )
    )
    val pendingProcedures: StateFlow<List<ProcedureRecord>> = _pendingProcedures.asStateFlow()

    // Prevention Dashboard completed records (Tests, Screenings, Vaccines that have been undertaken)
    private val _completedRecords = MutableStateFlow<List<CompletedRecord>>(
        listOf(
            CompletedRecord(
                type = ProcedureType.VACCINE,
                name = "COVID-19 Updated Monovalent Vaccine",
                dateCompleted = "2026-03-12",
                findingsAndFeedback = "Administered left deltoid. No acute adverse reactions observed."
            ),
            CompletedRecord(
                type = ProcedureType.TEST,
                name = "Fasting Blood Glucose Test",
                dateCompleted = "2026-05-20",
                findingsAndFeedback = "Fasting blood sugar 88 mg/dL (Normal reference: 70-99 mg/dL)."
            ),
            CompletedRecord(
                type = ProcedureType.SCREENING,
                name = "Routine Eye & Retinal Fundus Exam",
                dateCompleted = "2026-06-18",
                findingsAndFeedback = "Visual acuity 20/20 corrected. Intraocular pressure normal (14 mmHg)."
            )
        )
    )
    val completedRecords: StateFlow<List<CompletedRecord>> = _completedRecords.asStateFlow()

    // Health metrics history
    private val _metrics = MutableStateFlow<List<HealthMetric>>(
        listOf(
            HealthMetric("Sep 22", 118, 76, 68, 68.4),
            HealthMetric("Sep 24", 120, 78, 72, 68.2),
            HealthMetric("Sep 26", 116, 75, 65, 68.0),
            HealthMetric("Sep 28", 119, 77, 70, 67.9)
        )
    )
    val metrics: StateFlow<List<HealthMetric>> = _metrics.asStateFlow()

    // Symptoms history
    private val _symptoms = MutableStateFlow<List<Symptom>>(
        listOf(
            Symptom(name = "Mild Cough", severity = 3, duration = "2 days", date = "Sep 28", notes = "After evening run in dry air")
        )
    )
    val symptoms: StateFlow<List<Symptom>> = _symptoms.asStateFlow()

    fun updateProfile(profile: UserProfile) {
        _userProfile.value = profile
    }

    fun setProSubscriber(isPro: Boolean) {
        _userProfile.value = _userProfile.value.copy(isProSubscriber = isPro)
    }

    fun togglePushNotifications(enabled: Boolean) {
        _userProfile.value = _userProfile.value.copy(pushNotificationsEnabled = enabled)
    }

    /**
     * Add recommendation with strict rules:
     * - Maximum 5 stored and displayed
     * - Oldest removed to make room
     * - Filter out any expired recommendations (7-day TTL)
     */
    fun addRecommendation(text: String, category: RecommendationCategory) {
        val now = System.currentTimeMillis()
        val validCurrent = _recommendations.value.filter { it.expiresAtMillis > now }
        val newRec = Recommendation(
            text = text,
            category = category,
            createdAtMillis = now,
            expiresAtMillis = now + (7L * 24 * 60 * 60 * 1000)
        )
        // Append new, then take the 5 most recent
        val updated = (listOf(newRec) + validCurrent).take(5)
        _recommendations.value = updated
    }

    /**
     * Handle user action on Recommended Procedure:
     * - "not undertaken" or "prefer not to say" -> deleted from pending list
     * - "undertaken" -> deleted from pending list AND recorded into Prevention Dashboard
     */
    fun handleProcedureAction(
        procedureId: String,
        option: ProcedureActionOption,
        findingsFeedback: String? = null
    ) {
        val procedure = _pendingProcedures.value.find { it.id == procedureId } ?: return

        // Always remove from pending list
        _pendingProcedures.value = _pendingProcedures.value.filter { it.id != procedureId }

        if (option == ProcedureActionOption.UNDERTAKEN) {
            val dateFormat = SimpleDateFormat("yyyy-MM-dd", Locale.getDefault())
            val todayStr = dateFormat.format(Date())

            val feedbackText = when {
                procedure.type == ProcedureType.VACCINE -> {
                    "Vaccine administered and confirmed completed on $todayStr."
                }
                !findingsFeedback.isNullOrBlank() -> {
                    findingsFeedback.trim()
                }
                else -> {
                    "Procedure completed with findings documented on $todayStr."
                }
            }

            val completedItem = CompletedRecord(
                type = procedure.type,
                name = procedure.name,
                dateCompleted = todayStr,
                findingsAndFeedback = feedbackText
            )
            _completedRecords.value = listOf(completedItem) + _completedRecords.value
        }
    }

    fun addSymptom(name: String, severity: Int, duration: String, notes: String) {
        val dateFormat = SimpleDateFormat("MMM dd", Locale.getDefault())
        val todayStr = dateFormat.format(Date())
        val newSymptom = Symptom(
            name = name,
            severity = severity,
            duration = duration,
            date = todayStr,
            notes = notes
        )
        _symptoms.value = listOf(newSymptom) + _symptoms.value
    }
}
