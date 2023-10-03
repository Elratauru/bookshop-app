import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from '../components/header';
import { Footer } from '../components/footer';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bookmark App",
  description: "Browse a massive list of Books and bookmark your favorites.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
        </body>
    </html>
  );
}
