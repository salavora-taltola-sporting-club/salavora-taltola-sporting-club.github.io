// TSC club website service worker — lets the site be installed like an app.
// It never touches the scoring app (/tsc/), which has its own worker.
const CACHE='tsc-site-v1';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  const req=e.request, url=new URL(req.url);
  if(req.method!=='GET' || url.origin!==location.origin || url.pathname.startsWith('/tsc/') || url.pathname.startsWith('/.well-known/')) return;
  if(req.mode==='navigate'){
    e.respondWith(fetch(req).then(r=>{ const c=r.clone(); caches.open(CACHE).then(x=>x.put('/',c)); return r; }).catch(()=>caches.match('/')));
  }
});
