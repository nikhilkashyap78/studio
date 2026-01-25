"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
};

const calculateFutureValue = (monthlyInvestment: number, annualReturn: number, years: number): number => {
  if (monthlyInvestment <= 0 || annualReturn <= 0 || years <= 0) return 0;

  const monthlyRate = annualReturn / 100 / 12;
  const numberOfMonths = years * 12;
  
  const futureValue = monthlyInvestment * ( (Math.pow(1 + monthlyRate, numberOfMonths) - 1) / monthlyRate );

  return futureValue;
};


export function OpportunityCostCalculator() {
  const [currentAge, setCurrentAge] = useState<number | ''>(35);
  const [startAge, setStartAge] = useState<number | ''>(30);
  const [couldHaveStartedAge, setCouldHaveStartedAge] = useState<number | ''>(25);
  const [monthlyInvestment, setMonthlyInvestment] = useState<number | ''>(500);
  const [annualReturn, setAnnualReturn] = useState<number | ''>(8);
  const [showResult, setShowResult] = useState(false);

  const { actualSavings, potentialSavings, lostWealth } = useMemo(() => {
    if (!currentAge || !startAge || !couldHaveStartedAge || !monthlyInvestment || !annualReturn) {
      return { actualSavings: 0, potentialSavings: 0, lostWealth: 0 };
    }

    const yearsInvested = currentAge - startAge;
    const potentialYearsInvested = currentAge - couldHaveStartedAge;

    const actual = calculateFutureValue(monthlyInvestment, annualReturn, yearsInvested);
    const potential = calculateFutureValue(monthlyInvestment, annualReturn, potentialYearsInvested);
    
    return {
      actualSavings: actual,
      potentialSavings: potential,
      lostWealth: Math.max(0, potential - actual),
    };
  }, [currentAge, startAge, couldHaveStartedAge, monthlyInvestment, annualReturn]);

  const chartData = [
    { name: 'Savings', "What You Have": actualSavings, "What You Could've Had": potentialSavings },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentAge && startAge && couldHaveStartedAge && monthlyInvestment && annualReturn) {
        setShowResult(true);
    }
  };

  const handleReset = () => {
    setShowResult(false);
  };

  const isFormComplete = Boolean(currentAge && startAge && couldHaveStartedAge && monthlyInvestment && annualReturn);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl font-headline font-extrabold tracking-tight text-primary">
          The Cost of Waiting
        </h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-xl mx-auto">
          See the wealth you forfeited by delaying your investments.
        </p>
      </div>
      
      <Card className="bg-card/80 backdrop-blur-sm border-primary/20 shadow-lg">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-primary">Your Investment Timeline</CardTitle>
            <CardDescription>Enter your details to calculate the financial impact of starting late.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="currentAge">Current Age</Label>
                <Input id="currentAge" type="number" placeholder="e.g., 35" value={currentAge} onChange={(e) => setCurrentAge(e.target.value === '' ? '' : parseInt(e.target.value, 10))} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startAge">Age You Started Saving</Label>
                <Input id="startAge" type="number" placeholder="e.g., 30" value={startAge} onChange={(e) => setStartAge(e.target.value === '' ? '' : parseInt(e.target.value, 10))} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="couldHaveStartedAge">Age You Could Have Started</Label>
                <Input id="couldHaveStartedAge" type="number" placeholder="e.g., 25" value={couldHaveStartedAge} onChange={(e) => setCouldHaveStartedAge(e.target.value === '' ? '' : parseInt(e.target.value, 10))} required />
              </div>
               <div className="space-y-2">
                <Label htmlFor="monthlyInvestment">Monthly Investment (USD)</Label>
                <Input id="monthlyInvestment" type="number" placeholder="e.g., 500" value={monthlyInvestment} onChange={(e) => setMonthlyInvestment(e.target.value === '' ? '' : parseFloat(e.target.value))} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="annualReturn">Expected Annual Return (%)</Label>
              <Input id="annualReturn" type="number" placeholder="e.g., 8" value={annualReturn} onChange={(e) => setAnnualReturn(e.target.value === '' ? '' : parseFloat(e.target.value))} required />
              <p className="text-xs text-muted-foreground">The average historical return of the S&P 500 is around 10%.</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={!isFormComplete}>Calculate The Damage</Button>
          </CardFooter>
        </form>
      </Card>
      
      {showResult && (
          <Card className="text-center bg-card/80 backdrop-blur-sm border-destructive/50 shadow-lg overflow-hidden">
            <CardHeader>
              <CardTitle className="text-destructive text-2xl">The Regret Gap</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-2xl sm:text-3xl font-bold text-foreground">
                By delaying your start, you lost
              </p>
              <p className="text-5xl sm:text-7xl font-extrabold text-destructive animate-pulse">
                {formatCurrency(lostWealth)}
              </p>
              <p className="text-xl text-muted-foreground">in potential wealth.</p>
              
              <div className="pt-8">
                 <ChartContainer config={{}} className="min-h-[250px] w-full">
                  <BarChart accessibilityLayer data={chartData} margin={{ top: 20, right: 20, left: 20, bottom: 5 }}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
                    <YAxis tickFormatter={(value) => `$${Number(value) / 1000}k`} />
                    <Tooltip 
                      cursor={{ fill: 'hsl(var(--muted))' }}
                      content={<ChartTooltipContent formatter={(value) => formatCurrency(value as number)} />} 
                    />
                    <Legend />
                    <Bar dataKey="What You Have" fill="hsl(var(--primary))" radius={4} />
                    <Bar dataKey="What You Could've Had" fill="hsl(var(--destructive))" radius={4} />
                  </BarChart>
                </ChartContainer>
              </div>

            </CardContent>
            <CardFooter className="bg-transparent p-6 pt-0">
                <Button onClick={handleReset} variant="outline" className="w-full">Calculate Again</Button>
            </CardFooter>
          </Card>
      )}
    </div>
  );
}
