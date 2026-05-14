import { services } from "@/data/site";
import { ServiceDetailClient } from "./ServiceDetailClient";
import type { Metadata } from "next";

const slugToId: Record<string, string> = {
  "website-development":    "01",
  "mobile-apps":            "02",
  "digital-marketing":      "03",
  "social-media-marketing": "04",
  "seo":                    "05",
  "google-ads":             "06",
  "content-marketing":      "07",
  "progressive-web-apps":   "08",
  "ui-ux-design":           "09",
  "software-erp-solution":  "10",
  "business-automation":    "11",
};

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ serviceId: string }> 
}): Promise<Metadata> {
  const { serviceId } = await params;
  const id = slugToId[serviceId];
  const service = services.find((s) => s.n === id);

  return {
    title: service ? `${service.title} — RoyalFinity Technologies` : "Service — RoyalFinity Technologies",
    description: service?.tagline ?? "Explore our services.",
  };
}

export default async function ServiceDetailPage({ 
  params 
}: { 
  params: Promise<{ serviceId: string }> 
}) {
  const { serviceId } = await params;
  return <ServiceDetailClient serviceId={serviceId} />;
}
