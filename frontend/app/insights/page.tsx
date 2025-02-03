import { PredictiveAnalysis } from '@/components/insights/PredictiveAnalysis';
import { TrendAnalysis } from '@/components/insights/TrendAnalysis';
import { HealthRecommendations } from '@/components/insights/HealthRecommendations';

export default function Insights() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-center">
        AI Health Insights ❄️
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <PredictiveAnalysis />
        <TrendAnalysis />
        <HealthRecommendations />
      </div>
    </div>
  );
}
