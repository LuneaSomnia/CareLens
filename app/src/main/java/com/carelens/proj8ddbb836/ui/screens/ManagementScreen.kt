package com.carelens.proj8ddbb836.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.Healing
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.carelens.proj8ddbb836.data.CareLensRepository
import com.carelens.proj8ddbb836.ui.theme.*

@Composable
fun ManagementScreen(
    repository: CareLensRepository,
    onBack: () -> Unit
) {
    val metrics by repository.metrics.collectAsState()
    val symptoms by repository.symptoms.collectAsState()

    var showAddSymptom by remember { mutableStateOf(false) }
    var symptomName by remember { mutableStateOf("") }
    var severitySlider by remember { mutableFloatStateOf(4f) }
    var durationText by remember { mutableStateOf("") }
    var notesText by remember { mutableStateOf("") }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(BackgroundDark)
            .padding(16.dp)
            .verticalScroll(rememberScrollState())
    ) {
        // Top Bar
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
                    tint = NeonGreen
                )
            }
            Spacer(modifier = Modifier.width(12.dp))
            Column {
                Text(
                    text = "Management & Care",
                    style = MaterialTheme.typography.titleLarge,
                    color = TextPrimary
                )
                Text(
                    text = "Chronic tracking, vitals & symptoms",
                    style = MaterialTheme.typography.bodyMedium,
                    color = TextSecondary
                )
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        // Recent Vitals Summary Card
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .border(1.dp, NeonGreen.copy(alpha = 0.5f), RoundedCornerShape(16.dp)),
            colors = CardDefaults.cardColors(containerColor = SurfaceDark)
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = "Vitals Telemetry",
                        style = MaterialTheme.typography.titleMedium,
                        color = NeonGreen,
                        fontWeight = FontWeight.Bold
                    )
                    Icon(
                        imageVector = Icons.Default.Favorite,
                        contentDescription = null,
                        tint = NeonGreen,
                        modifier = Modifier.size(20.dp)
                    )
                }

                Spacer(modifier = Modifier.height(12.dp))

                val latest = metrics.lastOrNull()
                if (latest != null) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        VitalMetricItem("Blood Pressure", "${latest.systolic}/${latest.diastolic} mmHg")
                        VitalMetricItem("Heart Rate", "${latest.heartRate} bpm")
                        VitalMetricItem("Weight", "${latest.weightKg} kg")
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        // Symptoms Section
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "Logged Symptoms",
                style = MaterialTheme.typography.titleMedium,
                color = NeonCyan,
                fontWeight = FontWeight.SemiBold
            )
            Button(
                onClick = { showAddSymptom = !showAddSymptom },
                colors = ButtonDefaults.buttonColors(containerColor = SurfaceElevated),
                border = androidx.compose.foundation.BorderStroke(1.dp, CardBorder),
                shape = RoundedCornerShape(8.dp)
            ) {
                Text(if (showAddSymptom) "Cancel" else "+ Log Symptom", color = NeonCyan)
            }
        }

        if (showAddSymptom) {
            Spacer(modifier = Modifier.height(12.dp))
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .border(1.dp, CardBorder, RoundedCornerShape(12.dp)),
                colors = CardDefaults.cardColors(containerColor = SurfaceDark)
            ) {
                Column(modifier = Modifier.padding(14.dp)) {
                    OutlinedTextField(
                        value = symptomName,
                        onValueChange = { symptomName = it },
                        label = { Text("Symptom name (e.g. Headache, Fatigue)") },
                        modifier = Modifier.fillMaxWidth()
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Text("Severity: ${severitySlider.toInt()}/10", color = TextSecondary, fontSize = 12.sp)
                    Slider(
                        value = severitySlider,
                        onValueChange = { severitySlider = it },
                        valueRange = 1f..10f,
                        steps = 8
                    )
                    OutlinedTextField(
                        value = durationText,
                        onValueChange = { durationText = it },
                        label = { Text("Duration (e.g. 3 hours, 2 days)") },
                        modifier = Modifier.fillMaxWidth()
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    OutlinedTextField(
                        value = notesText,
                        onValueChange = { notesText = it },
                        label = { Text("Notes or triggers") },
                        modifier = Modifier.fillMaxWidth()
                    )
                    Spacer(modifier = Modifier.height(10.dp))
                    Button(
                        onClick = {
                            if (symptomName.isNotBlank()) {
                                repository.addSymptom(
                                    name = symptomName,
                                    severity = severitySlider.toInt(),
                                    duration = durationText.ifBlank { "Unspecified" },
                                    notes = notesText
                                )
                                symptomName = ""
                                notesText = ""
                                durationText = ""
                                showAddSymptom = false
                            }
                        },
                        modifier = Modifier.align(Alignment.End),
                        colors = ButtonDefaults.buttonColors(containerColor = NeonGreen)
                    ) {
                        Text("Save Symptom", color = BackgroundDark, fontWeight = FontWeight.Bold)
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(12.dp))

        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            symptoms.forEach { symptom ->
                Card(
                    modifier = Modifier
                        .fillMaxWidth()
                        .border(1.dp, CardBorder, RoundedCornerShape(10.dp)),
                    colors = CardDefaults.cardColors(containerColor = SurfaceDark)
                ) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(12.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column {
                            Text(symptom.name, color = TextPrimary, fontWeight = FontWeight.SemiBold)
                            Text("${symptom.date} • ${symptom.duration}", color = TextSecondary, fontSize = 12.sp)
                            if (symptom.notes.isNotBlank()) {
                                Text(symptom.notes, color = TextMuted, fontSize = 11.sp)
                            }
                        }
                        Surface(
                            color = if (symptom.severity > 6) ErrorRed.copy(alpha = 0.2f) else WarningAmber.copy(alpha = 0.2f),
                            shape = RoundedCornerShape(6.dp)
                        ) {
                            Text(
                                "Sev ${symptom.severity}/10",
                                color = if (symptom.severity > 6) ErrorRed else WarningAmber,
                                fontSize = 12.sp,
                                modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
                                fontWeight = FontWeight.Bold
                            )
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun VitalMetricItem(label: String, value: String) {
    Column {
        Text(text = label, style = MaterialTheme.typography.labelSmall, color = TextSecondary)
        Text(text = value, style = MaterialTheme.typography.titleMedium, color = TextPrimary, fontWeight = FontWeight.Bold)
    }
}
