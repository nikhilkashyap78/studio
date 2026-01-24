'use client';

import { useState, useMemo, useRef, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Loader2, Share2 } from 'lucide-react';
import { toPng } from 'html-to-image';
import { useToast } from '@/hooks/use-toast';

const WORK_HOURS_PER_MONTH = 160; // Based on 40 hours/week

export function TimeCostCalculator() {
  const [incomeType, setIncomeType] = useState<'hourly' | 'monthly'>('hourly');
  const [incomeValue, setIncomeValue] = useState<number | ''>('');
  const [itemPrice, setItemPrice] = useState<number | ''>('');
  const [isSharing, setIsSharing] = useState(false);
  const { toast } = useToast();
  const printableRef = useRef<HTMLDivElement>(null);

  const hourlyWage = useMemo(() => {
    if (incomeValue === '') return 0;
    if (incomeType === 'hourly') {
      return incomeValue;
    }
    // Convert monthly to hourly
    return incomeValue / WORK_HOURS_PER_MONTH;
  }, [incomeType, incomeValue]);

  const timeCostHours = useMemo(() => {
    if (!itemPrice || !hourlyWage) return 0;
    return itemPrice / hourlyWage;
  }, [itemPrice, hourlyWage]);

  const contextSwap = useMemo(() => {
    if (timeCostHours <= 0) return null;
    const hours = timeCostHours;
    const weeks = hours / 40;
    if (weeks >= 1) {
        return `That's ${weeks.toFixed(1)} full work week${weeks >= 1.5 ? 's' : ''}.`
    }
    const days = hours / 8;
    if (days >= 1) {
        return `That's ${days.toFixed(1)} full work day${days >= 1.5 ? 's' : ''}.`
    }
    const evenings = hours / 4;
    if (evenings >= 1) {
        return `That's about ${evenings.toFixed(1)} evening${evenings >= 1.5 ? 's' : ''} of work.`
    }
    return null;
  }, [timeCostHours]);

  const visualMeterBlocks = useMemo(() => {
    const totalBlocks = 40; // Representing a full work week
    const filledBlocks = Math.min(totalBlocks, Math.ceil(timeCostHours));
    return Array.from({ length: totalBlocks }, (_, i) => i < filledBlocks);
  }, [timeCostHours]);
  
  const emotionalNudges = [
    "Was it worth trading your time?",
    "Would Future-You thank you for this?",
    "Is this an investment or an expense?",
    "Could this time be spent on something more valuable?",
  ];

  const randomNudge = useMemo(() => {
    if (timeCostHours <= 0) return emotionalNudges[0];
    return emotionalNudges[Math.floor(Math.random() * emotionalNudges.length)];
  }, [timeCostHours]);
  
  const handleShare = useCallback(async () => {
    if (!printableRef.current) return;
    setIsSharing(true);
    
    const shareButton = printableRef.current.querySelector('#share-button-wrapper');
    if (shareButton) (shareButton as HTMLElement).style.display = 'none';

    const downloadImage = (url: string) => {
      const link = document.createElement("a");
      link.download = "time-cost.png";
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    try {
      await new Promise((resolve) => setTimeout(resolve, 100));

      const dataUrl = await toPng(printableRef.current, {
        backgroundColor: window.getComputedStyle(document.body).backgroundColor,
        pixelRatio: 2,
      });

      const blob = await fetch(dataUrl).then((res) => res.blob());
      const file = new File([blob], "time-cost.png", { type: "image/png" });
      const shareText = `A purchase of ${itemPrice} costs me ${timeCostHours.toFixed(1)} hours of my life. Was it worth it?`;

      if (navigator.share && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            title: "The True Cost of a Purchase",
            text: shareText,
            files: [file],
          });
        } catch (error) {
          if (error instanceof Error && (error.name === 'AbortError' || error.name === 'NotAllowedError')) {
            downloadImage(dataUrl);
          } else {
            throw error;
          }
        }
      } else {
        downloadImage(dataUrl);
      }
    } catch (error) {
      console.error("Could not generate or share image", error);
      toast({
        variant: "destructive",
        title: "Sharing failed",
        description: "Could not generate or share your time-cost image.",
      });
    } finally {
      if (shareButton) (shareButton as HTMLElement).style.display = 'block';
      setIsSharing(false);
    }
  }, [toast, itemPrice, timeCostHours]);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl font-headline font-extrabold tracking-tight text-primary">
          Time Cost of Your Purchases
        </h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-xl mx-auto">
          This calculator turns a price tag into the most valuable currency: your life hours.
        </p>
      </div>
      
      <Card className="bg-card/80 backdrop-blur-sm border-primary/20 shadow-lg">
        <CardHeader>
          <CardTitle className="text-primary">Calculator</CardTitle>
          <CardDescription>Enter your income and the item's price to see the true cost.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label>How do you track your income?</Label>
            <RadioGroup defaultValue="hourly" value={incomeType} onValueChange={(v) => setIncomeType(v as 'hourly' | 'monthly')} className="grid grid-cols-2 gap-4">
              <div>
                <RadioGroupItem value="hourly" id="hourly" className="peer sr-only" />
                <Label htmlFor="hourly" className="flex items-center justify-center rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                  Hourly Wage
                </Label>
              </div>
              <div>
                <RadioGroupItem value="monthly" id="monthly" className="peer sr-only" />
                <Label htmlFor="monthly" className="flex items-center justify-center rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                  Monthly Salary
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="income">{incomeType === 'hourly' ? 'Hourly Wage' : 'Monthly Salary'} (in your currency)</Label>
              <Input
                id="income"
                type="number"
                placeholder={incomeType === 'hourly' ? 'e.g., 20' : 'e.g., 3200'}
                value={incomeValue}
                onChange={(e) => setIncomeValue(e.target.value === '' ? '' : parseFloat(e.target.value))}
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="item-price">Item Price (in your currency)</Label>
              <Input
                id="item-price"
                type="number"
                placeholder="e.g., 500"
                value={itemPrice}
                onChange={(e) => setItemPrice(e.target.value === '' ? '' : parseFloat(e.target.value))}
                min="0"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {timeCostHours > 0 && incomeValue && itemPrice && (
          <Card ref={printableRef} className="text-center bg-card/80 backdrop-blur-sm border-accent/30 shadow-lg overflow-hidden">
            <CardHeader>
              <CardTitle className="text-accent text-2xl">The True Cost</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-3xl sm:text-4xl font-bold text-foreground">
                This purchase costs you <span className="text-accent">{timeCostHours.toFixed(1)} hours</span> of your life.
              </p>

              {contextSwap && (
                  <p className="text-lg text-muted-foreground">{contextSwap}</p>
              )}

              <div className="pt-4">
                <Label className="text-xs text-muted-foreground">Your work week (40 hours)</Label>
                <div className="mt-2 flex flex-wrap justify-center gap-1 w-full max-w-sm mx-auto">
                  {visualMeterBlocks.map((isFilled, i) => (
                    <div
                      key={i}
                      className={`h-4 w-4 rounded-sm ${isFilled ? 'bg-primary' : 'bg-primary/20'}`}
                      title={`Hour ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="pt-4 space-y-2">
                 <p className="font-semibold text-lg text-primary">"Skip this purchase & gain {timeCostHours.toFixed(1)} free hours."</p>
                 <p className="italic text-muted-foreground text-md">"{randomNudge}"</p>
              </div>
            </CardContent>
            <CardFooter id="share-button-wrapper" className="bg-transparent p-6 pt-0">
                <Button
                  onClick={handleShare}
                  disabled={isSharing}
                  className="w-full"
                >
                  {isSharing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Share2 className="mr-2 h-4 w-4" />
                      Share This Cost
                    </>
                  )}
                </Button>
            </CardFooter>
          </Card>
      )}
    </div>
  );
}
