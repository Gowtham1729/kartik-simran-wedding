/**
 * Kartik and Simran. Edit this file to change what guests read.
 *
 * Leave a string as "" and a list as [] until you know the real value.
 * Hero, Functions, and RSVP always show. Story, Venue, Travel, Dress,
 * Photographs, and Questions stay off until their fields are filled in.
 * sectionFlags() is what the page reads. Filling a field turns that
 * section on. Guests will treat whatever you type as fact, so do not
 * guess a venue, a time, a function name, or a story.
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
  /** Dress note for this function. "" hides the line on a real card. */
  dress: string;
  /** Hex for a round swatch, for example "#E39A14". "" hides the swatch. */
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

export interface SectionFlags {
  story: boolean;
  venue: boolean;
  travel: boolean;
  dress: boolean;
  photographs: boolean;
  questions: boolean;
}

export interface Wedding {
  partnerOne: string;
  partnerTwo: string;
  /**
   * Optional sections. Off by default.
   * A section also turns on by itself once its fields below are filled in.
   */
  sections: SectionFlags;
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
   * Null counts down to midnight at the start of the day.
   */
  time: string | null;
  /** Offset of `date` and `time`. "+05:30" is India Standard Time. */
  utcOffset: string;
  /** A city, once known. "" shows "Punjab, India". */
  city: string;
  /**
   * The hero photograph, masked to the arch.
   * src "" keeps the dusk gradient.
   */
  heroPhoto: FrameImage;
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
   * The RSVP section always shows. The buttons stay hidden until this is open:
   * set mode and value together.
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

export function sectionFlags(w: Wedding = wedding): SectionFlags {
  const text = (value: string) => value.trim().length > 0;
  return {
    story: w.sections.story || text(w.intro) || w.story.some((paragraph) => text(paragraph)),
    venue:
      w.sections.venue ||
      text(w.venue.name) ||
      text(w.venue.address) ||
      text(w.venue.notes) ||
      text(w.venue.mapsUrl),
    travel:
      w.sections.travel ||
      text(w.travel.notes) ||
      w.travel.stays.some((stay) => text(stay.name) || text(stay.detail) || text(stay.url)),
    dress: w.sections.dress || text(w.dressCode),
    photographs: w.sections.photographs || w.gallery.some((image) => text(image.src)),
    questions:
      w.sections.questions || w.faq.some((item) => text(item.question) && text(item.answer)),
  };
}

export const wedding: Wedding = {
  partnerOne: "Kartik",
  partnerTwo: "Simran",

  sections: {
    story: false,
    venue: false,
    travel: false,
    dress: false,
    photographs: false,
    questions: false,
  },

  showGurmukhi: false,
  gurmukhiOne: "",
  gurmukhiTwo: "",

  date: "2027-02-27",
  time: null,
  utcOffset: "+05:30",

  city: "",

  heroPhoto: {
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

  gallery: [],

  rsvp: {
    mode: "",
    value: "",
    label: "RSVP",
    whatsappMessage: "",
  },
};
