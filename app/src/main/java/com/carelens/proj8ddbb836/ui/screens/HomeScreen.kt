package com.carelens.proj8ddbb836.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.carelens.proj8ddbb836.data.CareLensRepository
import com.carelens.proj8ddbb836.ui.theme.*

@Composable
fun HomeScreen(
    repository: CareLensRepository,
    onNavigateProfile: () -> Unit,
    onNavigatePrevention: () -> Unit,
    onNavigateManagement: () -> Unit,
    onNavigateAnalysis: () -> Unit,
    onNavigateSettings: () -> Unit,
    onOpenPaywall: () -> Unit
) {
    val userProfile by repository.userProfile.collectAsState()
    val pendingProcedures by repository.pendingProcedures.collectAsState()
    val unaddressedCount = pendingProcedures.size

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(BackgroundDark)
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(horizontal = 20.dp, vertical = 16.dp)
                .verticalScroll(rememberScrollState()),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            // Top App Bar Controls
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(top = 8.dp, bottom = 24.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                // Pro Badge or Upgrade Button
                if (userProfile.isProSubscriber) {
                    Surface(
                        color = NeonGreen.copy(alpha = 0.2f),
                        border = androidx.compose.foundation.BorderStroke(1.dp, NeonGreen),
                        shape = RoundedCornerShape(20.dp)
                    ) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp)
                        ) {
                            Icon(
                                imageVector = Icons.Default.Diamond,
                                contentDescription = null,
                                tint = NeonGreen,
                                modifier = Modifier.size(16.dp)
                            )
                            Spacer(modifier = Modifier.width(6.dp))
                            Text(
                                text = "PRO ACTIVE",
                                color = NeonGreen,
                                fontWeight = FontWeight.Bold,
                                fontSize = 11.sp,
                                letterSpacing = 1.sp
                            )
                        }
                    }
                } else {
                    Button(
                        onClick = onOpenPaywall,
                        colors = ButtonDefaults.buttonColors(containerColor = SurfaceElevated),
                        border = androidx.compose.foundation.BorderStroke(1.dp, NeonCyan),
                        shape = RoundedCornerShape(20.dp),
                        contentPadding = PaddingValues(horizontal = 12.dp, vertical = 6.dp)
                    ) {
                        Icon(
                            imageVector = Icons.Default.Diamond,
                            contentDescription = null,
                            tint = NeonCyan,
                            modifier = Modifier.size(16.dp)
                        )
                        Spacer(modifier = Modifier.width(6.dp))
                        Text(
                            text = "UPGRADE TO PRO",
                            color = NeonCyan,
                            fontWeight = FontWeight.Bold,
                            fontSize = 11.sp,
                            letterSpacing = 0.5.sp
                        )
                    }
                }

                // Settings Icon with Pending Notification Badge
                Box(
                    modifier = Modifier.clickable { onNavigateSettings() }
                ) {
                    Box(
                        modifier = Modifier
                            .size(44.dp)
                            .background(SurfaceDark, CircleShape)
                            .border(1.dp, CardBorder, CircleShape),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = Icons.Default.Settings,
                            contentDescription = "Settings",
                            tint = NeonCyan,
                            modifier = Modifier.size(22.dp)
                        )
                    }

                    // Notification pop-up displaying the number of unaddressed procedures
                    if (unaddressedCount > 0) {
                        Box(
                            modifier = Modifier
                                .align(Alignment.TopEnd)
                                .offset(x = 2.dp, y = (-2).dp)
                                .size(20.dp)
                                .background(ErrorRed, CircleShape)
                                .border(1.5.dp, BackgroundDark, CircleShape)
                                .shadow(8.dp, CircleShape),
                            contentAlignment = Alignment.Center
                        ) {
                            Text(
                                text = unaddressedCount.toString(),
                                color = Color.White,
                                fontSize = 10.sp,
                                fontWeight = FontWeight.ExtraBold
                            )
                        }
                    }
                }
            }

            Spacer(modifier = Modifier.height(12.dp))

            // Hero Brand Header
            Text(
                text = "CARELENS",
                style = MaterialTheme.typography.headlineLarge.copy(
                    fontSize = 42.sp,
                    fontWeight = FontWeight.Black,
                    letterSpacing = 4.sp
                ),
                color = NeonCyan,
                textAlign = TextAlign.Center
            )

            Text(
                text = "Your health, clearly in focus! 🔍",
                style = MaterialTheme.typography.bodyMedium.copy(
                    letterSpacing = 1.sp,
                    fontWeight = FontWeight.Medium
                ),
                color = TextSecondary,
                textAlign = TextAlign.Center,
                modifier = Modifier.padding(top = 6.dp, bottom = 36.dp)
            )

            // Futuristic Crystal Nodes Grid
            Column(
                modifier = Modifier.fillMaxWidth(),
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    CrystalNodeCard(
                        title = "User Profile",
                        subtitle = "Demographics & History",
                        icon = Icons.Default.Person,
                        accentColor = NeonCyan,
                        gradientColors = listOf(NeonCyan.copy(alpha = 0.25f), SurfaceDark),
                        modifier = Modifier.weight(1f),
                        onClick = onNavigateProfile
                    )
                    CrystalNodeCard(
                        title = "Prevention",
                        subtitle = "Screenings & Vaccines",
                        icon = Icons.Default.Shield,
                        accentColor = NeonBlue,
                        gradientColors = listOf(NeonBlue.copy(alpha = 0.25f), SurfaceDark),
                        modifier = Modifier.weight(1f),
                        onClick = onNavigatePrevention
                    )
                }

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    CrystalNodeCard(
                        title = "Management",
                        subtitle = "Vitals & Symptoms",
                        icon = Icons.Default.Favorite,
                        accentColor = NeonGreen,
                        gradientColors = listOf(NeonGreen.copy(alpha = 0.25f), SurfaceDark),
                        modifier = Modifier.weight(1f),
                        onClick = onNavigateManagement
                    )
                    CrystalNodeCard(
                        title = "Analysis & Risk",
                        subtitle = "Predictive Clinical AI",
                        icon = Icons.Default.AutoGraph,
                        accentColor = NeonPink,
                        gradientColors = listOf(NeonPink.copy(alpha = 0.25f), SurfaceDark),
                        modifier = Modifier.weight(1f),
                        onClick = onNavigateAnalysis
                    )
                }
            }

            Spacer(modifier = Modifier.height(28.dp))

            // Quick Status Card
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .border(1.dp, CardBorder, RoundedCornerShape(16.dp)),
                colors = CardDefaults.cardColors(containerColor = SurfaceDark)
            ) {
                Row(
                    modifier = Modifier.padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .size(10.dp)
                            .background(if (unaddressedCount > 0) WarningAmber else SuccessGreen, CircleShape)
                    )
                    Spacer(modifier = Modifier.width(12.dp))
                    Column {
                        Text(
                            text = if (unaddressedCount > 0) {
                                "$unaddressedCount Recommended Procedure${if (unaddressedCount > 1) "s" else ""} awaiting self-filing"
                            } else {
                                "All clinical recommendations up to date"
                            },
                            style = MaterialTheme.typography.bodyMedium,
                            color = TextPrimary,
                            fontWeight = FontWeight.Medium
                        )
                        Text(
                            text = "Tap Settings to review & synchronize findings with your clinical chart",
                            style = MaterialTheme.typography.labelSmall,
                            color = TextMuted
                        )
                    }
                }
            }
        }
    }
}

