import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Our Story & Vision",
  description: "Learn about RoyalFinity Technologies, our mission, values, and the team driving digital innovation.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
