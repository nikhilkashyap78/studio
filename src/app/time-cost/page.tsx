import { TimeCostCalculator } from '@/components/time-cost-calculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Time Cost of Your Purchases',
  description: 'Calculate how many hours of your life a purchase will cost you. A powerful tool to re-evaluate your spending habits.',
};

export default function TimeCostPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 pt-8 sm:pt-12 md:pt-16 bg-background">
      <TimeCostCalculator />
    </main>
  );
}
