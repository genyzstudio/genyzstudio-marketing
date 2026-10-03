# Verification — 2026-10-03

- 15 tests passed, including configured/unconfigured Zalo, URL safety, preview bypass prevention, optional fields, studio video validation and metadata origins.
- ESLint, Next route generation and TypeScript passed.
- Optimized preview build passed locally and on Vercel (Node 24).
- Plain production build rejected missing `contact.zaloUrl` as intended. No production launch completed.
- Browser checks at 1280px and 390px: loaded imagery, no horizontal overflow, functioning mobile navigation and FAQ, Escape closes menu and returns focus, reduced motion disables animation and smooth scrolling.
- Updated coral/white button contrast: 4.84:1.
- Initial site deployment: https://genyzstudio-marketing-8seb1rbw5-minh-vus-projects-a82de519.vercel.app
- Vercel deployment ID: dpl_4Br3DYMzeNMTMYdpEW7gemYFF2vH, READY, preview.
- Authenticated live request returned HTTP 200. Confirmed Vietnamese locale, public email, closed registration, no fabricated Zalo destination, social image metadata and preview canonical URL.
- Live robots.txt disallows crawling; sitemap is empty; HTML contains noindex, nofollow.
- Vercel preview is sign-in protected. Visual browser checks used the same code served locally; live content was checked through the authenticated Vercel CLI.
- Runtime npm audit: zero vulnerabilities. Development-only lint dependency advisory described in README.
- Final review completed; reported studio-video validation gap fixed and tested.

Screenshots are local ignored artifacts: artifacts/desktop-hero.jpg, artifacts/mobile-preview.jpg, artifacts/desktop-preview.jpg.

Still to configure: real Zalo URL (required before production), optional QR/phone and confirmed workshop details. Three verified studio videos and both public YouTube/TikTok profile links are now configured. Video source provenance is in docs/video-sources.md.

## Video showcase update

- Added two YouTube examples and one TikTok example with local authentic covers and Vietnamese learning notes.
- Confirmed no iframe exists before activation; direct source links always remain available.
- Browser verified YouTube playback progressing and TikTok playback progressing (14+ seconds) on mobile.
- Keyboard focus moves to the close control on activation and returns to the poster after closing.
