import type { Metadata, Viewport } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "RoyalFinity Technologies — Digital growth, simplified.",
    template: "%s | RoyalFinity Technologies"
  },
  description: "Web, app, branding, AI and marketing — RoyalFinity Technologies builds what your business needs to grow.",
  keywords: ["Web Development", "Mobile Apps", "Digital Marketing", "AI Automation", "Branding", "UI/UX Design", "Faridabad", "India"],
  authors: [{ name: "RoyalFinity Team" }],
  creator: "RoyalFinity Technologies",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://royalfinitytechnologies.com",
    siteName: "RoyalFinity Technologies",
    title: "RoyalFinity Technologies — Digital growth, simplified.",
    description: "Web, app, branding, AI and marketing — RoyalFinity Technologies builds what your business needs to grow.",
    images: [
      {
        url: "/assets/logo.png",
        width: 1200,
        height: 630,
        alt: "RoyalFinity Technologies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RoyalFinity Technologies — Digital growth, simplified.",
    description: "Web, app, branding, AI and marketing — RoyalFinity Technologies builds what your business needs to grow.",
    images: ["/assets/logo.png"],
  },
  icons: {
    icon: "/assets/logo.png",
    shortcut: "/assets/logo.png",
    apple: "/assets/logo.png",
  },
  metadataBase: new URL("https://royalfinitytechnologies.com"),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
