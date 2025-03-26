import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { TokenizedInput } from "@/components/ui/tokenized-input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Building, 
  Heart, 
  Stethoscope, 
  Activity,
  ArrowUpRight,
  Calendar as CalendarIcon,
  Check,
  CheckCircle,
  Clock,
  Video,
  User,
  MessageSquare,
  PlusCircle,
  Pill,
  Calculator,
  FileText,
  Dumbbell,
  ArrowRight,
  ChevronRight,
  Info,
} from "lucide-react";

export default function TertiaryPrevention() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedCondition, setSelectedCondition] = useState<string>("diabetes");
  const [medicationTags, setMedicationTags] = useState<string[]>(["Metformin", "Lisinopril"]);
  const [exerciseLevel, setExerciseLevel] = useState<number[]>([3]);
  
  // Mock data for chronic disease management
  const conditions = [
    { id: "diabetes", name: "Type 2 Diabetes", status: "Managed", lastChecked: "3 days ago", icon: <Activity className="h-5 w-5" /> },
    { id: "hypertension", name: "Hypertension", status: "Controlled", lastChecked: "1 week ago", icon: <Heart className="h-5 w-5" /> },
    { id: "asthma", name: "Asthma", status: "Active", lastChecked: "2 weeks ago", icon: <Stethoscope className="h-5 w-5" /> }
  ];

  const medicationList = [
    { id: 1, name: "Metformin", dosage: "500mg", frequency: "Twice daily", purpose: "Blood glucose control", refillDate: "Apr 15, 2025" },
    { id: 2, name: "Lisinopril", dosage: "10mg", frequency: "Once daily", purpose: "Blood pressure control", refillDate: "May 02, 2025" },
    { id: 3, name: "Atorvastatin", dosage: "20mg", frequency: "Once daily", purpose: "Cholesterol management", refillDate: "Apr 20, 2025" }
  ];

  const vitalSigns = [
    { id: 1, name: "Blood Glucose", value: "134", unit: "mg/dL", date: "Today, 8:30 AM", trend: "steady" },
    { id: 2, name: "Blood Pressure", value: "128/82", unit: "mmHg", date: "Today, 8:35 AM", trend: "improving" },
    { id: 3, name: "Weight", value: "176", unit: "lbs", date: "Yesterday", trend: "improving" },
    { id: 4, name: "Heart Rate", value: "72", unit: "bpm", date: "Today, 8:35 AM", trend: "steady" }
  ];

  // Mock data for rehabilitation programs
  const rehabPrograms = [
    { 
      id: 1, 
      name: "Post-Stroke Recovery", 
      progress: 65, 
      nextSession: "Tomorrow, 10:00 AM",
      exercises: [
        { name: "Arm Mobility", reps: "10 reps x 3 sets", completed: true },
        { name: "Balance Training", reps: "15 minutes", completed: true },
        { name: "Hand Coordination", reps: "5 minutes", completed: false }
      ]
    },
    { 
      id: 2, 
      name: "Cardiac Rehabilitation", 
      progress: 40, 
      nextSession: "Thursday, 2:00 PM",
      exercises: [
        { name: "Supervised Walking", reps: "20 minutes", completed: true },
        { name: "Light Resistance", reps: "8 reps x 2 sets", completed: false },
        { name: "Breathing Exercises", reps: "10 minutes", completed: false }
      ]
    }
  ];

  const exerciseLogs = [
    { date: "Mar 25, 2025", type: "Walking", duration: "30 min", intensity: "Moderate", notes: "Felt good, no shortness of breath" },
    { date: "Mar 23, 2025", type: "Resistance Bands", duration: "15 min", intensity: "Light", notes: "Upper body focus" },
    { date: "Mar 21, 2025", type: "Physical Therapy", duration: "45 min", intensity: "Moderate", notes: "With therapist - knee exercises" }
  ];

  // Mock data for telehealth services
  const upcomingAppointments = [
    { id: 1, type: "Video Consultation", specialist: "Dr. Sarah Johnson", speciality: "Endocrinologist", date: "Mar 29, 2025", time: "10:30 AM", status: "Confirmed" },
    { id: 2, type: "Phone Follow-up", specialist: "Dr. Michael Lee", speciality: "Cardiologist", date: "Apr 05, 2025", time: "2:15 PM", status: "Pending" }
  ];

  const previousConsultations = [
    { id: 1, type: "Video Consultation", specialist: "Dr. Sarah Johnson", date: "Feb 28, 2025", summary: "Adjusted medication dosage, recommended more frequent glucose monitoring." },
    { id: 2, type: "In-Person Visit", specialist: "Dr. Michael Lee", date: "Feb 10, 2025", summary: "Blood pressure well-controlled. Continue current treatment plan." }
  ];

  const suggestedMedications = [
    "Metformin", "Lisinopril", "Atorvastatin", "Aspirin", "Losartan", 
    "Levothyroxine", "Amlodipine", "Gabapentin", "Hydrochlorothiazide", "Simvastatin"
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-neutral-900 font-heading sm:text-3xl">Tertiary Prevention</h2>
          <p className="mt-1 text-sm text-neutral-600">Managing established diseases to improve quality of life</p>
        </div>
      </div>

      <Tabs defaultValue="disease-management" className="mb-8">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
          <TabsTrigger value="disease-management" className="flex items-center">
            <Heart className="h-4 w-4 mr-2" />
            Disease Management
          </TabsTrigger>
          <TabsTrigger value="rehabilitation" className="flex items-center">
            <Dumbbell className="h-4 w-4 mr-2" />
            Rehabilitation
          </TabsTrigger>
          <TabsTrigger value="telehealth" className="flex items-center">
            <Video className="h-4 w-4 mr-2" />
            Telehealth
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex items-center">
            <Activity className="h-4 w-4 mr-2" />
            Progress Tracking
          </TabsTrigger>
        </TabsList>
        
        {/* Chronic Disease Management Tab */}
        <TabsContent value="disease-management">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>My Conditions</CardTitle>
                  <CardDescription>Select a condition to manage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {conditions.map(condition => (
                      <div
                        key={condition.id}
                        className={`p-3 border rounded-md cursor-pointer ${selectedCondition === condition.id ? 'bg-primary/10 border-primary' : 'bg-white hover:bg-neutral-50'}`}
                        onClick={() => setSelectedCondition(condition.id)}
                      >
                        <div className="flex items-center">
                          <div className={`rounded-full p-2 mr-3 ${selectedCondition === condition.id ? 'bg-primary/20' : 'bg-neutral-100'}`}>
                            {condition.icon}
                          </div>
                          <div>
                            <h4 className="font-medium">{condition.name}</h4>
                            <div className="flex items-center text-sm text-neutral-600">
                              <Badge variant="outline" className="mr-2">{condition.status}</Badge>
                              <span>Last checked: {condition.lastChecked}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" className="w-full">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add New Condition
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Care Team</CardTitle>
                  <CardDescription>Your healthcare professionals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarFallback>SJ</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">Dr. Sarah Johnson</h4>
                        <p className="text-sm text-neutral-600">Endocrinologist</p>
                      </div>
                      <Button variant="ghost" size="icon" className="ml-auto">
                        <MessageSquare className="h-5 w-5" />
                      </Button>
                    </div>
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarFallback>ML</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">Dr. Michael Lee</h4>
                        <p className="text-sm text-neutral-600">Cardiologist</p>
                      </div>
                      <Button variant="ghost" size="icon" className="ml-auto">
                        <MessageSquare className="h-5 w-5" />
                      </Button>
                    </div>
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarFallback>RP</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">Rachel Peters</h4>
                        <p className="text-sm text-neutral-600">Nutritionist</p>
                      </div>
                      <Button variant="ghost" size="icon" className="ml-auto">
                        <MessageSquare className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Vital Signs Tracking</CardTitle>
                  <CardDescription>Recent measurements for Type 2 Diabetes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {vitalSigns.map(vital => (
                      <div key={vital.id} className="border rounded-md p-3">
                        <h4 className="text-sm font-medium text-neutral-600">{vital.name}</h4>
                        <div className="mt-1 flex items-baseline">
                          <span className="text-2xl font-bold">{vital.value}</span>
                          <span className="ml-1 text-sm text-neutral-600">{vital.unit}</span>
                          {vital.trend === "improving" ? (
                            <ArrowUpRight className="h-4 w-4 text-green-500 ml-2" />
                          ) : vital.trend === "worsening" ? (
                            <ArrowUpRight className="h-4 w-4 text-red-500 ml-2 rotate-90" />
                          ) : (
                            <ArrowRight className="h-4 w-4 text-amber-500 ml-2" />
                          )}
                        </div>
                        <p className="text-xs text-neutral-600 mt-1">{vital.date}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="glucose">Record Blood Glucose</Label>
                      <div className="flex mt-1 space-x-2">
                        <Input id="glucose" type="number" placeholder="mg/dL" />
                        <Button>Save</Button>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="bp">Record Blood Pressure</Label>
                      <div className="flex mt-1 space-x-2">
                        <Input id="bp-sys" type="number" placeholder="Systolic" className="w-1/2" />
                        <Input id="bp-dia" type="number" placeholder="Diastolic" className="w-1/2" />
                        <Button>Save</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Medication Tracker</CardTitle>
                  <CardDescription>Keep track of your prescribed medications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {medicationList.map(med => (
                      <div key={med.id} className="flex items-start border-b pb-3 last:border-0 last:pb-0">
                        <div className="rounded-full bg-blue-100 p-2 mr-3">
                          <Pill className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h4 className="font-medium">{med.name} ({med.dosage})</h4>
                            <Badge variant="outline">{med.frequency}</Badge>
                          </div>
                          <p className="text-sm text-neutral-600 mt-1">{med.purpose}</p>
                          <div className="mt-2 flex justify-between items-center">
                            <span className="text-xs text-neutral-600">Refill by: {med.refillDate}</span>
                            <div>
                              <Checkbox id={`taken-${med.id}`} />
                              <label htmlFor={`taken-${med.id}`} className="ml-2 text-sm">Taken today</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4">
                    <Label>Add New Medication</Label>
                    <TokenizedInput 
                      tokens={medicationTags} 
                      onTokensChange={setMedicationTags} 
                      suggestions={suggestedMedications}
                      placeholder="Type medication name..."
                      className="mt-1"
                    />
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <Label htmlFor="dosage">Dosage</Label>
                        <Input id="dosage" placeholder="e.g., 500mg" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="frequency">Frequency</Label>
                        <select id="frequency" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1">
                          <option value="">Select frequency</option>
                          <option value="once-daily">Once Daily</option>
                          <option value="twice-daily">Twice Daily</option>
                          <option value="three-times">Three Times Daily</option>
                          <option value="as-needed">As Needed</option>
                        </select>
                      </div>
                    </div>
                    
                    <Button className="mt-4">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Save Medication
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* Rehabilitation Programs Tab */}
        <TabsContent value="rehabilitation">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {rehabPrograms.map(program => (
                <Card key={program.id}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>{program.name}</CardTitle>
                        <CardDescription>Next session: {program.nextSession}</CardDescription>
                      </div>
                      <Badge variant={program.progress >= 50 ? "default" : "secondary"}>
                        {program.progress}% Complete
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <Progress value={program.progress} className="h-2" />
                    </div>
                    
                    <h4 className="font-medium mb-2">Today's Exercises</h4>
                    <div className="space-y-3">
                      {program.exercises.map((exercise, index) => (
                        <div key={index} className="flex items-center p-3 border rounded-md">
                          <div className={`rounded-full p-1 ${exercise.completed ? 'bg-green-100' : 'bg-neutral-100'} mr-3`}>
                            <Check className={`h-4 w-4 ${exercise.completed ? 'text-green-600' : 'text-neutral-400'}`} />
                          </div>
                          <div className="flex-1">
                            <h5 className="font-medium">{exercise.name}</h5>
                            <p className="text-sm text-neutral-600">{exercise.reps}</p>
                          </div>
                          <Checkbox checked={exercise.completed} />
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="font-medium mb-2">Instructions</h4>
                      <div className="p-3 bg-neutral-50 rounded-md text-sm">
                        <p>Complete all exercises in order. If you experience pain that is beyond mild discomfort, stop immediately and contact your healthcare provider.</p>
                        <div className="mt-2 flex">
                          <Button variant="ghost" size="sm" className="text-primary">
                            <FileText className="h-4 w-4 mr-2" />
                            View Detailed Guide
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Log Progress</Button>
                    <Button>
                      Start Today's Session
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Exercise Log</CardTitle>
                  <CardDescription>Your recent activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {exerciseLogs.map((log, index) => (
                      <div key={index} className="border-b pb-3 last:border-b-0 last:pb-0">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{log.type}</h4>
                          <span className="text-sm text-neutral-600">{log.date}</span>
                        </div>
                        <div className="mt-1 text-sm">
                          <div className="flex justify-between">
                            <span>Duration:</span>
                            <span>{log.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Intensity:</span>
                            <span>{log.intensity}</span>
                          </div>
                        </div>
                        <p className="mt-2 text-sm text-neutral-600">{log.notes}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Log New Exercise</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="exercise-type">Exercise Type</Label>
                      <select id="exercise-type" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1">
                        <option value="">Select type</option>
                        <option value="walking">Walking</option>
                        <option value="physical-therapy">Physical Therapy</option>
                        <option value="resistance">Resistance Training</option>
                        <option value="stretching">Stretching</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="duration">Duration (minutes)</Label>
                      <Input id="duration" type="number" min={1} className="mt-1" />
                    </div>
                    
                    <div>
                      <Label>Intensity</Label>
                      <div className="flex items-center mt-2">
                        <span className="text-sm mr-3">Light</span>
                        <Slider 
                          value={exerciseLevel} 
                          onValueChange={setExerciseLevel}
                          max={5}
                          step={1}
                          className="flex-1"
                        />
                        <span className="text-sm ml-3">Intense</span>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea id="notes" placeholder="How did you feel? Any difficulties?" className="mt-1" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Exercise</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* Telehealth Services Tab */}
        <TabsContent value="telehealth">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>Virtual consultations with your healthcare team</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingAppointments.map(apt => (
                      <div key={apt.id} className="border rounded-md overflow-hidden">
                        <div className="bg-neutral-50 p-3 flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="rounded-full bg-primary/20 p-2 mr-3">
                              <Video className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium">{apt.type}</h4>
                              <p className="text-sm text-neutral-600">{apt.date} at {apt.time}</p>
                            </div>
                          </div>
                          <Badge variant={apt.status === "Confirmed" ? "outline" : "secondary"}>
                            {apt.status}
                          </Badge>
                        </div>
                        <div className="p-3">
                          <div className="flex items-center mb-3">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarFallback>{apt.specialist.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium">{apt.specialist}</h4>
                              <p className="text-sm text-neutral-600">{apt.speciality}</p>
                            </div>
                          </div>
                          {apt.status === "Confirmed" ? (
                            <div className="flex space-x-2">
                              <Button className="flex-1">
                                Join Meeting
                              </Button>
                              <Button variant="outline">
                                Reschedule
                              </Button>
                            </div>
                          ) : (
                            <div className="flex space-x-2">
                              <Button className="flex-1">
                                Confirm Appointment
                              </Button>
                              <Button variant="outline">
                                Cancel
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Previous Consultations</CardTitle>
                  <CardDescription>Your past telehealth appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {previousConsultations.map(cons => (
                      <div key={cons.id} className="border rounded-md p-4">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{cons.type} with {cons.specialist}</h4>
                          <span className="text-sm text-neutral-600">{cons.date}</span>
                        </div>
                        <div className="mt-2">
                          <h5 className="text-sm font-medium">Summary</h5>
                          <p className="text-sm text-neutral-600 mt-1">{cons.summary}</p>
                        </div>
                        <div className="mt-3 flex">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Schedule Appointment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="specialist">Select Specialist</Label>
                      <select id="specialist" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1">
                        <option value="">Choose a healthcare provider</option>
                        <option value="dr-johnson">Dr. Sarah Johnson (Endocrinologist)</option>
                        <option value="dr-lee">Dr. Michael Lee (Cardiologist)</option>
                        <option value="rachel-peters">Rachel Peters (Nutritionist)</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="appointment-type">Consultation Type</Label>
                      <select id="appointment-type" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1">
                        <option value="">Select type</option>
                        <option value="video">Video Consultation</option>
                        <option value="phone">Phone Consultation</option>
                        <option value="in-person">In-Person Visit</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label>Select Date</Label>
                      <div className="mt-1 border rounded-md overflow-hidden">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          className="rounded-md"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label>Available Times</Label>
                      <div className="grid grid-cols-3 gap-2 mt-1">
                        <Button variant="outline" size="sm" className="text-xs">9:00 AM</Button>
                        <Button variant="outline" size="sm" className="text-xs">10:30 AM</Button>
                        <Button variant="outline" size="sm" className="text-xs">11:45 AM</Button>
                        <Button variant="outline" size="sm" className="text-xs">1:15 PM</Button>
                        <Button variant="outline" size="sm" className="text-xs">2:30 PM</Button>
                        <Button variant="outline" size="sm" className="text-xs">4:00 PM</Button>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="reason">Reason for Consultation</Label>
                      <Textarea id="reason" placeholder="Briefly describe the reason for your appointment" className="mt-1" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Schedule Appointment</Button>
                </CardFooter>
              </Card>
              
              <Alert className="bg-blue-50 border-blue-200">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertTitle className="text-blue-800">About Telehealth</AlertTitle>
                <AlertDescription className="text-blue-800">
                  Virtual consultations can be as effective as in-person visits for many follow-up appointments. Ensure you have a stable internet connection and a quiet space.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </TabsContent>
        
        {/* Progress Reports Tab */}
        <TabsContent value="progress">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Health Progress Summary</CardTitle>
                  <CardDescription>Your improvement over the last 3 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-2 flex items-center">
                        <Heart className="h-5 w-5 text-primary mr-2" />
                        Blood Pressure Control
                      </h4>
                      <div className="bg-neutral-100 p-4 rounded-md">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="text-sm font-medium">Systolic (mmHg)</h5>
                          <Badge variant="outline">15% Improvement</Badge>
                        </div>
                        <div className="relative pt-1">
                          <div className="flex mb-2 items-center justify-end">
                            <div className="text-xs font-semibold inline-block text-green-600">
                              120 mmHg (Current)
                            </div>
                          </div>
                          <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-neutral-200">
                            <div style={{ width: "75%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
                          </div>
                          <div className="flex mb-2 items-center justify-start">
                            <div className="text-xs font-semibold inline-block text-red-600">
                              152 mmHg (3 months ago)
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2 flex items-center">
                        <Activity className="h-5 w-5 text-primary mr-2" />
                        Blood Glucose Control
                      </h4>
                      <div className="bg-neutral-100 p-4 rounded-md">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="text-sm font-medium">Average Fasting Glucose (mg/dL)</h5>
                          <Badge variant="outline">20% Improvement</Badge>
                        </div>
                        <div className="relative pt-1">
                          <div className="flex mb-2 items-center justify-end">
                            <div className="text-xs font-semibold inline-block text-green-600">
                              134 mg/dL (Current)
                            </div>
                          </div>
                          <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-neutral-200">
                            <div style={{ width: "65%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
                          </div>
                          <div className="flex mb-2 items-center justify-start">
                            <div className="text-xs font-semibold inline-block text-red-600">
                              168 mg/dL (3 months ago)
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2 flex items-center">
                        <Dumbbell className="h-5 w-5 text-primary mr-2" />
                        Physical Activity
                      </h4>
                      <div className="bg-neutral-100 p-4 rounded-md">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="text-sm font-medium">Weekly Active Minutes</h5>
                          <Badge variant="outline">40% Improvement</Badge>
                        </div>
                        <div className="relative pt-1">
                          <div className="flex mb-2 items-center justify-end">
                            <div className="text-xs font-semibold inline-block text-green-600">
                              150 minutes (Current)
                            </div>
                          </div>
                          <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-neutral-200">
                            <div style={{ width: "85%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
                          </div>
                          <div className="flex mb-2 items-center justify-start">
                            <div className="text-xs font-semibold inline-block text-red-600">
                              90 minutes (3 months ago)
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Download Full Progress Report</Button>
                </CardFooter>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Healthcare Provider Notes</CardTitle>
                  <CardDescription>Recent comments from your care team</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-md">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarFallback>SJ</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">Dr. Sarah Johnson</h4>
                          <p className="text-sm text-neutral-600">Endocrinologist • March 15, 2025</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <p className="text-sm">
                          Patient shows significant improvement in glucose control. Current A1C is 6.8%, down from 7.5% three months ago. Continue current medication regimen and dietary plan. Recommend increasing physical activity to 30 minutes daily if possible.
                        </p>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-md">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarFallback>ML</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">Dr. Michael Lee</h4>
                          <p className="text-sm text-neutral-600">Cardiologist • March 01, 2025</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <p className="text-sm">
                          Blood pressure is well-controlled on current regimen. Continue monitoring at home 2-3 times per week. Recent ECG showed normal sinus rhythm. No changes to cardiac medications recommended at this time.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Health Goals</CardTitle>
                  <CardDescription>Track your progress towards targets</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="text-sm font-medium">A1C Level</h4>
                        <span className="text-sm text-neutral-600">6.8% / 6.5% Target</span>
                      </div>
                      <Progress value={90} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="text-sm font-medium">Blood Pressure</h4>
                        <span className="text-sm text-neutral-600">128/82 / 120/80 Target</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="text-sm font-medium">Weekly Exercise</h4>
                        <span className="text-sm text-neutral-600">150 min / 150 min Target</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="text-sm font-medium">Weight</h4>
                        <span className="text-sm text-neutral-600">176 lbs / 170 lbs Target</span>
                      </div>
                      <Progress value={70} className="h-2" />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Button variant="outline" className="w-full">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add New Goal
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Achievement Badges</CardTitle>
                  <CardDescription>Rewards for your progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border rounded-md p-3 text-center">
                      <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <h5 className="mt-2 font-medium text-sm">Perfect Adherence</h5>
                      <p className="text-xs text-neutral-600">30 days medication streak</p>
                    </div>
                    
                    <div className="border rounded-md p-3 text-center">
                      <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                        <Activity className="h-6 w-6 text-blue-600" />
                      </div>
                      <h5 className="mt-2 font-medium text-sm">Progress Champion</h5>
                      <p className="text-xs text-neutral-600">15% improvement in 3 months</p>
                    </div>
                    
                    <div className="border rounded-md p-3 text-center">
                      <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
                        <Dumbbell className="h-6 w-6 text-amber-600" />
                      </div>
                      <h5 className="mt-2 font-medium text-sm">Exercise Master</h5>
                      <p className="text-xs text-neutral-600">Weekly target achieved 4 weeks</p>
                    </div>
                    
                    <div className="border rounded-md p-3 text-center border-dashed bg-neutral-50">
                      <div className="h-12 w-12 bg-neutral-200 rounded-full flex items-center justify-center mx-auto">
                        <Heart className="h-6 w-6 text-neutral-400" />
                      </div>
                      <h5 className="mt-2 font-medium text-sm text-neutral-600">BP Controller</h5>
                      <p className="text-xs text-neutral-600">Target for 60 days (In progress)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
