import { useState, useEffect } from "react";
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
  ShieldCheck, 
  Heart, 
  Award,
  FileText, 
  Bell, 
  User as UserIcon,
  Camera
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import UserAvatar from "@/components/UserAvatar";
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

  // Mock data for user stats
  const [userStats, setUserStats] = useState({
    profileCompletion: 85,
    totalScreenings: 12,
    achievementCount: 7,
    healthScore: 82,
    streakDays: 14,
    moduleCompleted: 5,
    upcomingAppointments: 2,
    healthGoalsAchieved: 3,
  });

  // Mock data for achievements
  const achievements = [
    { id: 1, title: "Health Explorer", description: "Completed health profile setup", icon: FileText, date: "2023-01-15" },
    { id: 2, title: "Prevention Pioneer", description: "Followed all screening recommendations", icon: ShieldCheck, date: "2023-02-28" },
    { id: 3, title: "Wellness Warrior", description: "Maintained streak for 2 weeks", icon: Award, date: "2023-03-10" },
    { id: 4, title: "Knowledge Seeker", description: "Completed 5 educational modules", icon: FileText, date: "2023-03-22" },
    { id: 5, title: "Health Champion", description: "Reached health score of 80+", icon: Heart, date: "2023-04-05" },
  ];

  // Mock data for notifications
  const notifications = [
    { id: 1, title: "Blood Pressure Check Due", description: "Schedule your screening this month", type: "reminder" },
    { id: 2, title: "New Module Available", description: "Learn about heart health in our new course", type: "update" },
    { id: 3, title: "Achievement Unlocked", description: "You've earned the Wellness Warrior badge!", type: "achievement" },
  ];

  // Toggle for user achievements and notifications
  const [showAchievements, setShowAchievements] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

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
              <UserAvatar 
                name="John Smith" 
                size="xl" 
                editable={true} 
              />
              <h3 className="mt-4 text-xl font-semibold text-neutral-900">John Smith</h3>
              <p className="text-neutral-600 text-sm">43 years old • Male</p>
              
              <div className="mt-4 flex gap-2">
                <Badge variant="outline" className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border-emerald-200">
                  <Heart className="mr-1 h-3 w-3" /> Health Score: {userStats.healthScore}
                </Badge>
                <Badge variant="outline" className="bg-amber-50 text-amber-600 hover:bg-amber-100 border-amber-200">
                  <Award className="mr-1 h-3 w-3" /> {userStats.achievementCount} Achievements
                </Badge>
              </div>
              
              <div className="mt-6 space-y-2 w-full">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Profile completion</span>
                  <span className="text-primary font-medium">{userStats.profileCompletion}%</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: `${userStats.profileCompletion}%` }}></div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 w-full">
                <Card className="bg-neutral-50">
                  <CardContent className="p-3 text-center">
                    <p className="text-2xl font-bold text-primary">{userStats.streakDays}</p>
                    <p className="text-xs text-neutral-600">Day Streak</p>
                  </CardContent>
                </Card>
                <Card className="bg-neutral-50">
                  <CardContent className="p-3 text-center">
                    <p className="text-2xl font-bold text-primary">{userStats.moduleCompleted}</p>
                    <p className="text-xs text-neutral-600">Modules Completed</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-4 w-full">
                <div className="flex justify-between items-center mb-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowAchievements(!showAchievements)}
                    className="text-sm w-full justify-between"
                  >
                    <span className="flex items-center">
                      <Award className="mr-2 h-4 w-4 text-amber-500" /> 
                      Achievements
                    </span>
                    <span>{achievements.length}</span>
                  </Button>
                </div>
                
                {showAchievements && (
                  <div className="mt-2 space-y-2 max-h-40 overflow-y-auto pr-1">
                    {achievements.slice(0, 3).map((achievement) => (
                      <div key={achievement.id} className="flex items-start p-2 rounded-md bg-neutral-50 border border-neutral-200">
                        <achievement.icon className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                        <div className="ml-2">
                          <p className="text-sm font-medium text-neutral-900">{achievement.title}</p>
                          <p className="text-xs text-neutral-600">{achievement.description}</p>
                        </div>
                      </div>
                    ))}
                    {achievements.length > 3 && (
                      <Button variant="ghost" size="sm" className="w-full text-xs">
                        View All Achievements
                      </Button>
                    )}
                  </div>
                )}
                
                <div className="flex justify-between items-center mb-2 mt-3">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="text-sm w-full justify-between"
                  >
                    <span className="flex items-center">
                      <Bell className="mr-2 h-4 w-4 text-sky-500" /> 
                      Notifications
                    </span>
                    <span>{notifications.length}</span>
                  </Button>
                </div>
                
                {showNotifications && (
                  <div className="mt-2 space-y-2 max-h-40 overflow-y-auto pr-1">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="flex items-start p-2 rounded-md bg-neutral-50 border border-neutral-200">
                        <Bell className="h-5 w-5 text-sky-500 mt-0.5 flex-shrink-0" />
                        <div className="ml-2">
                          <p className="text-sm font-medium text-neutral-900">{notification.title}</p>
                          <p className="text-xs text-neutral-600">{notification.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
