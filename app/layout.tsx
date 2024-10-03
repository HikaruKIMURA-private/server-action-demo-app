import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-dvh`}
      >
        <header className="h-16 gap-4 border-b px-6 flex items-center">
          <Button asChild variant="ghost" className="font-bold text-xl">
            <Link href="/">LOGO</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/about">about</Link>
          </Button>
        </header>
        {children}
        <footer className="h-16 sticky top-full border-t px-6 flex items-center">
          footer
        </footer>
      </body>
    </html>
  );
}
