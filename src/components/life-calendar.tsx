"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { toPng } from "html-to-image";
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
import { Minus, Plus, Share2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export function LifeCalendar() {
  const [age, setAge] = useState(25);
  const [lifespan, setLifespan] = useState(90);
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();
  const printableRef = useRef<HTMLDivElement>(null);
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const weeksLived = useMemo(() => Math.floor(age * 52), [age]);
  const totalWeeks = useMemo(() => Math.floor(lifespan * 52), [lifespan]);

  const weeks = useMemo(() => {
    const displayWeeks = Math.max(totalWeeks, weeksLived);
    if (displayWeeks <= 0) return [];
    return Array.from({ length: displayWeeks }, (_, i) => ({
      isLived: i < weeksLived,
      isBeyondLifespan: i >= totalWeeks,
      weekNumber: i + 1,
    }));
  }, [totalWeeks, weeksLived]);

  const handleAgeChange = (amount: number) => {
    const newAge = age + amount;
    setAge(Math.max(0, newAge));
  };

  const handleLifespanChange = (amount: number) => {
    const newLifespan = lifespan + amount;
    setLifespan(Math.max(0, newLifespan));
  };
  
  const handleShare = async () => {
    if (!printableRef.current) return;
    setIsSharing(true);

    const ageInputWrapper = document.getElementById("age-input-wrapper");
    if (ageInputWrapper) {
      ageInputWrapper.style.transition = "filter 0.2s ease";
      ageInputWrapper.style.filter = "blur(5px)";
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 100));

      const dataUrl = await toPng(printableRef.current, {
        cacheBust: true,
        backgroundColor: window.getComputedStyle(document.body).backgroundColor,
        pixelRatio: 2,
      });

      const blob = await fetch(dataUrl).then((res) => res.blob());
      const file = new File([blob], "memento-mori.png", { type: "image/png" });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "Memento Mori Calendar",
          text: "Your life in weeks. A visceral reminder of your most precious resource.",
          files: [file],
        });
      } else {
        const link = document.createElement("a");
        link.download = "memento-mori.png";
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error("Could not share calendar", error);
      toast({
        variant: "destructive",
        title: "Sharing failed",
        description: "Could not generate or share your calendar image.",
      });
    } finally {
      if (ageInputWrapper) {
        ageInputWrapper.style.filter = "";
      }
      setIsSharing(false);
    }
  };


  return (
    <div className="w-full max-w-5xl mx-auto">
      <div ref={printableRef} className="bg-background rounded-lg p-4 sm:p-6 mb-8">
        <div className="w-full max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-extrabold tracking-tight text-primary">
            Memento Mori Calendar
          </h1>
          <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Your life in weeks. A visceral reminder of your most precious resource.
          </p>
        </div>

        <Card className="w-full max-w-md mx-auto mt-8 sm:mt-12 bg-card/80 backdrop-blur-sm border-primary/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-primary">Your Life in Weeks</CardTitle>
            <CardDescription>
              Enter your age and expected lifespan.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div id="age-input-wrapper" className="space-y-2">
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
          <div className="mt-8 sm:mt-12 w-full flex justify-center">
            <div className="w-full overflow-x-auto pb-4">
              <div
                className="grid gap-1.5 w-max mx-auto"
                style={{ gridTemplateColumns: "repeat(52, minmax(0, 1fr))" }}
                aria-label={`Life calendar grid, ${weeksLived} weeks lived, ${
                  totalWeeks > weeksLived ? totalWeeks - weeksLived : 0
                } weeks remaining.`}
                role="grid"
              >
                {weeks.map((week, index) => {
                  const className = cn(
                    "h-3 w-3 rounded-sm transition-colors duration-200",
                    {
                      "bg-primary": week.isLived,
                      "bg-transparent border border-primary/20": !week.isLived,
                      "opacity-30": week.isBeyondLifespan,
                    },
                    isMounted && week.isLived && "animate-grow-in opacity-0",
                    "hover:bg-accent hover:border-accent"
                  );
                  const style = isMounted && week.isLived
                                ? { animationDelay: `${(Math.pow(index / (weeksLived || 1), 2) * 1.5).toFixed(4)}s` }
                                : {};
                  const ariaLabel = `Week ${week.weekNumber}, ${week.isLived ? 'Lived' : 'Remaining'}`;
                  
                  return <div key={index} role="gridcell" aria-label={ariaLabel} style={style} className={className} />;
                })}
              </div>
            </div>
          </div>
        )}
        <p className="mt-8 sm:mt-12 text-sm text-muted-foreground text-center">
          {`You've already spent ${weeksLived.toLocaleString()} weekends. ${totalWeeks > weeksLived ? `You may only have ${(totalWeeks - weeksLived).toLocaleString()} left.` : 'Make them count.'}`}
        </p>
      </div>

      <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-sm border-primary/20 shadow-lg">
        <CardHeader>
            <CardTitle className="text-primary">Share</CardTitle>
            <CardDescription>
                Generate a privacy-safe image of your calendar to share.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="pt-2">
                <Button onClick={handleShare} disabled={isSharing} className="w-full">
                    {isSharing ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                        </>
                    ) : (
                        <>
                            <Share2 className="mr-2 h-4 w-4" />
                            Share Your Calendar
                        </>
                    )}
                </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
