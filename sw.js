// ArtzFolio HRMS — Service Worker · cache key artzfolio-hrms-v524-2026-08-07
// v524 (2026-08-07): cache key bumped v523->v524 — marker-only, new owner-only JWT-mint diagnostic in HTML/GAS. No SW logic change.
// v512 (2026-08-05): cache key bumped v511->v512 — Settings tab admin-console descriptions, no SW logic change.
// v511 (2026-08-05): cache key bumped v510->v511 — Supabase Stage 1: getPendingLeaves fast-paths at
//   three more call sites (badge, dashboard, leaves tab). No SW logic change.
// v502 (2026-08-05): cache key bumped v501->v502 — Direct Exit now records HOW somebody left, and
//   the attendance safety check has a settings card. No SW change.
// v501 (2026-08-04): cache key bumped v500->v501 — slip data now arrives in ONE bulk call instead of
//   ~87, and the auto-UL sweep refuses to mark a day when the app was clearly down. No SW change.
// v500 (2026-08-04): cache key bumped v499->v500 — a cancelled bonus stays cancelled, and payroll
//   rounds now retry a reply Google drops instead of throwing the register away. No SW change.
// v499 (2026-08-04): cache key bumped v498->v499 — one Recompute button that finishes by running in
//   rounds, and Option B (a prize is awarded once, never again). No SW logic change.
// v498 (2026-08-04): cache key bumped v496->v498 — a hung call can no longer hold one of the four
//   connection slots forever, which is what froze the kiosk and the dashboard. No SW logic change.
// v496 (2026-08-04): cache key bumped v495->v496 — an empty register can no longer be shown as a
//   successful run, and a month closes only when everyone in it has been paid. No SW change.
// v495 (2026-08-03): cache key bumped v494->v495 — the 2-Aug salary leak is closed FOR REAL at the
//   database, not just in an Edge Function allow-list. No SW change. Deploy AS sw.js.
// v494 (2026-08-03): cache key bumped v493->v494 — carries the frozen-screen fix and removes two
//   whole Apps Script calls (~30s of backend work) from every app boot. No SW change.
// v493 (2026-08-03): cache key bumped v492->v493 — releases the stuck "Please wait" curtain (one missing
//   hide() froze the app) and adds a watchdog so it can never become an outage again. No SW change.
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
const CACHE = 'artzfolio-hrms-v524-2026-08-07'; // v524: marker-only bump for 4-way lockstep -- HTML gained a new owner-only "Test Supabase JWT Mint" diagnostic button + JS function, GAS gained the mintTestSupabaseJwt handler; no SW/caching-shape change. -- // v523: boot-load deferred-activities perf fix (HTML-only) -- // v522: HTML-only critical fix -- employee salary fast-path bug (see HTML/GAS changelog). // v521: backupSyncTick time-boxed (5min) + resumable cursor -- GAS-only, no SW/caching-shape change.
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

// ── v503 (2026-08-05) — TWO BLOCKERS FROM v501, AND A SAFETY NET THAT SWITCHED ITSELF OFF ──
//  B1  downloadAllSlipsPDF declared `const fname` INSIDE a try and read it AFTER the finally.
//      Block-scoped + strict mode = a guaranteed ReferenceError on EVERY combined-PDF download.
//      The PDF was already saved by then, so only the confirmation crashed - which is why nobody
//      noticed. fname is now declared before the try.
//  B2  _v501PrefetchSlipBundle assigned `total` without ever declaring it. Strict mode made that a
//      ReferenceError, swallowed by the function's own catch, which returns null. The backend DOES
//      send a numeric total, so this fired on round 1 every time: v501's headline speed fix (one
//      call instead of ~87) has never once run. Declared.
//  G1  The auto-UL circuit breaker FAILED OPEN - any throw returned null and all four auto-UL
//      writers proceeded unguarded, on exactly the kind of unhealthy day the breaker exists for.
//      It now fails CLOSED: if the check cannot be evaluated, nobody is marked and it says so.
//  G6  autoULLastBlocked was one slot every block overwrote. Now one entry per date, newest first,
//      capped at 10, so a second bad day cannot erase the record of the first.
//  G4  Leave balances now carry a balancesOk flag, like reimbursements already did, so a FAILED
//      read can never be printed on a payslip as "this employee has no balances".
//  F-A a lost reply (_v490StatusPage as well as _v476Timeout) is reported as UNKNOWN, not failure.
//  F-B a partial save no longer claims "nothing was saved", and `skipped` is shape-guarded.
//  F-C the card no longer presents built-in defaults as if they were saved configuration.
//  F-D the card can no longer look blank, and its first click OPENS it so the refresh actually runs.
//  F-E the F&F PREVIEW now refuses an unclassified exit, exactly as Direct Exit already did.
//  UNCHANGED: calcMonthlySalary byte-identical (73,578 chars, md5 d253361cf6a4ad2232612f38f8d19b3a).

