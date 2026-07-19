// ArtzFolio HRMS — Service Worker · cache key artzfolio-hrms-v406-2026-07-17
// v416 (2026-07-19): cache key bumped v415->v416 — HTML-ONLY, display-only salary clarity fix + a real Excel
//   export bug fix (Under-time/Overtime Hours columns + Daily Attendance sheet were always 0/empty — dailyRows
//   was never fetched before a bulk export). See HTML v416 changelog for full detail. No SW/caching-strategy
//   change, no calcMonthlySalary/engine change. Deploy AS sw.js.
// v415 (2026-07-19): cache key bumped v414->v415 — GAS+HTML FIX: a partial single-field attendance edit
//   (only clockIn OR only clockOut) with Overwrite ticked was being silently diverted to a phantom OT-session
//   row instead of updating the primary punch (money-adjacent — see HTML changelog). No SW/caching-strategy change.
// v414 (2026-07-19): cache key bumped v413->v414 — HTML-ONLY FIX: Bulk Hours Entry + individual Edit Attendance
//   now actually save when the day already has clock-in/out (Overwrite checkbox made prominent + default-ON;
//   stale v303 display-cache busted on every attendance write). No SW/caching-strategy change. Deploy AS sw.js.
// v413 (2026-07-18): cache key bumped v412->v413 — GAS-ONLY FIX: ESS Dashboard face login recognizes EITHER enrolled face store (on-device descriptor OR AWS Cloud Face), same as the kiosk. No SW/caching-strategy change. Deploy AS sw.js.
// v406 (2026-07-17): cache key bumped v405->v406 — GAS FIX (P0 root cause): ESS read-only wall was missing
//   submitReimbursement/addTransaction/getAdvanceEligibility, silently refusing every employee reimbursement
//   submission + advance-salary request. HTML: added bulk multi-select Approve/Reject to Late Clock-In/Out,
//   Advance/Encashment/Exit/Other, and Reimbursement Requests cards in the Approvals Inbox. Deploy AS sw.js.
// v405 (2026-07-17): cache key bumped v404->v405 — FIX: ESS Reimbursement submit try/catch (silent-failure guard). Deploy AS sw.js.
// v404 (2026-07-17): cache key bumped v403->v404 — HOTFIX, version markers only (see HTML/GAS v404 changelog: window.HRMS_VERSION was stuck at v401 since v402, causing a false OUT-OF-SYNC banner). No caching-strategy change. Deploy AS sw.js.
// v403 (2026-07-17): cache key bumped v402->v403 — GAS-ONLY FIX (BUG-03): Advance Salary eligibility
//   (checkAdvanceEligibility) now also counts 'Approved'-status advances when computing how much of the
//   monthly cap an employee has already used (previously only Applied/Paid/Pending were counted, so an
//   advance approved earlier in the month silently didn't count against a second request the same month).
//   Payroll itself already treated 'Approved' as real money — the eligibility check is now in sync with it.
//   No HTML/JS logic change (the ESS Request-Advance modal just displays whatever the server returns) — cache
//   key bumped in lockstep per standing convention so every device drops the stale v402 shell. Deploy AS sw.js.
// v402 (2026-07-17): cache key bumped v401->v402 — FIX: Reimbursement requests submitted via ESS were never
//   surfacing in the unified ✅ Approvals inbox (only a separate standalone 💰 Reimbursements tab, with no
//   pending-count badge) — an owner/manager following the Approvals tab, as the app itself instructs, could
//   miss a submitted claim entirely. Approvals inbox now fetches reimbursements alongside leaves/advances/exits
//   and shows a "💰 Reimbursement Requests" card with approve/reject actions; the Reimbursements nav item now
//   carries its own live badge; both badges (Approvals + Reimbursements) refresh in sync from either surface.
//   Also removed a redundant internal owner-token re-check on the reimbursements GAS handlers that could
//   silently block a fully role-permitted Manager session (the router's own role gate already covers this).
//   No salary/payroll engine change. Deploy AS sw.js.
// v401 (2026-07-17): cache key bumped v400->v401 — FIX: Add Transaction Amount auto-fill was getting stuck on the first fee Type selected (Mobile Fine / PIN Reactivation Fee / ID Card Reissue Fee) instead of refreshing on each Type change; fixed via auto-fill provenance tracking. Frontend-only, no engine/GAS behavior change. Deploy AS sw.js.
// v400 (2026-07-17): cache key bumped v399->v400 — ID Card Reissue Fee moved off the standalone
//   Card_Reissue_Log/logCardReissue system (which had two lifecycle bugs) and onto the existing, proven
//   Manual Transactions pipeline as a new 'CardReissueFee' type, with its own distinct payslip bucket
//   (cardReissueFeeDeduction, mirroring the existing perfReviewDeduction pattern) so it still shows as its
//   own clearly-labeled line everywhere (payslip, panel, Excel, ESS) instead of being lumped into generic
//   Penalties. The old per-employee Reissue Card button/modal/GAS handlers are removed. Mobile Fine, PIN
//   Reactivation Fee, and ID Card Reissue Fee default amounts are now consolidated in one Settings card,
//   and selecting any of these types in Add Transaction auto-fills the configured default amount (editable).
//   No change to calcMonthlySalary beyond the additive bucket (byte-identical otherwise). Deploy AS sw.js.
// v399 (2026-07-17): cache key bumped v398->v399 — REAL FIX for the ID Card Reissue Fee: the v398 display
//   patch was correct but the underlying data was being silently consumed/dropped. Root cause #1: opening
//   the "Why this salary?" preview or the payroll Recompute (live) button was marking the Pending reissue
//   charge as Processed on mere VIEW — before payroll was ever saved — so the fee vanished after the first
//   look. Root cause #2: even a real Save to Records never wrote the fee into the saved SalaryRecords sheet,
//   so nothing reading the saved register (Excel export, saved-month panel view, ESS) could ever see it.
//   Both fixed: preview paths are now read-only again (nothing consumed until an actual Save to Records),
//   and the saved record now persists the fee so every surface — panel, Excel, ESS "My Earnings" — shows the
//   same number. Also added to the ESS/employee-facing earnings views and the Salary History PDF re-download.
//   No change to calcMonthlySalary (byte-identical). Deploy AS sw.js.
// v398 (2026-07-17): cache key bumped v397->v398 — FIX: "Why this salary?" panel waterfall and the Payroll
//   Excel/CSV export were both missing the new ID Card Reissue Fee deduction line (the PDF payslip already
//   showed it correctly) — both now display it. No engine change; cache key bump only. Deploy AS sw.js.
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
const CACHE = 'artzfolio-hrms-v416-2026-07-19'; // v416 (2026-07-19): version bump only, for HTML/GAS/SW 4-way lockstep — salary-slip/Excel clarity + Excel data-bug fix (see HTML changelog). No SW/caching-strategy change, no engine change.
// v415 (2026-07-19): version bump only, for HTML/GAS/SW 4-way lockstep — critical follow-up: a partial single-field attendance edit was being silently diverted to a phantom OT-session row instead of updating the primary punch, even with Overwrite ticked (money-adjacent — see HTML/GAS changelog). No SW/caching-strategy change.
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
