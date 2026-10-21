# Portfolio — Gloria SODJAHIN

Portfolio statique (Next.js 16, Tailwind CSS 4, Motion, GSAP) en quatre modes de lecture :

| Route | Mode |
|---|---|
| `/` | Défilement vertical classique |
| `/horizontal/` | Défilement horizontal (piste épinglée sur grand écran, glisser sur mobile) |
| `/livre/` | Livre dont on tourne les pages (clavier ← →, clic, glisser, sommaire cliquable) |
| `/cv/` | CV A4 imprimable, source du PDF |

## Commandes

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # site statique dans out/ + PDF out/gloria-sodjahin-cv.pdf
npm run preview    # sert out/ pour vérifier le résultat final
```

Le PDF est généré au build avec Chrome ou Edge déjà installés sur la machine (`playwright-core`, aucun navigateur à télécharger). Il est aussi copié dans `public/` pour le mode dev.

Sur un serveur de build sans navigateur (Vercel, Netlify…), le PDF n'est pas régénéré : c'est la version versionnée dans `public/` qui est publiée. **Après une modification de `src/data/cv.ts`, lancer `npm run build` en local puis committer `public/gloria-sodjahin-cv.pdf`.**

## Modifier le contenu

Tout le contenu se trouve dans **`src/data/cv.ts`** (identité, expériences, formation, compétences, langues, qualités, intérêts). Les trois versions et le PDF se mettent à jour automatiquement. Les chiffres clés sont calculés à partir des données.

- Photo : `public/images/gloria.jpg`. L'actuelle fait 338 × 338 px ; une photo de 1200 px ou plus améliorera nettement le rendu.
- Salutations en fon et en nago : à ajouter dans `languages` (champ `greeting`) une fois validées.
- Adresse du site : `NEXT_PUBLIC_SITE_URL` (ou `src/lib/site.ts`) pour le sitemap et les balises de partage.

## Mise en ligne

Le dossier `out/` est autonome : il peut être déposé tel quel sur Netlify, Vercel, GitHub Pages ou tout hébergement statique. Pour GitHub Pages dans un sous-dossier, ajouter `basePath` dans `next.config.ts`.

## Structure

```
src/
  app/                 routes (/, horizontal, livre, cv), sitemap, robots, 404
  components/
    motion/            primitives d'animation (Reveal, SplitText, Counter, Stamp…)
    shared/            éléments communs (PhotoArch, ModeSwitcher, Envelope, ExperienceCard…)
    vertical/          sections de la version verticale
    horizontal/        panneaux et moteur GSAP de la version horizontale
    book/              moteur 3D du livre et contenu des 20 pages
    cv/                barre d'outils de la page imprimable
  data/cv.ts           source de données unique
scripts/
  generate-pdf.mjs     génération du PDF à partir de /cv
  flatten-segments.mjs correctif d'export (fichiers de préchargement Next 16)
```

Les animations respectent le réglage système « réduire les animations ».
