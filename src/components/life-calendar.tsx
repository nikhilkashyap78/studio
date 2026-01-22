"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function LifeCalendar() {
  const [age, setAge] = useState(25);
  const [lifespan, setLifespan] = useState(90);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const weeksLived = useMemo(() => Math.floor(age * 52), [age]);
  const totalWeeks = useMemo(() => Math.floor(lifespan * 52), [lifespan]);

  const weeks = useMemo(() => {
    if (totalWeeks <= 0 || lifespan < age) return [];
    return Array.from({ length: totalWeeks }, (_, i) => ({
      isLived: i < weeksLived,
      weekNumber: i + 1,
    }));
  }, [totalWeeks, weeksLived, lifespan, age]);

  const handleAgeChange = (amount: number) => {
    setAge((prev) => Math.max(0, prev + amount));
  };

  const handleLifespanChange = (amount: number) => {
    setLifespan((prev) => Math.max(0, prev + amount));
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Card className="w-full max-w-md mx-auto mt-12 bg-card/80 backdrop-blur-sm border-primary/20 shadow-lg">
        <CardHeader>
          <CardTitle className="text-primary">Your Life in Weeks</CardTitle>
          <CardDescription>
            Enter your age and expected lifespan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="age" className="text-center block">Current Age</Label>
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 shrink-0 rounded-full"
                  onClick={() => handleAgeChange(-1)}
                  disabled={age <= 0}
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease age</span>
                </Button>
                <Input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) =>
                    setAge(Math.max(0, parseInt(e.target.value, 10) || 0))
                  }
                  min="0"
                  className="w-20 text-center text-lg"
                  aria-label="Current Age"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 shrink-0 rounded-full"
                  onClick={() => handleAgeChange(1)}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase age</span>
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lifespan" className="text-center block">Expected Lifespan</Label>
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 shrink-0 rounded-full"
                  onClick={() => handleLifespanChange(-1)}
                  disabled={lifespan <= 0}
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease lifespan</span>
                </Button>
                <Input
                  id="lifespan"
                  type="number"
                  value={lifespan}
                  onChange={(e) =>
                    setLifespan(Math.max(0, parseInt(e.target.value, 10) || 0))
                  }
                  min="0"
                  className="w-20 text-center text-lg"
                  aria-label="Expected Lifespan"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 shrink-0 rounded-full"
                  onClick={() => handleLifespanChange(1)}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase lifespan</span>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {weeks.length > 0 && (
        <div className="mt-12 w-full flex justify-center">
          <div className="w-full overflow-x-auto pb-4">
            <div
              className="grid gap-1.5 w-max mx-auto"
              style={{ gridTemplateColumns: "repeat(52, minmax(0, 1fr))" }}
              aria-label={`Life calendar grid, ${weeksLived} weeks lived, ${
                totalWeeks - weeksLived
              } weeks remaining.`}
              role="grid"
            >
              {weeks.map((week, index) => (
                <div
                  key={index}
                  role="gridcell"
                  aria-label={`Week ${week.weekNumber}, ${week.isLived ? 'Lived' : 'Remaining'}`}
                  style={
                    isMounted && week.isLived
                      ? { animationDelay: `${index * 0.0015}s` }
                      : {}
                  }
                  className={cn(
                    "h-3 w-3 rounded-sm transition-colors duration-200",
                    week.isLived
                      ? "bg-primary"
                      : "bg-transparent border border-primary/20",
                    isMounted && week.isLived && "animate-grow-in opacity-0",
                    "hover:bg-accent hover:border-accent"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
