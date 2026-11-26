/* =====================================================================
   export-muscu.js — modèle du document « Cycle musculation » pour eps-export.js (chantier 14).
   Tout vient de muscu-donnees.js (SEANCES, MOBILES, ECHELLE, SECU, EVAL, DUREE_PRATIQUE) : rien n'est écrit ici
   à la main, sauf les intitulés des rubriques. Correspondance des rubriques :
   - Numéro et titre ............ s.id, s.titre
   - Bilan et enjeux ............ s.bilan (question de bilan avec les élèves) ; s.enjeux s'il existe ;
                                  S4-S6 : repères du mobile (sensation attendue, ressenti visé, exécution) ;
                                  S9 : critères de l'AFL1 (EVAL)
   - Objectif ................... s.obj
   - Contenu détaillé ........... s.install, s.tl (déroulé minuté), s.fiches (organisation, rôles, consignes,
                                  critère, réussite, variantes)
   - Texte prêt pour Pronote .... assemblé à partir de s.titre, s.obj, s.tl, s.bilan et du titre de la séance suivante
   - À retenir et à préparer .... s.prepare
   ===================================================================== */
(function(){
'use strict';
const MOB_S={S4:'tonif',S5:'volume',S6:'puiss'};
const min=n=>n+' min';
function texteProno(s,suiv){
  const L=[s.id.replace('S','Séance ')+' — '+s.titre,'Objectif : '+s.obj,
    'Au programme : '+s.tl.map(t=>t[0]+' ('+min(t[1])+')').join(' ; ')+'.','Bilan : '+s.bilan];
  if(suiv)L.push('Prochaine séance : '+suiv.id.replace('S','séance ')+' — '+suiv.titre+'.');
  return L;
}
function sectionSeance(s,i){
  const B=[],suiv=SEANCES[i+1],m=MOBILES[MOB_S[s.id]];
  B.push({t:'h',x:'Bilan et enjeux'});
  B.push({t:'p',label:'Question de bilan avec les élèves :',x:s.bilan});
  if(s.enjeux)B.push({t:'p',label:'Enjeux :',x:s.enjeux});
  if(m){B.push({t:'p',label:'Sensation attendue ('+m.nom+') :',x:m.attendu});
    B.push({t:'p',label:'Ressenti visé :',x:m.ressenti[0]+' à '+m.ressenti[1]+' sur l’échelle de 10.'});
    B.push({t:'p',label:'Exécution :',x:m.exec+'.'})}
  if(s.id==='S9')EVAL.afl1.forEach(([nom,pts,items])=>B.push({t:'p',label:'AFL1 · '+nom+' ('+pts+' pts) :',x:items.join(', ')+'.'}));
  B.push({t:'h',x:'Objectif de la séance'});
  B.push({t:'p',x:s.obj});
  B.push({t:'h',x:'Contenu détaillé'});
  B.push({t:'p',label:'Installation.',x:s.install});
  B.push({t:'table',entetes:['Temps de la séance','Durée'],largeurs:[140,30],lignes:s.tl.map(t=>[t[0],min(t[1])])});
  s.fiches.forEach((f,j)=>{
    B.push({t:'p',label:(j+1)+'. '+f.cat+' · '+f.titre,x:'('+min(f.duree)+')'});
    if(f.dispo)B.push({t:'p',label:'Organisation.',x:f.dispo});
    if(f.roles)B.push({t:'p',label:'Rôles.',x:f.roles});
    if((f.deroul||[]).length)B.push({t:'ol',items:f.deroul});
    if(f.crit)B.push({t:'p',label:'Critère.',x:f.crit});
    if(f.reussite)B.push({t:'p',label:'Réussi si',x:f.reussite});
    if(f.moins)B.push({t:'p',label:'– Plus facile.',x:f.moins});
    if(f.plus)B.push({t:'p',label:'+ Plus difficile.',x:f.plus});
  });
  B.push({t:'h',x:'Texte prêt à copier dans Pronote'});
  B.push({t:'cadre',titre:'Cahier de textes — '+s.id,lignes:texteProno(s,suiv)});
  B.push({t:'h',x:'À retenir et à préparer pour la séance suivante'});
  B.push({t:'ul',items:s.prepare||[]});
  return {id:s.id,titre:s.id+' · '+s.titre,blocs:B};
}
function modele(){
  const bref={id:'bref',titre:'Le cycle en bref',blocs:[
    {t:'p',x:SEANCES.length+' séances, environ '+DUREE_PRATIQUE+' min de pratique par séance.'},
    {t:'table',entetes:['Séance','Titre'],largeurs:[22,148],lignes:SEANCES.map(s=>[s.id,s.titre])},
    {t:'h',x:'Les 3 mobiles'},
    {t:'table',entetes:['Mobile','Charges','Séries × répétitions','Récupération','Sensation attendue'],largeurs:[30,22,30,30,58],
      lignes:MOBILES_ORDRE.map(k=>{const m=MOBILES[k];return [m.nom+' ('+m.theme+')',m.pct[0]+' à '+m.pct[1]+' %',m.series[0]+' à '+m.series[1]+' × '+m.reps[0]+' à '+m.reps[1],m.recup,m.attendu]})},
    {t:'h',x:'Échelle de ressentis (départ commun)'},
    {t:'table',entetes:['Niveau','Effort','Ce que je ressens'],largeurs:[18,52,100],lignes:ECHELLE.map(e=>[String(e[0]),e[1],e[2]])},
    {t:'h',x:'Sécurité'},
    {t:'ul',items:SECU.regles},
    {t:'p',x:SECU.devise}]};
  return {titre:'Cycle musculation',sousTitre:'Terminale · CA5 · '+SEANCES.length+' séances',couleur:'#4D7C0F',
    garde:['Lycée Georges Pompidou','Pour chaque séance : bilan et enjeux, objectif, contenu détaillé, texte prêt à copier dans Pronote, ce qu’il faut retenir et préparer pour la séance suivante.'],
    version:'contenus '+(typeof MUSCU_VERSION!=='undefined'?MUSCU_VERSION:''),
    pied:'Cycle musculation · Terminale CA5 · Lycée Georges Pompidou',fichier:'cycle-musculation-terminale-CA5',
    sections:[bref].concat(SEANCES.map(sectionSeance))};
}
window.MuscuExport={modele,texteProno};
})();
