import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Started — Mango.dev",
  description: "Add multilingual support to your app in minutes. Step-by-step guide to integrating Mango.dev with your Next.js project.",
};

export default function GetStartedLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
