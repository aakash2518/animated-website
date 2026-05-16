import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | Our Recent Work",
  description: "Explore the premium digital solutions we've built for high-end clients across various industries.",
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
