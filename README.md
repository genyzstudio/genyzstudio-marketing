# GenYZ Studio

Vietnamese-first marketing site for beginner AI video training. Next.js App Router, TypeScript, Tailwind CSS, mostly static server-rendered content. No accounts, database, payments, first-party analytics cookies or registration storage. Third-party video players load only when activated. Registration happens on Zalo.

## Run locally

Use Node.js 24 LTS and npm (the Vercel runtime is pinned to Node 24).

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Missing Zalo information is intentional: the page displays **Đăng ký sẽ mở sớm** instead of a fake link.

## Configure before launch

Edit **config/site.ts**. This is public configuration, not a secrets file. Rebuild/redeploy after changing it.

| Setting | What to enter |
| --- | --- |
| `contact.zaloUrl` | Your verified HTTPS profile or group URL on `zalo.me`. Required for production. |
| `contact.qrImage` | Optional `/images/zalo-qr.png` (or JPEG/WebP). Put the real matching QR image in `public/images/`. Requires a Zalo link. |
| `contact.email` | Public contact email. Currently `genyzstudio@gmail.com`, approved by the owner. |
| `contact.phone` | Optional public number; hidden when empty. No personal Zalo account details have been copied into this setting. |
| `contact.socialLinks` | Optional `{ label, url }` entries for verified public YouTube, TikTok or other profiles. Use HTTPS. |
| `workshop.city`, `date` | Leave blank until confirmed. Both display **Sẽ thông báo**. Date is human-readable Vietnamese text; include time zone if relevant. |
| `workshop.venue`, `duration` | Optional, hidden when empty. |
| `workshop.capacity` | Positive whole number, or `null` to hide. This is announced capacity, not a live availability counter. |
| `skool.status` | `coming-soon` by default. Set `available` only when your own course/community is ready. |
| `skool.url` | Verified HTTPS course/community URL on `www.skool.com`; required when available. No checkout is implemented. |
| `siteUrl` | Full HTTPS production origin, no path, query or trailing slash. Leave blank to use Vercel's production domain automatically; update after buying a custom domain. |

Empty optional details stay hidden. A configured but malformed destination fails validation even in previews. Do not put example or placeholder Zalo destinations into the live configuration.

`npm run build` intentionally fails until the real Zalo URL is configured. For review before launch:

```sh
npm run build:preview
npm start
```

This produces an optimized build with registration closed and `noindex` metadata. On Vercel, preview deployments are detected using `VERCEL_ENV=preview`. Production deployments always enforce the Zalo requirement, even if `SITE_BUILD_MODE=preview` is accidentally set. URL validation checks format; the owner must verify that the final destination belongs to the studio and can receive enquiries.

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

Tests cover registration states, URL safety, production-gate bypass protection, optional contact/workshop visibility, and environment-aware metadata. For live launch, configure the real Zalo URL and run `npm run build` as well.

## Vercel

Import this directory as a Next.js project or run `vercel deploy --target preview`. Use `npm run build` as the build command; do not configure a preview-only build command in project settings. Default Next.js output settings are correct. No environment secrets are needed.

1. Review a preview deployment on desktop and mobile. Previews have `noindex, nofollow` metadata and headers, disallow crawling and emit an empty sitemap. Noindex is not access control; use Vercel deployment protection if previews must be private.
2. Configure the real Zalo URL. Check that every registration action opens the intended profile/group and that any QR matches it. Fill only confirmed workshop details.
3. Deploy production with `vercel --prod`. This fails if launch settings are incomplete. Vercel provides a `.vercel.app` domain.
4. Check the deployed homepage, registration destination, contact email, image loading, menu, FAQs, canonical metadata, `/robots.txt` and `/sitemap.xml`.
5. Later add your custom domain in Vercel, follow its DNS instructions, update `siteUrl`, and redeploy.

Search indexing is enabled only for `VERCEL_ENV=production`; local and preview builds are not indexed. Keep Vercel's automatic system environment variables enabled.

## Assets

`public/images/hero-vietnam.webp` is an original AI illustration generated with the built-in image generation tool. It is labelled as illustrative, not a student result or completed video. `public/images/social-preview.jpg` is a social crop of that illustration. Font: self-hosted Be Vietnam Pro via Fontsource (SIL Open Font License). Icons: Phosphor (MIT). See `docs/image-prompt.md` for asset provenance and prompt.

## Dependency notes

Runtime dependencies pass `npm audit --omit=dev`. The current Next.js lint toolchain requires ESLint 9; ESLint 10 is incompatible with its React plugin. npm reports the upstream `braces` nested-pattern denial-of-service advisory through this development-only lint dependency chain. No patched `braces` release was available at implementation time; this code is not shipped in the browser or used to process visitor input. Recheck the advisory when updating the lint toolchain rather than applying npm's suggested downgrade of Next.js tooling.
