import { ProfileTabs } from '@/components/profile/ProfileTabs';
import { FrostedCard } from '@/components/ui/FrostedCard';

export default function Profile() {
  return (
    <div className="max-w-6xl mx-auto">
      <FrostedCard className="p-8">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-24 h-24 rounded-full bg-accent/20 
                        flex items-center justify-center">
            <span className="text-4xl">👤</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold">User Profile</h1>
            <p className="text-gray-600">Manage your health information</p>
          </div>
        </div>
        <ProfileTabs />
      </FrostedCard>
    </div>
  );
}
