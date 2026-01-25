import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
  
  export default function StoryPage() {
    return (
      <main className="flex min-h-screen flex-col items-center p-4 pt-8 sm:pt-12 md:pt-16 bg-background">
        <div className="w-full max-w-2xl mx-auto space-y-8">
            <div className="text-center">
                <h1 className="text-4xl sm:text-5xl font-headline font-extrabold tracking-tight text-primary">
                Story
                </h1>
                <p className="mt-3 text-lg text-muted-foreground max-w-xl mx-auto">
                This is the story page.
                </p>
            </div>
        </div>
      </main>
    );
  }