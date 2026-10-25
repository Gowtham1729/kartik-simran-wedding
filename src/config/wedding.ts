/**
 * Kartik and Simran. Edit this file to change what guests read.
 *
 * Photographs live in public/photos/ and are listed again in the README.
 * A line marked MOCK is a stand-in couple. Swap the file, and do not
 * describe that picture as Kartik and Simran.
 *
 * Leave a string as "" until you know the real value. Guests will treat
 * whatever you type as fact, so do not guess a venue, a time, or a story.
 */

export interface Photo {
  /** Path inside public/, for example "photos/hero.webp". */
  src: string;
  /**
   * Same picture, resized for a phone. The browser picks this when the
   * frame is small. Replace it whenever you replace src.
   */
  narrow?: { src: string; width: number };
  alt: string;
  width: number;
  height: number;
  /** Photographer, for the footer. */
  credit: string;
  /** Profile page for that credit. */
  creditUrl: string;
}

export interface Celebration {
  name: string;
  /** false hides this celebration. */
  enabled: boolean;
  /** Shown as written. "" means the date is still to be announced. */
  date: string;
  /** Shown as written, for example "4:00 pm". */
  time: string;
  /** "" means the venue is still to be announced. */
  place: string;
  /** https link. "" hides the map link. */
  mapsUrl: string;
  /** One practical sentence. "" hides the line. */
  note: string;
}

export interface Stay {
  name: string;
  detail: string;
  /** Hotel or map link. "" hides the link. */
  url: string;
}

export interface Wedding {
  partnerOne: string;
  partnerTwo: string;
  /**
   * Gurmukhi spellings. Leave showGurmukhi false until both spellings
   * are confirmed. Do not guess a spelling.
   */
  showGurmukhi: boolean;
  gurmukhiOne: string;
  gurmukhiTwo: string;
  /** Wedding day as YYYY-MM-DD, or null to hide the date and the countdown. */
  date: string | null;
  /** Start time as 24-hour "HH:MM", or null. Null counts down to midnight. */
  time: string | null;
  /** Offset of date and time. "+05:30" is India Standard Time. */
  utcOffset: string;
  /** A city, once known. "" shows "Punjab, India". */
  city: string;
  heroPhoto: Photo;
  heroAccent: Photo;
  storyPhoto: Photo;
  /** Short paragraph under the story title. "" keeps the placeholder. */
  intro: string;
  /** Each string is a paragraph. [] keeps the story placeholder. */
  story: string[];
  celebrations: Celebration[];
  /** Detail photograph beside the celebrations list. */
  celebrationsPhoto: Photo;
  travel: {
    notes: string;
    stays: Stay[];
  };
  gallery: Photo[];
  faq: { question: string; answer: string }[];
  /**
   * Replies are a link, not a form hosted here.
   * The RSVP section always shows. The link stays hidden until mode and value are set.
   * "url": an https link, such as a Google Form.
   * "mailto": an email address, not a mailto: string.
   * "whatsapp": country code and number, digits only, for example "919876543210".
   */
  rsvp: {
    mode: "" | "url" | "mailto" | "whatsapp";
    value: string;
    label: string;
    whatsappMessage: string;
  };
}

export const wedding: Wedding = {
  partnerOne: "Kartik",
  partnerTwo: "Simran",

  showGurmukhi: false,
  gurmukhiOne: "",
  gurmukhiTwo: "",

  date: "2027-02-27",
  time: null,
  utcOffset: "+05:30",

  city: "",

  // MOCK: replace with the couple's photo
  heroPhoto: {
    src: "photos/hero.webp",
    narrow: { src: "photos/hero-720.webp", width: 720 },
    alt: "A bride in a red lehenga and a groom in a turban and sherwani",
    width: 1067,
    height: 1600,
    credit: "Royal Photography",
    creditUrl: "https://unsplash.com/@royalfoto",
  },

  // MOCK: replace with the couple's photo
  heroAccent: {
    src: "photos/accent.webp",
    alt: "A bride and groom standing under a canopy of flowers",
    width: 1067,
    height: 1600,
    credit: "shades by 43",
    creditUrl: "https://unsplash.com/@shades_by_43",
  },

  // MOCK: replace with the couple's photo
  storyPhoto: {
    src: "photos/story.webp",
    alt: "A bride and groom in wedding clothes, standing outdoors",
    width: 1067,
    height: 1600,
    credit: "Suresh Chavan",
    creditUrl: "https://unsplash.com/@741suresh",
  },

  intro: "",
  story: [],

  celebrations: [
    { name: "Mehndi", enabled: true, date: "", time: "", place: "", mapsUrl: "", note: "" },
    { name: "Sangeet", enabled: true, date: "", time: "", place: "", mapsUrl: "", note: "" },
    { name: "Anand Karaj", enabled: true, date: "", time: "", place: "", mapsUrl: "", note: "" },
    { name: "Reception", enabled: true, date: "", time: "", place: "", mapsUrl: "", note: "" },
  ],

  celebrationsPhoto: {
    src: "photos/mehndi.webp",
    alt: "Mehndi on a pair of hands, with red and white bangles and marigolds",
    width: 1600,
    height: 1066,
    credit: "Prajna Amey",
    creditUrl: "https://unsplash.com/@prajna",
  },

  travel: {
    notes: "",
    stays: [],
  },

  gallery: [
    // MOCK: replace with the couple's photo
    {
      src: "photos/gallery-pair.webp",
      alt: "A bride and groom in red and white, holding garlands",
      width: 1067,
      height: 1600,
      credit: "iKshana Productions",
      creditUrl: "https://unsplash.com/@ikshanaproductions",
    },
    {
      src: "photos/marigolds.webp",
      alt: "Marigold garlands hanging at a flower stall",
      width: 1215,
      height: 1600,
      credit: "Zoshua Colah",
      creditUrl: "https://unsplash.com/@zoshuacolah",
    },
    {
      src: "photos/bangles.webp",
      alt: "A stack of red and gold bridal bangles on embroidered fabric",
      width: 1600,
      height: 1066,
      credit: "Hush Naidoo Jade Photography",
      creditUrl: "https://unsplash.com/@hush52",
    },
    {
      src: "photos/drums.webp",
      alt: "Musicians playing traditional Indian drums at a celebration",
      width: 1600,
      height: 1066,
      credit: "Tomás Robertson",
      creditUrl: "https://unsplash.com/@tomasrobertson",
    },
    // MOCK: replace with the couple's photo
    {
      src: "photos/gallery-wide.webp",
      alt: "A smiling bride and groom outdoors in wedding clothes",
      width: 1600,
      height: 1066,
      credit: "Suresh Chavan",
      creditUrl: "https://unsplash.com/@741suresh",
    },
  ],

  faq: [],

  rsvp: {
    mode: "",
    value: "",
    label: "RSVP",
    whatsappMessage: "",
  },
};
