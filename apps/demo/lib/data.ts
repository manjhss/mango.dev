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
  {
    username: "nora",
    title: "The Rise of Sustainable Technology",
    description:
      "Sustainable tech is transforming energy, agriculture, and cities — helping reduce emissions, optimize resources, and build a cleaner, smarter future.",
  },
  {
    username: "leo",
    title: "The Power of Data in Decision Making",
    description:
      "Data-driven thinking is guiding modern organizations — enabling smarter strategies, better predictions, and clearer understanding of complex problems.",
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
  {
    username: "nora",
    title: {
      en: "The Rise of Sustainable Technology",
      hi: "सस्टेनेबल टेक्नोलॉजी का उदय",
      fr: "L'essor des technologies durables",
    },
    description: {
      en: "Sustainable tech is transforming energy, agriculture, and cities — helping reduce emissions, optimize resources, and build a cleaner, smarter future.",
      hi: "सस्टेनेबल टेक ऊर्जा, कृषि और शहरों को बदल रहा है — उत्सर्जन घटाने, संसाधनों का बेहतर उपयोग करने और स्वच्छ, स्मार्ट भविष्य बनाने में मदद कर रहा है।",
      fr: "La technologie durable transforme l'énergie, l'agriculture et les villes — aidant à réduire les émissions, optimiser les ressources et bâtir un avenir plus propre et intelligent.",
    },
  },
  {
    username: "leo",
    title: {
      en: "The Power of Data in Decision Making",
      hi: "निर्णय लेने में डेटा की शक्ति",
      fr: "La puissance des données dans la prise de décision",
    },
    description: {
      en: "Data-driven thinking is guiding modern organizations — enabling smarter strategies, better predictions, and clearer understanding of complex problems.",
      hi: "डेटा-आधारित सोच आधुनिक संगठनों का मार्गदर्शन कर रही है — बेहतर रणनीतियाँ, सटीक भविष्यवाणियाँ और जटिल समस्याओं की स्पष्ट समझ संभव बना रही है।",
      fr: "La réflexion basée sur les données guide les organisations modernes — permettant des stratégies plus intelligentes, de meilleures prédictions et une compréhension claire des problèmes complexes.",
    },
  },
];
