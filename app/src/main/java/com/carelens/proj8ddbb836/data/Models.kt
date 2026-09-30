package com.carelens.proj8ddbb836.data

import java.util.UUID

enum class ProcedureType {
    VACCINE,
    TEST,
    SCREENING
}

enum class ProcedureActionOption {
    UNDERTAKEN,
    NOT_UNDERTAKEN,
    PREFER_NOT_TO_SAY
}

enum class RecommendationCategory {
    PREVENTION,
    MANAGEMENT,
    ANALYSIS
}

data class UserProfile(
    val uid: String = "user_demo_1",
    val name: String = "Alex Rivera",
    val age: String = "34",
    val gender: String = "Non-binary",
    val email: String = "alex.rivera@example.com",
    val phoneNumber: String = "+1 (555) 234-5678",
    val nationalId: String = "ID-908122",
    val location: String = "San Francisco, CA",
    val conditions: String = "Mild seasonal asthma",
    val allergies: String = "Penicillin, Peanuts",
    val medications: String = "Albuterol inhaler (PRN)",
    val familyHistory: String = "Hypertension (father)",
    val organDonor: Boolean = true,
    val donatedOrgans: String = "All organs & tissues",
    val diet: String = "Mediterranean, plant-forward",
    val activity: String = "Running 3x/week, Yoga 2x/week",
    val sleep: String = "7.5 hours/night",
    val substanceUse: String = "Occasional social wine, non-smoker",
    val pushNotificationsEnabled: Boolean = true,
    val isProSubscriber: Boolean = false
)

data class Recommendation(
    val id: String = UUID.randomUUID().toString(),
    val userId: String = "user_demo_1",
    val category: RecommendationCategory = RecommendationCategory.PREVENTION,
    val text: String,
    val createdAtMillis: Long = System.currentTimeMillis(),
    val expiresAtMillis: Long = System.currentTimeMillis() + (7L * 24 * 60 * 60 * 1000) // 7 days TTL
)

data class ProcedureRecord(
    val id: String = UUID.randomUUID().toString(),
    val userId: String = "user_demo_1",
    val userName: String = "Alex Rivera",
    val userPhone: String = "+1 (555) 234-5678",
    val userNationalId: String = "ID-908122",
    val type: ProcedureType,
    val name: String,
    val facility: String = "Metropolitan Health Hub",
    val doctorName: String? = "Dr. Elena Rostova",
    val doctorId: String? = "DR-4091",
    val results: String? = null,
    val procedureDate: String? = null,
    val procedureTime: String? = null,
    val completed: Boolean = false,
    val createdAtMillis: Long = System.currentTimeMillis()
)

data class CompletedRecord(
    val id: String = UUID.randomUUID().toString(),
    val type: ProcedureType,
    val name: String,
    val dateCompleted: String,
    val findingsAndFeedback: String
)

data class HealthMetric(
    val date: String,
    val systolic: Int,
    val diastolic: Int,
    val heartRate: Int,
    val weightKg: Double
)

data class Symptom(
    val id: String = UUID.randomUUID().toString(),
    val name: String,
    val severity: Int, // 1 - 10
    val duration: String,
    val date: String,
    val notes: String
)
