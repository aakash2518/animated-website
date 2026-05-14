import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — RoyalFinity Technologies",
  description: "Start a project. Get a quote. Talk to the team.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
