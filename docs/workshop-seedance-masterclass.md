# Seedance 2.5 · From Your First Clip to Your Own Film

Revised 26–27 October 2026. Original GenYZ course in matching Vietnamese and English editions. Routes remain `/workshop/seedance-masterclass` and `/en/workshop/seedance-masterclass`.

The 27 October language pass rewrites the learner explanations in a more natural English and Vietnamese teaching voice. RewriteLy was requested and attempted twice, but its main tool returned internal errors; Claude Code supplied the editorial pass and Codex checked and refined the changes. Prompts, worksheets, recorded model responses, lesson structure and assessment requirements are preserved. Ending-frame references now use the step title, and the export instructions use `06-delivery` to match the saved output. Before/after copies and verification evidence are in `output/seedance-humanize-20261027/`.

The expansion has **38 core steps, 15 optional labs and 37 bilingual practice-prompt pairs** across seven stable progress keys. Video generation begins in Module 5, after character images (Module 2), location and starting frames (Module 3), and prompt writing (Module 4). Module 1 starts with script planning, followed by tools and folders, without a tool-choice worksheet or early video exercise. Starting-frame roles and the upload example are introduced with the upload step in Module 5. The course includes reference QA, prompt reasoning, camera fundamentals, provider/mode decisions, continuity, diagnosis, constrained variation and a new capstone. Estimated foundations: 8–12 hours; advanced practice: another 6–10 hours, excluding generation waits and capstone work. These estimates and the rubric have not been validated in a beginner pilot.

## Story revision · 27 October 2026

The guided film is now “Ai đang gọi mình?” / “Who Is Calling Me?”. Lan pauses before descending the mountain. Footsteps continue after she stops, the lantern lights itself, and a voice calls from an empty path. She stays still. A hard cut to black carries the same call again, now close. The identity of the caller is deliberately unresolved; it is not described as Lan’s own voice.

The three visual actions and unlit → lit → lit prop states still use the existing reference pack. `server/workshop-seedance-story.ts` supplies the shared fictional brief, a timed picture/sound/cut script, and the final localized classroom enrichment after the Vietnamese copy pass. The guide and shot 3 prompt match that story. A new GPT Image storyboard, `wv-seedance-calling-storyboard-v1.png` (1448×1086), replaces the previous sequence board across the classroom. It shows the three visual beats plus the black ending, with Vietnamese sound cues outside the picture frames and a full English explanation in the localized caption. The ending is an editorial segment, not a fourth AI shot; learners must not upload the whole board as a starting frame. The image is an illustration, not extracted video, and retains small geometry differences between panels. Original recorded Claude responses and earlier image-generation provenance are unchanged. The new generation prompt and provenance are saved in `artifacts/seedance-storyboard/`.

Module 7 now teaches recording, importing and placing footsteps and one offscreen line, using the same recording at two perceived distances, making an intentional black ending, and checking the export with a viewer. These add two core steps; no fourth AI video generation or paid sound effect is required. Separate optional lip-sync exercises are explicitly outside this film. The same edit can be practiced with stills labeled ANIMATIC. This is an authored script and workflow, not a produced film or a beginner-tested result.

## Ready-made shot frames · 27 October 2026

Module 5 now starts its optional labs with three separate full-size starting frames for “Ai đang gọi mình?”. Each native 1672×941 PNG was generated individually with GPT Image, not cropped from the storyboard. Shot 1 starts near the entrance with the lantern unlit; shot 2 starts after Lan approaches the bench, still unlit; shot 3 starts with the lantern lit and her gaze lowered. Each download is paired with a bilingual Seedance prompt, upload-slot instructions, settings checks, expected ending state and review criteria. These video prompts have not been run.

`server/workshop-seedance-ready-frames.ts` supplies the lab and discovery copy. Samples 2 and 3 are explicitly independent practice inputs, not ending frames from a learner’s clips. For continuous edits, learners use their actual cut frames from Module 6. The existing budget and three-attempt-per-shot cap also apply to this route; successful clips are reused rather than generated again.

Module 7 includes a deterministic solid-black 1920×1080 PNG for the ending. It is made in software, is not labeled as GPT Image, and has no Seedance prompt. All four originals and their responsive previews use the protected media registry. Classroom and workbook downloads preserve the original files. Exact image-generation prompts, reference lineage and inspection notes are in `artifacts/seedance-shot-frames/`.

## Learning path

| Stored key | Focus | Evidence |
| --- | --- | --- |
| story | Story planning, tool roles and folders | Three-shot story plan; no video generation yet |
| references | Portrait authority, full-body views, reference acceptance | Character files and reasoned QA |
| planning | Geometry, action axis, prop states, four/three/two-image handoffs | Layout, location, prop and starting frame |
| frames | Prompt clauses, settings, ChatGPT/Claude critique, actual Claude example | Annotated draft and revision decisions |
| motion | Subject versus camera movement, inspection, diagnosis, stopping rules | Take log and one-variable comparison |
| review | State/ending-frame continuity, selected advanced modes | Join table and actual clips, or explicitly planned states |
| delivery | Edit, constrained variation, original capstone, assessment | Export, sources, decisions and evidence-linked rubric |

