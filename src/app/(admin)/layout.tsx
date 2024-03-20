import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./../globals.css";
import { Toaster } from "@/components/ui/toaster";
import Sidebar from "@/components/organisms/Sidebar";
import Header from "@/components/organisms/Header";

const openSans = Open_Sans({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={openSans.className}>
        <div className="flex gap-8 w-full">
          <div className="w-2/12 h-screen border-r border-gray-300">
            <Sidebar />
          </div>
          <div className="w-10/12 pr-10 pt-8">
            <Header />
            <main className="py-12">{children}</main>
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
