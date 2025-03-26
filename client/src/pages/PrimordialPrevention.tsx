import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataCard, ProgressDataCard } from "@/components/ui/data-card";
import {
  Activity,
  AlertCircle,
  Moon,
  Scale,
  MapPin,
  Dumbbell,
  ShoppingCart,
  Users
} from "lucide-react";

export default function PrimordialPrevention() {
  // Educational modules data
  const educationalModules = [
    {
      title: "Nutrition Fundamentals",
      description: "Learn the basics of balanced nutrition and meal planning",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      progress: 40,
      completed: 2,
      total: 5,
      status: "in_progress"
    },
    {
      title: "Stress Management",
      description: "Techniques to reduce stress and improve mental well-being",
      image: "https://images.unsplash.com/photo-1465513010005-7aca575a0969?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      progress: 0,
      completed: 0,
      total: 4,
      status: "not_started"
    },
    {
      title: "Active Lifestyle",
      description: "Building sustainable exercise habits for long-term health",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      progress: 100,
      completed: 5,
      total: 5,
      status: "completed"
    }
  ];

  // Community forum posts
  const forumPosts = [
    {
      author: "Maria P.",
      authorInitials: "MP",
      time: "2 hours ago",
      title: "Best walking trails in the city?",
      content: "I'm looking for some nice walking trails in the city. Any recommendations for trails that are beginner-friendly and have good views?",
      likes: 12,
      replies: 8
    },
    {
      author: "Robert K.",
      authorInitials: "RK",
      time: "Yesterday",
      title: "Meal prep strategies for busy professionals",
      content: "Does anyone have tips for meal prepping healthy lunches for a busy work week? Looking for options that don't require reheating.",
      likes: 25,
      replies: 14
    },
    {
      author: "Alex T.",
      authorInitials: "AT",
      time: "3 days ago",
      title: "Morning meditation routine",
      content: "I've been trying to start a morning meditation routine. Anyone have suggestions for guided meditation apps or techniques that have worked for you?",
      likes: 18,
      replies: 20
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-neutral-900 font-heading sm:text-3xl">Primordial Prevention</h2>
          <p className="mt-1 text-sm text-neutral-600">Create a healthy environment and promote wellness before risk factors develop</p>
        </div>
      </div>

      {/* Wellness Dashboard */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle>Your Wellness Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <DataCard
              title="Physical Activity"
              value="7,245"
              subtitle="steps today"
              icon={<Activity className="h-8 w-8 text-success" />}
              iconClassName="bg-success bg-opacity-20"
            />

            <DataCard
              title="Stress Level"
              value="Medium"
              subtitle="based on recent logs"
              icon={<AlertCircle className="h-8 w-8 text-info" />}
              iconClassName="bg-info bg-opacity-20"
            />

            <DataCard
              title="Sleep Quality"
              value="6.5 hrs"
              subtitle="average last week"
              icon={<Moon className="h-8 w-8 text-primary" />}
              iconClassName="bg-primary bg-opacity-20"
            />

            <DataCard
              title="Nutrition"
              value="Good"
              subtitle="balanced diet logged"
              icon={<Scale className="h-8 w-8 text-secondary" />}
              iconClassName="bg-secondary bg-opacity-20"
            />
          </div>
        </CardContent>
      </Card>

      {/* Local Resources Map */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle>Local Wellness Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 md:h-80 bg-neutral-50 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center bg-neutral-900 bg-opacity-50">
              <div className="text-center text-white p-4">
                <MapPin className="h-16 w-16 mx-auto" />
                <p className="mt-2 font-medium text-lg">Interactive Map Coming Soon</p>
                <p className="text-sm">Discover parks, fitness centers, farmers markets and more in your area</p>
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="flex items-center justify-center">
              <MapPin className="h-5 w-5 mr-2" />
              Parks
            </Button>
            <Button className="flex items-center justify-center">
              <Dumbbell className="h-5 w-5 mr-2" />
              Fitness Centers
            </Button>
            <Button className="flex items-center justify-center">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Farmers Markets
            </Button>
            <Button className="flex items-center justify-center">
              <Users className="h-5 w-5 mr-2" />
              Community Events
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Educational Modules */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle>Educational Modules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {educationalModules.map((module, index) => (
              <Card key={index} className="border border-neutral-200 overflow-hidden flex flex-col">
                <div className="h-40 bg-primary-100">
                  <img src={module.image} alt={module.title} className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-4 flex-1 flex flex-col">
                  <h4 className="font-medium text-neutral-900">{module.title}</h4>
                  <p className="text-sm text-neutral-600 mt-1">{module.description}</p>
                  <div className="mt-2 text-xs text-neutral">
                    <span className="flex items-center">
                      {module.status === "completed" ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : module.status === "in_progress" ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      {module.completed}/{module.total} modules completed
                    </span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-1.5 mt-2">
                    <div className={`${module.status === "not_started" ? "bg-warning" : "bg-success"} h-1.5 rounded-full`} style={{ width: `${module.progress}%` }}></div>
                  </div>
                  <Button className="mt-4" variant={module.status === "completed" ? "outline" : "default"}>
                    {module.status === "not_started"
                      ? "Start Module"
                      : module.status === "in_progress"
                      ? "Continue Learning"
                      : "Review Module"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Community Forum */}
      <Card>
        <CardHeader className="flex-row flex items-center justify-between pb-2">
          <CardTitle>Community Forum</CardTitle>
          <Button>New Post</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {forumPosts.map((post, index) => (
              <Card key={index} className="border border-neutral-200 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className={`h-10 w-10 rounded-full ${index === 0 ? "bg-accent" : index === 1 ? "bg-secondary" : "bg-primary"} text-white flex items-center justify-center`}>
                      <span className="font-medium text-sm">{post.authorInitials}</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-neutral-900">{post.author}</h4>
                      <span className="text-xs text-neutral-600">{post.time}</span>
                    </div>
                    <h3 className="mt-1 text-neutral-900 font-medium">{post.title}</h3>
                    <p className="mt-1 text-sm text-neutral-600">{post.content}</p>
                    <div className="mt-3 flex items-center space-x-4">
                      <button className="flex items-center text-xs text-neutral-600 hover:text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                        {post.likes}
                      </button>
                      <button className="flex items-center text-xs text-neutral-600 hover:text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                        {post.replies} replies
                      </button>
                      <button className="flex items-center text-xs text-neutral-600 hover:text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Button variant="outline">View More Posts</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
