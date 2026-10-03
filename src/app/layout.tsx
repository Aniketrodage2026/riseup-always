import type { Metadata } from "next";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Jivan Urja | Personalized Ayurvedic Knee Care in Pune", template: "%s | Jivan Urja" },
  description: "Explore personalized, non-surgical Ayurvedic knee care at Jivan Urja Chikitsalaya, Pune. Understand your knee, meet our approach, and request a consultation.",
  openGraph: { title: "Move with greater comfort. Naturally. | Jivan Urja", description: "Personalized Ayurvedic knee care in Pune. Your next step starts with a conversation.", type: "website", locale: "en_IN" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to content</a>{children}</body></html>;
}
