import { ActivityTracker } from '@/components/lifestyle/ActivityTracker';
import { DietLog } from '@/components/lifestyle/DietLog';
import { SleepTracker } from '@/components/lifestyle/SleepTracker';
import { StressMonitor } from '@/components/lifestyle/StressMonitor';

export default function Lifestyle() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-center">
        Lifestyle Monitoring ❄️
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ActivityTracker />
        <DietLog />
        <SleepTracker />
        <StressMonitor />
      </div>
    </div>
  );
}
