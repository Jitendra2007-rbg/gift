import { SiteContent } from './types';

// ==========================================
// 💌 HOW TO CUSTOMIZE THIS WEBSITE 💌
// ==========================================
// Replace the text, image URLs, and music URL below with your own content.
// For images, you can use local paths (e.g., './images/photo1.jpg') if you 
// place them in your project folder, or use direct URLs.

export const CONTENT: SiteContent = {
  // 1. Landing Page Text
  hero: {
    title: "Our Beautiful Journey",
    subtitle: "Every love story is beautiful, but ours is my absolute favorite.",
    buttonText: "Enter Our Story"
  },

  // 2. Background Music
  // Replace this URL with a link to your partner's favorite romantic song (mp3).
  musicUrl: "https://actions.google.com/sounds/v1/water/rain_on_roof.ogg", // Using a safe placeholder sound

  // 3. Photo Gallery
  // Add as many photos as you want. Change the 'url' and 'caption'.
  photos: [
    { id: 'p1', url: 'https://picsum.photos/seed/love1/800/800', caption: 'The day we first met' },
    { id: 'p2', url: 'https://picsum.photos/seed/love2/800/1000', caption: 'Our first trip together' },
    { id: 'p3', url: 'https://picsum.photos/seed/love3/1000/800', caption: 'Laughing until we cried' },
    { id: 'p4', url: 'https://picsum.photos/seed/love4/800/800', caption: 'Quiet moments' },
    { id: 'p5', url: 'https://picsum.photos/seed/love5/800/1200', caption: 'Adventures' },
    { id: 'p6', url: 'https://picsum.photos/seed/love6/1200/800', caption: 'Forever my favorite person' },
  ],

  // 4. Romantic Quotes
  // Add your own inside jokes, sweet messages, or famous quotes.
  quotes: [
    {
      id: 'q1',
      text: "I love you not only for what you are, but for what I am when I am with you.",
      author: "Roy Croft"
    },
    {
      id: 'q2',
      text: "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.",
      author: "Maya Angelou"
    },
    {
      id: 'q3',
      text: "I look at you and see the rest of my life in front of my eyes.",
      author: "Unknown"
    }
  ],

  // 5. The Final Reveal Message
  finalMessage: {
    title: "To My Forever",
    body: "Thank you for every smile, every laugh, and every beautiful moment we've shared. You make my world brighter just by being in it. I look forward to making a million more memories with you. Happy Valentine's Day, I love you more than words can say. ❤️",
    buttonText: "Replay the Magic"
  }
};
