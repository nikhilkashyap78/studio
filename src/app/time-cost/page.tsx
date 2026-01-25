import { TimeCostCalculator } from '@/components/time-cost-calculator';
import type { Metadata } from 'next';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Time Cost of Your Purchases',
  description:
    'Calculate how many hours of your life a purchase will cost you. A powerful tool to re-evaluate your spending habits and achieve financial mindfulness.',
  keywords: [
    'time cost calculator',
    'life hours',
    'financial independence',
    'mindful spending',
    'opportunity cost',
    'value of time',
    'financial decisions',
    'is it worth it calculator',
    'work hours calculator',
  ],
};

export default function TimeCostPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 pt-8 sm:pt-12 md:pt-16 bg-background">
      <TimeCostCalculator />
      <div className="w-full max-w-2xl mx-auto mt-16 space-y-12 mb-16">
        <Card className="bg-card/80 backdrop-blur-sm border-accent/30">
          <CardHeader>
            <CardTitle className="text-2xl text-accent">
              From Dollars to Hours: The Real Cost of Spending
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-card-foreground">
            <p>
              We are taught to think about the cost of items in dollars, but this is an abstraction. To earn those dollars, you trade something far more valuable: your time. The "Time Cost" is the amount of your life you have to give up to afford something.
            </p>
            <p>
              This calculator is designed to break that abstraction. By converting a price tag back into the hours of work required to earn it, you get a much clearer picture of the true cost. An $80 pair of sneakers isn't just $80—it's four hours of your life you'll never get back. Was that trade worth it?
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border-accent/30">
          <CardHeader>
            <CardTitle className="text-2xl text-accent">
              A Tool for Financial Mindfulness
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-card-foreground">
            <p>
              Thinking in terms of Time Cost is a powerful exercise in financial mindfulness. It forces you to pause and evaluate whether a purchase aligns with your values and goals. It's a core concept for those pursuing Financial Independence, Retire Early (FIRE), but its wisdom applies to everyone.
            </p>
            <p>
              Before your next purchase, use this tool. You may find that some items are absolutely worth the time, while others lose their appeal entirely. This isn't about depriving yourself; it's about empowering yourself to spend your life—and by extension, your money—on what truly matters to you.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
