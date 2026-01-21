import { LifeCalendar } from '@/components/life-calendar';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 pt-12 sm:pt-16 md:pt-24 bg-background">
      <div className="w-full max-w-7xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-extrabold tracking-tight text-primary">
          Memento Mori Calendar
        </h1>
        <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
          Your life in weeks. A visceral reminder of your most precious resource.
        </p>
      </div>

      <LifeCalendar />

      <p className="mt-12 text-sm text-muted-foreground">
        Every box is one week you’ll never get back.
      </p>
    </main>
  );
}
