import type { Metadata } from "next";
import { Book } from "@/components/book/Book";

export const metadata: Metadata = {
  title: "Version livre",
  alternates: { canonical: "/livre/" },
};

export default function LivrePage() {
  return <Book />;
}
