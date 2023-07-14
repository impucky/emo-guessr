import "./globals.css";
import { Open_Sans } from "next/font/google";

import { Analytics } from "@vercel/analytics/react";

import { Providers } from "./providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "🎮EMOGUESSR🎮",
  description: "Can you guess the video game behind these emojis ?",
};

const opensans = Open_Sans({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${opensans.className} flex flex-col latte dark:frappe bg-base text-text transition`}
      >
        <Providers>
          <Header />
          <main className="grow flex flex-col">{children}</main>
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
