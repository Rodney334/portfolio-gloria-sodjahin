import { identity } from "@/data/cv";

export const whatsappMessage =
  "Bonjour Gloria, j'ai consulté votre portfolio et je souhaiterais échanger avec vous.";

export const whatsappHref = `https://wa.me/${identity.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

/** L'adresse n'apparaît jamais en clair dans le HTML statique : elle est assemblée à l'exécution. */
export function getEmail() {
  return identity.emailParts.join("@");
}

export function telHref(phone: string) {
  return `tel:${phone.replace(/\s/g, "")}`;
}

export const pdfHref = "/gloria-sodjahin-cv.pdf";
export const pdfFileName = "Gloria-SODJAHIN-CV.pdf";
