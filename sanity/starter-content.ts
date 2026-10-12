/**
 * Starter content for the Maveelight site.
 * Used in two places:
 *  1. scripts/seed.ts copies it into the Sanity dashboard.
 *  2. The website shows it as a built-in fallback until Sanity is connected.
 * Keep this file free of Node-only imports so the website can use it.
 */

let keyCounter = 0;
export const key = () => `k${(keyCounter++).toString(36)}`;

/**
 * Turns plain lines into Sanity rich text.
 * "## Title" becomes a heading, "- item" becomes a bullet, anything else a paragraph.
 */
export function toBlocks(lines: string[]) {
  return lines.map((line) => {
    let style = "normal";
    let text = line;
    let listItem: string | undefined;

    if (line.startsWith("## ")) {
      style = "h2";
      text = line.slice(3);
    } else if (line.startsWith("- ")) {
      listItem = "bullet";
      text = line.slice(2);
    }

    return {
      _type: "block",
      _key: key(),
      style: listItem ? "normal" : style,
      markDefs: [],
      ...(listItem ? { listItem, level: 1 } : {}),
      children: [{ _type: "span", _key: key(), text, marks: [] }],
    };
  });
}

export const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMG = {
  portrait: "photo-1573496359142-b8d87734a5a2",
  desk: "photo-1499750310107-5fef28a66643",
  notebook: "photo-1455390582262-044cdead277a",
  laptop: "photo-1486312338219-ce68d2c6f44d",
  meeting: "photo-1542744173-8e7e53415bb0",
  team: "photo-1522202176988-66273c2fd55f",
  cowork: "photo-1504384308090-c894fdcc538d",
  collab: "photo-1553877522-43269d4ea984",
  workspace: "photo-1519389950473-47ba0277781c",
};

export const services = [
  {
    title: "LinkedIn Ghostwriting",
    description:
      "Weekly posts written in your voice that position you as the go-to person in your field.",
    icon: "PenTool",
  },
  {
    title: "Content Strategy",
    description:
      "A clear plan for what to post, when to post it and why, built around your goals.",
    icon: "Compass",
  },
  {
    title: "Carousel Copy",
    description:
      "Scroll-stopping slide copy that teaches, persuades and gets saved.",
    icon: "GalleryHorizontal",
  },
  {
    title: "Social Media Captions",
    description:
      "Sharp, on-brand captions for Instagram, X and Facebook.",
    icon: "MessageSquare",
  },
];

export const testimonials = [
  {
    name: "Tolu A.",
    role: "Startup Founder",
    quote:
      "Maveelight turned my scattered ideas into posts people actually comment on. I got two client calls in the first month.",
  },
  {
    name: "Daniel O.",
    role: "Business Consultant",
    quote:
      "She sounds exactly like me, only sharper. I stopped dreading LinkedIn.",
  },
  {
    name: "Amaka E.",
    role: "Career Coach",
    quote: "Consistent, creative and quick. My engagement has doubled.",
  },
];

