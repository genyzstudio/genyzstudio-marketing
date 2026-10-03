# Verification — 2026-10-03

- 13 tests passed, including configured/unconfigured Zalo, URL safety, preview bypass prevention, optional fields, studio video validation and metadata origins.
- ESLint, Next route generation and TypeScript passed.
- Optimized preview build passed locally and on Vercel (Node 24).
- Plain production build rejected missing `contact.zaloUrl` as intended. No production launch completed.
- Browser checks at 1280px and 390px: loaded imagery, no horizontal overflow, functioning mobile navigation and FAQ, Escape closes menu and returns focus, reduced motion disables animation and smooth scrolling.
- Updated coral/white button contrast: 4.84:1.
- Final deployment: https://genyzstudio-marketing-8seb1rbw5-minh-vus-projects-a82de519.vercel.app
- Vercel deployment ID: dpl_4Br3DYMzeNMTMYdpEW7gemYFF2vH, READY, preview.
- Authenticated live request returned HTTP 200. Confirmed Vietnamese locale, public email, closed registration, no fabricated Zalo destination, social image metadata and preview canonical URL.
- Live robots.txt disallows crawling; sitemap is empty; HTML contains noindex, nofollow.
- Vercel preview is sign-in protected. Visual browser checks used the same code served locally; live content was checked through the authenticated Vercel CLI.
- Runtime npm audit: zero vulnerabilities. Development-only lint dependency advisory described in README.
- Final review completed; reported studio-video validation gap fixed and tested.

Screenshots are local ignored artifacts: artifacts/desktop-hero.jpg, artifacts/mobile-preview.jpg, artifacts/desktop-preview.jpg.

Still to configure: real Zalo URL (required before production), optional QR/phone/social profiles, confirmed workshop details and owner-provided studio video links. The studio showcase is intentionally hidden until videos are provided.
