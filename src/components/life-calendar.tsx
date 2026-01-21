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

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Card className="w-full max-w-sm mx-auto mt-12 bg-card/80 backdrop-blur-sm border-primary/20 shadow-lg">
        <CardHeader>
          <CardTitle className="text-primary">Your Life in Weeks</CardTitle>
          <CardDescription>
            Enter your age and expected lifespan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Current Age</Label>
              <Input
                id="age"
                type="number"
                value={age}
                onChange={(e) =>
                  setAge(Math.max(0, parseInt(e.target.value, 10) || 0))
                }
                min="0"
                className="text-center text-lg"
                aria-label="Current Age"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lifespan">Expected Lifespan</Label>
              <Input
                id="lifespan"
                type="number"
                value={lifespan}
                onChange={(e) =>
                  setLifespan(Math.max(0, parseInt(e.target.value, 10) || 0))
                }
                min="0"
                className="text-center text-lg"
                aria-label="Expected Lifespan"
              />
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
