import "./globals.css";
import { Open_Sans } from "next/font/google";
import Link from "next/link";

import { Providers } from "./providers";
import Header from "@/components/Header";

const opensans = Open_Sans({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body className={`${opensans.className} latte dark:frappe bg-base text-text`}>
        <Providers>
          <Header />
          <main className="h-full flex flex-col">{children}</main>
          <footer className="p-2 flex justify-evenly">
            <Link
              className="underline"
              href="https://github.com/impucky/emo-guessr/"
              target="_blank"
            >
              Github
            </Link>
            <div>
              Heavily inspired by{" "}
              <Link className="underline" href="https://emovicon.app/">
                Emovicon
              </Link>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
