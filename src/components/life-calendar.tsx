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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";

export function LifeCalendar() {
  const [age, setAge] = useState(25);
  const [lifespan, setLifespan] = useState(90);
  const [isMounted, setIsMounted] = useState(false);
  const [showMilestones, setShowMilestones] = useState({
    birth: true,
    eighteen: true,
    graduation: true,
    today: true,
  });
  const [isBrutal, setIsBrutal] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const weeksLived = useMemo(() => Math.floor(age * 52), [age]);
  const totalWeeks = useMemo(() => Math.floor(lifespan * 52), [lifespan]);

  const weeks = useMemo(() => {
    if (totalWeeks <= 0 && weeksLived <= 0) return [];
    const displayWeeks = Math.max(totalWeeks, weeksLived);
    return Array.from({ length: displayWeeks }, (_, i) => ({
      isLived: i < weeksLived,
      isBeyondLifespan: i >= totalWeeks,
      weekNumber: i + 1,
    }));
  }, [totalWeeks, weeksLived]);

  const handleAgeChange = (amount: number) => {
    setAge((prev) => Math.max(0, prev + amount));
  };

  const handleLifespanChange = (amount: number) => {
    setLifespan((prev) => Math.max(0, prev + amount));
  };

  const getMilestoneText = (weekNumber: number) => {
    const milestones = [];
    if (showMilestones.birth && weekNumber === 1) milestones.push("Birth");
    if (showMilestones.eighteen && weekNumber === 18 * 52) milestones.push("18th Birthday");
    if (showMilestones.graduation && weekNumber === 22 * 52) milestones.push("Graduation (age 22)");
    if (showMilestones.today && weekNumber === weeksLived) milestones.push("Today");
    return milestones.join(', ');
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Card className="w-full max-w-md mx-auto mt-8 sm:mt-12 bg-card/80 backdrop-blur-sm border-primary/20 shadow-lg">
        <CardHeader>
          <CardTitle className="text-primary">Your Life in Weeks</CardTitle>
          <CardDescription>
            Enter your age and expected lifespan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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

      <Card className="w-full max-w-md mx-auto mt-8 bg-card/80 backdrop-blur-sm border-primary/20 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-primary">Personal Milestones</CardTitle>
          <CardDescription>
            Toggle optional markers on your calendar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 pt-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="birth" checked={showMilestones.birth} onCheckedChange={(checked) => setShowMilestones(prev => ({ ...prev, birth: !!checked }))} />
              <Label htmlFor="birth" className="text-sm font-normal leading-none cursor-pointer">Birth</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="eighteen" checked={showMilestones.eighteen} onCheckedChange={(checked) => setShowMilestones(prev => ({ ...prev, eighteen: !!checked }))} />
              <Label htmlFor="eighteen" className="text-sm font-normal leading-none cursor-pointer">18th Birthday</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="graduation" checked={showMilestones.graduation} onCheckedChange={(checked) => setShowMilestones(prev => ({ ...prev, graduation: !!checked }))} />
              <Label htmlFor="graduation" className="text-sm font-normal leading-none cursor-pointer">Graduation</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="today" checked={showMilestones.today} onCheckedChange={(checked) => setShowMilestones(prev => ({ ...prev, today: !!checked }))} />
              <Label htmlFor="today" className="text-sm font-normal leading-none cursor-pointer">Today</Label>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="w-full max-w-md mx-auto mt-8 bg-card/80 backdrop-blur-sm border-primary/20 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-primary">Copy Mode</CardTitle>
          <CardDescription>
            Switch between soft and brutal reminders.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 pt-2">
            <Switch id="brutal-mode" checked={isBrutal} onCheckedChange={setIsBrutal} />
            <Label htmlFor="brutal-mode" className="text-sm font-normal leading-none cursor-pointer">Enable Brutal Copy</Label>
          </div>
        </CardContent>
      </Card>

      {weeks.length > 0 && (
        <div className="mt-8 sm:mt-12 w-full flex justify-center">
          <div className="w-full overflow-x-auto pb-4">
            <div
              className="grid gap-1.5 w-max mx-auto"
              style={{ gridTemplateColumns: "repeat(52, minmax(0, 1fr))" }}
              aria-label={`Life calendar grid, ${weeksLived} weeks lived, ${
                totalWeeks - weeksLived
              } weeks remaining.`}
              role="grid"
            >
              {weeks.map((week, index) => {
                const milestoneText = getMilestoneText(week.weekNumber);
                const isMilestone = milestoneText.length > 0;

                const className = cn(
                  "h-3 w-3 rounded-sm transition-colors duration-200",
                  {
                    "bg-accent": isMilestone && (week.isLived || week.weekNumber === weeksLived),
                    "border-2 border-accent": isMilestone && !week.isLived && week.weekNumber !== weeksLived,
                    "bg-primary": !isMilestone && week.isLived,
                    "bg-transparent border border-primary/20": !isMilestone && !week.isLived,
                    "opacity-30": week.isBeyondLifespan,
                  },
                  isMounted && week.isLived && !isMilestone && "animate-grow-in opacity-0",
                  "hover:bg-accent hover:border-accent"
                );
                const style = isMounted && week.isLived
                              ? { animationDelay: `${(Math.pow(index / (weeksLived || 1), 2) * 1.5).toFixed(4)}s` }
                              : {};
                const ariaLabel = `Week ${week.weekNumber}, ${week.isLived ? 'Lived' : 'Remaining'}${isMilestone ? `, Milestone: ${milestoneText}` : ''}`;
                
                if (isMilestone) {
                  return (
                    <TooltipProvider key={index} delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div role="gridcell" aria-label={ariaLabel} style={style} className={className} />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{milestoneText}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  );
                }
                
                return <div key={index} role="gridcell" aria-label={ariaLabel} style={style} className={className} />;
              })}
            </div>
          </div>
        </div>
      )}
      <p className="mt-8 sm:mt-12 text-sm text-muted-foreground text-center">
        {isBrutal
          ? `You've already spent ${weeksLived.toLocaleString()} weekends. ${totalWeeks > weeksLived ? `You may only have ${(totalWeeks - weeksLived).toLocaleString()} left.` : 'Make them count.'}`
          : "Every box is one week you’ll never get back."}
      </p>
    </div>
  );
}
