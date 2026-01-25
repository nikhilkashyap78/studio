"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export function RunwayCalculator() {
  const [savings, setSavings] = useState<number | ''>('');
  const [expenses, setExpenses] = useState<number | ''>('');
  const [showResult, setShowResult] = useState(false);

  const runwayMonths = useMemo(() => {
    if (!savings || !expenses || expenses <= 0) return 0;
    return savings / expenses;
  }, [savings, expenses]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (savings && expenses) {
        setShowResult(true);
    }
  };

  const handleReset = () => {
    setSavings('');
    setExpenses('');
    setShowResult(false);
  };

  const isFormComplete = Boolean(savings && expenses);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl font-headline font-extrabold tracking-tight text-primary">
          Your Financial Runway
        </h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-xl mx-auto">
          How long could you survive if your income stopped today?
        </p>
      </div>
      
      <Card className="bg-card/80 backdrop-blur-sm border-primary/20 shadow-lg">
        {!showResult ? (
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-primary">Your Finances</CardTitle>
            <CardDescription>Enter your total savings and monthly expenses.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="savings">Total Savings</Label>
                    <Input
                        id="savings"
                        type="number"
                        placeholder="e.g., 20000"
                        value={savings}
                        onChange={(e) => setSavings(e.target.value === '' ? '' : parseFloat(e.target.value))}
                        min="0"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="expenses">Monthly Expenses</Label>
                    <Input
                        id="expenses"
                        type="number"
                        placeholder="e.g., 3000"
                        value={expenses}
                        onChange={(e) => setExpenses(e.target.value === '' ? '' : parseFloat(e.target.value))}
                        min="1"
                        required
                    />
                </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={!isFormComplete}>Calculate Runway</Button>
          </CardFooter>
        </form>
        ) : (
            <div className="text-center">
                <CardHeader>
                    <CardTitle className="text-accent text-2xl">Your Survival Runway</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {runwayMonths > 0 ? (
                        <p className="text-3xl sm:text-4xl font-bold text-foreground">
                            You'd survive for <span className="text-accent">{runwayMonths.toFixed(1)} months</span> if your income stopped.
                        </p>
                    ) : null}
                    <p className="text-md text-muted-foreground pt-4">
                        This is a crucial metric for financial stability. It represents your freedom and buffer against unexpected events.
                    </p>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleReset} variant="outline" className="w-full">Calculate Again</Button>
                </CardFooter>
            </div>
        )}
      </Card>
    </div>
  );
}
