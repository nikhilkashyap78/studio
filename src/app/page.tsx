import { LifeCalendar } from '@/components/life-calendar';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 pt-8 sm:pt-12 md:pt-24 bg-background">
      <LifeCalendar />
    </main>
  );
}
