# Master the Frame — Hộ Vệ Sông Hồng

Routes: `/workshop/master-frame`, `/en/workshop/master-frame`. Course ID: `master-frame`.

An original Vietnamese sci-fi confrontation supplies six modules and fourteen generated image exercises. Both locales retain the exact tested Vietnamese prompts. Each step contains its inputs, prompt, output, review and suggested saved files. Some outputs intentionally remain review exercises: Flow changed the villain identity; the repair restores it; the action frame swaps anatomical arms; the storyboard duplicates a wrist device. Do not describe these as flawless production frames.

## Source boundaries

The opening workflow now primarily follows the written Midjourney Professional section: Storyboarding with AI (`c2bfa5c942d7423d9f84096f4d2b773b`), Light as a Storytelling Tool (`6ea5bcbadca14f28acdf861361c3f1d0`), Character Consistency (`95731039e37e481a969b2552c37689d8`) and its recap (`5a0de0102e684f08881c394841e6efe4`). All four were read directly in the signed-in Skool classroom. It teaches logline, shot list, character anchors and wardrobe, framing/lens, motivated lighting, individual-frame iteration, continuity review and storyboard assembly before introducing the existing sci-fi example. Midjourney-specific references are distinguished from the actual Flow/imagegen outputs. No new full-video review is claimed. The course opens on this overview; the start button enters the first worked-example module. The overview is included in both localized workbooks without changing course/module IDs or completion records.

The linked Skool Module 3 written lesson and available video frames/captions informed storyboard, shot-size, composition, lighting and reference-sheet principles. Module 4 written material and visible homework informed continuation, world expansion and expression comparison. Gemini in the authorized GenYZ Studio account analyzed uploaded frames in conversation `e7e2286dc21ecc43`. Full audiovisual review was not possible. Rapid seek captures sometimes retained stale content; precise timings and unsupported UI claims were excluded. Later Gemini synthesis requests were declined; earlier frame analyses and directly inspected source material remain the evidence. The user's explicit direction was to continue from available frames/captions without blocking on download.

The narrative, Vietnamese prompts and generated outputs are original exercises, not copied course assets. Culture-inspired wardrobe/architecture are fictional rather than historical reconstruction. Creating a character sheet provides visual context; it does not train model weights or guarantee identity.

## Reproduction and protection

The overview is now a six-node responsive workflow diagram plus four generated comparison plates (shot sizes, lens/distance, lighting and identity drift). Learner-facing instructions are expressed directly for Google Flow and ChatGPT imagegen; Midjourney-specific wording and source banner have been removed from the classroom. Source notes above remain internal provenance. The four 1536×1024 originals are `public/api/workshop/examples/overview-{shots,lens,light,identity}-v1.png`, with protected 480/1280 WebP previews. Exact generation prompts are in `server/workshop-overview-generation.json` (built-in imagegen). The neutral street-scene plates were visually inspected; lens images illustrate combined camera-distance/lens choices, not measured optics. The final identity panel is intentionally incorrect. Both localized workbooks include the tool paths, captions and image links.

- Exact prompts: `server/workshop-frame-prompts.json`.
- Input/output/provider/dimension/review mapping: `server/workshop-frame-evidence.json`.
- Wide shot: Google Flow Images, Nano Banana 2.1, 16:9, x1; project `7f066615-a2e1-4134-b539-28ec2b2a46a2`. All other outputs: ChatGPT imagegen.
- Original PNG files and 480/1280 WebP previews are registered behind the authenticated workshop media API.
- Source screenshots and analysis logs stay in ignored `artifacts/master-frame`; no source-course screenshots are published in the workshop.
- Migration 0006 expands the course CHECK constraint and preserves all prior progress. `master-frame` has independent progress; VN/EN share that course's progress.

## Verification

Vietnamese editorial pass: revised overview instructions, captions, lesson guidance, glossary, output reviews and selected classroom labels into natural Vietnamese. Replaced literal expressions about reading/locking images with explicit viewing, comparison and consistency instructions. Technical terms retain contextual explanations. Exact tested prompt strings and generation manifests remain unchanged so the displayed examples retain their provenance. The completion message describes frames/storyboard rather than implying that this course delivers a finished film.

Recreation update: the visible four comparison plates now use new `overview-{shots,lens,light,identity}-vi-v2.png` outputs generated with the exact Vietnamese prompts in `server/workshop-overview-vietnamese.json`. All four jobs attach the unchanged `overview-shots-v1.png` as their sole reference. The original v1 plates were generated from English prompts with no image inputs; those records remain in `server/workshop-overview-generation.json`. Each comparison now exposes its actual input thumbnail/download, copyable Vietnamese prompt and ChatGPT/Flow instructions in a disclosure panel. ChatGPT imagegen is the tested provider; Flow is explicitly an untested tool adaptation, including the 3:2-to-16:9 alternative. Workbooks retain these records. No v1 originals were overwritten.

Tests cover gate protection, all fourteen prompt/output/reference mappings, Vietnamese workbook labels, course progress isolation, invalid module rejection and historical-row migration preservation. Existing media tests cover preview dimensions/compression and authenticated access. Static-export verification checks that no protected curriculum leaks into public bundles.

2026-10-14 release: 56 tests, lint, production build and export protection checks passed. D1 progress table exported before migration 0006; historical course row counts matched after migration (clever-rat: 1, five-levels: 2, phoenix: 1). Cloudflare Pages deployment `ab7d1d84` is live at `https://genyzstudio.com/workshop/master-frame`. Both locale routes returned 200; anonymous curriculum and image requests returned 401 with private/no-store. The existing authenticated browser session loaded the Vietnamese classroom and both Flow/repair previews successfully. Live screenshot: ignored `artifacts/master-frame/live-workshop.png`. Deployment includes the working tree; no Git synchronization is claimed.
