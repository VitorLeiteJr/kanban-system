import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const ubuntu = Ubuntu({ subsets: ["latin"], 
  weight: ["300","400","500","700"] });

export const metadata: Metadata = {
  title: "Kanban System",
  description: "Kanban System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={ubuntu.className}>{children}</body>
    </html>
    </ClerkProvider>
  );
}
