import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Sidebar } from "@/components/sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Learning Manager - Organize Your Learning Journey",
  description: "A comprehensive learning management application for active learners and software engineers to efficiently organize and track their learning journey.",
  keywords: ["learning", "education", "Next.js", "TypeScript", "Tailwind CSS", "markdown", "study", "development"],
  authors: [{ name: "Learning Manager Team" }],
  openGraph: {
    title: "Learning Manager",
    description: "Organize and track your learning journey efficiently",
    url: "https://learning-manager.com",
    siteName: "Learning Manager",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learning Manager",
    description: "Organize and track your learning journey efficiently",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <SidebarProvider>
          <div className="flex h-screen w-full">
            <Sidebar />
            <SidebarInset className="flex-1 overflow-auto">
              {children}
            </SidebarInset>
          </div>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
