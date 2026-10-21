/**
 * Source de données unique du portfolio.
 * Les 4 versions (verticale, horizontale, livre, CV imprimable) lisent ce fichier.
 * Contenu repris à l'identique des CV de Gloria SODJAHIN — ne rien inventer.
 */

export type Sector =
  | "BTP & Conseil"
  | "Restauration"
  | "Assurance"
  | "Formation"
  | "Commerce"
  | "Services";

export type SocialChannel = "WhatsApp" | "Facebook" | "Instagram" | "TikTok";

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyDetail?: string;
  start: string; // "YYYY-MM"
  end: string; // "YYYY-MM"
  sector: Sector;
  bullets: string[];
  bulletsShort: string[];
  badge?: string;
  channels?: SocialChannel[];
}

export interface Education {
  title: string;
  detail?: string;
  school: string;
  period: string;
  main?: boolean;
}

export interface SkillGroup {
  id: "admin" | "orga" | "client";
  title: string;
  skills: string[];
}

export interface Tool {
  name: string;
  level: 1 | 2 | 3;
  label: string;
}

export interface Language {
  name: string;
  level: string;
  greeting?: string;
}

export interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

export const identity = {
  firstName: "Gloria",
  lastName: "SODJAHIN",
  title: "Assistante administrative & de direction",
  location: "Abomey-Calavi, Bénin",
  phones: ["+229 01 64 57 06 76", "+229 01 53 01 24 18"],
  // Assemblé côté client (obfuscation légère anti-spam), voir src/lib/contact.ts
  emailParts: ["gloriasodjahin77", "gmail.com"] as const,
  whatsapp: "2290164570676",
  available: true,
  photo: "/images/gloria.jpg",
  tagline: "L'organisation qui fait avancer les directions.",
  // Variantes possibles :
  // "Rigueur administrative, chaleur humaine."
  // "Chaque dossier à sa place, chaque client à l'écoute."
};

export const profile =
  "Assistante administrative et de direction, avec une expérience en gestion de dossiers, rédaction de documents professionnels, suivi de la clientèle et coordination d'activités. Polyvalente et organisée, je souhaite mettre mes compétences administratives, relationnelles et commerciales au service d'une entreprise ou d'une institution.";

export const profileShort =
  "Assistante administrative et de direction, expérimentée en gestion de dossiers, rédaction de documents, organisation de rendez-vous et suivi de la clientèle. Polyvalente, organisée et à l'aise dans les échanges professionnels, je souhaite contribuer efficacement au fonctionnement d'une entreprise ou d'une institution.";

export const experiences: Experience[] = [
  {
    id: "raz-2026",
    role: "Assistante administrative",
    company: "RAZ BTP & Consulting",
    start: "2026-01",
    end: "2026-05",
    sector: "BTP & Conseil",
    badge: "Recrutée une seconde fois",
    bullets: [
      "Préparation et mise en forme de documents professionnels.",
      "Gestion du courrier entrant et sortant, des appels téléphoniques et des courriels.",
      "Rédaction de devis à destination des clients et partenaires potentiels.",
      "Organisation des rendez-vous et suivi des dossiers.",
      "Assistance à la direction dans les activités quotidiennes et accompagnement lors de visites de chantier.",
    ],
    bulletsShort: [
      "Préparation et mise en forme de documents professionnels.",
      "Gestion du courrier, des appels et des courriels.",
      "Rédaction de devis, organisation de rendez-vous et suivi des dossiers.",
      "Appui à la direction et accompagnement lors de visites de chantier.",
    ],
  },
  {
    id: "popsfood",
    role: "Chargée de clientèle et assistante manager",
    company: "POP'S FOOD",
    companyDetail: "Restauration rapide",
    start: "2024-08",
    end: "2025-12",
    sector: "Restauration",
    channels: ["WhatsApp", "Facebook", "Instagram", "TikTok"],
    bullets: [
      "Gestion des appels et prise des commandes en présentiel et en ligne.",
      "Traitement des commandes reçues via WhatsApp, Facebook, Instagram et TikTok.",
      "Transmission des commandes à la cuisine et coordination du suivi des livraisons.",
      "Accueil, information et suivi de la clientèle.",
      "Tenue de la caisse et compte rendu au manager.",
      "Assistance au manager dans l'organisation et le suivi des activités quotidiennes.",
    ],
    bulletsShort: [
      "Gestion des appels et prise de commandes en présentiel et en ligne.",
      "Traitement des commandes via WhatsApp, Facebook, Instagram et TikTok.",
      "Coordination avec la cuisine et suivi des livraisons.",
      "Accueil et suivi de la clientèle, tenue de caisse et compte rendu au manager.",
      "Appui à l'organisation quotidienne du restaurant.",
    ],
  },
  {
    id: "nsia",
    role: "Cadre commercial",
    company: "NSIA Assurance",
    start: "2023-10",
    end: "2024-07",
    sector: "Assurance",
    bullets: [
      "Accueil, conseil et accompagnement des clients.",
      "Participation à la commercialisation de contrats d'assurance.",
      "Suivi de la clientèle et gestion des dossiers d'assurance.",
      "Participation à des conférences et activités professionnelles liées aux produits d'assurance.",
    ],
    bulletsShort: [
      "Accueil, conseil et accompagnement des clients.",
      "Commercialisation de contrats, suivi de clientèle et gestion de dossiers d'assurance.",
      "Participation à des conférences et activités liées aux produits d'assurance.",
    ],
  },
  {
    id: "raz-2022",
    role: "Assistante de direction",
    company: "RAZ BTP & Consulting",
    start: "2022-11",
    end: "2023-06",
    sector: "BTP & Conseil",
    bullets: [
      "Appui administratif à la direction, préparation de documents et suivi des dossiers.",
      "Gestion des communications et organisation des rendez-vous.",
      "Rédaction de devis et accompagnement lors de déplacements professionnels et visites de chantier.",
    ],
    bulletsShort: [
      "Préparation de documents, gestion des communications et suivi des dossiers.",
      "Organisation de rendez-vous, rédaction de devis et appui lors de visites de chantier.",
    ],
  },
  {
    id: "bltc",
    role: "Secrétaire administrative",
    company: "Cabinet BLTC",
    companyDetail: "Formations entrepreneuriales",
    start: "2021-12",
    end: "2022-04",
    sector: "Formation",
    bullets: ["Appui aux tâches de secrétariat et de gestion administrative."],
    bulletsShort: ["Appui aux tâches de secrétariat et de gestion administrative."],
  },
  {
    id: "librairie",
    role: "Réceptionniste",
    company: "Librairie-papeterie",
    start: "2021-05",
    end: "2021-09",
    sector: "Commerce",
    bullets: ["Accueil et orientation des visiteurs et de la clientèle."],
    bulletsShort: ["Accueil et orientation des visiteurs et de la clientèle."],
  },
  {
    id: "tclear",
    role: "Opératrice de saisie",
    company: "T. CLEAR Service",
    start: "2020-11",
    end: "2021-04",
    sector: "Services",
    bullets: ["Saisie et traitement de documents et de données."],
    bulletsShort: ["Saisie et traitement de documents et de données."],
  },
];

