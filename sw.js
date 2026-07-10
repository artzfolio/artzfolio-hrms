// ArtzFolio HRMS — Service Worker · cache key artzfolio-hrms-v370-2026-07 (v370: Excel Full-Sync fixes — kills the
// "Repaired: Data validation" corruption by capping dropdown prompt/error/list strings to Excel's 255-char limit and
// routing long/comma lists to the Dropdowns sheet; fixes the >26-column letter bug; adds effectiveDate + changeReason
// columns to the editable export. Plus new effective-dated Employee controls: 💰 Salary Change and 🕐 Shift Timing.).
// Full version history in the prior sw_vNNN.js archives. This is a REAL same-origin SW file (a separate static asset,
// NOT a split of the single-file app); the app registers it via navigator.serviceWorker.register('sw.js', {scope:'./'}).
// The CACHE key MUST stay in lockstep with the inline fallback CACHE constant in the app HTML. Shell = network-first
// (fresh deploys land immediately); face-api weights = cache-first (offline kiosk); CDN libs = network-first.
const CACHE = 'artzfolio-hrms-v370-2026-07';
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
    if (isShell) return fetchPromise.then(r => r || cached).catch(() => cached); // NETWORK-FIRST shell
    if (_v341IsFaceWeight(url)) return cached || fetchPromise;                    // CACHE-FIRST face weights
    return isCdn ? (fetchPromise.then(r => r || cached)) : (cached || fetchPromise);
  }));
});
