import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Flame, Star, BookCheck, Trophy } from "lucide-react";
import { userStats } from "@/lib/data";

export function HabitTrackerCard() {
  const stats = [
    {
      icon: Flame,
      label: "Weekly Streak",
      value: `${userStats.weeklyStreak} days`,
      color: "text-orange-400",
    },
    {
      icon: Trophy,
      label: "Longest Streak",
      value: `${userStats.longestStreak} days`,
      color: "text-yellow-400",
    },
    {
      icon: BookCheck,
      label: "Books Completed",
      value: userStats.booksCompleted,
      color: "text-green-400",
    },
    {
      icon: Star,
      label: "Badges Earned",
      value: userStats.badges.length,
      color: "text-sky-400",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Progress</CardTitle>
        <CardDescription>
          Keep up the great work and build your learning habit!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center text-center space-y-2 p-4 bg-secondary rounded-lg"
            >
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
