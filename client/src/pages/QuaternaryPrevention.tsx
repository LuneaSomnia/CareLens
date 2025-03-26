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
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TokenizedInput } from "@/components/ui/tokenized-input";
import { 
  AlertTriangle, 
  Search,
  BookOpen,
  PlusCircle,
  Pill,
  CheckCircle2,
  BarChart2,
  XCircle,
  FileQuestion,
  ArrowRight,
  Scale,
  UserCog,
  ScreenShare,
  HelpCircle,
  BadgeAlert,
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Eye,
  Flag,
  Download,
  ChevronRight
} from "lucide-react";

export default function QuaternaryPrevention() {
  const [medicationTags, setMedicationTags] = useState<string[]>(["Metoprolol", "Simvastatin"]);
  const [sideEffectTags, setSideEffectTags] = useState<string[]>([]);
  
  // Mock data for medication review
  const medications = [
    { id: 1, name: "Metoprolol", dosage: "50mg", frequency: "Twice daily", purpose: "Beta-blocker for blood pressure", flagged: true, notes: "Potential for duplicate therapy with other antihypertensives" },
    { id: 2, name: "Simvastatin", dosage: "20mg", frequency: "Once daily", purpose: "Cholesterol management", flagged: false, notes: "" },
    { id: 3, name: "Lisinopril", dosage: "10mg", frequency: "Once daily", purpose: "ACE inhibitor for blood pressure", flagged: true, notes: "Potential for duplicate therapy with other antihypertensives" },
    { id: 4, name: "Aspirin", dosage: "81mg", frequency: "Once daily", purpose: "Blood thinner", flagged: false, notes: "" }
  ];

  const reviewHistory = [
    { id: 1, date: "Feb 15, 2025", reviewer: "Dr. Johnson", recommendations: "Consolidate blood pressure medications - consider stopping Lisinopril and monitoring response", status: "Pending" },
    { id: 2, date: "Jan 05, 2025", reviewer: "Dr. Smith", recommendations: "No changes recommended at this time", status: "Completed" }
  ];

  // Mock data for risk-benefit tools
  const proposedInterventions = [
    { 
      id: 1, 
      name: "Coronary Calcium Scan", 
      category: "Diagnostic Test",
      recommendation: "Discussed", 
      risk_score: 2,
      benefit_score: 4,
      risks: ["Radiation exposure", "False positives leading to unnecessary follow-up tests"],
      benefits: ["May detect early coronary calcification", "Can guide preventive therapy", "Non-invasive procedure"]
    },
    { 
      id: 2, 
      name: "Statin Therapy Intensification", 
      category: "Medication",
      recommendation: "Consider", 
      risk_score: 3,
      benefit_score: 4,
      risks: ["Increased risk of muscle pain/damage", "Elevated liver enzymes", "Potential drug interactions"],
      benefits: ["Further reduction in LDL cholesterol", "Reduced cardiovascular event risk", "Well-studied safety profile"]
    }
  ];

  const suggestedSideEffects = [
    "Nausea", "Dizziness", "Headache", "Fatigue", "Muscle pain", 
    "Joint pain", "Rash", "Itching", "Shortness of breath", "Swelling",
    "Insomnia", "Anxiety", "Depression", "Confusion", "Memory issues"
  ];

  // Mock data for educational resources
  const resources = [
    { id: 1, title: "Understanding Overdiagnosis", type: "Article", length: "10 min read", rating: 4.8, tags: ["screening", "cancer", "overdiagnosis"] },
    { id: 2, title: "When More Care Is Not Better Care", type: "Video", length: "15 min", rating: 4.5, tags: ["unnecessary tests", "healthcare costs"] },
    { id: 3, title: "Medication Deprescribing Guide", type: "Guide", length: "12 pages", rating: 4.7, tags: ["medications", "polypharmacy", "elderly care"] },
    { id: 4, title: "Shared Decision Making Process", type: "Infographic", length: "1 page", rating: 4.9, tags: ["patient empowerment", "communication"] }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-neutral-900 font-heading sm:text-3xl">Quaternary Prevention</h2>
          <p className="mt-1 text-sm text-neutral-600">Protecting patients from unnecessary or harmful medical interventions</p>
        </div>
      </div>

      <Tabs defaultValue="medication-review" className="mb-8">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
          <TabsTrigger value="medication-review" className="flex items-center">
            <Pill className="h-4 w-4 mr-2" />
            Medication Review
          </TabsTrigger>
          <TabsTrigger value="risk-benefit" className="flex items-center">
            <Scale className="h-4 w-4 mr-2" />
            Risk-Benefit Tools
          </TabsTrigger>
          <TabsTrigger value="adverse-events" className="flex items-center">
            <BadgeAlert className="h-4 w-4 mr-2" />
            Adverse Events
          </TabsTrigger>
          <TabsTrigger value="education" className="flex items-center">
            <BookOpen className="h-4 w-4 mr-2" />
            Education
          </TabsTrigger>
        </TabsList>
        
        {/* Medication Review Tab */}
        <TabsContent value="medication-review">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Current Medications</CardTitle>
                  <CardDescription>Review your medications for potential issues</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {medications.map(med => (
                      <div key={med.id} className={`border ${med.flagged ? 'border-amber-300 bg-amber-50' : 'border-neutral-200'} rounded-md p-4`}>
                        <div className="flex justify-between items-start">
                          <div className="flex items-start">
                            <div className={`rounded-full p-2 ${med.flagged ? 'bg-amber-100' : 'bg-blue-100'} mr-3`}>
                              <Pill className={`h-5 w-5 ${med.flagged ? 'text-amber-600' : 'text-blue-600'}`} />
                            </div>
                            <div>
                              <h4 className="font-medium">{med.name} ({med.dosage})</h4>
                              <p className="text-sm text-neutral-600">{med.frequency} • {med.purpose}</p>
                            </div>
                          </div>
                          {med.flagged && (
                            <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                              <AlertTriangle className="h-3 w-3 mr-1" /> 
                              Review Suggested
                            </Badge>
                          )}
                        </div>
                        
                        {med.flagged && med.notes && (
                          <div className="mt-3 ml-10 p-2 bg-amber-100 text-amber-800 text-sm rounded">
                            <p><span className="font-medium">Note:</span> {med.notes}</p>
                          </div>
                        )}
                        
                        <div className="mt-3 flex justify-end space-x-2">
                          <Button variant="outline" size="sm">Details</Button>
                          <Button variant={med.flagged ? "default" : "outline"} size="sm">
                            {med.flagged ? "Review" : "Edit"}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Add Medication for Review</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <Label>Medication Name</Label>
                        <TokenizedInput 
                          tokens={medicationTags} 
                          onTokensChange={setMedicationTags}
                          placeholder="Enter medication name..."
                          className="mt-1"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="dosage">Dosage</Label>
                          <Input id="dosage" placeholder="e.g., 25mg" className="mt-1" />
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
                      
                      <div>
                        <Label htmlFor="purpose">Purpose/Reason</Label>
                        <Input id="purpose" placeholder="What is this medication for?" className="mt-1" />
                      </div>
                      
                      <div>
                        <Label htmlFor="concerns">Any Concerns?</Label>
                        <Textarea id="concerns" placeholder="Do you have any questions or concerns about this medication?" className="mt-1" />
                      </div>
                      
                      <Button className="w-full">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add for Review
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Professional Review</CardTitle>
                  <CardDescription>Request a review from healthcare providers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <RadioGroup defaultValue="pharmacist">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pharmacist" id="pharmacist" />
                        <Label htmlFor="pharmacist">Pharmacist Review</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="doctor" id="doctor" />
                        <Label htmlFor="doctor">Primary Care Provider</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="both" id="both" />
                        <Label htmlFor="both">Both (Recommended)</Label>
                      </div>
                    </RadioGroup>
                    
                    <div className="pt-4">
                      <Button className="w-full">Request Medication Review</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Review History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reviewHistory.map(review => (
                      <div key={review.id} className="border-b pb-3 last:border-b-0 last:pb-0">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{review.date}</h4>
                          <Badge variant={review.status === "Pending" ? "outline" : "secondary"}>
                            {review.status}
                          </Badge>
                        </div>
                        <p className="text-sm mt-1">Reviewer: {review.reviewer}</p>
                        <p className="text-sm text-neutral-600 mt-2">{review.recommendations}</p>
                        <div className="mt-2">
                          <Button variant="ghost" size="sm" className="h-7 text-xs">
                            View Full Report
                            <ChevronRight className="h-3 w-3 ml-1" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Alert className="bg-blue-50 border-blue-200">
                <HelpCircle className="h-4 w-4 text-blue-600" />
                <AlertTitle className="text-blue-800">Why review medications?</AlertTitle>
                <AlertDescription className="text-blue-800">
                  Regular medication reviews can identify unnecessary medications, potential interactions, and opportunities to simplify your regimen.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </TabsContent>
        
        {/* Risk-Benefit Analysis Tab */}
        <TabsContent value="risk-benefit">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Proposed Interventions Analysis</CardTitle>
                <CardDescription>Evaluate the risks and benefits of recommended tests and treatments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {proposedInterventions.map(intervention => (
                    <div key={intervention.id} className="border rounded-md overflow-hidden">
                      <div className="bg-neutral-50 p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-lg">{intervention.name}</h3>
                            <Badge variant="outline" className="mt-1">{intervention.category}</Badge>
                          </div>
                          <Badge className={
                            intervention.recommendation === "Recommended" ? "bg-green-100 text-green-800 hover:bg-green-100" :
                            intervention.recommendation === "Consider" ? "bg-blue-100 text-blue-800 hover:bg-blue-100" :
                            "bg-neutral-100 text-neutral-800 hover:bg-neutral-100"
                          }>
                            {intervention.recommendation}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <div className="flex justify-between mb-6">
                          <div className="w-1/2 pr-4">
                            <h4 className="font-medium mb-2 flex items-center text-red-700">
                              <XCircle className="h-4 w-4 mr-2" />
                              Potential Risks
                            </h4>
                            <ul className="space-y-2">
                              {intervention.risks.map((risk, index) => (
                                <li key={index} className="flex items-start">
                                  <span className="text-red-500 mr-2">•</span>
                                  <span className="text-sm">{risk}</span>
                                </li>
                              ))}
                            </ul>
                            <div className="mt-4">
                              <div className="flex justify-between mb-1 text-sm">
                                <span>Risk Level</span>
                                <span>{
                                  intervention.risk_score <= 1 ? "Very Low" :
                                  intervention.risk_score === 2 ? "Low" :
                                  intervention.risk_score === 3 ? "Moderate" :
                                  intervention.risk_score === 4 ? "High" : "Very High"
                                }</span>
                              </div>
                              <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-red-500" 
                                  style={{ width: `${intervention.risk_score * 20}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="w-1/2 pl-4 border-l">
                            <h4 className="font-medium mb-2 flex items-center text-green-700">
                              <CheckCircle2 className="h-4 w-4 mr-2" />
                              Potential Benefits
                            </h4>
                            <ul className="space-y-2">
                              {intervention.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-start">
                                  <span className="text-green-500 mr-2">•</span>
                                  <span className="text-sm">{benefit}</span>
                                </li>
                              ))}
                            </ul>
                            <div className="mt-4">
                              <div className="flex justify-between mb-1 text-sm">
                                <span>Benefit Level</span>
                                <span>{
                                  intervention.benefit_score <= 1 ? "Very Low" :
                                  intervention.benefit_score === 2 ? "Low" :
                                  intervention.benefit_score === 3 ? "Moderate" :
                                  intervention.benefit_score === 4 ? "High" : "Very High"
                                }</span>
                              </div>
                              <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-green-500" 
                                  style={{ width: `${intervention.benefit_score * 20}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-neutral-50 p-3 rounded-md">
                          <h4 className="font-medium text-sm mb-2">Risk-Benefit Assessment</h4>
                          <div className="h-4 bg-neutral-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${intervention.benefit_score > intervention.risk_score ? 'bg-green-500' : 'bg-amber-500'}`}
                              style={{ width: `${(intervention.benefit_score / (intervention.benefit_score + intervention.risk_score)) * 100}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between mt-1">
                            <span className="text-xs text-neutral-600">Higher Risk</span>
                            <span className="text-xs text-neutral-600">Higher Benefit</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex justify-between">
                          <Button variant="outline">Request More Information</Button>
                          <Button>Discuss With Provider</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Decision Aid Tools</CardTitle>
                  <CardDescription>Interactive tools to help with medical decisions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-md hover:bg-neutral-50 cursor-pointer">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          <BarChart2 className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Cholesterol Treatment</h4>
                          <p className="text-sm text-neutral-600">Compare statin options based on your risk factors</p>
                        </div>
                        <ChevronRight className="h-5 w-5 ml-auto text-neutral-400" />
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-md hover:bg-neutral-50 cursor-pointer">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          <FileQuestion className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">PSA Screening</h4>
                          <p className="text-sm text-neutral-600">Understand the pros and cons of prostate cancer screening</p>
                        </div>
                        <ChevronRight className="h-5 w-5 ml-auto text-neutral-400" />
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-md hover:bg-neutral-50 cursor-pointer">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          <UserCog className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Knee Osteoarthritis</h4>
                          <p className="text-sm text-neutral-600">Compare surgery vs. conservative management</p>
                        </div>
                        <ChevronRight className="h-5 w-5 ml-auto text-neutral-400" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Shared Decision Making</CardTitle>
                  <CardDescription>Prepare for discussions with your healthcare provider</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-neutral-50 rounded-md mb-4">
                    <h4 className="font-medium mb-2">Key Questions to Ask</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-primary mr-2">1.</span>
                        <span>What are the potential benefits of this test/treatment?</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">2.</span>
                        <span>What are the possible risks or side effects?</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">3.</span>
                        <span>What happens if I choose to wait or do nothing?</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">4.</span>
                        <span>Are there alternative options I should consider?</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">5.</span>
                        <span>How will this impact my quality of life?</span>
                      </li>
                    </ul>
                  </div>
                  
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download Decision Guide
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* Adverse Events Tab */}
        <TabsContent value="adverse-events">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Report Adverse Event</CardTitle>
                  <CardDescription>Report side effects or negative outcomes from treatments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label>Treatment or Medication</Label>
                      <TokenizedInput 
                        tokens={medicationTags} 
                        onTokensChange={setMedicationTags}
                        placeholder="Enter medication or treatment name..."
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label>Side Effects Experienced</Label>
                      <TokenizedInput 
                        tokens={sideEffectTags} 
                        onTokensChange={setSideEffectTags}
                        suggestions={suggestedSideEffects}
                        placeholder="Enter side effects..."
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="severity">Severity</Label>
                      <select id="severity" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1">
                        <option value="">Select severity</option>
                        <option value="mild">Mild - Noticeable but doesn't affect daily activities</option>
                        <option value="moderate">Moderate - Affects some daily activities</option>
                        <option value="severe">Severe - Significantly affects daily activities</option>
                        <option value="very-severe">Very Severe - Required medical attention</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="onset">When did it start?</Label>
                      <Input id="onset" type="date" className="mt-1" />
                    </div>
                    
                    <div>
                      <Label htmlFor="duration">How long did it last?</Label>
                      <div className="grid grid-cols-2 gap-4 mt-1">
                        <Input id="duration-value" type="number" placeholder="Duration" min={1}/>
                        <select id="duration-unit" className="rounded-md border border-input bg-background px-3 py-2 text-sm">
                          <option value="hours">Hours</option>
                          <option value="days">Days</option>
                          <option value="weeks">Weeks</option>
                          <option value="ongoing">Still ongoing</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="details">Additional Details</Label>
                      <Textarea id="details" placeholder="Provide any additional details about your experience..." className="mt-1" />
                    </div>
                    
                    <div className="pt-2">
                      <Checkbox id="share-data" />
                      <label htmlFor="share-data" className="ml-2 text-sm text-neutral-600">
                        I consent to sharing this information anonymously to help others
                      </label>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Submit Report</Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>How This Helps</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="rounded-full bg-green-100 p-1.5 mr-3 mt-0.5">
                        <Eye className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Identifies Patterns</h4>
                        <p className="text-xs text-neutral-600 mt-1">Your reports help identify patterns of adverse events that might not be detected in clinical trials.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="rounded-full bg-green-100 p-1.5 mr-3 mt-0.5">
                        <ScreenShare className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Improves Safety</h4>
                        <p className="text-xs text-neutral-600 mt-1">Collective reporting can lead to improved safety information and updates to treatment guidelines.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="rounded-full bg-green-100 p-1.5 mr-3 mt-0.5">
                        <Flag className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Informs Others</h4>
                        <p className="text-xs text-neutral-600 mt-1">Your experiences help others make more informed decisions about their care.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Alert className="bg-blue-50 border-blue-200">
                <HelpCircle className="h-4 w-4 text-blue-600" />
                <AlertTitle className="text-blue-800">Privacy Protected</AlertTitle>
                <AlertDescription className="text-blue-800">
                  All reports are anonymized. Personal information is never shared with other users or third parties.
                </AlertDescription>
              </Alert>
              
              <Card>
                <CardHeader>
                  <CardTitle>Community Insights</CardTitle>
                  <CardDescription>Anonymized data from user reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="border-b pb-3">
                      <h4 className="text-sm font-medium">Simvastatin</h4>
                      <div className="mt-2 flex items-center justify-between text-xs">
                        <span>Muscle Pain</span>
                        <span className="text-neutral-600">18% of reports</span>
                      </div>
                      <div className="h-1.5 bg-neutral-100 rounded-full mt-1">
                        <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: "18%" }}></div>
                      </div>
                    </div>
                    
                    <div className="border-b pb-3">
                      <h4 className="text-sm font-medium">Metformin</h4>
                      <div className="mt-2 flex items-center justify-between text-xs">
                        <span>Digestive Issues</span>
                        <span className="text-neutral-600">32% of reports</span>
                      </div>
                      <div className="h-1.5 bg-neutral-100 rounded-full mt-1">
                        <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: "32%" }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium">Lisinopril</h4>
                      <div className="mt-2 flex items-center justify-between text-xs">
                        <span>Dry Cough</span>
                        <span className="text-neutral-600">25% of reports</span>
                      </div>
                      <div className="h-1.5 bg-neutral-100 rounded-full mt-1">
                        <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: "25%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* Educational Resources Tab */}
        <TabsContent value="education">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="mb-6">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Educational Resources</CardTitle>
                    <div className="relative">
                      <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-neutral-500" />
                      <Input placeholder="Search resources..." className="pl-8 h-9" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {resources.map(resource => (
                      <div key={resource.id} className="border rounded-md overflow-hidden">
                        <div className="bg-neutral-50 p-3 flex justify-between items-center">
                          <div className="flex items-center">
                            <div className={`rounded-full p-2 mr-3 ${
                              resource.type === "Article" ? "bg-blue-100" : 
                              resource.type === "Video" ? "bg-red-100" :
                              resource.type === "Guide" ? "bg-green-100" : "bg-amber-100"
                            }`}>
                              {resource.type === "Article" ? (
                                <BookOpen className={`h-5 w-5 text-blue-600`} />
                              ) : resource.type === "Video" ? (
                                <ScreenShare className={`h-5 w-5 text-red-600`} />
                              ) : resource.type === "Guide" ? (
                                <FileQuestion className={`h-5 w-5 text-green-600`} />
                              ) : (
                                <BarChart2 className={`h-5 w-5 text-amber-600`} />
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium">{resource.title}</h4>
                              <div className="flex items-center text-sm text-neutral-600">
                                <Badge variant="outline" className="mr-2">{resource.type}</Badge>
                                <span>{resource.length}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1 text-amber-500">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="text-sm font-medium">{resource.rating}</span>
                          </div>
                        </div>
                        
                        <div className="p-3">
                          <div className="flex flex-wrap gap-1 mb-3">
                            {resource.tags.map((tag, index) => (
                              <span key={index} className="inline-block px-2 py-1 rounded-full bg-neutral-100 text-neutral-700 text-xs">
                                #{tag}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex justify-between">
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm" className="h-8">
                                <ThumbsUp className="h-4 w-4 mr-1" />
                                Helpful
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8">
                                <ThumbsDown className="h-4 w-4 mr-1" />
                                Not Helpful
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8">
                                <MessageSquare className="h-4 w-4 mr-1" />
                                Comment
                              </Button>
                            </div>
                            <Button variant="outline" size="sm" className="h-8">View Resource</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Featured Article</CardTitle>
                  <CardDescription>Understanding Quaternary Prevention: Protecting You from Overdiagnosis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <p>In modern healthcare, more isn't always better. Quaternary prevention focuses on protecting patients from unnecessary medical interventions that may cause more harm than good.</p>
                    
                    <h4>Key Concepts:</h4>
                    
                    <h5>Overdiagnosis</h5>
                    <p>Overdiagnosis occurs when a condition is diagnosed that would never have caused symptoms or harm. This can lead to unnecessary treatments with potential side effects.</p>
                    
                    <h5>Overtreatment</h5>
                    <p>Overtreatment happens when medical interventions provide little or no benefit but carry risks or burdens. Examples include prescribing antibiotics for viral infections or aggressive treatment for low-risk conditions.</p>
                    
                    <h5>Shared Decision Making</h5>
                    <p>This collaborative process between patients and providers ensures treatment decisions respect patient preferences, needs, and values while being grounded in scientific evidence.</p>
                    
                    <div className="not-prose mt-4">
                      <Button variant="outline" className="w-full">
                        Continue Reading
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Topics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 hover:bg-neutral-50 rounded cursor-pointer">
                      <span>Overdiagnosis</span>
                      <Badge>12 resources</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 hover:bg-neutral-50 rounded cursor-pointer">
                      <span>Medication Deprescribing</span>
                      <Badge>8 resources</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 hover:bg-neutral-50 rounded cursor-pointer">
                      <span>Shared Decision Making</span>
                      <Badge>15 resources</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 hover:bg-neutral-50 rounded cursor-pointer">
                      <span>Cancer Screening</span>
                      <Badge>10 resources</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 hover:bg-neutral-50 rounded cursor-pointer">
                      <span>Polypharmacy</span>
                      <Badge>6 resources</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Personalized Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-md hover:bg-neutral-50 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Statin Medications: Risk vs Benefit</h4>
                        <Badge variant="outline">Highly Relevant</Badge>
                      </div>
                      <p className="text-sm text-neutral-600 mt-1">Based on your medication list</p>
                    </div>
                    
                    <div className="p-3 border rounded-md hover:bg-neutral-50 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Blood Pressure Management</h4>
                        <Badge variant="outline">Recommended</Badge>
                      </div>
                      <p className="text-sm text-neutral-600 mt-1">Based on your health profile</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Alert className="bg-blue-50 border-blue-200">
                <BookOpen className="h-4 w-4 text-blue-600" />
                <AlertTitle className="text-blue-800">Discover Webinars</AlertTitle>
                <AlertDescription className="text-blue-800">
                  Join live educational sessions with medical experts on quaternary prevention topics.
                </AlertDescription>
                <Button variant="outline" size="sm" className="mt-2 w-full bg-white">
                  View Schedule
                </Button>
              </Alert>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
