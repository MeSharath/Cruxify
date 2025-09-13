
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
"sapiens": `
### The Cognitive Revolution
Some 70,000 years ago, *Homo sapiens* underwent a Cognitive Revolution, a mysterious change in their cognitive abilities that allowed them to communicate in unprecedented ways. This wasn't just about pointing at a lion; it was about the ability to speak about things that don't exist: myths, gods, laws, and money. This ability to create and believe in "fictions" or shared myths is what allowed Sapiens to cooperate in large numbers.
{{pullquote: "Fiction has enabled us not merely to imagine things, but to do so collectively."}}
This collective imagination allowed for the formation of cities, nations, and corporations. A dollar bill has no objective value; we simply all agree that it does. This was the unique advantage Sapiens had over all other human species, like the Neanderthals.
{{reflection: "What modern 'fictions' or shared beliefs shape your daily life and the society you live in?"}}

### The Agricultural Revolution
About 12,000 years ago, Sapiens began to manipulate the lives of a few animal and plant species. Instead of foraging for wheat, they began to cultivate it. This shift from a nomadic hunter-gatherer lifestyle to a settled agricultural one is what Harari calls "history's biggest fraud." While it led to a population boom, it didn't necessarily lead to a better life for the individual.
{{pullquote: "The Agricultural Revolution was history's biggest fraud."}}
Farmers worked harder than foragers, had a less varied diet, and were more susceptible to disease and famine. In essence, it wasn't Sapiens who domesticated wheat; it was wheat that domesticated Sapiens, forcing us into a more laborious and less fulfilling existence for the sake of multiplying our species' DNA.
{{reflection: "Do you agree with the assessment of the Agricultural Revolution as a 'fraud'? What are the pros and cons of our modern, settled lives?"}}

### The Unification of Humankind
Over the millennia, thousands of distinct human cultures have gradually coalesced into a single global civilization. Three universal orders were the primary drivers of this unification: money, empires, and religion. Money is the most universal system of mutual trust ever devised; it allows people who don't know or trust each other to still cooperate.
{{pullquote: "Money is the most universal and most efficient system of mutual trust ever devised."}}
Empires, though often brutal, assimilated diverse ethnic groups into a common culture. Universal religions like Christianity, Islam, and Buddhism, which claim to hold truths for all people, further eroded local traditions in favor of a shared belief system. Today, we live in a truly global empire, governed by a common elite and a shared culture.
{{reflection: "In what ways do you see money, empire (or global influence), and religion shaping a single global culture today?"}}

### The Scientific Revolution
The last 500 years have been defined by the Scientific Revolution. What made modern science different was the willingness to admit ignorance. Pre-modern traditions assumed all the important answers were already known. Modern science, in contrast, is based on observation, experimentation, and a constant willingness to revise its theories.
{{pullquote: "The great discovery of the Scientific Revolution was the discovery of ignorance."}}
This revolution was inextricably linked to European imperialism and capitalism. The pursuit of knowledge was funded by governments and businesses hoping to gain new powers and profits. Captain Cook's expedition, for example, was both a scientific and an imperial venture.
{{reflection: "How does the 'discovery of ignorance' challenge your own assumptions and beliefs? What are you willing to be wrong about?"}}

### The Rise of Capitalism
Capitalism is not just an economic system; it's a new kind of religion. Its core tenet is that economic growth is the supreme good. This system is built on credit—the idea of investing in the future. For most of history, credit was limited because people didn't believe the future would be better than the present. The idea of progress, born from the Scientific Revolution, changed everything.
{{pullquote: "Capitalism’s belief in perpetual growth flies in the face of the fact that the world and its resources are finite."}}
This system has fueled incredible growth and innovation, lifting millions from poverty. However, it operates without regard for social bonds, environmental impact, or ethical considerations. The free market, if left to its own devices, cannot ensure that profits are gained in a way that doesn't harm society.
{{reflection: "What are the biggest benefits and drawbacks you see from the global dominance of capitalism?"}}

### The Industrial Revolution
The Industrial Revolution was, at its core, a revolution in energy conversion. For millennia, humans relied on muscle power and the energy from plants. The steam engine and, later, the internal combustion engine and electricity, gave us access to almost limitless power. This led to a revolution in production, transportation, and communication.
{{pullquote: "The Industrial Revolution was a second Agricultural Revolution for animals."}}
It also led to the collapse of the family and the local community, which were replaced by the state and the market. The state provided education, healthcare, and welfare, while the market provided jobs and consumer goods. We became individuals, dependent on these large, impersonal systems rather than our families and neighbors.
{{reflection: "How has the decline of the family and local community as the core social unit affected your life?"}}

### A New Global Order
In the 21st century, war is becoming obsolete. For most of history, war was a profitable enterprise for states. You could enrich yourself by looting or annexing territory. Today, wealth is based more on knowledge and complex socio-economic structures than physical resources, making war less profitable. The costs of war—both economic and political—have skyrocketed, while the profits have declined.
{{pullquote: "Peace in the 21st century is not a dream, it is a reality."}}
While conflicts still exist, the major powers are no longer locked in a struggle for survival. A new kind of global peace, based on economic interdependence and the devastating power of nuclear weapons, has emerged. This is an unprecedented development in the history of *Homo sapiens*.
{{reflection: "Do you feel this 'new peace' in your daily life, or does the world still feel like a dangerous place?"}}

### The Future of Sapiens
We are now on the verge of overcoming the very forces of natural selection and replacing them with intelligent design. Through bioengineering, cyborg engineering, and the engineering of non-organic life, we are beginning to upgrade *Homo sapiens* into something new—a post-human or *Homo deus* (Human God).
{{pullquote: "Is there anything more dangerous than dissatisfied and irresponsible gods who don’t know what they want?"}}
This raises profound ethical and philosophical questions. Will these new technologies create a biological caste system? What will be the meaning of human life when our biology and desires can be engineered? We are more powerful than ever before, but we have very little idea of what to do with that power.
{{reflection: "If you could upgrade one aspect of your human abilities, what would it be and why?"}}
`,
"the-almanack-of-naval-ravikant": `
### Understand How Wealth Is Created
Wealth is not a zero-sum game. It's not about taking money from others; it's about creating something new that society wants but doesn't yet know how to get. True wealth creation is a positive-sum game. Look around you. Everything that has been built—from the chair you're sitting on to the device you're reading this on—is a form of wealth that was created.
{{pullquote: "Wealth is the set of things we want that can be created. It's a positive-sum game."}}
Focus on creating wealth, not on getting rich. Getting rich is about status and taking from others. Creating wealth is about providing value. The best way to create wealth is to find your unique talents and apply them in a way that serves others at scale.
{{reflection: "What is something society wants but doesn't yet know how to get, that you could uniquely help create?"}}

### Find and Build Specific Knowledge
Specific knowledge is the knowledge that you cannot be trained for. If society can train you, it can train someone else and replace you. Specific knowledge is found by pursuing your genuine curiosity and passion rather than whatever is hot right now. It's the intersection of your unique talents and your obsessions.
{{pullquote: "Specific knowledge is found by pursuing your innate talents, your genuine curiosity, and your passion."}}
This kind of knowledge feels like play to you but looks like work to others. Because it's unique to you, you can't be easily replaced. This is where your true leverage lies. Build your specific knowledge, and you will build your career.
{{reflection: "What subject do you find yourself reading about for fun, that others might consider work?"}}

### Embrace Accountability
To get rich, you need to take on accountability. Society will reward you for taking on risk and responsibility. The person who is most accountable is the one with their name on the line. They take the credit when things go right and the blame when they go wrong. This is the essence of being a founder or a leader.
{{pullquote: "Embrace accountability, and society will reward you with responsibility, equity, and leverage."}}
Avoid jobs where your inputs and outputs are not directly connected. You want to be in a position where your decisions have a direct impact on the outcome. This is how you build a reputation and gain leverage.
{{reflection: "In what areas of your life could you take on more accountability to increase your potential rewards?"}}

### Build or Buy Equity
You're not going to get rich renting out your time. You must own equity—a piece of a business—to gain your financial freedom. Your time is finite, and you can only work so many hours in a day. Equity is a claim on the future earnings of a business, and it can work for you while you sleep.
{{pullquote: "You're not going to get rich renting out your time. You must own equity."}}
You can own equity by starting a company, being an early employee at a tech startup, or by becoming an investor. In any case, you need to be a part of something that can scale independently of your direct input of time.
{{reflection: "What is one step you can take today to start owning a piece of a business, no matter how small?"}}

### Find a Position of Leverage
Leverage is the force multiplier for your judgment. There are three main forms of leverage. The first is labor, which is other people working for you. This is the oldest and most contested form of leverage. The second is capital, which is money. This is a more recent and powerful form of leverage.
{{pullquote: "Leverage is a force multiplier for your judgment."}}
The third, and most powerful, is "products with no marginal cost of replication." This includes media (books, podcasts, videos) and code. You can create a piece of software or a podcast once, and it can serve millions of people with no additional cost. This is the leverage of the new rich.
{{reflection: "Which form of leverage (labor, capital, or media/code) is most accessible to you right now, and how can you start using it?"}}

### Learn to Sell, Learn to Build
If you can do both, you will be unstoppable. Learning to build means understanding technology and being able to create a product or service. Learning to sell means being able to communicate the value of what you've built to others. These are the two most important skills for an entrepreneur.
{{pullquote: "The two great skill sets are building and selling."}}
Most people can only do one. If you can do both, you have a massive advantage. If you can only do one, you need to partner with someone who can do the other. A great team is often a builder and a seller.
{{reflection: "Are you more of a builder or a seller? What is one thing you can do this week to improve your weaker skill?"}}

### Happiness Is a Choice
Happiness is not something that you find; it's something that you create. It's a skill that you can learn. It's the default state of a mind that is not constantly lost in thought about the past or the future. The desire for external things is what robs you of your happiness.
{{pullquote: "Happiness is the state when nothing is missing."}}
The key to happiness is to be present. The more you can live in the present moment, the happier you will be. Meditation and mindfulness are practices that can help you cultivate this skill. But ultimately, happiness is about wanting what you already have.
{{reflection: "What is one desire you can let go of today to increase your sense of peace and happiness?"}}

### Reading Is Faster Than Listening
If you want to learn, read. Reading is the fastest way to absorb information. It's faster than listening to a podcast or watching a video because you can read at your own pace and easily skip over parts you already know. The foundation of learning is reading.
{{pullquote: "The foundation of learning is reading."}}
Read what you love until you love to read. Don't feel obligated to finish a book you're not enjoying. The goal is to make reading a habit. Read foundational texts in science, math, and philosophy. These will give you a strong framework for understanding the world.
{{reflection: "What book have you been meaning to read? Can you commit to reading just the first chapter this week?"}}
`,
"thinking-fast-and-slow": `
### Two Systems
Our minds are governed by two systems of thinking. System 1 is fast, intuitive, and emotional. It operates automatically and quickly, with little or no effort. This is your gut reaction. System 2 is slow, deliberate, and logical. It's the conscious, reasoning self that has beliefs, makes choices, and decides what to think about and what to do.
{{pullquote: "System 1 is the hero of the book."}}
Most of our lives are run by System 1. We make snap judgments and decisions based on heuristics and biases. System 2 is lazy and often defers to System 1. The key to better thinking is to know when to trust your gut (System 1) and when to engage in more effortful thought (System 2).
{{reflection: "Can you think of a recent decision you made? Was it primarily driven by System 1 or System 2? How do you know?"}}

### Heuristics and Biases
Our minds use heuristics, or mental shortcuts, to make decisions quickly and efficiently. While these are often useful, they can lead to systematic errors in judgment, known as cognitive biases. For example, the *availability heuristic* makes us overestimate the likelihood of events that are easily recalled, such as dramatic news stories.
{{pullquote: "We are blind to our blindness. We have too much confidence in what we believe we know."}}
Another is the *anchoring effect*, where we rely too heavily on the first piece of information offered. If a car is first priced at $50,000 and then offered for $40,000, it seems like a great deal, even if its true value is much lower. Recognizing these biases is the first step to overcoming them.
{{reflection: "Where have you seen the anchoring effect influence a negotiation or purchase in your own life?"}}

### Overconfidence and the Illusion of Validity
We have a tendency to be overconfident in our judgments and abilities. This is fueled by the *illusion of validity*—our belief that our judgments are accurate, even in the face of evidence to the contrary. Experts are often no better at making predictions than chance, but they are more confident in their wrong predictions.
{{pullquote: "The confidence people have in their beliefs is not a measure of the quality of evidence but of the coherence of the story the mind has managed to construct."}}
We construct coherent stories to make sense of the world, but we often fail to account for the role of randomness and luck. We see patterns where none exist. To combat this, we should be more humble about what we think we know.
{{reflection: "In what area of your life might you be overconfident? What could you do to test your assumptions?"}}

### The Focusing Illusion
"Nothing in life is as important as you think it is when you are thinking about it." This is the essence of the *focusing illusion*. When we are asked to evaluate something, we tend to give too much weight to one particular aspect, ignoring all others. For example, when people are asked if living in California would make them happier, they focus on the climate and ignore the many other factors that contribute to happiness.
{{pullquote: "Nothing in life is as important as you think it is when you are thinking about it."}}
This illusion can lead to poor decisions, as we chase after things that we believe will make us happy but ultimately have little impact on our overall well-being.
{{reflection: "What is something you are currently focused on that might be disproportionately affecting your mood or decisions?"}}

### Prospect Theory
Prospect Theory describes how people make decisions under uncertainty. It has two main components. First, people are *loss averse*: we feel the pain of a loss more strongly than the pleasure of an equivalent gain. Losing $100 feels worse than gaining $100 feels good.
{{pullquote: "Losses loom larger than gains."}}
Second, our decisions are influenced by a *reference point*. We evaluate outcomes as gains or losses relative to this point. This is why a pay cut feels so much worse than a smaller-than-expected raise, even if the final salary is the same. Understanding prospect theory can help explain many seemingly irrational economic behaviors.
{{reflection: "How has loss aversion affected a financial decision you've made, such as holding on to a losing stock for too long?"}}

### The Two Selves
We have two selves: the *experiencing self* and the *remembering self*. The experiencing self is the one that lives in the present moment. The remembering self is the one that constructs the story of our lives. The remembering self is the one that makes decisions.
{{pullquote: "The remembering self is a storyteller."}}
Crucially, the remembering self is dominated by two things: the peak (most intense moment) and the end of an experience. The duration of the experience is largely ignored (this is called *duration neglect*). This is why a wonderful vacation can be ruined by a bad ending, and why we are willing to endure pain for a rewarding peak-end experience.
{{reflection: "Think about a past vacation. What moments does your 'remembering self' focus on? Are they the peak and the end?"}}

### WYSIATI: What You See Is All There Is
Our minds are masters at creating coherent stories from limited information. We take the information that is immediately available—"what you see"—and treat it as if it's "all there is." System 1 is not prone to doubt. It jumps to conclusions based on the evidence at hand, without considering the evidence it doesn't have.
{{pullquote: "We're blind to our blindness. We have too much confidence in what we believe we know and our apparent ability to predict the future."}}
This leads to overconfidence and a failure to appreciate the complexity of the world. We need to actively engage System 2 to ask, "What information am I missing? What are the alternative explanations?"
{{reflection: "When you form a strong first impression of someone, how could the WYSIATI principle be at play?"}}

### The Power of Framing
The way a problem is framed can have a massive impact on our decisions. A choice presented as a gain will be treated differently from the exact same choice presented as a loss. For example, people are more likely to support an economic policy if it's framed as having a "90% employment rate" than if it's framed as having a "10% unemployment rate."
{{pullquote: "How a problem is framed can determine the outcome."}}
This is because of loss aversion. The "unemployment" frame triggers our fear of loss. Marketers, politicians, and advertisers are masters of framing. To make better decisions, we need to be aware of how choices are presented to us and try to reframe them in different ways.
{{reflection: "Can you think of an advertisement or news headline that uses framing to influence your opinion?"}}
`,
"why-we-sleep": `
### Sleep Is the Third Pillar of Health
For decades, we've been told that diet and exercise are the two pillars of good health. But we now know there is a third: sleep. Sleep is not an optional luxury; it's a non-negotiable biological necessity. It is your life-support system and Mother Nature's best effort yet at immortality.
{{pullquote: "Sleep is the single most effective thing we can do to reset our brain and body health each day."}}
Routinely sleeping less than six or seven hours a night demolishes your immune system, more than doubling your risk of cancer. Insufficient sleep is a key lifestyle factor determining whether or not you will develop Alzheimer's disease. Every major disease in the developed world has causal links to a lack of sleep.
{{reflection: "Do you treat sleep as a priority, or is it the first thing you sacrifice when you're busy?"}}

### The Two Systems That Regulate Sleep
Your sleep is controlled by two main systems. The first is the *circadian rhythm*, your internal 24-hour clock. It's managed by a master clock in your brain called the suprachiasmatic nucleus. This clock creates a natural rhythm of sleepiness and wakefulness. It's why you feel tired at night and alert during the day.
{{pullquote: "Your circadian rhythm is your internal 24-hour clock."}}
The second system is *sleep pressure*. From the moment you wake up, a chemical called adenosine begins to build up in your brain. The longer you are awake, the more adenosine accumulates, and the more "sleep pressure" you feel. When you sleep, your brain clears out the adenosine, relieving the pressure. Caffeine works by blocking adenosine receptors.
{{reflection: "How aware are you of your own circadian rhythm? Do you feel more energetic at certain times of the day?"}}

### The Stages of Sleep
Sleep is not a single, uniform state. It's a complex dance through several different stages. We cycle through two main types of sleep: NREM (Non-Rapid Eye Movement) and REM (Rapid Eye Movement). NREM is further divided into stages of light and deep sleep. Deep NREM sleep is like a neurological cleanup crew, flushing out metabolic waste and transferring new memories to long-term storage.
{{pullquote: "Deep sleep is like a power cleanse for the brain."}}
REM sleep, on the other hand, is when most of our vivid dreaming occurs. It's a state of "paradoxical" sleep, where your brain is highly active, but your body is paralyzed. REM sleep is crucial for emotional regulation, creativity, and problem-solving.
{{reflection: "Do you ever wake up feeling like you've just solved a problem in your sleep? That's the power of REM."}}

### The Dangers of Sleep Deprivation
The consequences of not getting enough sleep are severe and wide-ranging. In the short term, it impairs attention, concentration, and decision-making. A person who is sleep-deprived for just one night will perform as poorly on cognitive tests as someone who is legally drunk.
{{pullquote: "After 20 hours of being awake, you are as cognitively impaired as someone who is legally drunk."}}
Long-term, chronic sleep deprivation is linked to a host of health problems, including obesity, diabetes, cardiovascular disease, depression, anxiety, and a weakened immune system. It ages you, makes you less attractive, and is a major contributor to accidents on our roads.
{{reflection: "Have you ever tried to 'power through' on little sleep? Looking back, how effective were you?"}}

### Why We Dream
Dreaming during REM sleep is not just a random firing of neurons. It's a form of overnight therapy. During REM sleep, our brain re-processes emotional experiences from the day, but in a neurochemical environment that is free from the stress-inducing molecule noradrenaline. This allows us to strip the emotion away from the memory.
{{pullquote: "REM sleep is emotional first aid."}}
This is why we can recall difficult memories without reliving the emotional trauma. Dreaming also fosters creativity by creating novel connections between disparate ideas. It's a form of informational alchemy.
{{reflection: "Have you ever had a recurring dream? What do you think your brain might be trying to process?"}}

### The Impact of Modern Life on Sleep
Our modern world is in a catastrophic sleep-loss epidemic. Several factors are to blame. First, the constant glow of electric lights, especially the blue light from LED screens, suppresses the release of melatonin, the hormone that signals sleep. Second, the societal glorification of long work hours and the stigma against getting enough sleep.
{{pullquote: "We are living in a dark-deprived world."}}
Third, the widespread use of caffeine and alcohol. While many people use alcohol as a sleep aid, it is actually a sedative. It fragments your sleep, suppressing REM sleep in particular. It's one of the most powerful suppressors of REM sleep that we know of.
{{reflection: "What is one thing in your evening routine (e.g., screen time, late-night snack) that might be harming your sleep?"}}

### The Myth of the 8-Hour Sleep Need
The common advice to get 8 hours of sleep is a good rule of thumb, but it's not a one-size-fits-all prescription. The amount of sleep we need varies between individuals and across our lifespan. However, the vast majority of adults need between 7 and 9 hours of sleep per night to function optimally.
{{pullquote: "The number of people who can survive on 6 hours of sleep or less without showing any impairment, rounded to a whole number and expressed as a percentage, is zero."}}
There is a very rare gene that allows some people to thrive on less sleep, but it's present in less than 1% of the population. For the other 99%, trying to get by on less than 7 hours of sleep is a recipe for poor health and performance.
{{reflection: "Are you honest with yourself about how much sleep you truly need to feel your best?"}}

### How to Improve Your Sleep
The good news is that you can improve your sleep hygiene. Here are some key tips. **1. Stick to a regular sleep schedule:** Go to bed and wake up at the same time every day, even on weekends. **2. Create a cool, dark, and quiet sleeping environment.** Your brain needs darkness to produce melatonin. **3. Avoid caffeine and alcohol, especially in the evening.** **4. Don't lie in bed awake.** If you can't sleep after 20 minutes, get up and do something relaxing until you feel sleepy. **5. Get natural daylight exposure in the morning.** This helps to anchor your circadian rhythm.
{{pullquote: "Consistency is king when it comes to sleep."}}
{{reflection: "Which of these sleep hygiene tips would be the easiest for you to implement starting tonight?"}}
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
