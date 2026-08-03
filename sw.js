// ArtzFolio HRMS — Service Worker · cache key artzfolio-hrms-v492-2026-08-03
// v492 (2026-08-03): cache key bumped v491->v492 — the v490 cache-buster is removed (it made Apps Script
//   answer a POST with a 404 page), the kiosk panel shows people again, payroll recompute is one button.
// v491 (2026-08-03): cache key bumped v490->v491 — payroll settings snapshot at approval, kiosk fast
//   today-attendance via the punch key, and a cloud-key status check. No SW/caching-strategy change.
// v490 (2026-08-03): cache key bumped v489->v490 — four live faults fixed (slow-button POST, mirror-sync
//   timeout, kiosk attendance warning, FINALIZED payroll dry-run). No SW/caching-strategy change.
// v489 (2026-08-03): cache key bumped v488->v489 — the kiosk punch path gets its own credential, the cloud read
//   key is locked to signed-in devices and becomes rotatable from a button. No SW/caching-strategy change.
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
const CACHE = 'artzfolio-hrms-v492-2026-08-03'; //v492_undo-the-cachebuster-and-simplify-payroll 2026-08-03. Cache key bumped v491 -> v492. Removes the cb= cache-buster added in v490, which was proven by an A/B test against the live backend to make Apps Script answer a POST with a 404 web page - that is what broke every slow owner button. Also returns the kiosk Who's In/Out panel to the read that carries names, designation and shift, and makes recomputing a finalised payroll month one plain button again. No service-worker or caching-strategy change. Deploy AS sw.js. // v491_settings-snapshot-and-kiosk-fastread 2026-08-03. Cache key bumped v490 -> v491. Every approved payroll register now snapshots the settings it was produced under; the kiosk reads today's attendance through its own punch key instead of Apps Script; and a Check the Cloud Keys button answers whether a key rotation actually went through. Also corrects v490's published root cause: a status-page reply means the REPLY was lost, not that the command did not run. No service-worker or caching-strategy change. Deploy AS sw.js. // v490_four-live-faults 2026-08-03. Cache key bumped v489 -> v490. Four live faults fixed: the slow-button POST that Google answered with its status page, the mirror sync being killed at the 6-minute ceiling, the kiosk warning about UNKNOWN attendance counts after a single failed try, and a FINALIZED payroll month that could not be recomputed and could not tell you whether recomputing would change anything. No service-worker or caching-strategy change. Deploy AS sw.js. // v489_kiosk-gets-its-own-key 2026-08-03. Cache key bumped v488 -> v489. The root cause of the 2 August leak is closed: the punch path now has its OWN key (getPunchToken), so the cloud read key is issued only to a signed-in device and can finally be rotated from a Settings button. No service-worker or caching-strategy change of any kind. Deploy AS sw.js. // v488_payroll-page-shows-payroll 2026-08-02. THE REPORTED BUG, root-caused and fixed. Opening Payroll showed the DASHBOARD instead - sidebar said Payroll, title said Payroll, content was the dashboard - plus a stray warning toast, and it only came right after a third refresh. ROOT CAUSE: _v303TwoPhase is a fast-paint then authoritative-repaint helper. It paints instantly from the cloud copy, then fires a repaint callback when the slow Apps Script answer finally arrives. The dashboard's callback is renderDashboard(), which writes straight into admin-tab-content - and NOTHING checked whether the user was still on that screen. Apps Script takes 5-33 seconds, which is far longer than it takes to click Payroll, so the late answer landed on top of whatever screen had replaced it. Refreshing 'fixed' it only because it left no stale promise in flight. FIX-1: _v303TwoPhase now remembers which screen asked, and silently skips the repaint if the user has navigated away. One guarded change, all four call sites, and behaviour is byte-identical when the user has NOT moved. FIX-2: the kiosk Who-In-Out refresh ran on a global 5-minute timer and raised its warning toast on whatever screen happened to be open - it now does nothing unless its own panel is actually on screen. FIX-3: the Payroll empty state now names the month it is showing and says how to change it, because at the start of a month it defaults to the new month and reads as if the data had vanished. NO setting, salary rule, payout value or default is changed anywhere in this release. //v487_readtoken-login-and-narrow-reads 2026-08-02. (A) SECURITY, the root cause of today's leak. Proven live: the PUBLIC config.json gave the apiToken, that alone unlocked getReadToken, and that key returned every employee's salary, mobile, date of birth and home address. The exposed view was withdrawn immediately (hrms-read v5), but the door itself was still open and Leaves and Attendance were still reachable through it. getReadToken now requires a REAL SIGNED-IN SESSION - either a valid owner token or a valid HMAC role token, both of which every logged-in device already sends on every call (v91 P1). An anonymous caller holding only the public apiToken is refused. Failure is graceful by construction: _v265Init already falls back to Apps Script and _v474FastAck already returns null, so the worst case is slower, never broken. Kill switch Config READTOKEN_REQUIRE_LOGIN = off restores the old behaviour without a redeploy, and refusals are audit-logged once per 10 minutes so a legitimate caller cannot hide. (B) SPEED, the worst read in the app. _v327LoadTodayMap pulled the ENTIRE 1,671-row attendance table into the browser to build a map of TODAY - on the kiosk, on the punch path. It now asks for one day. _sbDirectRead gained optional date-range narrowing matching hrms-read v5 (dateCol/fromDate/toDate); every existing caller passes no range and is byte-identical. NO setting, no salary rule, no payout value, no default and no variable is changed anywhere in this release. //v486_where-pay-comes-from-and-scan-routes 2026-08-02. Two owner-visibility additions, both in the Speed & Health card so nothing has to be hunted for. (A) WHERE YOUR PAY IS CALCULATED FROM. The owner could not find the payroll-engine source setting -- it lives four cards further down in Advanced - Supabase Migration & Speed Control Center, which is a reasonable place to hide a switch and a terrible place to hide an ANSWER. The Speed & Health card now states it in one plain line every time the card is opened. It says Google Sheets, or Cloud copy in red, or -- if the check itself fails -- that it could not tell. It never guesses the safe answer. (B) WHICH ROAD DID RECENT SCANS TAKE. Until now a deferral left no trace anywhere: the Edge Function handed a reason to the browser and the reason died there, which is exactly why four versions were spent hunting a bug that did not exist. hrms-punch v4 now records every deferral fire-and-forget (not awaited, so it adds zero time to a scan), a new PunchDefers table holds them for 30 days, and a new button reports the last 24 hours grouped by reason in plain English. Also shown: the route the last scan on THIS device took. No attendance, salary, leave or payroll logic is touched. //v485_daily-health-report 2026-08-02. (A) DAILY HEALTH REPORT: a new Settings button, 'Send Me the Health Report Now', runs five live overnight checks and emails the verdict; the backend also sends it by itself at 07:00 every morning. The headline is built FROM the findings, and a check that could not be read is shown as a FAILURE, never as a pass. (B) PUNCH PATH VISIBILITY: the kiosk confirmation panel now states, in words, WHICH route the scan took -- Instant (about a quarter of a second) or the normal Google backend -- and when the instant route declined, WHY. Proven live on 2026-08-02: the reason the punch queue stayed empty through v474-v484 was never a bug; every test scan was past the 60-minute late-approval threshold and the Edge Function correctly sent it for approval instead. The system was right and simply never said so out loud. This makes it say so. No attendance, salary, leave or payroll logic is touched. //v484_instantpunch-reaches-the-kiosk 2026-08-02: Instant Punch was wired into the admin and ESS clock-in only, never into the kiosk scan path -- which is why the queue stayed empty and scanning still felt slow. Now connected there too. //v483_instantpunch-label-and-timesheet-autoretry 2026-08-02: the Instant Punch button now shows its real ON or OFF state on load plus a permanent status line, and the Timesheet retries once by itself before showing the could-not-load banner. //v482_failed-fetch-guard 2026-08-02: new shared _v481Trustworthy helper so no screen renders a meaningful value out of a failed or empty fetch; applied first to the kiosk Who-In-Out panel. //v480_punch-reconciliation (2026-08-02): a read-only nightly check plus a Settings button that PROVES every scan the fast path accepted is actually present in the Attendance sheet, naming anything missing by employee and date. //v479_kiosk-stop-after-punch-and-instantpunch-default-on (2026-08-02): the kiosk no longer auto re-arms the scanner after a punch (v432 FIX-B) -- it stops the QR loop, RELEASES the camera and shows a clear confirmation, so the operator taps CLOCK IN / OUT again for the next person. Instant Punch is now ON by default. //v478_p0-triggerfix-and-safe-repair (2026-08-02, URGENT): v477's everyMinutes(3) is illegal in Apps Script (only 1/5/10/15/30) and the self-healer's delete-before-create left the mirror sync with no trigger. Interval 3->5, self-healer now validates the interval and creates before deleting. //v477_syncgate-3min-and-readallowlist (2026-08-02): the Supabase mirror sync now asks Drive one cheap 'has anything changed?' question instead of reading all 17 tables every tick, so the interval drops 15 min -> 3 min while the idle load falls. Read allow-list widened by 6 company-wide reference tables only. //v476_slowbutton-patience-and-sentry-forceload (2026-08-02): the two slow owner buttons now use a dedicated 150s call with a live seconds counter (Check & Repair Triggers was being abandoned before Google answered and wrongly reported a dead backend -- it was healthy), and Sentry.forceLoad() is called after boot because the loader script defers the real SDK until the first crash. Carries v475/v474/v473. //v475_settings-buttons-and-crash-reporting (2026-08-02): new Settings card 'Speed & Health -- Instant Punch, Triggers, Queue' with four real buttons (no console, no function names) + Sentry crash reporting (async, PII-scrubbed, cannot affect the app if blocked). Carries v474 + v473. //v474_instant-punch-and-selfhealing-triggers (2026-08-02): self-healing triggers (doPost repairs Keep-Warm/Auto-Sync/drain hourly -- no manual reinstall ever again) + instant clock-in/out via the new hrms-punch Edge Function and PunchQueue table (~250ms verdict; the authoritative Apps Script write still runs in the background, unchanged; flag az3_fastPunch defaults OFF). Carries v473's 3 fixes. //v473_fastmode-tokencache-timesheet-loudfail-rosterwait (2026-08-02, HTML-ONLY this round -- this file has zero logic changes, version bumped purely for 4-way lockstep): (1) PERF -- the browser's Supabase read-token init awaited a getReadToken GAS round-trip before reading its own localStorage cache, so Fast Mode was effectively OFF for the first ~2 minutes of every session (GAS measured 40-60s per call live on 2026-08-02); now cache-first with a background refresh. (2) Timesheets all-blank/all-A root-caused to a missing empty-result guard in renderTimesheets, NOT data loss -- both data paths verified correct live (Supabase 1.06s / GAS 41.0s); now shows a loud banner + '?' instead of a false 'A'. (3) Bulk Hours Entry / Range Backfill / Bulk Shift 'No employees loaded' -- the modals now fetch the roster on demand instead of bailing. No salary, attendance, leave or payroll logic touched anywhere.  //v469_samedayUL-qrdebounce-fastmode-schema (2026-08-01): version bump for HTML/GAS/SW lockstep -- same-day auto-UL sweep, kiosk QR camera timeout+debounce fix, Supabase Fast-Mode schema gap flagged (see HTML changelog / decision log for full detail). No SW/caching-strategy change. //v460_bulkslip-layout-parity-fix (2026-07-31): version bump for HTML/GAS/SW lockstep -- bulk salary-slip PDF paths (All Slips combined PDF / Separate PDFs / ZIP) now render through the same locked HTML slip renderer the single-slip download uses, see HTML CACHE changelog; no SW/caching-strategy change itself. // v459_grace-adjusted-lateness-note (2026-07-30): version bump for HTML/GAS/SW lockstep -- OT Claims + Bulk Bonus identity display fixes, see HTML CACHE changelog; no SW/caching-strategy change itself. // v455_identity-consistency-fix (2026-07-30): version bump for HTML/GAS/SW lockstep -- Approvals + Payroll picker identity display fixes, see HTML CACHE changelog; no SW/caching-strategy change itself. // v454_ess-fixattendance-whitelist-fix (2026-07-30): version bump for HTML/GAS/SW lockstep -- GAS-only ESS whitelist fix, see GAS HRMS_VERSION changelog; no SW/caching-strategy change itself. // v453_daybyday-slipdownload-diagnostic-fix (2026-07-30): version bump for HTML/GAS/SW lockstep -- fixed the single-slip download's day-by-day table silently showing nothing with no reason (HTML-only, see HTML CACHE changelog); no SW/caching-strategy change itself. // v452_bulkattendance-late-ot-parity (2026-07-30): version bump for HTML/GAS/SW lockstep -- bulk/backfilled attendance entries now get lateMinutes + otMinutes computed the same way a live kiosk punch does (GAS-only fix, see GAS HRMS_VERSION changelog); no SW/caching-strategy change itself. // v451_devicenaming-daybyday-loudfailure-fix // v447_slip-spacing-pagefit-fix
// v435_advance-eligibility-earned-salary-fix (2026-07-26): version bump for HTML/GAS/SW lockstep -- Advance Salary eligibility ceiling (checkAdvanceEligibility) now nets Late/UL/Sandwich/Undertime the same way the Payroll tab does, instead of a raw days-present x daily-rate figure; no SW/caching-strategy change itself; see GAS HRMS_VERSION changelog for full detail.
// v433_selfie-settings-split (2026-07-24): Split the single 'Audit Selfie' setting into two independent controls: capture-enabled (`requireSelfie`, unchanged key, background/non-blocking) and mandatory-before-punch (`selfieMandatory`, new key, blocking gate — falls back to the legacy `requireSelfie` value if never explicitly set, preserving existing deployments' current behavior exactly until the owner changes it). Corrected an inaccurate tooltip that claimed the setting 'never blocks the punch' — it does, when the mandatory gate is on. Version bump for HTML/GAS/SW lockstep only; no SW/caching-strategy change itself. // v432_perf-mirror-session-fixes (2026-07-23): version bump for HTML/GAS/SW lockstep — camera mirror-image fix (back camera no longer mirrored), kiosk auto-re-arm after a punch, and admin/ESS session-logout race + ESS session persistence fixes; no SW/caching-strategy change itself.
// v431_quickadd-lean-form-revert (2026-07-23): version bump for HTML/GAS/SW lockstep — reverted showQuickAddEmpModal()'s v430 field-set expansion back to the lean fast-onboarding form (Admin ⚡ button and Supervisor/Manager mobile section, same shared function); no SW/caching-strategy change itself.
// v428 (2026-07-23): version bump for HTML/GAS/SW lockstep — Quick Add full form for quickOnboard-only Manager/Supervisor, no SW/caching-strategy change itself.
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