Optional labs cover reference details, location angles, fewer-input compositing, camera A/B, formal Draft/finalize, T2V/omni/endpoints, longer multi-shot generation, extension, native timed editing, perspective changes, Vietnamese audio/performance, clay-model control, green screen, multi-subject limitations and teach-back. Optional labs do not gate core progress.

The preparation path produces images, prompts and an animatic. It cannot pass video foundations. Preparation requires Brief, References, Prompt and Edit scores of at least 2; video foundations additionally require Motion, Continuity and Repair & cost scores of at least 2 with clips and timestamps. N/A never counts as passing. Independent work permits ChatGPT/Claude assistance while requiring the learner to explain and own decisions.

## Real assets and evidence boundaries

Eight original GPT Image outputs were created in Codex and visually inspected:

- Starting frame: directly generated scene, not a four-reference composition.
- Portrait: derived from that scene and selected as the face authority.
- Turnaround: four columns returned instead of the requested 2×2 layout; retained with an explicit QA explanation.
- Empty location and three-view location sheet: major spatial anchors preserved; no claim of measured 3D reconstruction or pixel-identical textures.
- Lantern sheet: unlit/lit states; fine detail inferred from a small source prop.
- Blocking diagram draft and repair: the first drawing placed cameras outside a wall with obstructed sightlines; the repaired drawing removes that obstruction and places both cameras on the same side of the action axis. This is an actual image repair example, not video evidence.

`server/workshop-seedance25-assets.json` records actual English generation prompts where archived, input relationships, dimensions, hashes and review limitations. The starter prompt is explicitly a summary. Vietnamese reproduction prompts are editorial translations and were not run. The image tool did not expose an exact backend model version.

`server/workshop-seedance25-assistant-example.json` preserves an actual text-only Claude Code request/response (`claude-sonnet-5-5`). Claude received an asset description, not the image. The classroom shows its prompt excerpt and Codex editorial corrections; it does not claim that Claude inspected the image or generated video.

**Still pending:** Seedance demonstration clips, genuine video failure/repair pairs, output verification of advanced modes, Vietnamese listening/lip-sync validation, and a real beginner pilot. Connected-account checks found Topview's 5-second 720p quote required 6 credits against 1.65 available; Higgsfield had zero credits. No video job was submitted, no credit purchase was made and no generated image is presented as video proof.

## Source and provider checks

Official pages and connected model configurations were checked on 26–27 October 2026. Model claims and provider configuration availability are distinct from observed UI and generated results.

