/**
 * Kartik and Simran. Edit this file to change what guests read.
 *
 * Leave a string as "" and a list as [] until you know the real value.
 * Empty essential fields (city, venue, schedule, reply) show as
 * "To be announced" or "Not open yet". Empty optional sections
 * (story, travel, dress, questions, photographs) are left off the page.
 *
 * Do not invent a city, venue, ceremony, or story here. Guests will
 * treat whatever you type as fact.
 */

export interface WeddingEvent {
  name: string;
  /** Shown as written, for example "Saturday, 27 February 2027". */
  date: string;
  /** Shown as written, for example "6:30 pm". */
  time: string;
  place: string;
  /** One practical sentence. Leave "" to hide the line. */
  note: string;
}

export interface Stay {
  name: string;
  /** Area, distance, or whatever a guest needs. */
  detail: string;
  /** Hotel or map link. "" hides the link. */
  url: string;
}

export interface GalleryImage {
  /** Path inside public/, for example "photos/evening.jpg". Or a full https URL. */
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Wedding {
  partnerOne: string;
  partnerTwo: string;
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
  /** Short paragraph under Details. "" hides it. */
  intro: string;
  venue: {
    name: string;
    address: string;
    notes: string;
    /** Google Maps (or any) link. "" hides the map link. */
    mapsUrl: string;
  };
  events: WeddingEvent[];
  travel: {
    notes: string;
    stays: Stay[];
  };
  /** One or two sentences. "" hides the dress row. */
  dressCode: string;
  /** Each string is a paragraph. [] hides the story. */
  story: string[];
  faq: { question: string; answer: string }[];
  gallery: GalleryImage[];
  /**
   * Replies are a link, not a form hosted here.
   * mode "" hides the reply link.
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

  date: "2027-02-27",
  time: null,
  utcOffset: "+05:30",

  city: "Punjab",

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

  gallery: [],

  rsvp: {
    mode: "",
    value: "",
    label: "Reply",
    whatsappMessage: "",
  },
};