export const samples = [
  {
    id: "sample-bio-posts",
    title: "Nobody Reads Your Bio, They Read Your Posts",
    category: "LinkedIn Post",
    image: IMG.desk,
    results: "32K impressions, 410 reactions",
    excerpt:
      "Why consistent posting proves your expertise faster than any headline or bio ever could.",
    body: [
      "Nobody reads your bio.",
      "I know, it hurts. You spent an hour on that headline.",
      "Here is what actually happens. Someone lands on your profile, scrolls straight past the About section and clicks on your posts. That is where they decide if you know your stuff.",
      "Your bio says you are an expert. Your posts show it.",
      "A bio is a claim. A post is proof.",
      "So if you want more clients, stop polishing the headline and start showing how you think. Share the mistake you saw a client make this week. Explain the framework you use every time. Say the unpopular thing your industry whispers about.",
      "One good post a week does more for your credibility than a perfect profile ever will.",
      "When did you last check what your last five posts say about you?",
    ],
  },
  {
    id: "sample-lost-client",
    title: "I Lost a Client and It Taught Me This",
    category: "LinkedIn Post",
    image: IMG.notebook,
    results: "58K impressions, 920 reactions",
    excerpt:
      "A story-led post about what went wrong with a client and the one communication habit that fixed it.",
    body: [
      "Last year I lost my biggest client.",
      "The work was good. The results were good. We still parted ways.",
      "Why? Because I assumed they knew what I was doing.",
      "I went quiet for two weeks while I was deep in the work. In my head I was being productive. In their head I had disappeared.",
      "They never said they were unhappy. They just stopped replying faster and faster, and then they stopped replying at all.",
      "Here is what I do now:",
      "- A short update every Friday, even when nothing big happened",
      "- A clear next step at the end of every message",
      "- One honest line about anything that is behind schedule",
      "Silence feels like safety when you are busy. To the other person, it feels like risk.",
      "Great work you never explain looks a lot like no work.",
      "Who is waiting to hear from you right now?",
    ],
  },
  {
    id: "sample-hooks-carousel",
    title: "5 Hooks That Stop the Scroll",
    category: "Carousel",
    image: IMG.laptop,
    results: "1,200 saves, 85K impressions",
    excerpt:
      "A six-slide carousel that teaches five opening lines you can steal for your next post.",
    body: [
      "Slide 1: 5 hooks that stop the scroll (steal them)",
      "Slide 2: The Contrarian. Start with something most people in your industry would disagree with. Example: \"Posting every day is hurting your brand.\"",
      "Slide 3: The Number. Specifics beat vague claims every time. Example: \"I rewrote 100 LinkedIn posts. Only 7 mattered.\"",
      "Slide 4: The Confession. People lean in when you admit something real. Example: \"My first 50 posts got almost no views.\"",
      "Slide 5: The Question. Ask something your reader is already asking themselves. Example: \"Why does nobody comment on your posts?\"",
      "Slide 6: Save this for your next draft, then tell me which hook you will try first.",
    ],
  },
  {
    id: "sample-founder-voice",
    title: "Why Founders Should Stop Hiding Behind the Company Page",
    category: "Ghostwriting",
    image: IMG.meeting,
    results: "41K impressions, 7 inbound leads",
    excerpt:
      "A ghostwritten post in a founder's voice about why people follow people, not logos.",
    body: [
      "Our company page has 800 followers.",
      "My personal profile has 12,000.",
      "Same business. Same product. Very different reach.",
      "For two years I told myself the brand should do the talking. It felt more professional. It felt safer.",
      "It was also invisible.",
      "People do not fall in love with logos. They trust faces, stories and opinions. When I started sharing what we were learning, the mistakes included, the DMs started coming in.",
      "Last quarter, seven of our new customers said they first heard about us from my posts.",
      "Your company page is a brochure. Your personal profile is a conversation.",
      "If you are a founder, which one are you relying on to build trust?",
    ],
  },
  {
    id: "sample-monday-captions",
    title: "Monday Motivation Without the Cringe",
    category: "Social Caption",
    image: IMG.cowork,
    results: "4.2% engagement rate",
    excerpt:
      "Three caption options for a Monday post that sound human instead of like a poster.",
    body: [
      "Option 1: Monday does not need you to be a new person. It just needs you to do one thing you have been avoiding. Pick it. Start it. Ten minutes counts.",
      "Option 2: Hot take: your Monday plan is too big. Cut it in half, do it properly and enjoy having the energy left on Friday.",
      "Option 3: New week, same goals, slightly better systems. What is the one thing you are fixing this week?",
    ],
  },
  {
    id: "sample-three-part-structure",
    title: "The 3-Part Structure Behind My Best Posts",
    category: "LinkedIn Post",
    image: IMG.workspace,
    results: "27K impressions, 340 comments",
    excerpt:
      "The simple hook, value and takeaway structure behind posts that actually get read to the end.",
    body: [
      "Every post I write that does well follows the same three parts.",
      "Part 1: The hook. One line that makes the right person stop. If it is boring, nothing else matters.",
      "Part 2: The value. A story, a lesson or a step-by-step. Something the reader can use today, not someday.",
      "Part 3: The takeaway. One clear sentence they could repeat to a friend.",
      "That is it. No fancy formatting. No 10 hashtags.",
      "When a post flops, I can almost always point to the part that was missing. Usually it is the takeaway, because I got excited and forgot to land the plane.",
      "Next time you write, check all three before you hit publish.",
      "Which part do you usually skip?",
    ],
  },
];

