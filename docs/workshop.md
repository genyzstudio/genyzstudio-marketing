> Current default workshop: **The Clever Little Rat — Scene 1**, a two-shot exercise. See [current curriculum and asset provenance](workshop-clever-rat.md). Paper-boat descriptions below are historical; it is no longer served.

# Bilingual AI video workshop

The classroom is available at `/workshop` (Vietnamese) and `/en/workshop` (English). Nine protected modules follow the studio pipeline. Both editions use English generation prompts and share learner progress. Only the email login form and support link are public.

## Email access

Cloudflare Pages Functions handles `/api/workshop/*`; Cloudflare D1 stores paid access, sessions, and progress. `workshop_codes` retains its legacy name but now represents an email-bound entitlement: email, expiry, revocation, payment reference, progress. The legacy permanent code hash is no longer accepted for login. Migration 0002 invalidates previous sessions; anonymous records must be assigned an email before they can regain access.

- `POST request-code`: accepts email, sends a six-digit code only to an active learner. Registered, unknown, expired and revoked emails receive the same generic response. Provider delivery failures also receive that response; operators see a redacted failure event and should monitor provider delivery logs.
- `POST login`: requires email and code. Codes expire within ten minutes, allow five guesses and are atomically consumed once. Resends are at least 60 seconds apart and do not reset the active attempt budget or expiry. A newly sent code replaces the previous one.
- Each authentication endpoint permits ten attempts per IP per 15-minute bucket. Account challenge limits apply across IPs. Expired challenges and rate-limit records are cleaned up on authentication requests.
- `GET content`, `PUT progress`, and `POST logout` retain server-side authorization. Revoked or expired access fails on the next protected request. Progress belongs to the email entitlement, with last-write-wins semantics.

Codes are stored as HMAC-SHA256 digests using a server secret, protecting short codes against offline guessing from a database-only leak. Session tokens contain 256 random bits, are stored as hashes, and use HttpOnly, SameSite=Strict, Secure HTTPS cookies scoped to the API. Sessions last at most seven days and never exceed entitlement expiry. Mutation requests require same-origin Origin and bounded JSON bodies. Responses are private/no-store. Neither curriculum nor credentials are placed in public bundles. Already downloaded material cannot be recalled.

## Email provider configuration

