# Visual Effects · Cinematic Realism

Routes: `/workshop/visual-effects` and `/en/workshop/visual-effects`.

This workshop adapts the selected **Visual Effects** lesson, not all of Step 5. It does not include the adjacent L14 Slow Motion, L15 Particle Systems or L16 Action Scenes lessons. Vietnamese and English use the same nine-section structure, source sequence and assignment.

## Source and coverage

- [Selected Skool lesson](https://www.skool.com/idall-lite-1529/classroom/325b5356?md=385358e63fbe44aa8fbc9356bbf1515c), inspected signed in on 22 October 2026.
- [Darren Maen’s Loom: Six Realistic Apocalypse VFX Techniques Explained](https://www.loom.com/share/907b18ee962640eaa1df3218428df079), approximately 7:19 in the player.
- Read the entire visible classroom body and complete Loom transcript from 0:00 through the homework at 7:00. Sampled recording frames at 0:24, 1:14, 3:30 and 6:29 establish the overview, timed YAML, suspension prompt and separate physical/digital environment fields. This is not a continuous audiovisual review of every frame or a reproduction of every on-screen prompt.

| Source sequence | Recording anchor | Workshop section | Retained teaching |
| --- | --- | --- | --- |
| LED volume and real light | 0:24 | 1 | Perspective updates, light direction/color/softness, reflections and edge light |
| Practical fire | 1:27 | 2 | Nonrepeating flames, sparks, smoke, heat distortion, causal secondary motion |
| Wire suspension | 2:35 | 3 | Harness/green-screen context, compositing, inertia, fabric/hair lag, physical reactions |
| Practical rain | 3:56 | 4 | Wind, drop impacts, soaking, asphalt, puddles, runoff and reflections |
| Physical miniatures | 4:45 | 5 | Tactile materials, wear, low framing, focus and atmospheric scale cues |
| Hybrid physical/digital | 6:02 | 6 | Detailed foreground, distant extension, coherent light and depth-dependent parallax |
| Four YAML rules | Classroom | 7 | One function per field, physics-based motion, explicit light and controlled camera |
| AI limitations | Classroom | 8 | Motion drift, timing breaks, artificial texture and iterative refinement |
| Blueprint and homework | Classroom / 7:00 | 9 | Light → Texture → Motion → Atmosphere → Emotion; one technique and five-second scene |

## Adaptation decisions

The video asks learners to **write** a five-second YAML prompt. The classroom asks them to **create** the scene with YAML. The workshop includes both and labels prompt-only work incomplete for the generation requirement. The learner studies all six techniques but generates only one selected scene. Supported themes remain apocalypse landscapes, natural anomalies, ruined bridges and isolated survivors.

The Minh scenes, twelve bilingual YAML blocks, 0–2 / 2–4 / 4–5 timing, 16:9 framing, review worksheets and estimated 90–120 minutes are GenYZ-authored teaching aids. They are not copied source prompts, mandated source settings, tested generation outputs or an official model API schema. The sample code emits valid YAML with quoted scalar values; keys remain English in both locales. Each block describes one continuous shot.

Practical filmmaking methods are explained as concepts, with AI exercises targeting their visible cues. The workshop does not instruct learners to stage fire, rain rigs or wire stunts. Strong source statements that CGI cannot achieve a particular effect are paraphrased as visual evaluation principles, not universal technical claims. The miniature section notes that excessively shallow focus can itself reveal toy scale.

No generator/model is mandated by this lesson. The generation procedure records the actual tool, settings, inputs and prompt; it handles image-required modes and longer-duration output explicitly. No model capability, current pricing or generated media result is claimed.

## Integration and access

The new course is in the public discovery catalog, localized classroom routes, server curriculum registry, API allowlist, language switch and protected-export scan. Curriculum and YAML remain server-side. Existing copy/expand controls and workbook export handle YAML without reformatting. Course-specific progress reuses the existing nine internal module IDs with this course's own titles.

Migration `0011_workshop_visual_effects.sql` extends the existing progress/access constraints, preserves existing records and inserts no public-access policy. Apply it before deploying the new server code. Creation-stage verification was local; the subsequent authorized production release is recorded below.

## Verification

All 87 tests pass. Coverage checks bilingual parity, source order and anchors, all twelve YAML blocks, exact rendered/workbook text, five-second timeline coverage, anonymous denial, authenticated lessons, cross-locale progress, course isolation, migration preservation and foreign keys. Catalog tests cover both new routes and library links. The production build (including TypeScript), ESLint and whitespace checks pass; the export scan checks 120 public text assets with no protected curriculum leakage.

Local browser checks visited all nine sections in both languages, switched VI → EN, confirmed the library listing and inspected expanded YAML layout. Clicking Copy produced success feedback; browser clipboard readback was empty, so an OS clipboard paste is not claimed. Exact prompt preservation is covered by automated rendering and workbook tests. No generated media was tested.

Browser QA used an isolated local database at `artifacts/visual-effects/preview-data` with a temporary public policy for this course. That policy was removed after QA; both anonymous content locales returned HTTP 401 again. No production access was changed. Review workbooks are saved privately in `artifacts/visual-effects/GenYZ-Visual-Effects-vi.txt` and `GenYZ-Visual-Effects-en.txt`; these ignored artifacts are outside the public export.

## Production release — 22 October 2026 (Asia/Ho_Chi_Minh)

Published Cloudflare Pages production deployment `3133284b-4be0-45a1-a93a-3f16ee11e2c7` from the existing working tree on `codex/vietnamese-video-workshop`, based on Git HEAD `9d3a2c090b55fd38c97a1ac9b10261ff179a507e`. This was a direct deployment to the Pages `main` environment, not a Git commit or push. Source file hashes are saved in `artifacts/visual-effects/release/source-sha256.json`.

- Rebuilt with `SITE_BUILD_MODE=production npm run build`; the protected-export scan passed for 120 public text assets.
- Backed up remote D1 before applying the sole pending migration, `0011_workshop_visual_effects.sql`. Before/after export comparison preserved eight progress INSERT statements, three enrollment INSERT statements and two session INSERT statements; the access-policy table was empty and remained empty. Foreign-key checks passed, no migrations remain pending and no public policy was added.
- Both classroom routes and both library routes returned HTTP 200 on `genyzstudio.com` and the deployment hostname. Anonymous content requests returned HTTP 401 in both locales; public HTML contained no protected YAML.
- Authenticated live browser checks visited all nine sections in each locale. All twelve rendered primary YAML prompts matched the local source byte for byte. Copy success feedback and expanded prompt layouts were inspected in both languages; no OS clipboard paste claim is made.
- The Vietnamese workbook downloaded and matched the full local formatter output after normalizing its UTF-8 BOM. The English download control was exercised, but its file was not captured for comparison; English workbook integrity remains covered by the local automated tests. No lesson completion boxes were marked during verification.

Live routes: https://genyzstudio.com/workshop/visual-effects and https://genyzstudio.com/en/workshop/visual-effects. Deployment URL: https://3133284b.genyzstudio-marketing.pages.dev.

Private release evidence, screenshots, exact DOM prompt snapshots and migration backups are in ignored `artifacts/visual-effects/release/`. No production access policy was relaxed for verification.
