# Clever Little Rat — Scene 1 workshop

Replaces the paper-boat workshop at `/workshop` and `/en/workshop`. Five modules follow brief → references → frames → motion → review/export. User explicitly selected Scene 1; the unshipped Scene 9 draft was replaced.

Source workspace (read only): `../Clever Little Rat`. Source project supplied by user: https://flow.google.com/project/aeba76ad-bef7-49e5-a9bd-5b4b44fdc12a . GenYZ Google account and project access verified. Scene 1 uses local archived materials; exact generation-prompt lineage is not claimed.

## Media provenance

- `rat-s1-leo.png`, `rat-s1-mio.png`: `characters/Leo_áo_vàng.jpeg`, `characters/Mio_360_degrees.jpeg`, converted to PNG.
- `rat-s1-board.png`: `scenes/scene-01/dashboard/scene-01-shot-01-dashboard.png`. Original board explicitly plans four cuts in eight seconds. Workshop selects only the first two actual views.
- All video and extracted frames: `scenes/scene-01/videos/scene-01-shot-01-video.mp4`, 1280×720, 24 fps, roughly eight seconds. Source script `scripts/scene-01.md` gives the opening bedroom/block-tower situation.
- `rat-s1-wide.mp4`: source 0–2.25 seconds. `rat-s1-close.mp4`: 2.25–5.791667 seconds. `rat-s1-edit.mp4`: first two views, 0–5.791667 seconds. `rat-s1-source.mp4`: first eight seconds to demonstrate extra cuts.
- `rat-s1-wide-frame.png`: source at 0. `rat-s1-close-frame.png`: at 2.25. `rat-s1-cut-before.png`: at 2.208333. Cut boundaries identified with scene detection and contact-sheet inspection. Source tower/hand continuity discrepancies are explicitly discussed.
- All workshop video derivatives are silent H.264, faststart; no new AI generation or canonical promotion claimed. Original source untouched. The lesson is a visual exercise; dialogue is optional and absent from the sample.
- Vietnamese and English prompts are new simplified exercises, not asserted to have generated the archived assets. Original board has four cuts; learner output and sample assembly have only two views.

All media remains under the authenticated workshop API. Responsive WebP previews load lazily; video preload is none. Workbook includes media links and prompt evidence.

Migration0005 retains Phoenix/five-level progress and adds clever-rat. Old boat progress remains unchanged in workshop_codes. Default workshop and legacy course=boat alias use independent clever-rat progress.

## Verified deployment

Production Pages deployment `69ca5efd` on main. VN/EN routes return200; unauthenticated clever-rat content, new MP4 and WebP routes return401. Local authenticated browser rendered Scene1 frames and decoded the 5.791667-second assembly (readyState4). Tests54passed; typecheck, lint, production build and protected-export checks passed. Migration0005 applied after progress backup; pre/post counts retain two five-level records and one Phoenix record. No Git commit or push performed.

## 2026-10-14 — Vietnamese editorial revision

Rewrote teaching copy, terminology explanations, step titles, continuity guidance and media captions in natural Vietnamese. The narrow Scene 1 exercise and the distinction between archived footage and untested practice prompts are preserved. Exact prompts, English content, course/module IDs, file names and media paths remain unchanged; existing progress requires no migration. Before/after curriculum snapshots and validation logs are in `artifacts/vietnamese-editorial/`.

Published to production as Pages deployment `b0e69bf7`. Authenticated live browser verification confirmed the revised navigation and cut-continuity explanation beside the existing reference frames. Validation: lint, 56 tests, production build and protected-export scan passed. No Git commit or push performed.