// -- v504 (2026-08-05) -- v503 WAS WITHHELD BY ITS OWN AUDIT. This is v503 with my mistakes removed.
//  The two real blockers (B1 combined-PDF ReferenceError, B2 the slip prefetch that never ran) are
//  unchanged and correct. What changed:
//   A1  F-E WITHDRAWN. My v503 guard on the F&F preview sat AFTER the panel spinner was painted, so a
//       refusal left the settlement screen spinning forever; and nothing prefills #fnf-exit-type, so
//       the normal Initiate -> Calculate route would have hard-refused on a field labelled as being
//       for Direct Exit only. Two regressions on a money screen. Queued, done properly, later.
//   A2  the partial-save message was written and then immediately overwritten by the refresh that
//       followed it - the entire output of that fix was unreachable. Refresh first, then speak.
//   A3  the blocked-day list is rendered as a list, not as one 500-character line.
//   A4  "I have fixed that day" cleared ALL ten blocked days. It now clears the newest one only.
//   A5  the never-saved note now fires per field, not only when BOTH are absent.
//   A6  the 07:00 health email is list-aware, no longer asserts one cause for two different faults,
//       and can no longer print a green all-clear for a check it was unable to read.
//       It also stops claiming "nobody lost pay": blocking the sweep stops the UL ROW, but payroll
//       still treats a day with no record as unpaid. The email now says that in plain words.
//  UNCHANGED: calcMonthlySalary byte-identical (73,578 chars, md5 d253361cf6a4ad2232612f38f8d19b3a).

// -- v505 (2026-08-05) -- THE OUTAGE REGISTER, AND THE GATE THAT STOPS A BAD DAY REACHING PAYROLL.
//  Owner decision 2026-08-05: on a day the app is broken and nobody can clock in, do NOT pay the day
//  and do NOT mark it uninformed leave. HOLD it, alarm loudly, rectify by hand.
//
//  WHY: v501's breaker stops the sweep WRITING a UL row. It never stopped the MONEY, because pay is
//  derived from the ABSENCE of an attendance record - the frozen engine reads any uncovered elapsed
//  working day as UL_AUTO, unpaid AND penalty-bearing. So a blocked day used to show "nobody lost
//  pay" and then dock everybody at payroll. The net sat one layer above the money.
//
//  NEW SHEET  Attendance_Outage_Days - one row per held-back day: date, why, who, Open/Fixed, by whom.
//  THE GATE   handleCalcAllSalaries and handleSaveSalaries both REFUSE a month containing an Open
//             outage day, naming the dates and the count. First statement in each - no work, no lock,
//             no write happens before it. Fails CLOSED if the register cannot be read.
//  THE FIX    Settings > Shifts and Time > Attendance Safety now lists every day waiting to be set,
//             with every affected person named. The close button does NOT flip a flag: the backend
//             verifies that EVERY affected person now has an attendance row for that date and refuses,
//             naming whoever is still missing. A button that could be waved through would re-create
//             the exact fault this release exists to close.
//  calcMonthlySalary UNTOUCHED - byte-identical, 73,578 chars, md5 d253361cf6a4ad2232612f38f8d19b3a.

