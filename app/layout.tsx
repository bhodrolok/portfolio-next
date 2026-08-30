import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono} from "next/font/google";

import "./globals.css";

// Fonts 

const JetBrainsMono = JetBrains_Mono({
  variable: "--font-jb-mono",
  subsets: ["latin"],
  weight: "400"
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // TODO: use a config file (data dir?) for beter management of setting metadata
  title: "Hello world",
  description: "Yet another personal portfolio developed using NextJS, Tailwind, etc...",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={ 
        `${JetBrainsMono.variable} 
        ${geistMono.variable} 
        h-full 
        antialiased`}
    >

      <body className="flex min-h-screen flex-col">
        <main className="relative flex-1 pt-14">
          {children}
        </main>
      </body>

    </html>
  );
}
