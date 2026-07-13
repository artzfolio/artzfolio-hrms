// ArtzFolio HRMS — Service Worker · cache key artzfolio-hrms-v390-2026-07
// ── REPAIR 2026-07-13: the shipped sw_v390.js (and sw_v388.js / sw_v389.js before it) was TRUNCATED
//    mid-fetch-handler (the file ended at "e.respondWith(caches.open(" with no body/closers), so the
//    service worker threw a SyntaxError and FAILED TO REGISTER — no offline shell, no cache management,
//    no PWA update path. This file restores the complete, verified fetch handler (identical to the last
//    known-good sw_v387.js body) and completes the message handler. NOTHING ELSE CHANGED. Cache key is
//    kept at artzfolio-hrms-v390-2026-07 so it stays in lockstep with the already-built (unchanged)
//    HTML v390 inline-fallback CACHE + GAS v390 HRMS_VERSION. Deploy this file AS sw.js.
// ────────────────────────────────────────────────────────────────────────────────────────────────
// (v390: fixed the ESS employee app briefly flashing the admin/kiosk dashboard on launch before the PIN
// screen [pre-paint lockdown script in <head>, runs before body paints] + fixed a stale queued offline PIN
// retry surfacing a raw "Server error: Wrong PIN" toast at unrelated moments, e.g. right after device
// authorisation [now silenced for that one background call only; real-time PIN entry unaffected]. Engine
// byte-identical. v389: removed the redundant "Late Minutes Multiplier" (lateMultiplier) Settings field —
// superseded by the per-tier Late Tier 1/2/3 Multiplier fields; engine already ignored lateMultiplier.
// Carries the full v388 SALARY-ENGINE change — late penalty rebuilt to the escalating monthly-tier
// MULTIPLIER model: grace is a gate only, penalty base = FULL lateness from shift start, ×2/×3/×4 by monthly
// late ordinal (tiers 3/6/10), 11th+ late = marked absent (one full day, capped); undertime no longer
// double-docks the late window. New weekly auto JSON backup to Drive. Carries v387: late labels,
// POSH/Tools/Biometric collapse, backfill-grid clock-in/out/hours. Prior: v386 FIX "Assigned Shift" dropdown
// updated the hidden shiftHours/shiftType/start/end on change, but silently left the VISIBLE "Daily Work
// Hours" field stale. Full history in prior sw_vNNN.js archives. REAL same-origin SW; registered via
// navigator.serviceWorker.register('sw.js', {scope:'./'}). CACHE key MUST stay in lockstep with the inline
// fallback CACHE constant in the app HTML.
// Shell = network-first; face-api weights = cache-first; CDN = network-first.
const CACHE = 'artzfolio-hrms-v390-2026-07';
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
