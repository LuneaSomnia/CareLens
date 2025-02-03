import { ActiveChallenges } from '@/components/challenges/ActiveChallenges';
import { LeaderBoard } from '@/components/challenges/LeaderBoard';
import { ChallengeProgress } from '@/components/challenges/ChallengeProgress';

export default function Challenges() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-center">
        Health Challenges ❄️
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ActiveChallenges />
        <LeaderBoard />
        <ChallengeProgress />
      </div>
    </div>
  );
}
