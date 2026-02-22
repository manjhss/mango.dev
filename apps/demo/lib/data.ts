import type { Translated } from "@mango.dev/core";
import type { Lang } from "@/lib/constants";

// post shape
export interface Post {
  username: string;
  title: string;
  description: string;
}

export type TranslatedPost = Translated<
  Post,
  "username", // non-translatable fields
  Lang
>;

export const POSTS: Post[] = [
  {
    username: "manjhss",
    title: "The Future of Artificial Intelligence",
    description:
      "AI is reshaping industries — from healthcare to finance, helping humans decide faster, automate more, and uncover insights at scale.",
  },
  {
    username: "coco",
    title: "Why Open Source is Eating the World",
    description:
      "Open source is no longer just a movement — it powers the internet, drives innovation, and gives developers the freedom to build without boundaries.",
  },
];

export const TRANSLATED_POSTS: TranslatedPost[] = [
  {
    username: "manjhss",
    title: {
      en: "The Future of Artificial Intelligence",
      hi: "आर्टिफिशियल इंटेलिजेंस का भविष्य",
      fr: "L'avenir de l'intelligence artificielle",
    },
    description: {
      en: "AI is reshaping industries — from healthcare to finance, helping humans decide faster, automate more, and uncover insights at scale.",
      hi: "AI उद्योगों को नया रूप दे रहा है — स्वास्थ्य सेवा से वित्त तक, मनुष्यों को तेज़ी से निर्णय लेने, अधिक स्वचालित करने और बड़े पैमाने पर अंतर्दृष्टि उजागर करने में मदद कर रहा है।",
      fr: "L'IA redessine les industries — de la santé à la finance, aidant les humains à décider plus vite, à automatiser davantage et à révéler des insights à grande échelle.",
    },
  },
  {
    username: "coco",
    title: {
      en: "Why Open Source is Eating the World",
      hi: "ओपन सोर्स दुनिया को क्यों बदल रहा है",
      fr: "Pourquoi l'open source conquiert le monde",
    },
    description: {
      en: "Open source is no longer just a movement — it powers the internet, drives innovation, and gives developers the freedom to build without boundaries.",
      hi: "ओपन सोर्स अब केवल एक आंदोलन नहीं है — यह इंटरनेट को शक्ति देता है, नवाचार को गति देता है और डेवलपर्स को बिना सीमाओं के बनाने की स्वतंत्रता देता है।",
      fr: "L'open source n'est plus seulement un mouvement — il alimente internet, stimule l'innovation et offre aux développeurs la liberté de créer sans limites.",
    },
  },
];
