// ArtzFolio HRMS — Service Worker · cache key artzfolio-hrms-v397-2026-07
// v397 (2026-07-17): cache key bumped v396->v397 — NEW FEATURE: ID Card Reissue Fee (Settings field,
//   searchable, per-employee reissue log, additive payroll deduction, distinct payslip line). No shell
//   caching behaviour changed — cache key bump only, so every device drops the stale v396 shell. Deploy AS sw.js.
// v396 (2026-07-14): cache key bumped v395->v396 — QR-card punch speed fix. Removed a hard-coded 1200ms
//   "Look at the camera…" pause that ran BEFORE every QR-card punch even fired (vestigial — it existed to
//   pose for a selfie that, since v394, is captured in the background AFTER the punch succeeds, not before).
//   Also de-duplicated a redundant second GPS lookup on every geofenced kiosk punch (reuses the fix already
//   taken a moment earlier). The still-mandatory live face-detection anti-proxy gate is unchanged. Salary
//   engine byte-identical. Deploy this file AS sw.js.
// v395 (2026-07-14): cache key bumped v394->v395 — CRITICAL FIX: an approved locked clock-out now records
//   the employee's ORIGINAL attempted clock-out time (not the approval moment), and the manual clock-out
//   lock buffer is clamped so a negative config value can never lock an on-time clock-out early. Deploy AS sw.js.
// v394 (2026-07-14): selfie/photo audit capture on clock-in/out is fire-and-forget (background upload,
//   never blocks the punch); Settings "Buffer minutes after shift end" field un-hidden.
// v393 (2026-07-14): cache key bumped v392->v393 — fixes the multi-punch clock-out "Server error" flash
//   (kiosk local direction map now clears `out` on a resume clock-in, so a post-resume clock-out is no longer
//   mis-sent as a clock-in). Salary engine byte-identical. Deploy this file AS sw.js.
// v392 (2026-07-14): in-app resume-after-clock-out Settings toggle + per-segment timesheet badge.
// v391 (2026-07-14): MULTI-PUNCH / resume-after-clock-out (clock out and clock in again the same day).
// ────────────────────────────────────────────────────────────────────────────────────────────────
// REAL same-origin SW; registered via navigator.serviceWorker.register('sw.js', {scope:'./'}).
// CACHE key MUST stay in lockstep with the inline fallback CACHE constant in the app HTML + GAS HRMS_VERSION.
// Shell = network-first; face-api weights = cache-first; CDN = network-first.
const CACHE = 'artzfolio-hrms-v397-2026-07';
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
