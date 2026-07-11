// ArtzFolio HRMS — Service Worker · cache key artzfolio-hrms-v384-2026-07 (v384: SETTINGS TAB MAP completed +
// per-tab count badges, all display/UX only — salary + F&F engine byte-identical. (1) The one settings card still
// falling through to the generic "Panel" tab by accident — Field Visibility — is now explicitly mapped to the
// Employees tab, so every keyed settings card has an intentional home. (2) Each Settings sub-tab button now shows
// a "(N)" badge = how many cards it holds, so the layout is legible at a glance. v383 base: settings/search
// declutter (full-card settings search, phone/email global search, duplicate card+button removed, Data-Fixes
// one-shots archived, Supabase cards grouped). v382: separate-slip ZIP. v381: F&F exit-month + dual slip buttons.
// Full history in prior sw_vNNN.js archives. REAL same-origin SW; registered via
// navigator.serviceWorker.register('sw.js', {scope:'./'}). CACHE key MUST stay in lockstep with the inline
// fallback CACHE constant in the app HTML.
// Shell = network-first; face-api weights = cache-first; CDN = network-first.
const CACHE = 'artzfolio-hrms-v384-2026-07';
const NETWORK_FIRST_HOSTS = ['cdn.jsdelivr.net', 'cdnjs.cloudflare.com', 'unpkg.com'];
const FACE_WEIGHT_MARKERS = ['face-api.js@master/weights', '/weights/tiny_face_detector_model', '/weights/face_landmark_68', '/weights/face_recognition_model', 'weights_manifest.json'];
const FACE_WEIGHT_BASE = 'https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@master/weights/';
const FACE_WEIGHT_MANIFESTS = [
  FACE_WEIGHT_BASE + 'tiny_face_detector_model-weights_manifest.json',
  FACE_WEIGHT_BASE + 'face_landmark_68_tiny_model-weights_manifest.json',
  FACE_WEIGHT_BASE + 'face_recognition_model-weights_manifest.json'
];
function _v341IsFaceWeight(url){ return FACE_WEIGHT_MARKERS.some(function(m){ return url.indexOf(m) !== -1; }); }

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function(cache){
    return cache.addAll(FACE_WEIGHT_MANIFESTS).catch(function(){ /* offline at install or CDN blip -> caches on first fetch */ });
  }).catch(function(){}));
});

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
  const isShell = e.request.mode === 'navigate' || e.request.destination === 'document' || url.indexOf('.html') !== -1;
  e.respondWith(caches.open(CACHE).then(async cache => {
    const cached = await cache.match(e.request);
    const fetchPromise = fetch(e.request).then(r => {
      if (r && r.ok && (r.type === 'basic' || r.type === 'cors')) {
        cache.put(e.request, r.clone()).catch(() => {});
      }
      return r;
    }).catch(() => cached);
    if (isShell) return (await fetchPromise) || cached;                 // shell: network-first (fresh deploy lands immediately)
    if (_v341IsFaceWeight(url)) return cached || fetchPromise;          // face weights: cache-first (offline kiosk)
    if (isCdn) return (await fetchPromise) || cached;                   // CDN libs: network-first
    return cached || fetchPromise;                                      // default: cache-then-network
  }));
});
