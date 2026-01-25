"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const countries = ['United States', 'Canada', 'Mexico', 'United Kingdom', 'Germany', 'France', 'Japan', 'China', 'India', 'Brazil', 'Nigeria', 'Other'];
const educationLevels = ['No formal education', 'Primary school', 'High school diploma or equivalent', 'Vocational training', 'Bachelor\'s degree', 'Master\'s degree', 'Doctorate (PhD) or higher'];

// This is a simplified, illustrative model and does not reflect real-world data with complete accuracy.
const calculateRank = ({ income, country, education, age }: { income: number; country: string; education: string; age: number; }) => {
    if (!income || !age || !country || !education) return null;

    // Income is the biggest factor. Log scale, normalized to ~75 points for $200k USD.
    const incomeScore = (Math.log(income + 1) / Math.log(200001)) * 75;

    // Country tier adjustment for context.
    const countryTiers: { [key: string]: number } = {
        'United States': 1.2, 'United Kingdom': 1.15, 'Germany': 1.15, 'Canada': 1.1, 'France': 1.1, 'Japan': 1.05,
        'Mexico': 0.8, 'China': 0.85, 'Brazil': 0.75,
        'India': 0.6, 'Nigeria': 0.5, 'Other': 0.7
    };
    const countryMultiplier = countryTiers[country] || 0.7;

    // Education adds a bonus.
    const educationBonus: { [key: string]: number } = {
        'No formal education': 0,
        'Primary school': 1,
        'High school diploma or equivalent': 3,
        'Vocational training': 4,
        'Bachelor\'s degree': 8,
        'Master\'s degree': 12,
        'Doctorate (PhD) or higher': 15,
    };
    const educationValue = educationBonus[education] || 0;

    // Age gives a small bonus for accumulation potential. Peaks around 50.
    const ageBonus = Math.max(0, 5 - Math.abs(age - 50) / 5); // Max 5 points

    // Combine scores
    let finalScore = (incomeScore * countryMultiplier) + educationValue + ageBonus;
    
    // Clamp to a realistic percentile range
    finalScore = Math.max(1, Math.min(finalScore, 99.9));

    return finalScore;
}


export function GlobalRankCalculator() {
  const [age, setAge] = useState<number | ''>('');
  const [income, setIncome] = useState<number | ''>('');
  const [country, setCountry] = useState<string>('');
  const [education, setEducation] = useState<string>('');
  const [showResult, setShowResult] = useState(false);

  const [rank, setRank] = useState<number | null>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (age && income && country && education) {
        const calculatedRank = calculateRank({ age, income, country, education });
        setRank(calculatedRank);
        setShowResult(true);
    }
  };

  const handleReset = () => {
    setAge('');
    setIncome('');
    setCountry('');
    setEducation('');
    setRank(null);
    setShowResult(false);
  };

  const isFormComplete = Boolean(age && income && country && education);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl font-headline font-extrabold tracking-tight text-primary">
          How Do You Rank Globally?
        </h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-xl mx-auto">
          See how your income, age, and education might stack up against the world.
        </p>
      </div>
      
      <Card className="bg-card/80 backdrop-blur-sm border-primary/20 shadow-lg">
        {!showResult ? (
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-primary">Your Profile</CardTitle>
            <CardDescription>Enter your details for an estimated global ranking. This is an approximation for illustrative purposes.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="age">Your Age</Label>
                    <Input
                        id="age"
                        type="number"
                        placeholder="e.g., 30"
                        value={age}
                        onChange={(e) => setAge(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
                        min="1"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="income">Annual Income (in USD)</Label>
                    <Input
                        id="income"
                        type="number"
                        placeholder="e.g., 50000"
                        value={income}
                        onChange={(e) => setIncome(e.target.value === '' ? '' : parseFloat(e.target.value))}
                        min="0"
                        required
                    />
                </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country of Residence</Label>
              <Select onValueChange={setCountry} value={country} required>
                <SelectTrigger id="country">
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="education">Highest Level of Education</Label>
              <Select onValueChange={setEducation} value={education} required>
                <SelectTrigger id="education">
                  <SelectValue placeholder="Select your education level" />
                </SelectTrigger>
                <SelectContent>
                  {educationLevels.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={!isFormComplete}>Calculate My Rank</Button>
          </CardFooter>
        </form>
        ) : (
            <div className="text-center">
                <CardHeader>
                    <CardTitle className="text-accent text-2xl">Your Estimated Global Rank</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {rank !== null ? (
                        <p className="text-3xl sm:text-4xl font-bold text-foreground">
                            You're richer than an estimated <span className="text-accent">{rank.toFixed(1)}%</span> of people worldwide.
                        </p>
                    ) : null}
                    <p className="text-md text-muted-foreground pt-4">
                        This is a simplified model. True global wealth is complex and depends on many other factors. Use this as a tool for perspective, not as a definitive measure.
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
