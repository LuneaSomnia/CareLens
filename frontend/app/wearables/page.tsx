import { DeviceConnect } from '@/components/wearables/DeviceConnect';
import { HealthMetrics } from '@/components/wearables/HealthMetrics';
import { FrostedCard } from '@/components/ui/FrostedCard';

export default function Wearables() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-center">
        Connected Devices ❄️
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DeviceConnect />
        <HealthMetrics />
      </div>
    </div>
  );
}
