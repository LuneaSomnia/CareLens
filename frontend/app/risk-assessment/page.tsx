import { RiskAssessmentForm } from '@/components/risk-assessment/Form';
import { RiskResults } from '@/components/risk-assessment/Results';
import { FrostedCard } from '@/components/ui/FrostedCard';

export default function RiskAssessment() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <FrostedCard className="p-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Health Risk Assessment ❄️
        </h1>
        <RiskAssessmentForm />
      </FrostedCard>
      
      <FrostedCard className="p-8">
        <RiskResults />
      </FrostedCard>
    </div>
  );
}

