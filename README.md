# Cycle Musculation · CA5 · Terminale · Lycée Georges Pompidou

Cycle de musculation de 9 séances (1 h 10 de pratique), en binômes, dans la salle de judo. Trois mobiles éprouvés (Tonification, Volume, Puissance ; force maximale retirée), test 10 RM en défi par équipes, projet personnel de S6 à S9, évaluation AFL1 en S8-S9 (une moitié de classe par séance). Démarche « pratique auto-référencée et auto-régulée par les ressentis » d'après Laurent Lecomte (lycée A.-Daudet, Nîmes, avec son accord) et Aline Paintendre (STAPS Reims).

## Contenu du dépôt
| Fichier | Rôle |
|---|---|
| `index.html` | l'écran de cours (fabriqué par `mon-eps/atelier/ecran-de-cours/construire.py musculation` : ne pas modifier à la main) |
| `outils.html` | l'outil complet (bouton « Préparer » et « Outils ») : séances imprimables, nuage de mots, défi 10 RM, calculette, mobiles, ateliers, sécurité, évaluation, sources |
| `muscu-donnees.js` | séances, ateliers, matériel, mobiles, échelle de ressentis, sécurité et calculs. **Même fichier que dans `musculation-eleves`** : le modifier ici puis le recopier tel quel. |
| `jsqr.js` | lecture des QR « Mots et défi » des téléphones |
| `sw.js`, `manifest.webmanifest`, `icon-*.png`, `polices/` | hors ligne et installation |

## Nuage de mots et défi
Chaque binôme montre le QR « Mots et défi » de l'appli élève ; l'iPad le scanne dans Outils › Nuage de mots ou Défi 10 RM. Aucun nom n'est transmis, seulement les mots, l'équipe et les totaux. La transmission en direct par Grist n'est pas branchée en v1.0 (voir le cahier des charges).

## Installation
1. Dépôt `cycle-musculation`, *Settings → Pages → Deploy from a branch → main / (root)*.
2. iPad : ouvrir l'adresse en Wi-Fi, puis **Ajouter à l'écran d'accueil**.

## Liens
Appli élève : https://yannickdartois-hue.github.io/musculation-eleves/
