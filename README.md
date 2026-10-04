# GenYZ Studio

Vietnamese-first marketing site for beginner AI video training. Next.js App Router, TypeScript, Tailwind CSS, fully static HTML export. No accounts, database, payments, first-party analytics cookies or registration storage. Third-party video players load only when activated. Registration happens on Zalo.

## Run locally

Use Node.js 24 LTS and npm (`.node-version` pins the Cloudflare build version).

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Missing Zalo information is intentional: the page displays **Đăng ký sẽ mở sớm** instead of a fake link.

## Configure before launch

Edit **config/site.ts**. This is public configuration, not a secrets file. Rebuild/redeploy after changing it.

| Setting | What to enter |
| --- | --- |
| `contact.zaloUrl` | Your verified HTTPS profile or group URL on `zalo.me`. Optional; leave empty to host with registration closed. |
| `contact.qrImage` | Optional `/images/zalo-qr.png` (or JPEG/WebP). Put the real matching QR image in `public/images/`. Requires a Zalo link. |
| `contact.email` | Public contact email. Currently `genyzstudio@gmail.com`, approved by the owner. |
| `contact.phone` | Optional public number; hidden when empty. No personal Zalo account details have been copied into this setting. |
| `contact.socialLinks` | Optional `{ label, url }` entries for verified public YouTube, TikTok or other profiles. Use HTTPS. |
| `workshop.city`, `date` | Leave blank until confirmed. Both display **Sẽ thông báo**. Date is human-readable Vietnamese text; include time zone if relevant. |
| `workshop.venue`, `duration` | Optional, hidden when empty. |
| `workshop.capacity` | Positive whole number, or `null` to hide. This is announced capacity, not a live availability counter. |
| `instructor.name`, `role`, `bio`, `photo` | Real, owner-approved instructor details. The instructor block stays hidden until `name` and `bio` are set. `photo` is an optional local `/images/` PNG/JPEG/WebP. |
| `skool.status` | `coming-soon` by default. Set `available` only when your own course/community is ready. |
| `skool.url` | Verified HTTPS course/community URL on `www.skool.com`; required when available. No checkout is implemented. |
| `siteUrl` | Full HTTPS production origin, no path, query or trailing slash. Set the stable Cloudflare Pages production URL; update after buying a custom domain. |

Empty optional details stay hidden. A configured but malformed destination fails validation even in previews. Do not put example or placeholder Zalo destinations into the live configuration.

`npm run build` permits an empty Zalo URL and keeps registration closed. Invalid non-empty URLs still fail validation. For a noindex review build:

```sh
npm run build:preview
npx serve out
```

This produces static files in `out/` with `noindex` metadata; registration still follows the configured Zalo URL. Cloudflare branch previews are detected using `CF_PAGES_BRANCH` (production is `main`). Production can be hosted before registration opens. URL validation checks format; the owner must verify that the final destination belongs to the studio and can receive enquiries.

## Edit Vietnamese copy and studio videos

- `content/home.ts`: Vietnamese copy, FAQs, programme and workshop descriptions.
- `content/showcase.ts`: add verified, studio-owned YouTube/TikTok videos to `studioVideos`. The section is hidden until entries exist. Build validation checks matching HTTPS YouTube/TikTok hosts and local thumbnail file existence. Each entry has `title`, `description`, `platform`, `url`, an optional `lesson` label, and an optional local `thumbnail` path (empty string if none). Verified videos have click-to-load YouTube/TikTok players and direct platform links as fallback. No player requests before activation and no autoplay. Descriptions explain learning points without promising workshop outcomes.
- `public/images/`: owned/permission-cleared illustrations, thumbnails and QR code.
- `app/globals.css`: typography, spacing, responsive layout and colour palette.

The programme overview is original Vietnamese copy informed by the structure of https://www.skool.com/idall-lite-1529/classroom. No course videos, lesson text, instructor claims or testimonials are reproduced. The linked classroom is research context, not this studio's registration destination.