@Composable
private fun CrystalNodeCard(
    title: String,
    subtitle: String,
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    accentColor: Color,
    gradientColors: List<Color>,
    modifier: Modifier = Modifier,
    onClick: () -> Unit
) {
    Card(
        modifier = modifier
            .height(160.dp)
            .clip(RoundedCornerShape(20.dp))
            .border(1.dp, accentColor.copy(alpha = 0.6f), RoundedCornerShape(20.dp))
            .clickable { onClick() },
        colors = CardDefaults.cardColors(containerColor = SurfaceDark)
    ) {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(Brush.verticalGradient(gradientColors))
                .padding(16.dp)
        ) {
            Column(
                modifier = Modifier.fillMaxSize(),
                verticalArrangement = Arrangement.SpaceBetween
            ) {
                Box(
                    modifier = Modifier
                        .size(42.dp)
                        .background(accentColor.copy(alpha = 0.2f), CircleShape)
                        .border(1.dp, accentColor, CircleShape),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = icon,
                        contentDescription = title,
                        tint = accentColor,
                        modifier = Modifier.size(22.dp)
                    )
                }

                Column {
                    Text(
                        text = title,
                        style = MaterialTheme.typography.titleMedium.copy(
                            fontWeight = FontWeight.Bold
                        ),
                        color = TextPrimary
                    )
                    Text(
                        text = subtitle,
                        style = MaterialTheme.typography.labelSmall,
                        color = TextSecondary,
                        modifier = Modifier.padding(top = 2.dp)
                    )
                }
            }
        }
    }
}
