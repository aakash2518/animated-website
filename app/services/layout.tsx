import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — RoyalFinity Technologies",
  description: "Experience our services through an immersive 3D journey.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
