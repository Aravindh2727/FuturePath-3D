export const messages = {
  en: {
    nav_home: "Home",
    nav_streams: "Streams",
    nav_departments: "Departments",
    nav_explore: "Explore 3D",
    nav_compare: "Compare",
    nav_quiz: "Quiz",
    nav_favorites: "Favorites",
    nav_parent: "Parent",
    cta_view_details: "View details",
    cta_save: "Save",
    cta_saved: "Saved",
  },
  ta: {
    nav_home: "முகப்பு",
    nav_streams: "பாடப்பிரிவுகள்",
    nav_departments: "துறைகள்",
    nav_explore: "3D ஆய்வு",
    nav_compare: "ஒப்பிடு",
    nav_quiz: "வினாடி வினா",
    nav_favorites: "பிடித்தவை",
    nav_parent: "பெற்றோர்",
    cta_view_details: "விவரங்களைப் பார்",
    cta_save: "சேமி",
    cta_saved: "சேமிக்கப்பட்டது",
  },
} as const;

export type MessageKey = keyof typeof messages["en"];

export const t = (lang: "en" | "ta", key: MessageKey) => messages[lang]?.[key] ?? messages.en[key];
