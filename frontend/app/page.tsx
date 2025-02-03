import { FrostedCard } from '@/components/ui/FrostedCard';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="space-y-8">
      <motion.h1 
        className="text-5xl font-bold text-center text-[#2C5364]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Welcome to CareLens ❄️
      </motion.h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FrostedCard className="p-6">
          <h2 className="text-xl font-semibold mb-4">Health Assessment</h2>
          {/* Feature content */}
        </FrostedCard>
        {/* Additional feature cards */}
      </div>
    </div>
  );
}
