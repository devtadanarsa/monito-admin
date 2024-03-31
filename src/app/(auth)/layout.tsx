import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./../globals.css";
import { Toaster } from "@/components/ui/toaster";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Monito - Authentication",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
