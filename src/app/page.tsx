import { LifeCalendar } from '@/components/life-calendar';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 pt-8 sm:pt-12 md:pt-24 bg-background">
      <LifeCalendar />
      <div className="w-full max-w-5xl mx-auto mt-16 space-y-12 mb-16">
        <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">
              What is a Memento Mori Calendar?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-card-foreground">
            <p>
              "Memento Mori" is a Latin phrase that translates to "Remember you must die." While it sounds morbid, it's a powerful Stoic concept designed to be a tool for life, not a reason for fear. It serves as a potent reminder that your time is finite, making every moment more valuable.
            </p>
            <p>
              This life calendar visualizes that concept by representing each week of a 90-year life as a small box. As you fill in your age, you see the weeks you've lived and, more importantly, the finite number of weeks you may have left. It's not about dwelling on the end, but about inspiring you to live more fully in the present.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">
              The Stoic Philosophy of Time
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-card-foreground">
            <p>
              Ancient Stoic philosophers like Seneca and Marcus Aurelius frequently wrote about the preciousness of time. They argued that most people are careless with their time, giving it away freely to things that don't matter, yet would fight fiercely if someone tried to take their property.
            </p>
            <p>
              A life-in-weeks calendar is a modern interpretation of this philosophy. By giving you a visceral, visual representation of your life's span, it encourages you to ask important questions: Am I spending my weeks wisely? Am I putting off what's truly important? This form of reflection is a cornerstone of Stoicism, helping you align your daily actions with your long-term values.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">
              How to Use This Tool for Reflection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-card-foreground">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Weekly Check-in:</strong> Spend a few minutes each week looking at your calendar. Acknowledge the passing of another week and reflect on how you spent it.
              </li>
              <li>
                <strong>Goal Setting:</strong> Use the remaining weeks as motivation. Seeing your time laid out can provide a powerful push to start that project, learn that skill, or have that important conversation.
              </li>
              <li>
                <strong>Cultivate Gratitude:</strong> Reflecting on the weeks lived can foster gratitude for the experiences you've had and the time you still have.
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
