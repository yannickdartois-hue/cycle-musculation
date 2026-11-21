/* Cycle musculation : l'écran de cours et l'outil sont mis en cache à la 1re ouverture (Wi-Fi), puis fonctionnent sans réseau.
   Après une modification : augmenter le numéro de C (construire.py le fait pour l'écran de cours). */
const C='cycle-musculation-v2.18';
// Toutes les applis partagent le même stockage (même adresse github.io) : on n'efface QUE les anciennes versions de CETTE appli.
const MES_CACHES=/^cycle-musculation-v\d+(?:\.\d+)?$/;

// Wi-Fi faible : si le réseau ne répond pas en 3 s, on ouvre la copie gardée sur l'appareil.
const sous3s=p=>{p.catch(()=>{});return Promise.race([p,new Promise((_,non)=>setTimeout(()=>non(new Error('réseau lent')),3000))])};
const FILES=["muscu-donnees.js", "outils.html", "jsqr.js", "img/ateliers/crunch.jpg", "img/ateliers/curlb.jpg", "img/ateliers/curlh.jpg", "img/ateliers/dc.jpg", "img/ateliers/dch.jpg", "img/ateliers/dips.jpg", "img/ateliers/dm.jpg", "img/ateliers/ecarte.jpg", "img/ateliers/elev.jpg", "img/ateliers/extri.jpg", "img/ateliers/fentes.jpg", "img/ateliers/gainage.jpg", "img/ateliers/gainlat.jpg", "img/ateliers/hip.jpg", "img/ateliers/hip.svg", "img/ateliers/mollets.jpg", "img/ateliers/montee.jpg", "img/ateliers/oiseau.jpg", "img/ateliers/pompes.jpg", "img/ateliers/pullover.jpg", "img/ateliers/rowb.jpg", "img/ateliers/rowh.jpg", "img/ateliers/sbox.jpg", "img/ateliers/sdtj.jpg", "img/ateliers/sjump.jpg", "img/ateliers/squat.jpg", "img/ateliers/squath.jpg", "img/ateliers/tirage.jpg", "img/ateliers/twist.jpg", "img/mobiles/puiss.jpg", "img/mobiles/tonif.jpg", "img/mobiles/volume.jpg", "polices/archivo.woff2", "polices/atkinson-400.woff2", "polices/atkinson-700.woff2", "eps-design.css", "eps-outil.css", "eps-charte-v1.css", "ecran.css", "ecran.js", "eps-maj.js", "aide-ecran.js", "eps-aide.js", "eps-commun.js", "./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-180.png", "icon-32.png", "icon-512.png"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(FILES.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>MES_CACHES.test(k)&&k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
  const net=fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r});
  e.respondWith(sous3s(net).catch(()=>caches.match(e.request).then(r=>r||caches.match('index.html')).then(r=>r||net)))});
