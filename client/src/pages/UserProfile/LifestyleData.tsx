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
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { TokenizedInput } from "@/components/ui/tokenized-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  dietaryChoices,
  activityTypes,
  frequencyOptions,
  sleepQualityOptions,
  substanceTypes
} from "@/lib/utils";

const lifestyleSchema = z.object({
  diet: z.array(z.string()),
  physicalActivityType: z.string(),
  physicalActivityDuration: z.coerce.number().min(0, "Duration can't be negative"),
  physicalActivityFrequency: z.string(),
  sleepDuration: z.coerce.number().min(0, "Duration can't be negative").max(24, "Duration can't exceed 24 hours"),
  sleepQuality: z.string(),
  substanceUse: z.array(z.string()),
});

type LifestyleValues = z.infer<typeof lifestyleSchema>;

export default function LifestyleData() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues: LifestyleValues = {
    diet: ["Omnivore", "Low-Carb"],
    physicalActivityType: "Walking",
    physicalActivityDuration: 30,
    physicalActivityFrequency: "3 times per week",
    sleepDuration: 6.5,
    sleepQuality: "Good",
    substanceUse: ["Alcohol - Weekly", "Caffeine - Daily"]
  };

  const form = useForm<LifestyleValues>({
    resolver: zodResolver(lifestyleSchema),
    defaultValues,
  });

  const onSubmit = async (data: LifestyleValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Lifestyle data updated",
        description: "Your lifestyle information has been saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update lifestyle data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium text-neutral-900 mb-4">Lifestyle Data</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <FormField
                control={form.control}
                name="diet"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dietary Preferences</FormLabel>
                    <FormControl>
                      <TokenizedInput
                        tokens={field.value}
                        onTokensChange={field.onChange}
                        placeholder="Add dietary preference..."
                        suggestions={dietaryChoices}
                      />
                    </FormControl>
                    <FormDescription>
                      Select your dietary preferences or restrictions.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 space-y-4">
              <h4 className="font-medium text-neutral-900">Physical Activity</h4>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <FormField
                  control={form.control}
                  name="physicalActivityType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Activity Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select activity type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {activityTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="physicalActivityDuration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (minutes)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="physicalActivityFrequency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Frequency</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {frequencyOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 space-y-4">
              <h4 className="font-medium text-neutral-900">Sleep Patterns</h4>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="sleepDuration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Average Sleep Duration (hours)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.5" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="sleepQuality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sleep Quality</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select sleep quality" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {sleepQualityOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <FormField
                control={form.control}
                name="substanceUse"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Substance Use</FormLabel>
                    <FormControl>
                      <TokenizedInput
                        tokens={field.value}
                        onTokensChange={field.onChange}
                        placeholder="Add substance and frequency..."
                        suggestions={[
                          "Alcohol - Daily",
                          "Alcohol - Weekly",
                          "Alcohol - Monthly",
                          "Tobacco - Daily",
                          "Tobacco - Weekly",
                          "Tobacco - Monthly",
                          "Caffeine - Daily",
                          "Caffeine - Weekly",
                          "Marijuana - Daily",
                          "Marijuana - Weekly",
                          "Marijuana - Monthly"
                        ]}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter substances you use and their frequency (e.g., "Alcohol - Weekly").
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
