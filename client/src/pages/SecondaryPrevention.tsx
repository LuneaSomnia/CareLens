import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

export default function SecondaryPrevention() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-neutral-900 font-heading sm:text-3xl">Secondary Prevention</h2>
          <p className="mt-1 text-sm text-neutral-600">Early detection and timely intervention in asymptomatic stages</p>
        </div>
      </div>

      {/* Coming Soon Placeholder */}
      <Card>
        <CardContent className="p-8 text-center">
          <FileText className="h-16 w-16 mx-auto text-primary" />
          <h3 className="mt-4 text-xl font-medium text-neutral-900">Secondary Prevention Module</h3>
          <p className="mt-2 text-neutral-600 max-w-lg mx-auto">
            This section is coming soon! It will include symptom tracking, health diaries, 
            risk calculators, and screening follow-ups.
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
            <CardTitle className="text-lg">Symptom Diary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-600 mb-4">
              Track your symptoms over time to identify patterns and early warning signs.
              Log frequency, intensity, duration, and potential triggers.
            </p>
            <div className="flex justify-end">
              <Button variant="outline" disabled>Coming Soon</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Risk Assessment Calculators</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-600 mb-4">
              Utilize clinical algorithms to estimate your disease risk, 
              such as the Framingham risk score for heart disease.
            </p>
            <div className="flex justify-end">
              <Button variant="outline" disabled>Coming Soon</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Test Results Repository</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-600 mb-4">
              Store and view all your test results in one place. Track changes over time
              and share with healthcare providers as needed.
            </p>
            <div className="flex justify-end">
              <Button variant="outline" disabled>Coming Soon</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Follow-up Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-600 mb-4">
              Get personalized suggestions for additional tests or follow-up appointments
              based on your screening outcomes and risk profile.
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
