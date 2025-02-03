import { SymptomForm } from '@/components/symptoms/SymptomForm';
import { AIResponse } from '@/components/symptoms/AIResponse';
import { FrostedCard } from '@/components/ui/FrostedCard';

export default function SymptomChecker() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <FrostedCard className="p-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          AI Symptom Checker ❄️
        </h1>
        <SymptomForm />
      </FrostedCard>
      <AIResponse />
    </div>
  );
}
