/* =====================================================================
   BANDEAU D'INFORMATION — actualités DSI / pannes
   ---------------------------------------------------------------------
   Pour publier une annonce : ajoutez une ligne dans ANNONCES ci-dessous.
   - type    : "info"  (actualité, ton neutre) ou "panne" (incident, ton rouge)
   - actif   : true pour l'afficher, false pour la masquer (sans la supprimer)
   - message : texte de l'annonce (peut contenir <strong>, <em>)
   - lien    : optionnel, ex. { texte: "En savoir plus", href: "..." } — sinon null
   Plusieurs annonces actives s'empilent, la plus récente en haut de la liste.
   ===================================================================== */
const ANNONCES = [
    { type: "panne", actif: false, message: "", lien: null },
    { type: "info",  actif: false, message: "", lien: null }
];

(function () {
    const actives = ANNONCES.filter(a => a.actif && (a.message || "").trim());
    if (actives.length === 0) return;

    const host = document.getElementById("announcements");
    if (!host) return;

    const icons = {
        info: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><line x1="12" y1="11" x2="12" y2="16.5"></line><line x1="12" y1="7.5" x2="12.01" y2="7.5"></line></svg>',
        panne: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>'
    };

    const wrap = document.createElement("div");
    wrap.className = "announce-wrap";

    actives.forEach(a => {
        const inner = document.createElement("div");
        inner.className = "announce-inner";

        const item = document.createElement("div");
        item.className = "announce-item announce-item--" + a.type;

        const icon = document.createElement("span");
        icon.className = "announce-icon";
        icon.innerHTML = icons[a.type] || icons.info;

        const msg = document.createElement("span");
        msg.className = "announce-msg";
        msg.innerHTML = a.message;

        item.appendChild(icon);
        item.appendChild(msg);

        if (a.lien && a.lien.href) {
            const link = document.createElement("a");
            link.className = "announce-link";
            link.href = a.lien.href;
            link.target = "_blank";
            link.textContent = a.lien.texte || "En savoir plus →";
            item.appendChild(link);
        }

        inner.appendChild(item);
        wrap.appendChild(inner);
    });

    host.replaceWith(wrap);
})();
