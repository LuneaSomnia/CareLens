import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormDescription 
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Download, RefreshCw, Lock } from "lucide-react";

const settingsSchema = z.object({
  notificationsEnabled: z.boolean(),
  screeningNotifications: z.boolean(),
  followUpNotifications: z.boolean(),
  testingNotifications: z.boolean(),
  communityAnonymous: z.boolean(),
  preferredLearningMode: z.enum(["article", "video", "quiz", "game"]),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
}).refine((data) => {
  if (data.password || data.confirmPassword) {
    return data.password === data.confirmPassword;
  }
  return true;
}, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SettingsValues = z.infer<typeof settingsSchema>;

export default function Settings() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues: SettingsValues = {
    notificationsEnabled: true,
    screeningNotifications: true,
    followUpNotifications: true,
    testingNotifications: true,
    communityAnonymous: false,
    preferredLearningMode: "article",
    password: "",
    confirmPassword: "",
  };

  const form = useForm<SettingsValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues,
  });

  const onSubmit = async (data: SettingsValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Settings updated",
        description: "Your settings have been saved successfully.",
      });
      
      // Reset password fields after successful submission
      form.reset({
        ...data,
        password: "",
        confirmPassword: ""
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadData = () => {
    // In a real application, this would trigger an API call to get user data
    toast({
      title: "Download Started",
      description: "Your health data is being prepared for download.",
    });
  };

  return (
    <div>
      <h3 className="text-lg font-medium text-neutral-900 mb-4">Settings</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="notificationsEnabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Enable Notifications</FormLabel>
                      <FormDescription>
                        Receive notifications from CareLens
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {form.watch("notificationsEnabled") && (
                <>
                  <FormField
                    control={form.control}
                    name="screeningNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 ml-4">
                        <div className="space-y-0.5">
                          <FormLabel>Screening Reminders</FormLabel>
                          <FormDescription>
                            Get reminders about upcoming health screenings
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={!form.watch("notificationsEnabled")}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="followUpNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 ml-4">
                        <div className="space-y-0.5">
                          <FormLabel>Follow-Up Alerts</FormLabel>
                          <FormDescription>
                            Receive notifications about follow-up appointments
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={!form.watch("notificationsEnabled")}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="testingNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 ml-4">
                        <div className="space-y-0.5">
                          <FormLabel>Testing Alerts</FormLabel>
                          <FormDescription>
                            Get reminders about recommended tests
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={!form.watch("notificationsEnabled")}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Community Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="communityAnonymous"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Anonymous Mode</FormLabel>
                      <FormDescription>
                        Hide your identity in community forums
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Learning Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="preferredLearningMode"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Preferred Learning Mode</FormLabel>
                    <FormDescription>
                      Choose how you'd like to consume educational content across the app
                    </FormDescription>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="article" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Articles & Text
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="video" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Video Content
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="quiz" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Interactive Quizzes
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="game" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Gamified Learning
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Privacy & Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Change Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="New password" 
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="Confirm new password" 
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="pt-2 flex flex-col space-y-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleDownloadData}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Your Health Data
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex space-x-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Save Settings
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
