import { GlobalRankCalculator } from '@/components/global-rank-calculator';
import type { Metadata } from 'next';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'How Do You Rank Globally?',
  description:
    'See how your income, age, and education rank against the rest of the world. A simple tool to gain perspective on your global standing.',
  keywords: [
    'global rank',
    'income rank',
    'wealth percentile',
    'how rich am i',
    'global comparison',
    'personal finance',
    'social ranking',
    'income comparison tool',
  ],
};

export default function GlobalRankPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 pt-8 sm:pt-12 md:pt-16 bg-background">
      <GlobalRankCalculator />
      <div className="w-full max-w-2xl mx-auto mt-16 space-y-12 mb-16">
        <Card className="bg-card/80 backdrop-blur-sm border-accent/30">
          <CardHeader>
            <CardTitle className="text-2xl text-accent">
              Where Do You Stand?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-card-foreground">
            <p>
              We often compare ourselves to our immediate circle—our colleagues, neighbors, and friends. But how do we stack up on a global scale? This tool offers a simplified perspective on where you stand in the world based on key metrics like income, education, and age.
            </p>
            <p>
              The calculation is an estimate designed to provide a moment of reflection, not a definitive financial analysis. It's a reminder of the broader context of global economics and our place within it. Use it to foster gratitude, gain perspective, and perhaps re-evaluate what "rich" truly means.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border-accent/30">
          <CardHeader>
            <CardTitle className="text-2xl text-accent">
              The Psychology of Ranking
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-card-foreground">
            <p>
              Humans are naturally inclined to see where they fit in. Ranking ourselves is a way to measure progress, define identity, and understand our social environment. While it can be a powerful motivator, it can also be a source of anxiety.
            </p>
            <p>
              The goal of this tool isn't to make you feel good or bad, but to make you think. Seeing your estimated rank can be a humbling or surprising experience, and both outcomes are valuable. It's a starting point for a conversation with yourself about your goals, achievements, and definition of success.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
