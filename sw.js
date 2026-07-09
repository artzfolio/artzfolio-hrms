// ArtzFolio HRMS — Service Worker (v341 — OFFLINE KIOSK: cache-first face-api model weights + prefetch weight manifests on install so kiosk scanning works with ZERO network; cache key -> v366 (v366: settings card re-layout accordion, Supabase register preload, bulk-payment tools in register + standalone tab retired); was v365 (v365: Excel-import mandatory eff-date, payment-status dedupe, settings regroup, tooltips, tenure-wallet forfeit persistence, joining-bonus cancel, slip WO/holiday, payroll preload); was v364 (v364: mandatory effective-date on salary/shift-type/shift-hours changes across single+bulk edit; HTML/GAS tail-repair to complete files); was v356 (v356: device-lock save fix, PIN-show fix, one-time device auth code, clock-in/out silent auto-correct, Who's-In/Out manual refresh, effective-date reposition, ESS unlock link hidden). Was v354: field tooltips + owner-only PIN column. Was v296 — cache key bump for the defer-CDN build; was v295 — shell cache-first for instant loads; was v294 — FIX: v251 file was truncated/missing the final closer so 'ServiceWorker script evaluation failed' and it never registered on any device; restored + cache key bumped to v294)
// This is a REAL same-origin service-worker file (NOT a split of the single-file app — it is a separate
// static asset). The app HTML registers it via navigator.serviceWorker.register('sw.js', {scope:'./'}).
// A blob: URL is refused by browsers as an SW script, which is why the v144 inline-blob SW never registered
// (live getRegistrations()=0) and Chrome's native "Install app" criteria failed. With this static file in the
// repo root, the SW registers, the shell is cached network-first, and the employee app becomes installable.
//
// Cache key MUST stay in lockstep with the inline fallback CACHE constant in the app HTML (~L1687).
const CACHE = 'artzfolio-hrms-v366-2026-07'; // v362: effective-dating gap closed for the in-panel Bulk Field Edit + Payroll Excel export field parity with the PDF salary slip + Mamta/Tuntun Rs.400 blend-bug root-caused (owner-run one-time repair tool). v360 nav-section-reorg: Compensation Management retired as a standalone tab (5 sub-tabs redistributed to Bonus & Loyalty / Promotions / Payroll, same permission key preserved); Manual Transactions -> Payroll & Reports, Performance Review -> Performance; Loyalty Wallet Adjustments (Payroll) retired/redirected into Bonus & Loyalty's Tenure Wallet; Salary Register shows Payment Status inline; Loyalty Retention (Level) gets tooltips + archived/reactivate + bulk Reduce/Forfeit; Tenure Wallet gets a full month-by-month History drill-down (new GAS handler) — also finishes wiring the bulk-select + per-row Reduce/Forfeit + Pending Approvals panel on the Tenure Wallet screen started under this same version marker. v359b: fixed window.HRMS_VERSION stuck at v355 + removed vestigial 'bonustracker' from PERM_TAB_IDS. v359: Bonus & Loyalty reorg; v358: salary payment-status tracker; v357: Bonus Management overhaul
const NETWORK_FIRST_HOSTS = ['cdn.jsdelivr.net', 'cdnjs.cloudflare.com', 'unpkg.com'];
// v341 OFFLINE KIOSK: face-api model weights are large, static and version-pinned. Serve them CACHE-FIRST
// (cache-on-first-fetch, then serve from cache forever) so a kiosk that has scanned once works with NO network.
// URL substrings that identify a face-api weight request (the *-weights_manifest.json + *-shardN files).
const FACE_WEIGHT_MARKERS = ['face-api.js@master/weights', '/weights/tiny_face_detector_model', '/weights/face_landmark_68', '/weights/face_recognition_model', 'weights_manifest.json'];
// The 3 weight manifests the app loads (tinyFaceDetector + faceLandmark68Tiny + faceRecognitionNet).
// Proactively cached on install so the very first OFFLINE boot after deploy already has them.
const FACE_WEIGHT_BASE = 'https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@master/weights/';
const FACE_WEIGHT_MANIFESTS = [
  FACE_WEIGHT_BASE + 'tiny_face_detector_model-weights_manifest.json',
  FACE_WEIGHT_BASE + 'face_landmark_68_tiny_model-weights_manifest.json',
  FACE_WEIGHT_BASE + 'face_recognition_model-weights_manifest.json'
];
function _v341IsFaceWeight(url){ return FACE_WEIGHT_MARKERS.some(function(m){ return url.indexOf(m) !== -1; }); }

self.addEventListener('install', e => {
  self.skipWaiting();
  // v341: best-effort prefetch the face-api weight MANIFESTS so the first offline boot already has them.
  // The shard binaries are cached on first fetch by the fetch handler below. Never blocks/fails install.
  e.waitUntil(caches.open(CACHE).then(function(cache){
    return cache.addAll(FACE_WEIGHT_MANIFESTS).catch(function(){ /* offline at install or CDN blip -> shards+manifests cache on first fetch */ });
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
    if (isShell) return fetchPromise.then(r => r || cached).catch(() => cached); // v308: NETWORK-FIRST shell - always serve the freshest deployed build; fall back to cache only when offline (fixes 'ESS/kiosk not updating to the latest version').
    // v341 OFFLINE KIOSK: face-api model weights are CACHE-FIRST — once cached, serve from cache immediately
    // (and refresh in the background). This makes on-device f