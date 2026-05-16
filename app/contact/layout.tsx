import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Get in Touch",
  description: "Reach out to RoyalFinity Technologies for your next digital project. We're here to help you grow.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
