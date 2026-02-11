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
    buttonText: "Click Me"
  },

  // 2. Background Music
  // Replace this URL with a link to your partner's favorite romantic song (mp3).
  musicUrl: "/song2.mpeg", // Local music file - plays continuously and repeatedly

  // 3. Photo Gallery
  // Add as many photos as you want. Change the 'url' and 'caption'.
  photos: [
    { id: 'p1', url: '/photos/img6.jpeg', caption: 'The day we first met' },
    { id: 'p2', url: '/photos/img2.jpeg', caption: 'Our first trip together' },
    { id: 'p3', url: '/photos/img3.jpeg', caption: 'Laughing until we cried' },
    { id: 'p4', url: '/photos/img4.jpeg', caption: 'Quiet moments' },
    { id: 'p5', url: '/photos/img5.jpeg', caption: 'Adventures' },
    { id: 'p6', url: '/photos/img1.jpeg', caption: 'Forever my favorite person' },
  ],

  // 4. Romantic Quotes
  // Add your own inside jokes, sweet messages, or famous quotes.
  quotes: [
    {
      id: 'q1',
      text: "I love you not only for what you are, but for what I am when I am with you."
    },
    {
      id: 'q2',
      text: "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine."
    },
    {
      id: 'q3',
      text: "I look at you and see the rest of my life in front of my eyes."
    }
  ],

  // 5. The Final Reveal Message
  finalMessage: {
    title: "To My Forever",
    body: "Thank you for every smile, every laugh, and every beautiful moment we've shared. You make my world brighter just by being in it. I look forward to making a million more memories with you. Happy Valentine's Day, I love you more than words can say. ❤️",
    buttonText: "Replay the Magic"
  }
};
