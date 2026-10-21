import {
  BookOpen,
  CalendarCheck,
  Clapperboard,
  FileText,
  GraduationCap,
  Handshake,
  HardHat,
  Keyboard,
  Music,
  Newspaper,
  Plane,
  ShieldCheck,
  Store,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import type { SVGProps } from "react";
import type { Interest, Sector, SkillGroup, SocialChannel } from "@/data/cv";

export const interestIcons: Record<Interest, LucideIcon> = {
  Lecture: BookOpen,
  Musique: Music,
  Cinéma: Clapperboard,
  Médias: Newspaper,
  Voyages: Plane,
};

export const sectorIcons: Record<Sector, LucideIcon> = {
  "BTP & Conseil": HardHat,
  Restauration: UtensilsCrossed,
  Assurance: ShieldCheck,
  Formation: GraduationCap,
  Commerce: Store,
  Services: Keyboard,
};

export const skillIcons: Record<SkillGroup["id"], LucideIcon> = {
  admin: FileText,
  orga: CalendarCheck,
  client: Handshake,
};

type IconProps = SVGProps<SVGSVGElement>;

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M3.5 20.5 4.8 16A8.5 8.5 0 1 1 8 19.3L3.5 20.5Z" />
      <path d="M9 8.6c0-.4.3-.8.7-.8h.6c.2 0 .4.1.5.4l.6 1.4c.1.2 0 .5-.1.7l-.5.6a5.6 5.6 0 0 0 2.8 2.8l.6-.5c.2-.2.5-.2.7-.1l1.4.6c.3.1.4.3.4.5v.6c0 .4-.4.7-.8.7A6.9 6.9 0 0 1 9 8.6Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M13.5 21v-7.4h2.5l.4-3h-2.9V8.8c0-.9.3-1.5 1.5-1.5h1.5V4.6c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.3H8v3h2.6V21h2.9Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTokIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M15.6 3c.3 2.1 1.6 3.6 3.9 3.8v3a7 7 0 0 1-3.9-1.2v6.1a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1v3.1a2.6 2.6 0 1 0 1.7 2.4V3h3Z" />
    </svg>
  );
}

export const channelIcons: Record<SocialChannel, (p: IconProps) => React.JSX.Element> = {
  WhatsApp: WhatsAppIcon,
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  TikTok: TikTokIcon,
};
