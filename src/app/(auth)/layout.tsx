import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./../globals.css";
import { Toaster } from "@/components/ui/toaster";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
  const cookieStore = cookies();
  const jwtToken = cookieStore.get("jwtToken");

  if (jwtToken) {
    redirect("/admin");
  }

  return (
    <html lang="en">
      <body className={openSans.className}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
