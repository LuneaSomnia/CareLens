import { StrategyCard } from '@/components/prevention/StrategyCard';
import { Timeline } from '@/components/prevention/Timeline';

export default function Prevention() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-center">
        Prevention Strategies ❄️
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <StrategyCard />
          <Timeline />
        </div>
        
        <FrostedCard className="p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Your Prevention Journey
          </h2>
          {/* Prevention content */}
        </FrostedCard>
      </div>
    </div>
  );
}
