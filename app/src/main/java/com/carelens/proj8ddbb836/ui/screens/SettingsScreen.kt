package com.carelens.proj8ddbb836.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.carelens.proj8ddbb836.data.*
import com.carelens.proj8ddbb836.ui.theme.*

@Composable
fun SettingsScreen(
    repository: CareLensRepository,
    onBack: () -> Unit
) {
    val userProfile by repository.userProfile.collectAsState()
    val recommendations by repository.recommendations.collectAsState()
    val pendingProcedures by repository.pendingProcedures.collectAsState()

    var selectedTab by remember { mutableStateOf(0) } // 0: Procedures, 1: Recommendations, 2: Preferences
    var activeProcedureId by remember { mutableStateOf<String?>(null) }
    var procedureAction by remember { mutableStateOf<ProcedureActionOption?>(null) }
    var findingsInput by remember { mutableStateOf("") }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(BackgroundDark)
            .padding(16.dp)
    ) {
        // Header
        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            IconButton(
                onClick = onBack,
                modifier = Modifier
                    .size(40.dp)
                    .background(SurfaceElevated, CircleShape)
            ) {
                Icon(
                    imageVector = Icons.Default.ArrowBack,
                    contentDescription = "Back",
                    tint = NeonCyan
                )
            }
            Spacer(modifier = Modifier.width(12.dp))
            Column {
                Text(
                    text = "CareLens Settings",
                    style = MaterialTheme.typography.titleLarge,
                    color = TextPrimary
                )
                Text(
                    text = "Manage clinical procedures & recommendations",
                    style = MaterialTheme.typography.bodyMedium,
                    color = TextSecondary
                )
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Tabs
        TabRow(
            selectedTabIndex = selectedTab,
            containerColor = SurfaceDark,
            contentColor = NeonCyan,
            divider = {}
        ) {
            Tab(
                selected = selectedTab == 0,
                onClick = { selectedTab = 0 },
                text = {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text("Procedures")
                        if (pendingProcedures.isNotEmpty()) {
                            Spacer(modifier = Modifier.width(6.dp))
                            Box(
                                modifier = Modifier
                                    .size(18.dp)
                                    .background(ErrorRed, CircleShape),
                                contentAlignment = Alignment.Center
                            ) {
                                Text(
                                    text = pendingProcedures.size.toString(),
                                    color = Color.White,
                                    fontSize = 10.sp,
                                    fontWeight = FontWeight.Bold
                                )
                            }
                        }
                    }
                }
            )
            Tab(
                selected = selectedTab == 1,
                onClick = { selectedTab = 1 },
                text = { Text("Recommendations (${recommendations.size}/5)") }
            )
            Tab(
                selected = selectedTab == 2,
                onClick = { selectedTab = 2 },
                text = { Text("Notifications") }
            )
        }

        Spacer(modifier = Modifier.height(16.dp))

        when (selectedTab) {
            0 -> {
                // RECOMMENDED PROCEDURES SUB-FEATURE
                Text(
                    text = "Recommended Procedures (Self-Filing)",
                    style = MaterialTheme.typography.titleMedium,
                    color = NeonCyan,
                    fontWeight = FontWeight.SemiBold
                )
                Text(
                    text = "Click any procedure below to mark your status. Completed records are automatically synchronized with your Prevention Dashboard.",
                    style = MaterialTheme.typography.bodyMedium,
                    color = TextSecondary,
                    modifier = Modifier.padding(top = 2.dp, bottom = 12.dp)
                )

                if (pendingProcedures.isEmpty()) {
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(top = 32.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = "All recommended procedures addressed! 🎉",
                            color = SuccessGreen,
                            style = MaterialTheme.typography.bodyLarge
                        )
                    }
                } else {
                    LazyColumn(
                        verticalArrangement = Arrangement.spacedBy(12.dp)
                    ) {
                        items(pendingProcedures, key = { it.id }) { procedure ->
                            Card(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .border(1.dp, CardBorder, RoundedCornerShape(14.dp))
                                    .clickable {
                                        if (activeProcedureId == procedure.id) {
                                            activeProcedureId = null
                                            procedureAction = null
                                            findingsInput = ""
                                        } else {
                                            activeProcedureId = procedure.id
                                            procedureAction = null
                                            findingsInput = ""
                                        }
                                    },
                                colors = CardDefaults.cardColors(containerColor = SurfaceDark)
                            ) {
                                Column(modifier = Modifier.padding(14.dp)) {
                                    Row(
                                        modifier = Modifier.fillMaxWidth(),
                                        horizontalArrangement = Arrangement.SpaceBetween,
                                        verticalAlignment = Alignment.CenterVertically
                                    ) {
                                        Text(
                                            text = procedure.name,
                                            style = MaterialTheme.typography.titleMedium,
                                            color = TextPrimary,
                                            fontWeight = FontWeight.SemiBold
                                        )
                                        Surface(
                                            color = when (procedure.type) {
                                                ProcedureType.VACCINE -> NeonGreen.copy(alpha = 0.2f)
                                                ProcedureType.TEST -> NeonCyan.copy(alpha = 0.2f)
                                                ProcedureType.SCREENING -> NeonBlue.copy(alpha = 0.2f)
                                            },
                                            shape = RoundedCornerShape(6.dp)
                                        ) {
                                            Text(
                                                text = procedure.type.name,
                                                color = when (procedure.type) {
                                                    ProcedureType.VACCINE -> NeonGreen
                                                    ProcedureType.TEST -> NeonCyan
                                                    ProcedureType.SCREENING -> NeonBlue
                                                },
                                                style = MaterialTheme.typography.labelSmall,
                                                modifier = Modifier.padding(horizontal = 8.dp, vertical = 2.dp)
                                            )
                                        }
                                    }

                                    Text(
                                        text = "Facility: ${procedure.facility}",
                                        style = MaterialTheme.typography.bodyMedium,
                                        color = TextSecondary,
                                        modifier = Modifier.padding(top = 4.dp)
                                    )

                                    if (procedure.procedureDate != null) {
                                        Text(
                                            text = "Due / Scheduled: ${procedure.procedureDate}",
                                            style = MaterialTheme.typography.labelSmall,
                                            color = WarningAmber
                                        )
                                    }

                                    // Interactive options when selected
                                    if (activeProcedureId == procedure.id) {
                                        Divider(
                                            color = CardBorder,
                                            modifier = Modifier.padding(vertical = 12.dp)
                                        )

                                        Text(
                                            text = "Select procedure status:",
                                            style = MaterialTheme.typography.bodyMedium,
                                            color = TextPrimary,
                                            fontWeight = FontWeight.Medium
                                        )

                                        Spacer(modifier = Modifier.height(8.dp))

                                        Row(
                                            modifier = Modifier.fillMaxWidth(),
                                            horizontalArrangement = Arrangement.spacedBy(8.dp)
                                        ) {
                                            // Undertaken
                                            Button(
                                                onClick = {
                                                    if (procedure.type == ProcedureType.VACCINE) {
                                                        // Vaccine directly moves to prevention dashboard
                                                        repository.handleProcedureAction(
                                                            procedureId = procedure.id,
                                                            option = ProcedureActionOption.UNDERTAKEN
                                                        )
                                                        activeProcedureId = null
                                                    } else {
                                                        // Test or screening shows findings prompt
                                                        procedureAction = ProcedureActionOption.UNDERTAKEN
                                                    }
                                                },
                                                modifier = Modifier.weight(1f),
                                                colors = ButtonDefaults.buttonColors(containerColor = NeonGreen),
                                                shape = RoundedCornerShape(8.dp)
                                            ) {
                                                Text(
                                                    text = "Undertaken",
                                                    color = BackgroundDark,
                                                    fontSize = 11.sp,
                                                    fontWeight = FontWeight.Bold
                                                )
                                            }

                                            // Not Undertaken
                                            Button(
                                                onClick = {
                                                    repository.handleProcedureAction(
                                                        procedureId = procedure.id,
                                                        option = ProcedureActionOption.NOT_UNDERTAKEN
                                                    )
                                                    activeProcedureId = null
                                                },
                                                modifier = Modifier.weight(1f),
                                                colors = ButtonDefaults.buttonColors(containerColor = SurfaceElevated),
                                                shape = RoundedCornerShape(8.dp)
                                            ) {
                                                Text(
                                                    text = "Not Undertaken",
                                                    color = TextSecondary,
                                                    fontSize = 11.sp
                                                )
                                            }

                                            // Prefer not to say
                                            Button(
                                                onClick = {
                                                    repository.handleProcedureAction(
                                                        procedureId = procedure.id,
                                                        option = ProcedureActionOption.PREFER_NOT_TO_SAY
                                                    )
                                                    activeProcedureId = null
                                                },
                                                modifier = Modifier.weight(1f),
                                                colors = ButtonDefaults.buttonColors(containerColor = SurfaceElevated),
                                                shape = RoundedCornerShape(8.dp)
                                            ) {
                                                Text(
                                                    text = "Prefer not to say",
                                                    color = TextMuted,
                                                    fontSize = 10.sp
                                                )
                                            }
                                        }

                                        // Findings and feedback input if "Undertaken" chosen for Test or Screening
                                        if (procedureAction == ProcedureActionOption.UNDERTAKEN && procedure.type != ProcedureType.VACCINE) {
                                            Spacer(modifier = Modifier.height(12.dp))
                                            Text(
                                                text = "Please enter the findings, results, and feedback received from this ${procedure.type.name.lowercase()}:",
                                                style = MaterialTheme.typography.bodyMedium,
                                                color = NeonCyan
                                            )

                                            Spacer(modifier = Modifier.height(6.dp))

                                            OutlinedTextField(
                                                value = findingsInput,
                                                onValueChange = { findingsInput = it },
                                                placeholder = {
                                                    Text(
                                                        "Enter specific lab numbers, physician notes, or diagnostic impressions...",
                                                        fontSize = 12.sp,
                                                        color = TextMuted
                                                    )
                                                },
                                                modifier = Modifier.fillMaxWidth(),
                                                colors = OutlinedTextFieldDefaults.colors(
                                                    focusedBorderColor = NeonCyan,
                                                    unfocusedBorderColor = CardBorder,
                                                    focusedTextColor = TextPrimary,
                                                    unfocusedTextColor = TextPrimary
                                                ),
                                                minLines = 3,
                                                shape = RoundedCornerShape(10.dp)
                                            )

                                            Spacer(modifier = Modifier.height(8.dp))

                                            Button(
                                                onClick = {
                                                    repository.handleProcedureAction(
                                                        procedureId = procedure.id,
                                                        option = ProcedureActionOption.UNDERTAKEN,
                                                        findingsFeedback = findingsInput
                                                    )
                                                    activeProcedureId = null
                                                    procedureAction = null
                                                    findingsInput = ""
                                                },
                                                modifier = Modifier.align(Alignment.End),
                                                colors = ButtonDefaults.buttonColors(containerColor = NeonCyan),
                                                shape = RoundedCornerShape(8.dp)
                                            ) {
                                                Text(
                                                    text = "Save & Sync to Prevention",
                                                    color = BackgroundDark,
                                                    fontWeight = FontWeight.Bold
                                                )
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            1 -> {
                // RECOMMENDATIONS SUB-FEATURE
                Text(
                    text = "CareLens AI Recommendations",
                    style = MaterialTheme.typography.titleMedium,
                    color = NeonCyan,
                    fontWeight = FontWeight.SemiBold
                )
                Text(
                    text = "CareLens stores and displays up to 5 recommendations at a time. When a new recommendation arrives, the oldest is replaced. Each recommendation is stored for 7 days.",
                    style = MaterialTheme.typography.bodyMedium,
                    color = TextSecondary,
                    modifier = Modifier.padding(top = 2.dp, bottom = 12.dp)
                )

                LazyColumn(
                    verticalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    items(recommendations, key = { it.id }) { rec ->
                        Card(
                            modifier = Modifier
                                .fillMaxWidth()
                                .border(1.dp, CardBorder, RoundedCornerShape(12.dp)),
                            colors = CardDefaults.cardColors(containerColor = SurfaceDark)
                        ) {
                            Column(modifier = Modifier.padding(14.dp)) {
                                Row(
                                    modifier = Modifier.fillMaxWidth(),
                                    horizontalArrangement = Arrangement.SpaceBetween
                                ) {
                                    Surface(
                                        color = NeonPurple.copy(alpha = 0.2f),
                                        shape = RoundedCornerShape(4.dp)
                                    ) {
                                        Text(
                                            text = rec.category.name,
                                            color = NeonPurple,
                                            style = MaterialTheme.typography.labelSmall,
                                            modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                                        )
                                    }
                                    Text(
                                        text = "Expires in 7 days",
                                        color = TextMuted,
                                        style = MaterialTheme.typography.labelSmall
                                    )
                                }
                                Spacer(modifier = Modifier.height(8.dp))
                                Text(
                                    text = rec.text,
                                    style = MaterialTheme.typography.bodyLarge,
                                    color = TextPrimary
                                )
                            }
                        }
                    }
                }
            }

            2 -> {
                // NOTIFICATIONS & PREFERENCES
                Card(
                    modifier = Modifier
                        .fillMaxWidth()
                        .border(1.dp, CardBorder, RoundedCornerShape(14.dp)),
                    colors = CardDefaults.cardColors(containerColor = SurfaceDark)
                ) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Column(modifier = Modifier.weight(1f)) {
                                Text(
                                    text = "Push Notifications",
                                    style = MaterialTheme.typography.titleMedium,
                                    color = TextPrimary
                                )
                                Text(
                                    text = "Receive proactive alerts whenever recommended procedures or screenings are due.",
                                    style = MaterialTheme.typography.bodyMedium,
                                    color = TextSecondary,
                                    modifier = Modifier.padding(top = 2.dp)
                                )
                            }
                            Switch(
                                checked = userProfile.pushNotificationsEnabled,
                                onCheckedChange = { repository.togglePushNotifications(it) },
                                colors = SwitchDefaults.colors(
                                    checkedThumbColor = NeonCyan,
                                    checkedTrackColor = NeonBlue
                                )
                            )
                        }

                        Divider(
                            color = CardBorder,
                            modifier = Modifier.padding(vertical = 16.dp)
                        )

                        Text(
                            text = "Unaddressed Procedures Badge Indicator",
                            style = MaterialTheme.typography.titleMedium,
                            color = TextPrimary
                        )
                        Text(
                            text = "The Settings icon on the main screen automatically displays a real-time badge count with the number of procedures that require your review.",
                            style = MaterialTheme.typography.bodyMedium,
                            color = TextSecondary,
                            modifier = Modifier.padding(top = 2.dp)
                        )
                    }
                }
            }
        }
    }
}
