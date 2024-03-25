import type { Metadata } from "next";
import { Inter } from "next/font/google";
import getCurrentUser from '../libs/getCurrentUser';
import "./globals.css";

import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body>
        <NavBar currentUser={currentUser} />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
