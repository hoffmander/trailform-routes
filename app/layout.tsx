import type { Metadata, Viewport } from "next";
import "./tokens.css";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Trailform Routes",
    template: "%s · Trailform Routes",
  },
  description:
    "Draw or upload an off-road route, share one link, and everyone downloads it into their own GPS app.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "oklch(98.5% 0.004 80)" },
    { media: "(prefers-color-scheme: dark)", color: "oklch(17% 0.008 80)" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
