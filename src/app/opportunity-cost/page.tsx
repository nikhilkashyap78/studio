import { OpportunityCostCalculator } from '@/components/opportunity-cost-calculator';
import type { Metadata } from 'next';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Opportunity Cost Calculator: The Financial Regret Gap',
  description:
    'See how much money you lost by not starting to save earlier. A blunt, data-driven tool to show you the real cost of procrastination.',
  keywords: [
    'opportunity cost',
    'cost of delay',
    'investment calculator',
    'saving regret',
    'financial planning',
    'compound interest',
    'wealth building',
    'missed financial opportunity',
  ],
};

export default function OpportunityCostPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 pt-8 sm:pt-12 md:pt-16 bg-background">
      <OpportunityCostCalculator />
      <div className="w-full max-w-2xl mx-auto mt-16 space-y-12 mb-16">
        <Card className="bg-card/80 backdrop-blur-sm border-accent/30">
          <CardHeader>
            <CardTitle className="text-2xl text-accent">
              The Unseen Cost of "Later"
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-card-foreground">
            <p>
              Time is the most powerful force in finance. Every day you wait to invest, you are not just losing a day of saving; you are losing all the potential future days of growth that money could have generated. This is the principle of compound interest, and its effects are exponential.
            </p>
            <p>
              This tool is not designed to make you feel good. It is designed to show you the mathematical reality of that lost time. The gap between what you have and what you could have had is not just a number; it is a measure of forfeited security, freedom, and opportunity.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border-accent/30">
          <CardHeader>
            <CardTitle className="text-2xl text-accent">
              A Tool Against Procrastination
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-card-foreground">
            <p>
              Use the feeling this number gives you as fuel. The past is unchangeable, but the cost of waiting another year, another month, or even another week is a decision you control right now. The best time to start was in the past. The second-best time is today. Do not let the gap widen.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
