import { monthsBetween } from "@/data/cv";

const MONTHS = [
  "Janv.",
  "Févr.",
  "Mars",
  "Avr.",
  "Mai",
  "Juin",
  "Juil.",
  "Août",
  "Sept.",
  "Oct.",
  "Nov.",
  "Déc.",
];

const MONTHS_LONG = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

export function formatMonth(iso: string, long = false) {
  const [y, m] = iso.split("-").map(Number);
  return `${(long ? MONTHS_LONG : MONTHS)[m - 1]} ${y}`;
}

export function formatPeriod(start: string, end: string, long = false) {
  return `${formatMonth(start, long)} – ${formatMonth(end, long)}`;
}

export function formatDuration(start: string, end: string) {
  const total = monthsBetween(start, end);
  const years = Math.floor(total / 12);
  const months = total % 12;
  const parts: string[] = [];
  if (years) parts.push(`${years} an${years > 1 ? "s" : ""}`);
  if (months) parts.push(`${months} mois`);
  return parts.join(" ");
}

export function yearOf(iso: string) {
  return iso.slice(0, 4);
}
