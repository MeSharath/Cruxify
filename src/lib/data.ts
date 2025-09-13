
export type Book = {
  id: string;
  title: string;
  author: string;
  coverImageUrl: string;
  imageHint: string;
  status: "processed" | "processing";
};

export type UserStats = {
  weeklyStreak: number;
  longestStreak: number;
};

export const books: Book[] = [
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    coverImageUrl: "https://picsum.photos/seed/101/400/600",
    imageHint: "book cover",
    status: "processed",
  },
  {
    id: "sapiens",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    coverImageUrl: "https://picsum.photos/seed/102/400/600",
    imageHint: "book cover art",
    status: "processed",
  },
  {
    id: "the-almanack-of-naval-ravikant",
    title: "The Almanack of Naval Ravikant",
    author: "Eric Jorgenson",
    coverImageUrl: "https://picsum.photos/seed/103/400/600",
    imageHint: "book cover design",
    status: "processed",
  },
  {
    id: "thinking-fast-and-slow",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    coverImageUrl: "https://picsum.photos/seed/104/400/600",
    imageHint: "book design",
    status: "processed",
  },
  {
    id: "why-we-sleep",
    title: "Why We Sleep",
    author: "Matthew Walker",
    coverImageUrl: "https://picsum.photos/seed/105/400/600",
    imageHint: "cover art",
    status: "processed",
  },
];

export const userStats: UserStats = {
  weeklyStreak: 0,
  longestStreak: 0,
};

export const summaries: Record<string, string> = {
  "atomic-habits": `
### The Power of 1% Better
The core idea of Atomic Habits is that small, incremental improvements compound over time to produce remarkable results. Clear argues that we should focus on getting 1% better every day rather than chasing massive, overnight success. This approach avoids burnout and makes progress sustainable. Start with a habit that is "so easy you can't say no." For example, read one page of a book each day.
{{pullquote: "Habits are the compound interest of self-improvement."}}
Use the "Two-Minute Rule": When starting a new habit, it should take less than two minutes to do. Track your habits to build momentum and see the compounding effect visually.
{{reflection: "What is one small habit you could start today that would be 'so easy you can't say no'?"}}

### The Four Laws of Behavior Change
To build good habits and break bad ones, you need to understand the four-step pattern that habits follow: cue, craving, response, and reward. Clear translates this into four practical laws. For building good habits, you should: **1. Make it Obvious:** Design your environment to make cues for good habits visible. Want to read more? Put a book on your pillow. **2. Make it Attractive:** Pair an action you *want* to do with an action you *need* to do. This is called "temptation bundling." **3. Make it Easy:** Reduce a habit's friction. The less energy it requires, the more likely it is to happen. **4. Make it Satisfying:** Give yourself an immediate reward when you complete your habit. This closes the habit loop.
{{pullquote: "You do not rise to the level of your goals. You fall to the level of your systems."}}
{{reflection: "How can you redesign your environment to make the cues for your desired habits more obvious?"}}

### Identity-Based Habits
The most effective way to change your habits is to focus on who you wish to become, not just what you want to achieve. The goal isn't to *read a book*, it's to *become a reader*. Every action you take is a vote for the type of person you wish to be. Define the type of person you want to be (e.g., "I am a healthy person," "I am a writer"). Ask yourself, "What would a healthy person do?" Use this to guide your small, daily actions. Celebrate every small win as proof of your new identity.
{{pullquote: "Every action you take is a vote for the type of person you wish to become."}}
{{reflection: "What identity are you trying to build, and what's one small action you can take today that would cast a vote for that identity?"}}

### The Plateau of Latent Potential
Change is often not linear. When you start a new habit, there's often a period where you don't see immediate results. This is the "Plateau of Latent Potential." It's the valley of disappointment where people get discouraged and quit. The key is to persist through this phase. The most powerful outcomes are delayed. It's the work you put in during this plateau that unlocks the breakthrough.
{{pullquote: "The most powerful outcomes of any compounding process are delayed. You need to be patient."}}
{{reflection: "Have you ever quit something because you didn't see immediate results? How might the Plateau of Latent Potential reframe that experience?"}}

### Environment Design
Your environment is the invisible hand that shapes your human behavior. Clear emphasizes that self-control is a short-term strategy, not a long-term one. A more reliable way to change your habits is to be the architect of your environment. Want to eat healthier? Don't just rely on willpower; place healthy foods in plain sight and hide or discard junk food. Make the cues for your good habits obvious and the cues for your bad habits invisible.
{{pullquote: "You can't rely on being a different person in the same environment."}}
{{reflection: "What is one change you could make to your environment *today* to make a good habit easier or a bad habit harder?"}}

### The Goldilocks Rule
To maintain motivation, you must work on tasks of "just manageable difficulty." Not too hard, not too easy—just right. The Goldilocks Rule states that humans experience peak motivation when working on tasks that are right on the edge of their current abilities. If it's too easy, you'll get bored. If it's too hard, you'll get discouraged. This is a key to long-term habit adherence.
{{pullquote: "The greatest threat to success is not failure but boredom."}}
{{reflection: "Think about a habit you're trying to build. Is it too easy or too hard? How could you adjust it to be of 'just manageable difficulty'?"}}

### Habit Stacking
A powerful strategy for building new habits is to anchor them to existing ones. This is called "habit stacking." The formula is: "After [CURRENT HABIT], I will [NEW HABIT]." For example, "After I pour my cup of coffee each morning, I will meditate for one minute." This uses the momentum of an established habit to carry you into the new one.
{{pullquote: "The secret to building a new habit is to make it feel like it's part of your routine already."}}
{{reflection: "What is one existing habit you could 'stack' a new desired habit on top of?"}}

### Never Miss Twice
Everyone makes mistakes. The key is not to let one slip-up derail you completely. Clear's rule is "never miss twice." If you miss a day of your habit, make it a priority to get back on track with the next opportunity. One missed workout is an anomaly; two is the beginning of a new (bad) habit. This mindset allows for imperfection without abandoning your long-term goals.
{{pullquote: "The first mistake is never the one that ruins you. It is the spiral of repeated mistakes that follows."}}
{{reflection: "How can the 'never miss twice' rule help you be more forgiving and resilient in your habit-building journey?"}}
`,
};

// Add empty summaries for other books to avoid errors
books.forEach((book) => {
  if (!summaries[book.id]) {
    summaries[
      book.id
    ] = `### Summary for ${book.title}\nSummary for ${book.title} is not yet available. Please check back later.`;
  }
});
