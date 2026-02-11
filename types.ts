export interface Photo {
  id: string;
  url: string;
  caption: string;
}

export interface Quote {
  id: string;
  text: string;
  author?: string;
}

export interface SiteContent {
  hero: {
    title: string;
    subtitle: string;
    buttonText: string;
  };
  musicUrl: string;
  photos: Photo[];
  quotes: Quote[];
  finalMessage: {
    title: string;
    body: string;
    buttonText: string;
  };
}