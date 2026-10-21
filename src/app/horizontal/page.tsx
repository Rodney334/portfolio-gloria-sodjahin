import type { Metadata } from "next";
import { HorizontalPortfolio } from "@/components/horizontal/HorizontalPortfolio";

export const metadata: Metadata = {
  title: "Version horizontale",
  alternates: { canonical: "/horizontal/" },
};

export default function HorizontalPage() {
  return <HorizontalPortfolio />;
}
