import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | RoyalFinity Insights",
  description: "Read the latest insights and articles from the RoyalFinity team on technology, design, and growth.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
