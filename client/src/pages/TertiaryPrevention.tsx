import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building } from "lucide-react";

export default function TertiaryPrevention() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-neutral-900 font-heading sm:text-3xl">Tertiary Prevention</h2>
          <p className="mt-1 text-sm text-neutral-600">Managing established diseases to improve quality of life</p>
        </div>
      </div>

      {/* Coming Soon Placeholder */}
      <Card>
        <CardContent className="p-8 text-center">
          <Building className="h-16 w-16 mx-auto text-primary" />
          <h3 className="mt-4 text-xl font-medium text-neutral-900">Tertiary Prevention Module</h3>
          <p className="mt-2 text-neutral-600 max-w-lg mx-auto">
            This section is coming soon! It will include chronic disease management, 
            rehabilitation programs, telehealth services, and progress reports.
          </p>
          <div className="mt-6">
            <Button>Get Notified When Available</Button>
          </div>
        </CardContent>
      </Card>

      {/* Preview Features */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Chronic Disease Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-600 mb-4">
              Dedicated modules for conditions like diabetes, hypertension, 
              heart disease, and more. Track vital signs, symptoms, and medication adherence.
            </p>
            <div className="flex justify-end">
              <Button variant="outline" disabled>Coming Soon</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Rehabilitation Programs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-600 mb-4">
              Guided and personalized physical therapy and exercise routines 
              for post-recovery and chronic condition management.
            </p>
            <div className="flex justify-end">
              <Button variant="outline" disabled>Coming Soon</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Telehealth Services</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-600 mb-4">
              Virtual consultations with specialists and regular check-ins 
              to avoid frequent in-person visits.
            </p>
            <div className="flex justify-end">
              <Button variant="outline" disabled>Coming Soon</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Progress Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-600 mb-4">
              Personalized reports showing your improvement over time, 
              with insights and recommendations for continued progress.
            </p>
            <div className="flex justify-end">
              <Button variant="outline" disabled>Coming Soon</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
