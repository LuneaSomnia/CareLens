import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusDataCard } from "@/components/ui/data-card";
import {
  Activity,
  AlertCircle,
  BarChart3,
  Beaker,
  Heart
} from "lucide-react";
import AlertHeart from "@/components/AlertHeart";

export default function PrimaryPrevention() {
  // Vaccination data
  const vaccines = [
    {
      name: "Influenza (Flu)",
      date: "Oct 15, 2022",
      status: "up_to_date",
      nextDue: "Oct 2023"
    },
    {
      name: "Tdap (Tetanus, Diphtheria, Pertussis)",
      date: "Jun 22, 2018",
      status: "up_to_date",
      nextDue: "Jun 2028"
    },
    {
      name: "COVID-19",
      date: "Mar 05, 2022",
      status: "due_soon",
      nextDue: "Now"
    },
    {
      name: "Pneumococcal",
      date: "Not received",
      status: "not_applicable",
      nextDue: "2042"
    }
  ];

  // Health screenings data
  const screenings = [
    {
      id: 1,
      type: "Comprehensive Physical Exam",
      frequency: "Yearly",
      lastDate: "March 10, 2023",
      status: "up_to_date",
      action: "View Report"
    },
    {
      id: 2,
      type: "Colonoscopy",
      frequency: "Every 10 years (45+)",
      lastDate: "Not yet done",
      status: "due_soon",
      action: "Learn More"
    },
    {
      id: 3,
      type: "Skin Cancer Screening",
      frequency: "Yearly",
      lastDate: "May 17, 2022",
      status: "overdue",
      action: "Schedule"
    },
    {
      id: 4,
      type: "Eye Exam",
      frequency: "Every 2 years",
      lastDate: "September 3, 2021",
      status: "due_soon",
      action: "Schedule"
    }
  ];

  // Health goals data
  const healthGoals = [
    {
      title: "10,000 Daily Steps",
      description: "Increase daily physical activity to improve heart health",
      status: "in_progress",
      progress: 72,
      currentValue: "7,245",
      averageValue: "8,320",
      targetValue: "10,000"
    },
    {
      title: "Lower Cholesterol by 15%",
      description: "Reduce cholesterol through dietary changes and exercise",
      status: "starting",
      progress: 5,
      startValue: "210 mg/dL",
      currentValue: "205 mg/dL",
      targetValue: "178 mg/dL"
    },
    {
      title: "Improve Sleep Quality",
      description: "Develop a consistent sleep schedule and better pre-sleep routine",
      status: "in_progress",
      progress: 45,
      startValue: "5.5 hrs",
      currentValue: "6.5 hrs",
      targetValue: "7.5 hrs"
    }
  ];

  // Map status to styles
  const statusClasses = {
    up_to_date: "bg-success bg-opacity-20 text-success",
    due_soon: "bg-warning bg-opacity-20 text-warning",
    overdue: "bg-error bg-opacity-20 text-error",
    not_applicable: "bg-neutral-100 text-neutral-600"
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-neutral-900 font-heading sm:text-3xl">Primary Prevention</h2>
          <p className="mt-1 text-sm text-neutral-600">Prevent disease onset through proactive interventions</p>
        </div>
      </div>

      {/* Immunization and Vaccinations */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle>Immunization and Vaccination Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/3">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-neutral-200">
                  <thead>
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">Vaccine</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">Date Received</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">Next Due</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-neutral-200">
                    {vaccines.map((vaccine, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">{vaccine.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">{vaccine.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[vaccine.status as keyof typeof statusClasses]}`}>
                            {vaccine.status === "up_to_date" 
                              ? "Up to date" 
                              : vaccine.status === "due_soon" 
                              ? "Booster recommended" 
                              : vaccine.status === "overdue" 
                              ? "Overdue"
                              : "Recommended at 65+"}
                          </span>
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${vaccine.nextDue === "Now" ? "text-error font-medium" : "text-neutral-600"}`}>
                          {vaccine.nextDue}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="md:w-1/3 md:ml-6 mt-6 md:mt-0">
              <Card className="bg-neutral-50 p-4 rounded-lg">
                <h4 className="font-medium text-neutral-900 mb-3">Upcoming Vaccinations</h4>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <AlertHeart className="flex-shrink-0 h-5 w-5 mt-0.5" />
                    <div className="ml-3">
                      <h5 className="text-sm font-medium text-neutral-900">COVID-19 Booster</h5>
                      <p className="text-xs text-neutral-600 mt-1">Recommended as soon as possible</p>
                      <Button variant="link" className="mt-2 h-auto p-0 text-xs">Schedule Now</Button>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <AlertCircle className="flex-shrink-0 h-5 w-5 mt-0.5 text-neutral-600" />
                    <div className="ml-3">
                      <h5 className="text-sm font-medium text-neutral-900">Flu Vaccine</h5>
                      <p className="text-xs text-neutral-600 mt-1">Due in October 2023</p>
                      <Button variant="link" className="mt-2 h-auto p-0 text-xs">Set Reminder</Button>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <Button className="w-full">
                    Upload Vaccination Records
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preventive Health Screenings */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle>Preventive Health Screenings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatusDataCard
              title="Blood Pressure"
              value="118/78"
              status="up_to_date"
              date="March 10, 2023"
              icon={<Activity className="h-8 w-8 text-primary" />}
              nextCheck="September 2023"
            />

            <StatusDataCard
              title="Cholesterol"
              value="210 mg/dL"
              status="overdue"
              date="January 15, 2022"
              icon={<Beaker className="h-8 w-8 text-primary" />}
            />

            <StatusDataCard
              title="Blood Glucose"
              value="105 mg/dL"
              status="due_soon"
              date="August 23, 2022"
              icon={<BarChart3 className="h-8 w-8 text-primary" />}
              nextCheck="This month"
            />
          </div>

          <div className="mt-6">
            <h4 className="text-md font-medium text-neutral-900 mb-4">Recommended Screenings Based on Your Profile</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead>
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">Screening Type</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">Frequency</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">Last Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {screenings.map((screening) => (
                    <tr key={screening.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">{screening.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">{screening.frequency}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">{screening.lastDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          screening.status === "up_to_date" 
                            ? statusClasses.up_to_date 
                            : screening.status === "due_soon" 
                            ? statusClasses.due_soon 
                            : statusClasses.overdue
                        }`}>
                          {screening.status === "up_to_date" 
                            ? "Up to date" 
                            : screening.status === "due_soon" 
                            ? "Recommended" 
                            : "Overdue"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-primary">
                        <Button variant="link" className="p-0 h-auto font-medium">
                          {screening.action}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Health Goals */}
      <Card>
        <CardHeader className="flex-row flex items-center justify-between pb-2">
          <CardTitle>Health Goals</CardTitle>
          <Button>Add New Goal</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {healthGoals.map((goal, index) => (
              <Card key={index} className="border border-neutral-200 p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-neutral-900">{goal.title}</h4>
                    <p className="text-sm text-neutral-600 mt-1">{goal.description}</p>
                  </div>
                  <div className="flex items-center">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      goal.status === "in_progress" 
                        ? "bg-success bg-opacity-20 text-success" 
                        : "bg-warning bg-opacity-20 text-warning"
                    }`}>
                      {goal.status === "in_progress" ? "In Progress" : "Getting Started"}
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-neutral-600">Progress</span>
                    <span className="text-neutral-900 font-medium">{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div 
                      className={`${goal.progress < 10 ? "bg-warning" : "bg-success"} h-2 rounded-full`} 
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>
                <div className="mt-4 flex text-sm">
                  <div className="flex-1">
                    <p className="text-neutral-600">
                      {index === 0 ? "Today's steps" : "Starting level"}
                    </p>
                    <p className="text-neutral-900 font-mono font-medium">
                      {index === 0 ? goal.currentValue : goal.startValue}
                    </p>
                  </div>
                  <div className="flex-1">
                    <p className="text-neutral-600">
                      {index === 0 ? "7-day average" : "Current level"}
                    </p>
                    <p className="text-neutral-900 font-mono font-medium">
                      {index === 0 ? goal.averageValue : goal.currentValue}
                    </p>
                  </div>
                  <div className="flex-1">
                    <p className="text-neutral-600">Goal</p>
                    <p className="text-neutral-900 font-mono font-medium">{goal.targetValue}</p>
                  </div>
                </div>
                {index === 1 && (
                  <div className="mt-4">
                    <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary-50">
                      View Action Plan
                    </Button>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
