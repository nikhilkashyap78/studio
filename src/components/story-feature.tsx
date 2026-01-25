"use client";

import { useState, useMemo, useCallback } from "react";
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
import { Progress } from "@/components/ui/progress";

export function StoryFeature() {
  const [age, setAge] = useState(25);
  const [lifespan, setLifespan] = useState(90);

  const percentageLived = useMemo(() => {
    if (lifespan === 0) return 0;
    return (age / lifespan) * 100;
  }, [age, lifespan]);

  const handleAgeChange = useCallback((amount: number) => {
    const newAge = age + amount;
    if (newAge >= 0) {
      setAge(newAge);
    }
  }, [age]);

  const handleLifespanChange = useCallback((amount: number) => {
    const newLifespan = lifespan + amount;
    setLifespan(Math.max(0, newLifespan));
  }, [lifespan]);


  return (
    <div className="w-full max-w-md mx-auto space-y-8">
        <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-headline font-extrabold tracking-tight text-primary">
            Your Life Story in a Progress Bar
            </h1>
            <p className="mt-3 text-lg text-muted-foreground max-w-xl mx-auto">
            Visualize your journey and see how much of your story is yet to be written.
            </p>
        </div>
        <Card id="input-card" className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-sm border-primary/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-primary">Your Story's Timeline</CardTitle>
            <CardDescription>
              Enter your current age and expected lifespan.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div id="age-input-wrapper" className="space-y-2">
                <Label htmlFor="age" className="text-center block">
                  Current Age
                </Label>
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
                <Label htmlFor="lifespan" className="text-center block">
                  Expected Lifespan
                </Label>
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
                      setLifespan(
                        Math.max(0, parseInt(e.target.value, 10) || 0)
                      )
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

        <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-sm border-primary/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-primary">Your Life in a Progress Bar</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-lg sm:text-xl font-semibold text-foreground">
                  You’ve completed{" "}
                  <span className="text-primary font-bold">
                    {percentageLived.toFixed(1)}%
                  </span>{" "}
                  of your life.
                </p>
              </div>
              <Progress value={percentageLived} className="h-3" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0% Complete</span>
                <span>{(100 - percentageLived).toFixed(1)}% Remaining</span>
              </div>
            </div>
          </CardContent>
        </Card>
    </div>
  );
}
