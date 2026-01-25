import { RunwayCalculator } from '@/components/runway-calculator';
import type { Metadata } from 'next';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Financial Runway Calculator',
  description:
    'Calculate how long you could survive without an income based on your savings and monthly expenses. A simple tool for financial planning and peace of mind.',
  keywords: [
    'financial runway',
    'survival calculator',
    'emergency fund',
    'savings runway',
    'how long can I live off savings',
    'personal finance',
    'financial independence',
    'burn rate',
  ],
};

export default function RunwayPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 pt-8 sm:pt-12 md:pt-16 bg-background">
      <RunwayCalculator />
      <div className="w-full max-w-2xl mx-auto mt-16 space-y-12 mb-16">
        <Card className="bg-card/80 backdrop-blur-sm border-accent/30">
          <CardHeader>
            <CardTitle className="text-2xl text-accent">
              What is Your Financial Runway?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-card-foreground">
            <p>
              Your financial runway is the number of months you can live off your savings if you were to lose your primary source of income today. It's your financial safety net, your buffer against life's unexpected turns like a job loss, medical emergency, or economic downturn.
            </p>
            <p>
              Knowing this number is the first step towards true financial security. It's not about fear; it's about empowerment. A longer runway gives you freedom—the freedom to leave a job you dislike, to take a calculated risk on a new venture, or simply to sleep better at night.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border-accent/30">
          <CardHeader>
            <CardTitle className="text-2xl text-accent">
              How Much Runway Do You Need?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-card-foreground">
            <p>
              Financial experts typically recommend having an emergency fund that covers 3 to 6 months of essential living expenses. However, the right amount for you depends on your personal circumstances.
            </p>
            <p>
              Consider factors like job stability, dependents, and your personal risk tolerance. Someone with a very stable government job might feel comfortable with 3 months, while a freelancer with fluctuating income might aim for 12 months or more. This calculator gives you the raw number—your next step is to decide what your target should be.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
