import { ResourceGrid } from '@/components/resources/ResourceGrid';
import { SearchBar } from '@/components/resources/SearchBar';
import { Categories } from '@/components/resources/Categories';

export default function Resources() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Health Resources ❄️</h1>
        <SearchBar />
      </div>
      
      <Categories />
      <ResourceGrid />
    </div>
  );
}
