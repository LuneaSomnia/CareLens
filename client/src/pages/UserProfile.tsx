import { useState } from "react";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Camera, 
  User as UserIcon 
} from "lucide-react";
import BasicInfo from "@/pages/UserProfile/BasicInfo";
import HealthBackground from "@/pages/UserProfile/HealthBackground";
import LifestyleData from "@/pages/UserProfile/LifestyleData";
import Settings from "@/pages/UserProfile/Settings";

const tabItems = [
  { id: "basic-info", label: "Basic Information", component: BasicInfo },
  { id: "health-background", label: "Health Background", component: HealthBackground },
  { id: "lifestyle-data", label: "Lifestyle Data", component: LifestyleData },
  { id: "settings", label: "Settings", component: Settings }
];

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("basic-info");

  return (
    <div className="max-w-6xl mx-auto">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-neutral-900 font-heading sm:text-3xl">User Profile</h2>
          <p className="mt-1 text-sm text-neutral-600">Manage your personal information and health profile</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 p-6 border-r border-neutral-200">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="h-32 w-32 rounded-full bg-primary-600 text-white flex items-center justify-center text-4xl font-medium">
                  JS
                </div>
                <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md border border-neutral-200">
                  <Camera className="h-5 w-5 text-primary" />
                </button>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-neutral-900">John Smith</h3>
              <p className="text-neutral-600 text-sm">43 years old • Male</p>
              <div className="mt-6 space-y-2 w-full">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Profile completion</span>
                  <span className="text-primary font-medium">85%</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="text-sm font-medium text-neutral-600 uppercase tracking-wide mb-3">Profile Sections</h4>
              <nav className="space-y-1">
                {tabItems.map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full block px-3 py-2 rounded-md text-left ${
                      activeTab === item.id 
                        ? "bg-neutral-50 text-primary font-medium" 
                        : "text-neutral-600 hover:bg-neutral-50 hover:text-primary"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
          <div className="md:w-2/3 p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsContent value="basic-info">
                <BasicInfo />
              </TabsContent>
              <TabsContent value="health-background">
                <HealthBackground />
              </TabsContent>
              <TabsContent value="lifestyle-data">
                <LifestyleData />
              </TabsContent>
              <TabsContent value="settings">
                <Settings />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
