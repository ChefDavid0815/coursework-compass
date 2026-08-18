import type { Metadata } from "next";
import { Providers } from "./providers";
import "@daypicker/react/style.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://coursework-compass-black.vercel.app"),
  title: "Coursework Compass — Know what to do next",
  description: "Turn large coursework into a clear, calm plan — and always know what to do next.",
  applicationName: "Coursework Compass",
  keywords: ["coursework planner", "student planner", "assignment planning", "study planning"],
  openGraph: {
    title: "Coursework Compass — Know what to do next",
    description: "Large coursework becomes clear, calm, manageable work.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body><Providers>{children}</Providers></body>
    </html>
  );
}
