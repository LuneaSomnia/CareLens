import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function QuaternaryPrevention() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-neutral-900 font-heading sm:text-3xl">Quaternary Prevention</h2>
          <p className="mt-1 text-sm text-neutral-600">Protecting patients from unnecessary or harmful medical interventions</p>
        </div>
      </div>

      {/* Coming Soon Placeholder */}
      <Card>
        <CardContent className="p-8 text-center">
          <AlertTriangle className="h-16 w-16 mx-auto text-primary" />
          <h3 className="mt-4 text-xl font-medium text-neutral-900">Quaternary Prevention Module</h3>
          <p className="mt-2 text-neutral-600 max-w-lg mx-auto">
            This section is coming soon! It will include medication reviews, risk-benefit tools, 
            adverse event tracking, and educational resources.
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
            <CardTitle className="text-lg">Medication Review</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-600 mb-4">
              Periodic reviews of your medication lists by healthcare professionals, 
              and options to seek second opinions on current treatments.
            </p>
            <div className="flex justify-end">
              <Button variant="outline" disabled>Coming Soon</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Risk-Benefit Analysis Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-600 mb-4">
              Interactive tools to help you weigh the risks and benefits of proposed 
              interventions, with visual aids to support informed decisions.
            </p>
            <div className="flex justify-end">
              <Button variant="outline" disabled>Coming Soon</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Adverse Event Reporting</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-600 mb-4">
              Log any adverse effects from medical interventions. Data is aggregated 
              to help identify potential overuse of certain treatments and procedures.
            </p>
            <div className="flex justify-end">
              <Button variant="outline" disabled>Coming Soon</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Educational Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-600 mb-4">
              Access articles, videos, and infographics on the dangers of over-testing 
              and over-treatment, with real-world case studies.
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
