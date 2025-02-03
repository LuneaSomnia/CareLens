import { ForumList } from '@/components/community/ForumList';
import { CreatePost } from '@/components/community/CreatePost';
import { TopicFilter } from '@/components/community/TopicFilter';

export default function Community() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Community Support ❄️</h1>
        <p className="text-gray-600">
          Connect with others on their health journey
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <ForumList />
        </div>
        
        <div className="space-y-6">
          <CreatePost />
          <TopicFilter />
        </div>
      </div>
    </div>
  );
}