export const education: Education[] = [
  {
    title: "Études en Banque, Finance et Assurance",
    detail: "Niveau troisième année",
    school: "École supérieure Le Faucon",
    period: "2019 – 2021",
    main: true,
  },
  { title: "Baccalauréat", school: "CS Jean Piaget 2", period: "2018" },
  { title: "BEPC", school: "CS Jean Piaget 2", period: "2015" },
  { title: "CEP", school: "CS La Grâce de Dieu, Abomey-Calavi", period: "2011" },
];

export const skillGroups: SkillGroup[] = [
  {
    id: "admin",
    title: "Administration & Secrétariat",
    skills: [
      "Secrétariat et assistance administrative",
      "Rédaction et mise en forme de documents professionnels",
      "Gestion des appels, courriels et courriers",
      "Impression, photocopie et numérisation",
    ],
  },
  {
    id: "orga",
    title: "Organisation & Coordination",
    skills: [
      "Suivi des dossiers, rendez-vous et devis",
      "Coordination des commandes et livraisons",
    ],
  },
  {
    id: "client",
    title: "Relation client & Commercial",
    skills: ["Relation clientèle et suivi commercial", "Accueil, conseil et accompagnement"],
  },
];

export const tools: Tool[] = [
  { name: "Word", level: 3, label: "Très bon niveau" },
  { name: "Excel", level: 2, label: "Intermédiaire" },
  { name: "PowerPoint", level: 2, label: "Intermédiaire" },
];

export const languages: Language[] = [
  { name: "Français", level: "Parlé et écrit", greeting: "Bonjour" },
  { name: "Anglais", level: "Notions pratiques à l'oral et à l'écrit", greeting: "Hello" },
  // TODO : faire valider par Gloria la salutation en fon et en nago avant de l'afficher
  { name: "Fon", level: "Parlé" },
  { name: "Nago", level: "Parlé" },
];

export const qualities = [
  "Sens de l'organisation",
  "Polyvalence",
  "Bon relationnel",
  "Esprit d'équipe",
  "Capacité d'adaptation",
  "Sens des responsabilités",
];

export const interests = ["Lecture", "Musique", "Cinéma", "Médias", "Voyages"] as const;
export type Interest = (typeof interests)[number];

export const sectors: Sector[] = [
  "BTP & Conseil",
  "Restauration",
  "Assurance",
  "Formation",
  "Commerce",
  "Services",
];

/** Statistiques calculées à partir des données (pas de chiffres inventés). */
function monthsBetween(start: string, end: string) {
  const [sy, sm] = start.split("-").map(Number);
  const [ey, em] = end.split("-").map(Number);
  return (ey - sy) * 12 + (em - sm) + 1;
}

const first = experiences[experiences.length - 1].start;
const last = experiences[0].end;
const careerYears = Math.floor(monthsBetween(first, last) / 12);

export const stats: Stat[] = [
  { value: careerYears, suffix: "+", label: "ans d'expérience" },
  { value: experiences.length, label: "postes occupés" },
  { value: new Set(experiences.map((e) => e.sector)).size, label: "secteurs d'activité" },
  { value: languages.length, label: "langues parlées" },
];

export { monthsBetween };
