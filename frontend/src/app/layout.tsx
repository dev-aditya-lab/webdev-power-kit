import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";

export const metadata: Metadata = {
  title: { default: "WebDev Power Kit", template: "%s · WebDev Power Kit" },
  description:
    "The ultimate TypeScript browser API toolkit. Clipboard, battery, geolocation, notifications, storage, network & more — zero dependencies, fully typed.",
  keywords: ["webdev-power-kit","browser api","clipboard","battery","notifications","geolocation","npm","typescript","javascript","web utilities"],
  authors: [{ name: "Aditya Kumar Gupta", url: "https://devaditya.dev" }],
  openGraph: {
    title: "WebDev Power Kit — Docs",
    description: "The ultimate TypeScript browser API toolkit. Zero dependencies, fully typed.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:ital,wght@0,400;0,500;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
