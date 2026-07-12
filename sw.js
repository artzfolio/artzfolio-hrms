// ArtzFolio HRMS — Service Worker · cache key artzfolio-hrms-v389-2026-07 (v389: removed the redundant "Late
// Minutes Multiplier" (lateMultiplier) Settings field — superseded by the per-tier Late Tier 1/2/3 Multiplier
// fields; engine already ignored lateMultiplier. Carries the full v388 SALARY-ENGINE change — late
// penalty rebuilt to the escalating monthly-tier MULTIPLIER model: grace is a gate only, penalty base = FULL
// penalty rebuilt to the escalating monthly-tier MULTIPLIER model: grace is a gate only, penalty base = FULL
// lateness from shift start, ×2/×3/×4 by monthly late ordinal (tiers 3/6/10), 11th+ late = marked absent (one
// full day, capped); undertime no longer double-docks the late window. New weekly auto JSON backup to Drive.
// Carries v387: late labels, POSH/Tools/Biometric collapse, backfill-grid clock-in/out/hours. Prior: v386 FIX
// "Assigned Shift" dropdown updated the hidden shiftHours/shiftType/start/end on change, but silently left the
// VISIBLE "Daily Work Hours" field stale (e.g. shift changed 11hr Day -> 10hr Day, Daily Work Hours stayed 11)
// — wrong under-time/OT basis feeding attendance + payroll. _syncShiftHoursFromAssigned now also syncs Daily
// Work Hours to the selected shift's registry hours, matching the existing Shift Timing/Duration tool's
// shiftHours+dailyHours pairing. Frontend-only fix (submits the corrected value via the existing save path; no
// GAS/salary-formula change). v385 base: fixed the INERT Field-Visibility tab-map entry (split T&C / Field
// Visibility / 2FA into independent .settings-section cards). v384 base: SETTINGS TAB MAP completed + per-tab
// count badges. v383 base: settings/search declutter. v382: separate-slip ZIP. v381: F&F exit-month + dual slip
// buttons. Full history in prior sw_vNNN.js archives. REAL same-origin SW; registered via
// navigator.serviceWorker.register('sw.js', {scope:'./'}). CACHE key MUST stay in lockstep with the inline
// fallback CACHE constant in the app HTML.
// Shell = network-first; face-api weights = cache-first; CDN = network-first.
const CACHE = 'artzfolio-hrms-v389-2026-07';
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
    if (isShel