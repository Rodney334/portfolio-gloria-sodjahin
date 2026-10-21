// Next 16 exporte certains fichiers de préchargement dans des sous-dossiers
// (horizontal/__next.horizontal/__PAGE__.txt) alors que le navigateur les demande
// sous un nom « à plat » (horizontal/__next.horizontal.__PAGE__.txt).
// On crée donc une copie à plat pour éviter des 404 lors du préchargement des liens.
import { copyFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const OUT = join(process.cwd(), "out");
let count = 0;

function files(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? files(p) : [p];
  });
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (!statSync(p).isDirectory()) continue;
    if (name.startsWith("__next.")) {
      for (const f of files(p)) {
        copyFileSync(f, `${p}.${relative(p, f).split(sep).join(".")}`);
        count++;
      }
    } else if (name !== "_next") {
      walk(p);
    }
  }
}

walk(OUT);
console.log(`✓ ${count} fichier(s) de préchargement mis à plat`);