## Checks

```sh
npm run test
npm run lint
npm run typecheck
npm run build:preview
```

Tests cover registration states, URL safety, production/preview environment detection, optional contact/workshop visibility, and environment-aware metadata. Run `npm run build` to verify production readiness. Configure the real Zalo URL when registration should open.

## Cloudflare Pages

Use **Workers & Pages → Create application → Pages → Import an existing Git repository** and select `genyzstudio/genyzstudio-marketing`.

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Framework preset | Next.js (Static HTML Export) |
| Build command | `npm run build` |
| Build output directory | `out` |
| Node version | `24` (from `.node-version`) |

Use the full build command above: it also writes Cloudflare's `out/_headers` file for security and preview indexing. No Workers runtime, database, image transformation service, or secret is required. Images are served directly from the static export. Git pushes trigger Pages rebuilds once Git integration is connected.

Set `config/site.ts` → `siteUrl` to the assigned stable `https://<project>.pages.dev` origin before the production build, so canonical links, social previews and sitemap use the public production domain. `CF_PAGES_URL` supplies branch preview URLs automatically. Only the `main` branch is indexable; branch previews and local builds use noindex metadata/headers, disallow crawling and emit an empty sitemap. Noindex is not access control.

For manual uploads, build with `SITE_BUILD_MODE=production npm run build` and deploy the `out/` directory using `npx wrangler pages deploy out --project-name <project> --branch main`. Always set `siteUrl` before a manual production build. Local preview: `npm run build:preview`, then `npx serve out` (static exports do not use `next start`).

After deploying, check the homepage, all Zalo buttons, image/video loading, gallery controls, mobile menu, FAQs, canonical metadata, `/robots.txt`, `/sitemap.xml`, response headers and the 404 page. Leave the existing Vercel deployment running until the Cloudflare deployment is verified. Retiring Vercel is a separate follow-up.

Later add a custom domain in the Pages project, follow Cloudflare's DNS instructions, update `siteUrl`, and rebuild. See [Cloudflare's static Next.js guide](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/).

## Assets

`public/images/hero-vietnam.webp` is an original AI illustration generated with the built-in image generation tool. It is labelled as illustrative, not a student result or completed video. `public/images/social-preview.jpg` is a social crop of that illustration. Font: self-hosted Be Vietnam Pro via Fontsource (SIL Open Font License). Icons: Phosphor (MIT). See `docs/image-prompt.md` for asset provenance and prompt.

## Dependency notes

Runtime dependencies pass `npm audit --omit=dev`. The current Next.js lint toolchain requires ESLint 9; ESLint 10 is incompatible with its React plugin. npm reports the upstream `braces` nested-pattern denial-of-service advisory through this development-only lint dependency chain. No patched `braces` release was available at implementation time; this code is not shipped in the browser or used to process visitor input. Recheck the advisory when updating the lint toolchain rather than applying npm's suggested downgrade of Next.js tooling.

## Languages and search metadata

Vietnamese stays at `/`; English is at `/en`. Both are exported as complete HTML pages with their own root `lang`, canonical URL, translated title/description and reciprocal `hreflang` links. The language switcher uses ordinary crawlable links and does not redirect based on browser language. The English page describes the same workshop taught in Vietnamese; it does not promise instruction in English.

Edit Vietnamese content in `content/home.ts`, English in `content/home-en.ts`, shared UI labels in `content/locales.ts`, and English film descriptions in `content/showcase-en.ts`. Keep all film translations current when adding videos. `lib/seo.ts` generates metadata and factual Organization/WebSite/WebPage JSON-LD. Both locales appear in the production sitemap; preview noindex protection remains enabled. We do not publish Event dates, reviews, credentials or Course offers that have not been confirmed.

After launch, the owner can verify `genyzstudio.com` in Google Search Console and submit `https://genyzstudio.com/sitemap.xml`. Search indexing and rankings are controlled by search engines, not by deployment.
