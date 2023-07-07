import "./globals.css";
import { Open_Sans } from "next/font/google";

const opensans = Open_Sans({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={opensans.className}>
        <header className="flex justify-center">
          <h1 className="p-4 text-2xl text-center font-black">EMOGUESSR</h1>
        </header>
        <main className="h-full flex flex-col">{children}</main>
      </body>
    </html>
  );
}
