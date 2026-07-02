// ArtzFolio HRMS — Service Worker (v296 — cache key bump for the defer-CDN build; was v295 — shell cache-first for instant loads; was v294 — FIX: v251 file was truncated/missing the final closer so 'ServiceWorker script evaluation failed' and it never registered on any device; restored + cache key bumped to v294)
// This is a REAL same-origin service-worker file (NOT a split of the single-file app — it is a separate
// static asset). The app HTML registers it via navigator.serviceWorker.register('sw.js', {scope:'./'}).
// A blob: URL is refused by browsers as an SW script, which is why the v144 inline-blob SW never registered
// (live getRegistrations()=0) and Chrome's native "Install app" criteria failed. With this static file in the
// repo root, the SW registers, the shell is cached network-first, and the employee app becomes installable.
//
// Cache key MUST stay in lockstep with the inline fallback CACHE constant in the app HTML (~L1687).
const CACHE = 'artzfolio-hrms-v296-2026-07'; // v195: bumped so every device drops the stale shell and pulls the face-liveness + Biometric Settings build (in lockstep with the inline CACHE in the app HTML)
const NETWORK_FIRST_HOSTS = ['cdn.jsdelivr.net', 'cdnjs.cloudflare.com', 'unpkg.com'];

self.addEventListener('install', e => { self.skipWaiting(); });

self.addEventListener('activate', e => {
  e.waitUntil(Promise.all([
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))),
    self.clients.claim()
  ]));
});

self.addEventListener('message', e => { if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting(); });

self.addEventListener('fetch', e => {
  const url = e.request.url;
  if (url.includes('script.google.com')) return;     // Never cache the GAS API
  const isCdn = NETWORK_FIRST_HOSTS.some(h => url.includes(h));
  // The app shell (the single-file HTML + its inline JS) is served NETWORK-FIRST so a fresh deploy loads
  // immediately and a fixed bug is never masked by a stale cached page. Offline still works via the cache.
  const isShell = e.request.mode === 'navigate' || e.request.destination === 'document' || url.indexOf('.html') !== -1;
  e.respondWith(caches.open(CACHE).then(async cache => {
    const cached = await cache.match(e.request);
    const fetchPromise = fetch(e.request).then(r => {
      if (r && r.ok && (r.type === 'basic' || r.type === 'cors')) {
        cache.put(e.request, r.clone()).catch(() => {});
      }
      return r;
    }).catch(() => cached);
    // v295: SHELL is now CACHE-FIRST (stale-while-revalidate) so repeat opens are INSTANT — serve the
    // cached shell immediately while the fetchPromise above refreshes the cache in the background. A new
    // deploy still lands: the new sw.js has a new CACHE key, activate() purges the old cache, and the app's
    // skipWaiting + controllerchange listener reloads once so the fresh shell is fetched. CDN libs stay network-first.
    if (isShell) return cached || fetchPromise;
    return isCdn ? (fetchPromise.then(r => r || cached)) : (cached || fetchPromise);
  }));
});
