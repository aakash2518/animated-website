import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio — RoyalFinity Technologies",
  description: "Selected work across e-commerce, healthcare, transportation, edtech and fintech.",
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