// -- v506 (2026-08-05) -- v505 WAS WITHHELD BY ITS OWN AUDIT. Two blockers, both mine, both money.
//  BLOCKER 1  THE SHIFT-COHORT HOLE. The register was keyed on date and OVERWROTE the affected list,
//             and returned early doing nothing if the day was already closed. The same-day sweep judges
//             ONE SHIFT COHORT AT A TIME, so on a full-day outage the morning cohort trips at 14:00 and
//             the evening cohort at 18:00. Close the day after fixing the morning cohort - which the
//             screen actively invites - and the evening cohort got NO register row, NO gate, and a
//             silent unpaid day plus absence penalty. The exact fault the feature exists to close.
//             FIXED: the affected list is now a UNION, and a closed day REOPENS if a new cohort appears.
//  BLOCKER 2  A CHECK THAT COULD NOT RUN DEADLOCKED A WHOLE MONTH. v505 gave the breaker's fail-closed
//             branch the same power as a real outage, so one transient Config read failure on an
//             ordinary day made that month permanently un-computable - and the only way out was to
//             fabricate attendance rows for people who really were absent. FIXED three ways:
//             (a) an unevaluated check records status 'Review', which is shown loudly but does NOT gate;
//             (b) approved LEAVE and company HOLIDAYS now count as a settled day, not just attendance;
//             (c) an explicit owner OVERRIDE that demands a written reason, stores it on the day and
//                 audit-logs it. An override is a decision, not a loophole.
//  ALSO       The F&F settlement path is now gated too - it computes the exit month from the same frozen
//             engine and ACTUALLY PAYS MONEY OUT, so v505's claim to be "impossible to run past" was
//             false. The guard is WIRED, not a dead helper. The recompute gate now fires only at the
//             START of a run, so a sweep tripping between resumable rounds cannot strand a half-written
//             register. resolveOutageDay moved to the payroll module - it lifts a payroll block.
//             The Refresh button now refreshes BOTH panels; three v505 messages said "press Refresh"
//             and pressing it did nothing to the outage panel.
//  calcMonthlySalary UNTOUCHED - byte-identical, 73,578 chars, md5 d253361cf6a4ad2232612f38f8d19b3a.

// -- v507 (2026-08-05) -- ONE EXIT VOCABULARY, AND THE DEFERRED AUDIT ITEMS CLEARED.
//  OWNER DECISION 2026-08-05: normalise exit types on READ, never rewrite history. A settled exit
//  record - some belonging to people already paid their F&F - states what was decided at the time, and
//  a migration over those rows has no undo. So nothing stored is changed and every consumer maps
//  through one function on both sides (_v507CanonExitType). 'Mutual' (all history) and
//  'Mutual Separation' (everything since v502) stop being two categories for one thing.
//   1  handleDirectExit now VALIDATES the exit type against the six allowed values instead of
//      stamping any string onto a person.
//   2  handleInitiateNotice now WRITES emp.exitType. v502 fixed one of the three exit routes; this is
//      the NORMAL one - termination served with notice - and it wrote nothing, so everyone leaving
//      this way still landed in the F&F as the 'Resignation' default whatever was actually chosen.
//   3  THE F&F PREVIEW GUARD, DONE PROPERLY. v503 tried this and was withheld: its guard sat AFTER the
//      spinner was painted (a refusal span forever) and nothing prefilled the field. Now the guard is
//      ABOVE the spinner, _v507PrefillExitType fills the selector from the employee's own record when
//      the panel loads, and the label no longer claims the field is only for Direct Exit.
//   4  getOutageDays marked read-only - it was writing an Audit row on every card refresh.
//   5  _v505DateKey now uses Asia/Kolkata like the rest of the file. A Date-typed cell under a
//      different script timezone would land on the wrong day, orphan the outage row and silently
//      un-gate the month it protects - the exact failure its own comment claims to prevent.
//  calcMonthlySalary UNTOUCHED - byte-identical, 73,578 chars, md5 d253361cf6a4ad2232612f38f8d19b3a.

// -- v508 (2026-08-05) -- v507 WAS WITHHELD. BOTH AUDITS INDEPENDENTLY FOUND THE SAME MONEY BUG.
//  BLOCKER  THE STICKY EXIT TYPE. v507's prefill did `if(sel.value) return;` and nothing anywhere reset
//           #fnf-exit-type - the selector is built once per SCREEN by renderFnF, not per employee. Load
//           an absconder, then load anybody else, and the field still read 'Absconding'. The new guard
//           saw a value, passed, and calcFnF received exitType:'Absconding' FOR THE WRONG PERSON -
//           forfeiting their leave encashment and adding the ~3-day absence penalty. Save Settlement
//           would have persisted it. v507 CREATED that stickiness: before it the field stayed blank.
//           FIXED by ownership: the selector records which employee its value belongs to, is reset when
//           asked for a different one, and every path that can reach a settlement figure re-establishes
//           ownership at the point of use - because the Calculate button reads the employee straight
//           from the search box and never calls loadFnFEmployee at all.
//  BLOCKER  handleApproveNotice never wrote exitType. With Config exitApprovalMode='approval' the whole
//           v507 fix was a no-op AND the new required field then hard-refused the ordinary
//           Initiate -> Calculate route. One Config value decided whether the release worked or broke.
//  HIGH     "Normalise on READ" was never implemented - v507 shipped the canon helper with ZERO readers,
//           so 'Mutual' and 'Mutual Separation' still appeared as two categories in every report and
//           export. Now applied at the F&F record, the FnF_Records sheet, the Exits table and the
//           Notices table.
//  HIGH     Direct Exit refused an unrecognised type AFTER appending the notice row, leaving an orphan
//           Exits & Notices row and the employee still Active - and every retry appended another. The
//           validation now throws before anything is written, and the register column no longer
//           defaults to the legacy 'Mutual' token this release exists to stop creating.
//  MED      handleCancelNotice now CLEARS exitType. A revoked notice was leaving an Active employee
//           carrying 'Termination', which then prefilled into their next genuine resignation.
//  MED      Direct Exit no longer rewrites settled history: if the stored value already MEANS the same
//           thing, it is left byte-identical. The owner's decision was normalise on read, never rewrite.
//  MED      initiateNotice refuses a typo instead of silently dropping it - same input, one answer.
//  LOW      getOutageDays no longer CREATES a sheet while sitting on the read-only allow-list.
//  calcMonthlySalary UNTOUCHED - byte-identical, 73,578 chars, md5 d253361cf6a4ad2232612f38f8d19b3a.

