// Bump V whenever you upload a new version of the game so players get a fresh cache.
const V='rune-defense-v9',CORE=['./','./index.html','./manifest.json','./icons/icon-192.png','./icons/icon-512.png','./icons/maskable-512.png','./icons/apple-touch-icon.png'];
const put=(k,r)=>caches.open(V).then(c=>c.put(k,r));
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const q=e.request;if(q.method!=='GET')return;const u=new URL(q.url);
  // Page loads: network first (so updates arrive), cached copy when offline or slow.
  if(q.mode==='navigate'){
    e.respondWith(Promise.race([fetch(q),new Promise((_,no)=>setTimeout(no,4000))])
      .then(r=>{if(r&&r.ok)put('./index.html',r.clone());return r})
      .catch(()=>caches.match('./index.html').then(h=>h||fetch(q))));return}
  // Own files: serve from cache, refresh in the background.
  if(u.origin===location.origin){
    e.respondWith(caches.match(q,{ignoreSearch:true}).then(hit=>{
      const f=fetch(q).then(r=>{if(r&&r.ok)put(q,r.clone());return r}).catch(()=>hit);
      return hit||f}));return}
  // Google Fonts: cache first so the pixel font also works offline.
  if(/(^|\.)fonts\.(googleapis|gstatic)\.com$/.test(u.hostname)){
    e.respondWith(caches.match(q).then(hit=>hit||fetch(q).then(r=>{if(r&&(r.ok||r.type==='opaque'))put(q,r.clone());return r})))}
});
