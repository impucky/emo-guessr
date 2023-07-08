import "./globals.css";
import { Open_Sans } from "next/font/google";
import Link from "next/link";

import { Providers } from "./providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const opensans = Open_Sans({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body className={`${opensans.className} latte dark:frappe bg-base text-text`}>
        <Providers>
          <Header />
          <main className="h-full flex flex-col">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
