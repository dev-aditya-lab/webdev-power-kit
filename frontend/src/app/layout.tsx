import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WebDev Power Kit — Docs",
  description:
    "Official documentation for webdev-power-kit. A powerful, modular TypeScript toolkit simplifying browser APIs — clipboard, battery, notifications, geolocation, network, storage & more.",
  keywords: [
    "webdev-power-kit",
    "browser api",
    "clipboard",
    "battery api",
    "notifications",
    "geolocation",
    "npm package",
    "typescript",
    "javascript",
    "web utilities",
    "developer tools",
  ],
  authors: [{ name: "Aditya Kumar Gupta", url: "https://github.com/dev-aditya-lab" }],
  openGraph: {
    title: "WebDev Power Kit — Documentation",
    description:
      "The ultimate browser API toolkit for modern web developers. TypeScript-first, zero dependencies.",
    type: "website",
    url: "https://github.com/dev-aditya-lab/webdev-power-kit",
  },
  twitter: {
    card: "summary_large_image",
    title: "WebDev Power Kit — Docs",
    description: "The ultimate browser API toolkit for modern web developers.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
