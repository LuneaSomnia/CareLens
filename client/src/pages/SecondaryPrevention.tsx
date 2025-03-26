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
import { Slider } from "@/components/ui/slider";
import { TokenizedInput } from "@/components/ui/tokenized-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  FileText, 
  FileBarChart, 
  AlertCircle, 
  ActivitySquare, 
  Calendar, 
  Check, 
  ChevronDown, 
  HeartPulse,
  Thermometer,
  Plus,
  Clock
} from "lucide-react";

export default function SecondaryPrevention() {
  // State for symptoms
  const [symptomTags, setSymptomTags] = useState<string[]>([]);
  const [painLevel, setPainLevel] = useState<number[]>([3]);
  
  // Mock data for the page
  const recentSymptoms = [
    { id: 1, name: "Headache", frequency: "Occasional", severity: "Moderate", duration: "2-3 hours", lastOccurrence: "2 days ago" },
    { id: 2, name: "Joint Pain", frequency: "Daily", severity: "Mild", duration: "Throughout the day", lastOccurrence: "Today" },
    { id: 3, name: "Fatigue", frequency: "Frequent", severity: "Moderate", duration: "Most of the day", lastOccurrence: "Yesterday" }
  ];
  
  const upcomingScreenings = [
    { id: 1, name: "Blood Pressure Check", date: "Mar 30, 2025", facility: "Community Health Center", status: "Scheduled" },
    { id: 2, name: "Cholesterol Screening", date: "Apr 15, 2025", facility: "Dr. Johnson's Office", status: "Needs Scheduling" },
    { id: 3, name: "Eye Examination", date: "May 05, 2025", facility: "Vision Care Clinic", status: "Scheduled" }
  ];
  
  const recentTestResults = [
    { id: 1, name: "Complete Blood Count", date: "Feb 15, 2025", result: "Normal", details: "All values within reference range" },
    { id: 2, name: "Lipid Panel", date: "Feb 15, 2025", result: "Elevated", details: "Total cholesterol: 215 mg/dL (borderline high)" },
    { id: 3, name: "Fasting Blood Glucose", date: "Feb 15, 2025", result: "Normal", details: "92 mg/dL" }
  ];
  
  const suggestedSymptoms = [
    "Headache", "Dizziness", "Nausea", "Fatigue", "Joint pain", "Muscle ache", 
    "Fever", "Cough", "Sore throat", "Shortness of breath", "Chest pain", 
    "Abdominal pain", "Rash", "Numbness", "Vision changes", "Anxiety"
  ];
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-neutral-900 font-heading sm:text-3xl">Secondary Prevention</h2>
          <p className="mt-1 text-sm text-neutral-600">Early detection and timely intervention in asymptomatic stages</p>
        </div>
      </div>

      <Tabs defaultValue="symptom-diary" className="mb-8">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
          <TabsTrigger value="symptom-diary" className="flex items-center">
            <ActivitySquare className="h-4 w-4 mr-2" />
            Symptom Diary
          </TabsTrigger>
          <TabsTrigger value="screenings" className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Screenings
          </TabsTrigger>
          <TabsTrigger value="test-results" className="flex items-center">
            <FileBarChart className="h-4 w-4 mr-2" />
            Test Results
          </TabsTrigger>
          <TabsTrigger value="risk-calculators" className="flex items-center">
            <HeartPulse className="h-4 w-4 mr-2" />
            Risk Calculators
          </TabsTrigger>
        </TabsList>
        
        {/* Symptom Diary Tab */}
        <TabsContent value="symptom-diary">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Log New Symptoms</CardTitle>
                <CardDescription>Track your symptoms to identify patterns and early warning signs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Symptoms</Label>
                  <TokenizedInput 
                    tokens={symptomTags} 
                    onTokensChange={setSymptomTags} 
                    suggestions={suggestedSymptoms}
                    placeholder="Enter symptoms (e.g., headache, fever)..."
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Severity (1-5)</Label>
                  <div className="flex items-center mt-2">
                    <span className="text-sm mr-3">Mild</span>
                    <Slider 
                      value={painLevel} 
                      onValueChange={setPainLevel}
                      max={5}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-sm ml-3">Severe</span>
                  </div>
                </div>
                <div>
                  <Label>Duration</Label>
                  <div className="grid grid-cols-2 gap-4 mt-1">
                    <div>
                      <Input type="number" placeholder="Duration" min={1}/>
                    </div>
                    <div>
                      <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>Minutes</option>
                        <option>Hours</option>
                        <option>Days</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div>
                  <Label>Potential Triggers</Label>
                  <Textarea placeholder="Describe any potential triggers or events that preceded your symptoms" className="mt-1" />
                </div>
                <div>
                  <Label>Additional Notes</Label>
                  <Textarea placeholder="Any additional information you want to note" className="mt-1" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save Symptom</Button>
              </CardFooter>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Recently Logged Symptoms</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentSymptoms.map(symptom => (
                      <div key={symptom.id} className="border-b pb-3 last:border-b-0 last:pb-0">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{symptom.name}</span>
                          <Badge variant={symptom.severity === "Severe" ? "destructive" : symptom.severity === "Moderate" ? "default" : "outline"}>
                            {symptom.severity}
                          </Badge>
                        </div>
                        <div className="text-sm text-neutral-600 mt-1">
                          <div className="flex justify-between">
                            <span>Frequency:</span>
                            <span>{symptom.frequency}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Duration:</span>
                            <span>{symptom.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Last:</span>
                            <span>{symptom.lastOccurrence}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Alert className="bg-amber-50 border-amber-200">
                <Thermometer className="h-4 w-4 text-amber-600" />
                <AlertTitle className="text-amber-800">Symptom Pattern Detected</AlertTitle>
                <AlertDescription className="text-amber-800">
                  Your headache symptoms appear to be more frequent in the evenings. Consider discussing this pattern with your healthcare provider.
                </AlertDescription>
              </Alert>
              
              <div className="text-center">
                <Button variant="outline" className="w-full">View Full Symptom History</Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Screenings Tab */}
        <TabsContent value="screenings">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Upcoming Screenings & Check-ups</CardTitle>
                <CardDescription>Keep track of your scheduled and recommended health screenings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingScreenings.map(screening => (
                    <div key={screening.id} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center">
                        <div className={`rounded-full p-2 mr-3 ${screening.status === "Scheduled" ? "bg-green-100" : "bg-amber-100"}`}>
                          {screening.status === "Scheduled" ? (
                            <Calendar className="h-5 w-5 text-green-600" />
                          ) : (
                            <Clock className="h-5 w-5 text-amber-600" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">{screening.name}</h4>
                          <div className="flex text-sm text-neutral-600">
                            <span className="mr-2">{screening.date}</span>
                            <span>•</span>
                            <span className="ml-2">{screening.facility}</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant={screening.status === "Scheduled" ? "outline" : "secondary"}>
                        {screening.status}
                      </Badge>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button className="w-full sm:w-auto flex items-center">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Screening
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recommended Screenings</CardTitle>
                <CardDescription>Based on your age and health profile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="rounded-full bg-green-100 p-1 mr-3 mt-0.5">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Blood Pressure</h4>
                      <p className="text-xs text-neutral-600">Every 6 months</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="rounded-full bg-green-100 p-1 mr-3 mt-0.5">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Cholesterol Screening</h4>
                      <p className="text-xs text-neutral-600">Every 12 months</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="rounded-full bg-amber-100 p-1 mr-3 mt-0.5">
                      <Clock className="h-3 w-3 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Diabetic Screening</h4>
                      <p className="text-xs text-neutral-600">Recommended for your risk profile</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="rounded-full bg-green-100 p-1 mr-3 mt-0.5">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Eye Examination</h4>
                      <p className="text-xs text-neutral-600">Every 12 months</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="rounded-full bg-amber-100 p-1 mr-3 mt-0.5">
                      <Clock className="h-3 w-3 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Skin Cancer Screening</h4>
                      <p className="text-xs text-neutral-600">Recommended for your risk profile</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Test Results Tab */}
        <TabsContent value="test-results">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Test Results</CardTitle>
                <CardDescription>View and track your latest test results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTestResults.map(test => (
                    <div key={test.id} className="border rounded-md overflow-hidden">
                      <div className="flex justify-between items-center p-3 bg-neutral-50">
                        <div>
                          <h4 className="font-medium">{test.name}</h4>
                          <p className="text-sm text-neutral-600">{test.date}</p>
                        </div>
                        <Badge variant={
                          test.result === "Normal" ? "outline" : 
                          test.result === "Elevated" ? "secondary" : "destructive"
                        }>
                          {test.result}
                        </Badge>
                      </div>
                      <div className="p-3 text-sm">
                        <p>{test.details}</p>
                        <div className="mt-2 flex justify-end">
                          <Button variant="ghost" size="sm" className="text-xs">View Full Report</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <Button variant="outline" className="flex items-center">
                    <Plus className="h-4 w-4 mr-2" />
                    Upload New Results
                  </Button>
                  <Button variant="ghost" size="sm">View All Results</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Trends Over Time</CardTitle>
                <CardDescription>Track how your test values have changed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Total Cholesterol</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="text-sm w-24">Feb 2025:</span>
                        <div className="w-full bg-neutral-100 h-6 rounded-md overflow-hidden">
                          <div className="bg-amber-500 h-full" style={{ width: '72%' }}></div>
                        </div>
                        <span className="text-sm ml-2 w-16">215 mg/dL</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm w-24">Oct 2024:</span>
                        <div className="w-full bg-neutral-100 h-6 rounded-md overflow-hidden">
                          <div className="bg-amber-400 h-full" style={{ width: '68%' }}></div>
                        </div>
                        <span className="text-sm ml-2 w-16">205 mg/dL</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm w-24">Apr 2024:</span>
                        <div className="w-full bg-neutral-100 h-6 rounded-md overflow-hidden">
                          <div className="bg-green-500 h-full" style={{ width: '63%' }}></div>
                        </div>
                        <span className="text-sm ml-2 w-16">190 mg/dL</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Blood Pressure</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="text-sm w-24">Feb 2025:</span>
                        <div className="w-full bg-neutral-100 h-6 rounded-md overflow-hidden">
                          <div className="bg-green-500 h-full" style={{ width: '45%' }}></div>
                        </div>
                        <span className="text-sm ml-2 w-16">120/80</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm w-24">Oct 2024:</span>
                        <div className="w-full bg-neutral-100 h-6 rounded-md overflow-hidden">
                          <div className="bg-green-500 h-full" style={{ width: '43%' }}></div>
                        </div>
                        <span className="text-sm ml-2 w-16">118/75</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm w-24">Apr 2024:</span>
                        <div className="w-full bg-neutral-100 h-6 rounded-md overflow-hidden">
                          <div className="bg-green-500 h-full" style={{ width: '40%' }}></div>
                        </div>
                        <span className="text-sm ml-2 w-16">115/75</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Risk Calculators Tab */}
        <TabsContent value="risk-calculators">
          <Card>
            <CardHeader>
              <CardTitle>Cardiovascular Risk Assessment</CardTitle>
              <CardDescription>Based on the Framingham Heart Study risk algorithm</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Your 10-Year Risk of Heart Disease</h3>
                  <Badge>Moderate Risk</Badge>
                </div>
                <Progress value={15} className="h-3" />
                <div className="flex justify-between mt-1 text-sm">
                  <span>0%</span>
                  <span className="font-medium">15%</span>
                  <span>30%+</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Risk Factors</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center border-b pb-1">
                      <span className="text-sm">Age</span>
                      <span className="font-medium">52 years</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-1">
                      <span className="text-sm">Gender</span>
                      <span className="font-medium">Male</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-1">
                      <span className="text-sm">Total Cholesterol</span>
                      <span className="font-medium">215 mg/dL</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-1">
                      <span className="text-sm">HDL Cholesterol</span>
                      <span className="font-medium">45 mg/dL</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-1">
                      <span className="text-sm">Systolic BP</span>
                      <span className="font-medium">120 mmHg</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-1">
                      <span className="text-sm">BP Treatment</span>
                      <span className="font-medium">No</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-1">
                      <span className="text-sm">Diabetes</span>
                      <span className="font-medium">No</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Smoker</span>
                      <span className="font-medium">No</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Recommendations</h4>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <h5 className="font-medium text-sm">Lower Your Cholesterol</h5>
                        <p className="text-sm text-neutral-600">Your total cholesterol is slightly elevated. Consider dietary changes and regular exercise.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <h5 className="font-medium text-sm">Blood Pressure Control</h5>
                        <p className="text-sm text-neutral-600">Your blood pressure is well-controlled. Continue monitoring regularly.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <h5 className="font-medium text-sm">Smoking Status</h5>
                        <p className="text-sm text-neutral-600">Excellent choice to remain a non-smoker. This significantly reduces your risk.</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" className="w-full">Print Risk Assessment</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col items-start">
              <p className="text-sm text-neutral-600">This risk calculator is based on the Framingham Heart Study and is for informational purposes only. Always consult with your healthcare provider for medical advice.</p>
              <div className="w-full flex justify-between mt-4">
                <Button variant="outline">Try Other Risk Calculators</Button>
                <Button>Update Your Data</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
