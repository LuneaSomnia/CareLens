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
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { TokenizedInput } from "@/components/ui/tokenized-input";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import { 
  healthConditions, 
  allergyTypes, 
  medications, 
  familyHistoryConditions 
} from "@/lib/utils";

const healthBackgroundSchema = z.object({
  currentConditions: z.array(z.string()),
  allergies: z.array(z.string()),
  medications: z.array(z.string()),
  familyHistory: z.array(z.string()),
  organDonor: z.boolean(),
  donatedOrgan: z.string().optional(),
});

type HealthBackgroundValues = z.infer<typeof healthBackgroundSchema>;

export default function HealthBackground() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const defaultValues: HealthBackgroundValues = {
    currentConditions: ["Type 2 Diabetes", "Hypertension", "Seasonal Allergies"],
    allergies: ["Penicillin", "Pollen", "Tree Nuts"],
    medications: ["Metformin 500mg", "Lisinopril 10mg", "Loratadine 10mg"],
    familyHistory: ["Heart Disease (Father)", "Type 2 Diabetes (Mother)", "Hypertension (Grandparent)"],
    organDonor: false,
    donatedOrgan: "",
  };

  const form = useForm<HealthBackgroundValues>({
    resolver: zodResolver(healthBackgroundSchema),
    defaultValues,
  });

  const onSubmit = async (data: HealthBackgroundValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulating an API call - in a real app this would save the health background
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Health background updated",
        description: "Your health information has been saved.",
      });
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update health background. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  if (!isEditing) {
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-neutral-900">Health Background</h3>
          <Button variant="ghost" onClick={toggleEditing} className="text-primary hover:text-primary-dark">
            <span className="flex items-center">
              <span className="mr-1">Edit</span>
              <Pencil className="h-4 w-4" />
            </span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-neutral-600 uppercase tracking-wide mb-3">Current Conditions</h4>
            <div className="flex flex-wrap gap-2">
              {defaultValues.currentConditions.map((condition, index) => (
                <span key={index} className="inline-flex items-center bg-teal-50 rounded-full px-2 py-1 text-sm">
                  {condition}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-neutral-600 uppercase tracking-wide mb-3">Allergies</h4>
            <div className="flex flex-wrap gap-2">
              {defaultValues.allergies.map((allergy, index) => (
                <span key={index} className="inline-flex items-center bg-teal-50 rounded-full px-2 py-1 text-sm">
                  {allergy}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-neutral-600 uppercase tracking-wide mb-3">Current Medications</h4>
            <div className="flex flex-wrap gap-2">
              {defaultValues.medications.map((medication, index) => (
                <span key={index} className="inline-flex items-center bg-teal-50 rounded-full px-2 py-1 text-sm">
                  {medication}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-neutral-600 uppercase tracking-wide mb-3">Family History</h4>
            <div className="flex flex-wrap gap-2">
              {defaultValues.familyHistory.map((condition, index) => (
                <span key={index} className="inline-flex items-center bg-teal-50 rounded-full px-2 py-1 text-sm">
                  {condition}
                </span>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-sm font-medium text-neutral-600 uppercase tracking-wide mb-3">Organ Donor Status</h4>
            <p className="text-neutral-900">{defaultValues.organDonor ? "Yes" : "No"}</p>
            {defaultValues.organDonor && defaultValues.donatedOrgan && (
              <p className="text-neutral-600 text-sm mt-1">Donated: {defaultValues.donatedOrgan}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-medium text-neutral-900 mb-4">Health Background</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <FormField
                control={form.control}
                name="currentConditions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Conditions</FormLabel>
                    <FormControl>
                      <TokenizedInput
                        tokens={field.value}
                        onTokensChange={field.onChange}
                        placeholder="Add condition..."
                        suggestions={healthConditions}
                      />
                    </FormControl>
                    <FormDescription>
                      List any medical conditions you currently have.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <FormField
                control={form.control}
                name="allergies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Allergies</FormLabel>
                    <FormControl>
                      <TokenizedInput
                        tokens={field.value}
                        onTokensChange={field.onChange}
                        placeholder="Add allergy..."
                        suggestions={allergyTypes}
                      />
                    </FormControl>
                    <FormDescription>
                      List any allergies or sensitivities you have.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <FormField
                control={form.control}
                name="medications"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Medications</FormLabel>
                    <FormControl>
                      <TokenizedInput
                        tokens={field.value}
                        onTokensChange={field.onChange}
                        placeholder="Add medication..."
                        suggestions={medications}
                      />
                    </FormControl>
                    <FormDescription>
                      List any medications you're currently taking, including dosage.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <FormField
                control={form.control}
                name="familyHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Family Medical History</FormLabel>
                    <FormControl>
                      <TokenizedInput
                        tokens={field.value}
                        onTokensChange={field.onChange}
                        placeholder="Add family history..."
                        suggestions={familyHistoryConditions}
                      />
                    </FormControl>
                    <FormDescription>
                      List any genetic predispositions or conditions in your family.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <FormField
                control={form.control}
                name="organDonor"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Organ Donor Status</FormLabel>
                      <FormDescription>
                        Are you registered as an organ donor?
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

              {form.watch("organDonor") && (
                <FormField
                  control={form.control}
                  name="donatedOrgan"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel>Donated Organ (if applicable)</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} placeholder="e.g., Kidney" />
                      </FormControl>
                      <FormDescription>
                        If you have donated an organ, please specify which one.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </CardContent>
          </Card>

          <div className="flex space-x-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
            <Button type="button" variant="outline" onClick={toggleEditing}>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