// -- v509 (2026-08-05) -- v508 WAS WITHHELD. THE MONEY BUG SURVIVED ON THE ONE PATH THAT MATTERS MOST.
//  BLOCKER  v508 fixed the sticky exit type inside calculateFnF and left _v155DirectExit reading the
//           selector RAW. Direct Exit is the only route that persists a settlement with NO preview.
//           Load an absconder, pick somebody else in the search box (which does NOT call
//           loadFnFEmployee), press Direct Exit -> the second person was marked Absconding: leave
//           encashment forfeited, ~3-day absence penalty, and the register row, emp.exitType and the
//           FnF record all written. The ownership check now runs there too, before the value is read.
//  BLOCKER  handleApproveNotice read p.exitType / p.noticeType - fields the client's noticeAction
//           NEVER SENDS (it posts only {rowIndex, triggeredBy}). The v508 approval-mode fix was a
//           no-op, exactly like the v507 fix it replaced. It now reads the stored type off the notice
//           row (loc.row[6]).
//  HIGH     v508 wiped the selector whenever ownership did not match - including a FRESH screen where
//           the owner had just deliberately chosen a type without pressing "Load Employee". That
//           silently replaced a real choice with the stored value on a money screen. An UNOWNED value
//           now belongs to whoever is selected; only another person's value is cleared.
//  HIGH     handleInitiateNotice validated AFTER its appendRow and only in immediate mode - so a
//           refusal left an orphan Exits & Notices row (one more per retry) and approval mode accepted
//           typos silently. Validation moved above the append and applies in both modes; the register
//           column now stores the CANONICAL value, so this route stops writing legacy 'Mutual' as new
//           data.
//  MED      _v508NoticeUpd treated null (unrecognised) and '' (absent) identically and dropped both.
//  LOW      Initiate Notice offered 3 of the 6 exit types; a contract ending or retirement had to be
//           filed as something it was not. All six now offered.
//  calcMonthlySalary UNTOUCHED - byte-identical, 73,578 chars, md5 d253361cf6a4ad2232612f38f8d19b3a.

// -- v510 (2026-08-05) -- THE MONEY BUG, CLOSED AT THE FOURTH ATTEMPT. v507/v508/v509 each missed a path.
//  BLOCKER  v509 adopted any UNOWNED value so a deliberate choice on a fresh screen would not be wiped.
//           But #fnf-exit-type had NO change handler, so a value picked while employee A was in the
//           search box also carried no owner - and was then adopted for employee B. Same money bug,
//           narrower window: pick Absconding, switch employee, press Direct Exit, and the WRONG person
//           loses their leave encashment and gains a ~3-day penalty, persisted with no preview.
//           FIXED at the source: the control stamps its own owner the moment a human touches it, so an
//           unowned value can only come from an untouched render - which is always blank. Adoption is
//           now safe AND the deliberate-choice fix survives.
//  MED      handleModifyNotice wrote free-text into notice column 7 unvalidated. Harmless until v509
//           made that column the authoritative source for the emp.exitType that approveNotice writes.
//           Now validated, and the employee record is kept in step instead of going stale after an edit.
//  calcMonthlySalary UNTOUCHED - byte-identical, 73,578 chars, md5 d253361cf6a4ad2232612f38f8d19b3a.