The implementation uses the [Resend email API](https://resend.com/docs/api-reference/emails/send-email). Configure a verified sending domain and these server-only Cloudflare Pages bindings/secrets:

- `WORKSHOP_DB`: D1 database binding.
- `RESEND_API_KEY`: sending API key, stored as a secret.
- `WORKSHOP_EMAIL_FROM`: defaults to `GenYZ Studio <workshop@genyzstudio.com>`. Verify `genyzstudio.com` in Resend before sending.
- `WORKSHOP_EMAIL_REPLY_TO`: defaults to `genyzstudio@gmail.com`, so replies go to the existing Gmail inbox. This address is not used as the authenticated sender.
- `WORKSHOP_LOGIN_SECRET`: cryptographically random secret of at least 32 characters, stored as a secret. Rotating it invalidates outstanding codes.

Never prefix these with NEXT_PUBLIC or commit them. Local development can use an ignored `.dev.vars` file with the same names. Missing email configuration fails closed with a service-unavailable message. The production D1 database and Resend credentials were configured on 8 October 2026. Credentials are Cloudflare production secrets; they are not in the repository. Automated tests stub delivery; no emails are sent by tests.

## Local preview and checks

Use Node 24. Run `npm ci`, `npm run workshop:setup`, `npm run build:preview`, and `npm run workshop:preview`. Open http://localhost:3102/en/workshop or /workshop. Setup applies local migrations only; there is no permanent preview bypass code. `wrangler.local.jsonc` uses a local placeholder database ID. A plain static server cannot provide login.

Run `npm run lint`, `npm run typecheck`, `npm test`, and `npm run workshop:verify-export` after building. Tests cover SQL through a D1-shaped SQLite adapter, delivery payloads, email binding, expiry, five-guess lockout across IPs, resend limits, replay/concurrency, session revocation, shared bilingual progress, and protected-content leakage.

## Manually activate paid access

After independently confirming payment, prepare an activation file:

```sh
npm run workshop:activate -- --email=learner@example.com --payment-reference=manual-receipt-001 --days=90
```

This writes a private mode-0600 SQL file under ignored `artifacts/workshop-access/`, containing personal information. It prints only the file path and does not alter a database or email anyone. Inspect it privately, then import it into the intended D1 database. Repeating activation for an email preserves progress and never shortens its current expiry. Activation restores revoked access deliberately; use only for confirmed payment. The reference is an operator audit label, not payment verification.

Local import:

```sh
npx wrangler d1 execute genyz-workshop-local --local --config wrangler.local.jsonc --file artifacts/workshop-access/FILE.sql
```

For production, create a dedicated D1 database and private `artifacts/workshop-production.jsonc` config with its actual name/ID and migrations directory `../migrations`. Apply both migrations with `wrangler d1 migrations apply DATABASE --remote --config artifacts/workshop-production.jsonc`, bind WORKSHOP_DB to the Pages production environment, and configure email secrets. Import reviewed activation files using `wrangler d1 execute DATABASE --remote --config artifacts/workshop-production.jsonc --file FILE`. Use separate preview data and credentials.

Revoke via a reviewed operator SQL file: `UPDATE workshop_codes SET revoked=1 WHERE id='LEARNER_UUID';`. Learners request a fresh email code when they lose a code; changing a registered email requires an operator identity check. There is no public access-grant endpoint.

Deploy via the existing Pages integration, retaining `out` and the root `functions/` directory. Verify the actual custom domain, real email delivery, anonymous denial, successful login, replay denial, progress, expiry/revocation, and cookie headers before launch.

## MoMo boundary

No checkout or webhook is implemented yet. A future verified payment webhook can activate the same email entitlement, but must check signature, amount, currency and order identity and process each payment idempotently. A browser redirect or unverified payment screenshot must never automatically activate access. Payment orders and refund handling remain future work.

## Sources and limits

Read in the authenticated IDALL classroom on 8 October 2026 (published page text only, no video transcript or course assignments copied):

- [From Script to Scene](https://www.skool.com/idall-lite-1529/classroom/1d8f48fe?md=8b6a8441f41c4f8e86aa51b4fa123b08): informed the separation of story decisions, reference assets, shot planning and individual frames.
- [From Frame to Motion](https://www.skool.com/idall-lite-1529/classroom/1d8f48fe?md=ab37f0dac7384ff69aafc280fada2abd): informed per-shot direction and iteration.
- [Final Assembly](https://www.skool.com/idall-lite-1529/classroom/a2969930?md=451d2c0a158c438296a2e1751b510d74): informed the transition from generated clips to manual editing, sound and export review.

Local primary project sources: `docs/ai-filmmaking-pipeline.md`, `docs/video-sources.md`, `content/pipeline.ts`, `content/workflows.ts`, `content/titus.ts`, and their existing public media. Titus panels are labelled planning material; the motion clip's generation ancestry remains unverified; its separated audio is an intermediate asset. No invented production approval history or promised student outcomes.

Current [Google Flow help](https://support.google.com/flow/answer/16353334?hl=en) was checked for the standard Video → Frames → Add start frame workflow. Tool features, availability and costs remain account-dependent. The UI links to the providers, with no fixed price/credit promises. GenYZ's paper-boat story, prompts, exercises and workbook are newly written.

## Language convention

Preserve original English source titles, terminology, tool names, interface labels and quoted source text. Vietnamese is for the beginner-facing explanations; it must not replace the original English. All 18 newly authored copyable prompts are English, labelled accordingly, and are the same in the classroom and downloadable workbook. Prompts explicitly request Vietnamese output where appropriate (brief/script, feedback, narration and film titles/descriptions). The original Vietnamese practice-film title “Chiếc thuyền nhỏ” stays unchanged.

## Bilingual classroom

`/workshop` serves Vietnamese explanations and `/en/workshop` serves the complete English edition. The header uses the same VN / EN links as the main site. Both routes show only the email login screen publicly, carry noindex metadata, and retrieve all curriculum data from the authenticated API. English homepage links lead to the English classroom.

The API accepts `?locale=en` (otherwise Vietnamese), including localized errors. Locale does not change access checks, cookie scope, module IDs, or progress ownership. Switching languages retains the same session and saved progress. All prompts remain English; the English edition requests English script/narration output. Original source titles, tool labels, and project filenames are retained. Workbook downloads use the selected language. The public-export scan checks both protected editions.


## Production configuration (8 October 2026)

The `genyzstudio-marketing` Cloudflare Pages project uses `wrangler.toml` for production settings. `WORKSHOP_DB` binds to `genyz-workshop-production` (APAC). Both migrations are applied remotely. Production secrets are `RESEND_API_KEY` and `WORKSHOP_LOGIN_SECRET`; the latter is separate from local development. Branch previews have no production database binding.

Activate owner-approved complimentary access with an `owner-approved-...` audit reference; do not label it as a verified payment. Import prepared grants with:

```sh
npx wrangler d1 execute genyz-workshop-production --remote --env production --file artifacts/workshop-access/FILE.sql
```

Build with `SITE_BUILD_MODE=production npm run build`, run `npm run workshop:verify-export`, then deploy with `npx wrangler pages deploy out --project-name genyzstudio-marketing --branch main --commit-dirty=true`. Direct deployments include local changes but do not push them to GitHub; keep the Git source synchronized before later Git-triggered deployments.


## Phoenix workshop — retired 10 October 2026

Removed from the site at the owner’s request because the Flow exercise did not work well. Both Phoenix pages are removed; saved VN/EN links redirect to the corresponding original workshop. The API rejects `course=phoenix` with 404. Historical progress and generated Flow assets are retained. The following records the retired implementation.

Former protected routes: `/workshop/phoenix` and `/en/workshop/phoenix`. The nine pipeline modules provide bilingual guidance with identical English execution prompts. The same entitlement grants access; migration `0003_workshop_courses.sql` stores Phoenix progress separately from the original course.

Source: [Phoenix](https://docs.google.com/document/d/13OshCr6_oZJmItgX5uoUKJ5xin1IpQ12k-scg4GjII0/mobilebasic). The source requests Seedance 2.5, a female protagonist, and 35 seconds. The Flow adaptation uses the existing male turnaround reference, Omni 1.1 Flash, Ingredients, 16:9, 720p, and three 10-second first takes. Observed cost was 15 credits per take, 45 total; availability and prices may change. No exact end-frame chaining or finished edit is claimed.

Generated candidates in the owner’s project:

- Ember Blade: `70521e85-5e70-4fe2-b06f-632c5ef17442`
- Phoenix Summon: `07fc9838-f68c-4ed2-9e2c-737d23902db5`
- Phoenix Sweep: `bc4a2ea2-9a65-4374-b8af-fc236be1b797`

Result links are inside the protected curriculum. Completed output tiles and the male/phoenix preview were inspected; full temporal, audio and continuity QC remains a learner review step. These are candidates, not an approved assembled film.

## Five Levels of AI Filmmaking — 11 October 2026

New protected routes: `/workshop/five-levels` and `/en/workshop/five-levels`.
The original paper-boat course remains available. The new course uses the same
email entitlement and session, with independent progress under `five-levels`.
Apply migration `0004_workshop_five_levels.sql` before deploying the new Functions.
It expands the course allowlist and preserves all historical Phoenix progress;
Phoenix remains unavailable through the API.

Source: [Duy AI — 5 Cấp Độ LÀM PHIM & VIDEO AI (Hướng Dẫn Chuyên Sâu)](https://www.youtube.com/watch?v=ITxx9hHbSj4).
The public description and visible Vietnamese transcript were read on 11 October
2026. The transcript export helper returned unavailable; the loaded YouTube
transcript panel supplied the evidence. Chapter anchors: 01:05, 09:30, 16:31,
29:53 and 49:51. Automatic captions can misrecognize model names, so the course
teaches capabilities without promising specific model versions, prices or limits.
No private linked resource pack, skill download or Canvas was accessed or copied.

Five modules follow the source's progression: first text/image clips; consistent
reference images and framing; camera/endpoints/multi-shot and revision; advanced
performance/voice/VFX control; a complete production workflow. GenYZ wrote a new
lantern-repairer exercise, prompts, time estimates and checks. The learner-facing workshop uses GenYZ explanations and exercises, without creator
names or source chapter links. Internal provenance is retained above. Both locales
include 24 core steps plus 28 technique labs with 84 further steps, copyable prompts, outputs, troubleshooting,
a downloadable workbook and self-reported completion. Level 4 requires one branch,
with explicit alternatives when advanced tools are unavailable.

Validation covers anonymous denial, bilingual payloads, course-isolated progress
across logins, invalid module rejection, revocation, preservation of retired
progress, language switching and static-export leakage for both courses. Building
locally does not apply production migrations or publish the site.

Initial local acceptance on 11 October: lint, typecheck, 45 tests, preview build and
51-asset public export scan passed. Browser checks at desktop and 390px covered
protected entry, completion saved across reload, VN/EN course-preserving navigation,
module navigation and Copy feedback. Both downloaded workbooks were checked against
the curriculum: all 5 modules, 24 steps, prompts, saved outputs and chapter links
were present. Synthetic local learner/session used for UI checks was removed;
no real email was sent, no production data was changed and no deployment was made.


Expanded coverage (11 October): Level 1 has 4 labs for prompt adaptation, Omni
assets, portrait animation and reference analysis; Level 2 has 6 for relighting,
compositing, wardrobe, shot sizes, camera angles and scene edits; Level 3 has 7 for
camera motion, speed, model comparison, endpoints, dialogue, fantasy failures and
budgeted drafts; Level 4 has 6 for reference packs, direction, voice, upscale,
live-action VFX and performance transfer; Level 5 has 5 for briefs, storyboards,
Canvas asset lineage, editing/sound and delivery. Expandable labs and full VN/EN
workbooks include inputs, saved outputs, review criteria and troubleshooting.
Completion remains tied to each core lesson, with labs chosen to suit the project.

Expansion verification: 46 tests, lint, typecheck, preview build and 51-asset
public export scan passed. The refreshed authenticated browser showed the new
VN/EN technique library; expanding a lab and copying its prompt worked. Both
workbook artifacts were regenerated with all 108 steps. Local preview only.

## Terminology update — 13 October 2026

Keep filmmaking/tool terms in English in the Vietnamese five-level course,
with short plain-language explanations: lens, shot size, camera angle, lighting,
foreground/background, motion control, plate, upscale and planning terms.
The glossary now has 20 entries. The ambiguous lantern phrase “thân kính” is
now “phần vỏ bằng kính của đèn”; this describes the lantern, not a camera lens.
Both workbooks were regenerated. Existing English lessons and prompts are
unchanged. Typecheck, lint, 46 tests, production build and protected-export scan
passed before publishing the content update; no schema migration is needed.

## Vietnamese prompts and tested images — 13 October 2026

All 41 five-level prompts have explicitly authored Vietnamese versions. The VN
classroom shows Vietnamese first, with the English version in a disclosure.
Planning prompts request Vietnamese output; asset placeholders retain their tool
binding names. VN level headings and many advanced instructions now use plain
Vietnamese with the tool term beside the explanation.

Four built-in imagegen runs used the exact Vietnamese prompts: Level 1 lantern,
Level 2 frontal character and lantern close-up edit, Level 4 turned portrait edit.
The close-up crops the handle/base and the portrait turn is shallow; these limits
are documented alongside the actual results and inputs. Suggested revisions are
explicitly untested. No video generation or motion/voice validation is claimed.
`artifacts/five-levels/imagegen-vietnamese-tests.json` records prompts, inputs,
output hashes and observations. Both workbooks include both prompt languages,
test status and protected example links.

PNG files live only under `public/api/workshop/examples/`. Pages routes every
`/api/workshop/*` request through the Function; an exact image allowlist and the
existing active-session check precede `env.ASSETS.fetch`. Successful responses
are `private, no-store`; absent assets/bindings and non-PNG fallbacks fail closed.
See [Cloudflare ASSETS binding documentation](https://developers.cloudflare.com/pages/functions/api-reference/#envassetsfetch).
The export scanner rejects public aliases; tests cover unauthorized, revoked,
unknown, wrong-method and unavailable-asset cases.

Published as production deployment `59bd935c-7839-4c9c-ade5-b1a8da771c52` (see the exact deployment
record in `artifacts/five-levels/vietnamese-prompts-live-verification.json`). Live
VN/EN HTML matches the built files; all four anonymous image requests and the
content request return 401/private,no-store; the former public image URL is 404.
Authenticated local browser rendering and Vietnamese Copy feedback were checked,
and the downloaded workbook was compared against all 41 Vietnamese prompts.

### 2026-10-13 — Five Levels tested visual galleries

Published 19 demonstrations across the five modules: 3 / 5 / 4 / 4 / 3. Added nine imagegen images, ten original OpenArt Seedance 2.5 Draft videos, and a 20-second silent edit assembled from four selected takes. Vietnamese prompts, reference roles, download links, settings and specific review notes are included in the protected curriculum and both workbooks. The English edition translates teaching notes while preserving the exact Vietnamese test prompts. Failed camera movement and a failed reference upload are retained and explicitly explained; no still is presented as motion evidence. Voice references, lip-sync, Motion Control and live-action VFX are not claimed as tested by these examples.

Media remains exclusively under `/api/workshop/examples/`; the explicit media registry is server-side. Authentication precedes static asset reads, byte-range responses retain private/no-store caching, and static HTML fallback is rejected by MIME type. No database migration or access-policy change was required.

Validation: 50 tests passed; TypeScript and focused ESLint passed; production build passed; 51 public text assets passed protected-content scanning. Signed-in local UI verified all five gallery counts and playback of the first clip and 20-second final film. Deployment `2480bbc0` was published to Cloudflare Pages production from the existing dirty working tree (not a Git push). Live verification records are in `artifacts/five-levels/visuals-live-verification.json`; the browser's production session was signed out, so authenticated playback was verified locally, not claimed as a live signed-in check.

Reproduction/evidence: `artifacts/five-levels/visual-examples-manifest.json`, exact prompt records, source MP4 downloads copied into protected assets, video frame review strips, and `final-film-classroom.png`. Original generated images remain in the imagegen output directory. The final film is a 24fps H.264 852×480 picture edit with audio removed; original generated clips retain their audio streams.

### 2026-10-13 — Faster workshop image loading

The classroom now serves prebuilt responsive WebP previews at 480px and up to 1280px, generated with Sharp during every production build. The 13 source PNGs total 26.85 MB; the large previews total 1.04 MB (96.1% fewer image bytes), with individual large previews about 49–118 KB. Small previews total 0.25 MB. These are measured file-size reductions, not a measured end-to-end latency claim. Native lazy loading is retained. Original PNGs remain the full-resolution open/download targets and the fallback for browsers without WebP.

The derivatives are explicitly registered under the same protected API namespace, including MIME validation and private/no-store headers. No cache or authentication policy was weakened. The original images were preserved. Run `npm run workshop:optimize-images` to regenerate derivatives and `artifacts/workshop-image-optimization.json` for the size report. The build invokes this step automatically. Validation: 51 tests, production build, protected-export scan and focused lint passed; browser inspection confirmed selected WebP URLs, successful rendering, original-download targets and PNG fallback markup.

### 2026-10-14 — Natural Vietnamese across Five Levels

Revised the five core modules, technique labs, glossary, preparation instructions, tested-image reviews and visual galleries. Replaced literal translations and unnecessary English fragments with clear modern Vietnamese while retaining useful technical names. Prompt text and generated media provenance remain intact, including failed attempts and limits of the visual evidence. English curriculum, IDs and asset paths are unchanged. The workbook consumes the same revised curriculum. Verification artifacts: `artifacts/vietnamese-editorial/`.

Published with the Clever Rat wording revision in production deployment `b0e69bf7`. Authenticated live browser verification confirmed the revised Five Levels lesson and storyboard notes beside the generated image. Lint, 56 tests, production build and the 61-file protected-export scan passed. No database migration, Git commit or push was performed.