- [Seedance 2.5 model page](https://seed.bytedance.com/en/seedance2_5): longer generation, references and advanced control.
- [Seedance 2.5 launch description](https://seed.bytedance.com/en/blog/one-take-creation-flexible-referencing-introducing-seedance-2-5): audiovisual/time-directed edits, perspective changes, clay control and known limitations.
- [Codex image generation](https://developers.openai.com/codex/image-generation): image requests and reference-based editing.
- [Gemini image generation/editing](https://support.google.com/gemini/answer/14286560?hl=en): an alternative learner path; this asset pack uses GPT Image exclusively.
- [Claude file uploads](https://support.claude.com/en/articles/8241126-upload-files-to-claude).
- [CapCut Desktop workflow](https://www.capcut.com/resource/how-to-use-capcut-on-pc).

The course's Higgsfield and Topview matrix is a dated configuration snapshot. It teaches learners to verify an actual starting-frame role before running the core exercise; generic image references are not silently substituted. Advanced settings and prices must be rechecked in the chosen account.

## Implementation and access

The base curriculum lives in `server/workshop-seedance-masterclass.ts` and its original prompt module. `server/workshop-seedance25-depth.ts` adds the expanded sequence; `server/workshop-seedance25-prompts.ts` holds new bilingual exercises. Both locales use the same module/lab structure.

`LessonStep.downloads` supports ordinary archive links. Standalone worked examples/worksheets now render without inventing a model prompt. Workbook links use the current classroom origin, with the production origin remaining the default for server-side exports.

The ZIP contains eight images, eight blank bilingual TSV forms, a README and limited provenance. It contains no full lesson workbook. Generate it locally with `npx tsx scripts/build-seedance25-pack.ts` (requires the standard `zip` utility); it is a supplied artifact, not a new production build dependency. Download the access-filtered lesson workbook separately in the classroom.

The archive is listed in `workshopFullCourseBundles`: anonymous access requires the owning course to be fully public. Partial lesson policies remove its link and return 401 for direct archive requests, even if Module 7 is public. Existing enrolled access and private/no-store responses remain intact. Individual images continue to follow the lessons that reference them. No production access policy, database or stored progress was changed.

## Review and verification

Claude Code independently proofread both complete workbooks. Eight findings were addressed: start-frame role gating; separate video assessment; consistent shot-2 framing; file/folder handoffs; supplied versus learner-generated identity and take accounting; terminology; separation of editorial QA from learner work; and constant prompt language during comparisons. Codex additionally removed the assumption that two small steps necessarily leave Lan beside the bench: later shots preserve the actual preceding ending position.

One final TypeScript review identified the partial-access ZIP bypass. The primary agent fixed it, added authorization tests, and the same reviewer performed one targeted re-review with no actionable finding.

Evidence is in `output/seedance25-expansion-20261027/`: both workbooks, actual Claude response, independent review, tests and build/export logs. Before release run `npm test`, `npm run lint`, `npm run typecheck`, `npm run build:preview` and `npm run workshop:verify-export`, then inspect both locales and download behavior locally. Publication remains separate from local validation.



Local verification completed on 27 October 2026: all 96 tests, TypeScript checking, lint, preview build and protected-export scan passed (130 public text assets). English desktop and Vietnamese 390 × 844 mobile were inspected; mobile document width remained 390 px. The image and ZIP downloaded successfully. Both browser workbook downloads exactly matched the current API curriculum export, and the downloaded ZIP matched the packaged file byte-for-byte. Screenshots and download comparisons are retained in the evidence directory. The local preview runs at `http://127.0.0.1:3116`; this is not a production deployment.

## Obsidian references

- Obsidian unavailable; no notes consulted.

## Module 2 character-reference adaptation

On 27 October 2026, Module 2 was adapted from the asset-preparation approach in [Higgsfield's Seedance 4K breakdown](https://higgsfield.ai/blog/seedance4k-breakdown), specifically the character sections. The source describes Seedance 2.0 4K, not verified Seedance 2.5 capabilities. It informs the emphasis on separate face/outfit references and reusable assets; the lesson retains original Lan prompts and existing image provenance rather than reproducing the source's characters or prompts.

The five existing steps now explain choosing Lan's identity, generating and approving a portrait, making and checking a view sheet, repairing/cropping a full-body image, and approving the reference pack. Explicit bullets cover both sample and self-created routes, image attachment, hidden-face limits, single-panel cropping and later Module 3 handoff. Create Element is optional when available; no cross-application image sharing is assumed. No media was generated during this adaptation.
# Separate face and outfit references (2026-10-27)

Single-sheet presentation: Module 2 now displays `sd25-lan-master-sheet-v4.png` as one six-panel sheet (face, ghost outfit, front, side, back, three-quarter), generated from the three approved source files. Exact generation prompt and input chain are in `server/workshop-seedance-master-sheet.json`. The AI recomposed the face panel with a jacket collar, so the result is labeled a generated composite rather than a pixel-exact collage. Original step outputs remain available as downloads; separate inline outputs were removed. The sheet is for reference, not a video start frame.

Turnaround follow-up: `sd25-lan-turnaround-v3.png` (1536×1024) was generated with built-in GPT Image from `sd25-lan-face-gray-v2.png` as image 1 and `sd25-lan-outfit-ghost-v3.png` as image 2, using the exact current English sheet prompt. Module 2 now replaces the older portrait/turnaround examples, records both actual inputs, and provides the new four-column sheet for download and front-panel cropping. Rear details remain model-inferred where unseen in the references. No Seedance video or later scene was regenerated. Full prompt/input/output record: `artifacts/seedance-character-adaptation/turnaround-v3-generation.json`.

User correction: the final outfit example is now `sd25-lan-outfit-ghost-v3.png`, a ghost mannequin showing only clothes, shoes and backpack, with no skin or body parts. It was generated without image attachments using the exact English prompt recorded in `artifacts/seedance-character-adaptation/ghost-outfit-generation.json`. The lesson's prompt, terminology, instructions and evidence labels now match this output. A paired comparison presents outfit on the left and face on the right, with separate downloads. The earlier neck-to-shoes V2 remains an archived artifact, not the current lesson outfit example.

Follow-up: generated the two samples with built-in GPT Image in Codex. `sd25-lan-face-gray-v2.png` (1312×1199) used the English face prompt plus one framing correction; `sd25-lan-outfit-gray-v2.png` (1024×1536) used the exact English outfit prompt with that corrected face as its input. Both are registered protected media and displayed under their respective steps with download links. Exact prompts, correction, input chain and SHA256 hashes are recorded in `artifacts/seedance-character-adaptation/imagegen-record.json`. The Vietnamese versions remain unrun translations. Existing view sheets and scenes belong to the previous Lan family; the new pair has not been run through those downstream steps or Seedance video generation.

Module 2 now has six steps. The revised portrait prompt produces a tight, unobscured face close-up on medium gray. A new `lan-outfit.png` prompt frames from below the chin to both shoe soles, excluding the head through framing rather than erasing facial features. The view-sheet prompt uses portrait as reference 1 and outfit as reference 2. The later head-to-toe `lan-full.png` remains the scene-composition handoff. Learners using the complete supplied sample pack may skip generating the new outfit image. New prompts have not been image-generated; existing illustrations remain earlier examples, not evidence for these revised prompts. Both locales and workbook output include the new instructions.
