/**
 * Kartik and Simran. Edit this file to change what guests read.
 *
 * Leave a string as "" and a list as [] until you know the real value.
 * The page still shows that section, marked as a placeholder.
 * Guests will treat whatever you type as fact, so do not guess a
 * venue, a time, a function name, or a story.
 */

export interface WeddingEvent {
  /** Only once this function is confirmed. For example "Mehndi". */
  name: string;
  /** Shown as written, for example "Friday, 26 February 2027". */
  date: string;
  /** Shown as written, for example "4:00 pm". */
  time: string;
  place: string;
  /** https link. "" hides the map link. */
  mapsUrl: string;
  /** Shown next to the colour chip. "" becomes "Dress to be confirmed". */
  dress: string;
  /** A hex colour for the chip, for example "#E39A14". "" keeps an empty chip. */
  dressColor: string;
  /** One practical sentence. "" hides the line. */
  note: string;
}

export interface Stay {
  name: string;
  /** Area, distance, or whatever a guest needs. */
  detail: string;
  /** Hotel or map link. "" hides the link. */
  url: string;
}

export interface FrameImage {
  /**
   * Path inside public/, for example "photos/evening.jpg".
   * Or a full https URL. "" keeps the arched placeholder.
   */
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Wedding {
  partnerOne: string;
  partnerTwo: string;
  /**
   * Gurmukhi spellings of the two names.
   * Leave showGurmukhi false. Spelling to be confirmed by the couple.
   * Do not guess a spelling here.
   */
  showGurmukhi: boolean;
  gurmukhiOne: string;
  gurmukhiTwo: string;
  /**
   * Wedding day as YYYY-MM-DD, or null to hide the countdown and the date.
   * The weekday is calculated. It is not typed by hand.
   */
  date: string | null;
  /**
   * Start time as 24-hour "HH:MM", or null.
   * Null counts down to midnight at the start of the day, and the page says so.
   */
  time: string | null;
  /** Offset of `date` and `time`. "+05:30" is India Standard Time. */
  utcOffset: string;
  /** Shown under the names. "" becomes "City to be announced". */
  city: string;
  /** The hero photograph. src "" keeps the arched placeholder. */
  heroImage: FrameImage;
  /** Short paragraph under the story title. "" leaves the story as a placeholder. */
  intro: string;
  venue: {
    name: string;
    address: string;
    notes: string;
    /** https link. "" hides the map link. */
    mapsUrl: string;
  };
  events: WeddingEvent[];
  travel: {
    notes: string;
    stays: Stay[];
  };
  /** One or two sentences. "" leaves the dress section as a placeholder. */
  dressCode: string;
  /** Each string is a paragraph. [] leaves the story as a placeholder. */
  story: string[];
  faq: { question: string; answer: string }[];
  gallery: FrameImage[];
  /**
   * Replies are a link, not a form hosted here.
   * mode "" keeps the reply section, and it says replies are not open yet.
   * "url": put a Google Form (or any https) link in value. Recommended.
   * "mailto": an email address, not a mailto: string.
   * "whatsapp": country code and number, digits only, for example "919876543210".
   */
  rsvp: {
    mode: "" | "url" | "mailto" | "whatsapp";
    value: string;
    label: string;
    /** Prefilled WhatsApp text. "" opens a blank chat. Ignored for other modes. */
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

  city: "Punjab",

  heroImage: {
    src: "",
    alt: "Photograph to be added",
    width: 900,
    height: 1152,
  },

  intro: "",

  venue: {
    name: "",
    address: "",
    notes: "",
    mapsUrl: "",
  },

  events: [],

  travel: {
    notes: "",
    stays: [],
  },

  dressCode: "",

  story: [],

  faq: [],

  gallery: [
    { src: "", alt: "Photograph to be added", width: 900, height: 1152 },
    { src: "", alt: "Photograph to be added", width: 900, height: 1152 },
    { src: "", alt: "Photograph to be added", width: 900, height: 1152 },
  ],

  rsvp: {
    mode: "",
    value: "",
    label: "Reply",
    whatsappMessage: "",
  },
};
