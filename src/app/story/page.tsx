import { StoryFeature } from '@/components/story-feature';
  
  export default function StoryPage() {
    return (
      <main className="flex min-h-screen flex-col items-center p-4 pt-8 sm:pt-12 md:pt-16 bg-background">
        <StoryFeature />
      </main>
    );
  }