export const posts = [
  {
    id: "post-linkedin-hook",
    title: "How to Write a LinkedIn Hook in 10 Seconds",
    image: IMG.desk,
    tags: ["LinkedIn", "Writing tips"],
    daysAgo: 5,
    excerpt:
      "Your first line decides whether anyone reads the rest. Here is a simple way to write one quickly, without staring at a blank screen.",
    body: [
      "The first line of your post is not an introduction. It is an advertisement for the rest of the post.",
      "On LinkedIn, people only see about two lines before the \"see more\" button. If those lines do not earn the click, the best post in the world stays unread.",
      "## The 10-second method",
      "Take the main point of your post and ask yourself one question: what is the most surprising or specific version of this?",
      "Say your point is that consistency matters more than talent. That is true, but nobody stops scrolling for it. Now make it specific: \"I posted 90 days in a row and my worst post got more reach than my best one.\" Now people want to know why.",
      "## Three quick checks",
      "- Is it specific? Numbers, names and details beat general statements.",
      "- Is it about the reader? They should feel \"that is me\" within a few words.",
      "- Does it open a loop? Make them curious enough to need the next line.",
      "## What to avoid",
      "Do not start with \"I am excited to announce\" or \"In today's fast-paced world\". Readers have seen both a thousand times and their thumbs are already moving.",
      "Write your hook last if you are stuck. Once the post exists, the strongest line is often hiding in the middle, waiting to be moved to the top.",
      "A hook is not a trick. It is respect for your reader's time. Give them a reason to stay, then make sure the post pays it off.",
    ],
  },
  {
    id: "post-content-calendar",
    title: "The Content Calendar That Actually Gets Followed",
    image: IMG.notebook,
    tags: ["Strategy", "Consistency"],
    daysAgo: 19,
    excerpt:
      "Most content calendars fail by week two. This simple version is built for busy people who still want to show up every week.",
    body: [
      "Most content calendars die in the second week. They look impressive in a spreadsheet and feel impossible by Wednesday.",
      "The problem is almost never discipline. It is that the calendar was built for an imaginary person with unlimited time.",
      "## Start with three posts a week",
      "Not seven. Three. One that teaches, one that tells a story and one that shares an opinion. That mix keeps your audience learning, connecting and talking back.",
      "## Pick fixed days",
      "Choose the same days every week, for example Monday, Wednesday and Friday. Fixed days remove the daily question of whether to post and replace it with a habit.",
      "## Batch your writing",
      "Write all three posts in one sitting, ideally on Sunday evening or Monday morning. Writing in one session is faster because your brain stays in the same gear.",
      "## Keep an ideas list",
      "Every time a client asks a question, a mistake teaches you something or you disagree with an article, add one line to a note on your phone. When it is time to write, you will never start from nothing.",
      "## Review monthly, not daily",
      "Check what worked once a month. Daily numbers will only make you anxious. Look for patterns across thirty days instead.",
      "A calendar you follow at 70 percent beats a perfect one you abandon. Start small and let it grow.",
    ],
  },
  {
    id: "post-posting-daily",
    title: "Why Posting Daily Is Not the Answer",
    image: IMG.laptop,
    tags: ["LinkedIn", "Strategy"],
    daysAgo: 33,
    excerpt:
      "Everyone says you must post every day to grow. Here is why quality and clarity quietly beat volume.",
    body: [
      "You have probably heard it a hundred times: post every single day or the algorithm will forget you.",
      "It sounds like a rule. In practice, it is advice that burns people out and fills feeds with posts nobody remembers.",
      "## Volume without a point is noise",
      "When you have to publish daily, you start publishing anything. The posts get thinner, the ideas get recycled and your audience slowly learns to scroll past you.",
      "## What actually grows an audience",
      "- A clear point of view people can recognise in two seconds",
      "- Posts that help or move the right readers, not everyone",
      "- Showing up on a rhythm you can keep for a year, not a month",
      "## A better target",
      "Aim for two to four strong posts a week. Spend the time you save replying to comments, because conversations tell the platform, and your readers, that you are worth listening to.",
      "## When daily does make sense",
      "If you enjoy it, have enough to say and have the time, daily posting can work well. Just make it a choice, not a punishment.",
      "Growth comes from being useful over a long time. Pick the rhythm that lets you stay useful.",
    ],
  },
];


/** Starter text for Site Settings (used by the seed script and the built-in fallback). */
export const starterSettings = {
  portraitAlt: "Portrait of Maveelight, content writer",
  heroHeadline: "Content that makes people stop scrolling and start reaching out.",
  heroSubheadline:
    "I'm Maveelight, a content writer who helps founders and professionals turn their ideas into LinkedIn and social posts that build trust, attract clients and grow their personal brand.",
  stats: [
    { value: "120+", label: "Posts written" },
    { value: "40+", label: "Happy clients" },
    { value: "5M+", label: "Impressions generated" },
  ],
  aboutTitle: "Quiet ideas deserve loud content",
  aboutLines: [
    "I started writing because I noticed something simple. The people with the best ideas were often the quietest online.",
    "I help them find their voice, shape their story and show up consistently, without sounding like everyone else.",
    "My process is simple: I listen, I write in your voice, and I focus on content that earns attention and leads to real conversations.",
  ],
  beliefs: [
    "Your voice beats any template",
    "Consistency beats virality",
    "Every post should have one clear job",
  ],
  // Sample contact details. She can change all of these in the dashboard.
  email: "hello@maveelight.com",
  phone: "+234 800 000 0000",
  whatsappNumber: "+234 800 000 0000",
  location: "Abuja, Nigeria",
  linkedinUrl: "https://www.linkedin.com/in/maveelight",
  xUrl: "https://x.com/maveelight",
  instagramUrl: "https://instagram.com/maveelight",
  seoTitle: "Maveelight | LinkedIn and Social Media Content Writer",
  seoDescription:
    "Maveelight helps founders and professionals turn their ideas into LinkedIn and social posts that build trust, attract clients and grow their personal brand.",
};
