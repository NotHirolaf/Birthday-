import type { Metadata } from "next";
import { Lora, Great_Vibes } from "next/font/google";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "A Birthday Letter",
  description: "A special message for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lora.variable} ${greatVibes.variable} antialiased bg-[#fdfbf7] text-[#4a4a4a] overflow-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
