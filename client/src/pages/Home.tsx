import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  User, 
  Globe, 
  Shield, 
  Clipboard, 
  Building, 
  AlertTriangle, 
  ChevronRight,
  Heart
} from "lucide-react";

export default function Home() {
  const preventionTypes = [
    {
      icon: Globe,
      title: "Primordial Prevention",
      description: "Create a healthy environment and promote wellness before risk factors develop",
      path: "/primordial-prevention",
      color: "bg-sky-100 text-sky-600",
      alert: true
    },
    {
      icon: Shield,
      title: "Primary Prevention",
      description: "Prevent disease onset through proactive interventions",
      path: "/primary-prevention",
      color: "bg-emerald-100 text-emerald-600",
      alert: true
    },
    {
      icon: Clipboard,
      title: "Secondary Prevention",
      description: "Early detection and timely intervention in asymptomatic stages",
      path: "/secondary-prevention",
      color: "bg-amber-100 text-amber-600",
      alert: false
    },
    {
      icon: Building,
      title: "Tertiary Prevention",
      description: "Managing established diseases to improve quality of life",
      path: "/tertiary-prevention",
      color: "bg-indigo-100 text-indigo-600",
      alert: false
    },
    {
      icon: AlertTriangle,
      title: "Quaternary Prevention",
      description: "Protecting patients from unnecessary or harmful medical interventions",
      path: "/quaternary-prevention",
      color: "bg-rose-100 text-rose-600",
      alert: false
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Banner */}
      <div className="mb-8 bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 p-8 text-white">
          <h1 className="text-3xl md:text-4xl font-bold font-heading mb-4">Welcome to CareLens</h1>
          <p className="text-lg opacity-90 mb-6 max-w-2xl">
            Your comprehensive preventive healthcare platform to enhance wellness 
            and reduce health risks at every stage of life.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild variant="secondary" size="lg" className="font-medium">
              <Link href="/user-profile">
                View Profile <User className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/10 text-white border-white/20 hover:bg-white/20 font-medium">
              <Link href="/primordial-prevention">
                Get Started <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold font-heading mb-4 text-neutral-900">Recent Alerts</h2>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="space-y-4">
            <div className="flex items-start p-3 rounded-md bg-amber-50 border border-amber-200">
              <div className="text-amber-500 mr-3 mt-1">
                <Heart className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-neutral-900">COVID-19 Booster</h3>
                <p className="text-sm text-neutral-600">Your COVID-19 booster is recommended as soon as possible</p>
              </div>
              <Button size="sm" variant="outline" className="shrink-0">
                <Link href="/primary-prevention">View</Link>
              </Button>
            </div>
            
            <div className="flex items-start p-3 rounded-md bg-sky-50 border border-sky-200">
              <div className="text-sky-500 mr-3 mt-1">
                <Heart className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-neutral-900">Step Goal Progress</h3>
                <p className="text-sm text-neutral-600">You're 80% to your daily step goal!</p>
              </div>
              <Button size="sm" variant="outline" className="shrink-0">
                <Link href="/primordial-prevention">View</Link>
              </Button>
            </div>
            
            <div className="flex items-start p-3 rounded-md bg-emerald-50 border border-emerald-200">
              <div className="text-emerald-500 mr-3 mt-1">
                <Heart className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-neutral-900">Blood Pressure Check</h3>
                <p className="text-sm text-neutral-600">Blood pressure check is recommended this month</p>
              </div>
              <Button size="sm" variant="outline" className="shrink-0">
                <Link href="/secondary-prevention">View</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Prevention Types */}
      <div>
        <h2 className="text-2xl font-bold font-heading mb-4 text-neutral-900">Prevention Levels</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {preventionTypes.map((type) => (
            <Card key={type.title} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg ${type.color}`}>
                    <type.icon className="h-6 w-6" />
                  </div>
                  <h3 className="ml-3 font-semibold text-neutral-900">{type.title}</h3>
                  {type.alert && <Heart className="ml-2 h-5 w-5 text-primary animate-pulse" />}
                </div>
                <p className="text-neutral-600 mb-4 text-sm">{type.description}</p>
                <Button asChild variant="outline" className="w-full">
                  <Link href={type.path}>
                    Explore {type.title.split(' ')[0]} Prevention
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
