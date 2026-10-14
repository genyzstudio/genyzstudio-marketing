# Director’s Framework workshop

Route: `/workshop/directors-framework` and `/en/workshop/directors-framework`.

## Source and scope

Read on 2026-10-14: https://www.skool.com/idall-lite-1529/classroom/1d8f48fe?md=d4257463aae34411b368052506020ecc — The Director’s Framework, Step 3 introduction. Signed-in Loom source: https://www.loom.com/share/aa83f214de4c4b15a2e901104c91c1bd (`intro_1`, about 8 minutes). Full transcript was available and read. Download clicks did not yield a confirmed local video; no claim of full visual video analysis or Gemini verification. UI transcript evidence is local-only at `artifacts/directors-framework/loom-transcript-ui.txt`.

Grounding: 2:43–4:23 sensory/structure/form; 4:23–5:04 rhythm; 5:04–5:48 spatial readability, focal point and advertising; 6:20–6:52 camera distance/timing; classroom homework asks for two shots, 3–5 seconds each, with an anchor and a rationale per shot. Rhythm is taught as an option, not a universal scientific rule. Initial release covered the introduction only; the L1–L6 expansion below supersedes that scope.

Application: reuse **Hộ Vệ Sông Hồng / Guardians of the Red River** from Master the Frame. Linh faces the Light Collector across the energy core on the wet market bridge. Two pre-combat shots move from the wide confrontation to Linh’s ready pose. Five modules: intent, shot planning, frames, readability review, edit/delivery. VN and EN share the same story.

## Media provenance

The curriculum imports `workshop-frame-prompts.json` and `workshop-frame-evidence.json` directly. Shot 1 uses `frame-repair-v1.png` with its exact repair prompt and actual inputs (`frame-wide-v1`, `frame-villain-v1`). Shot 2 uses `frame-medium-v1.png` with its exact prompt and actual inputs (`frame-repair-v1`, `frame-linh-v1`). These are reused results, not newly generated images. Both are 1672×941. Preserve the recorded caveats about pedestal geometry and background continuity. The medium already has the hand raised; the video exercise explains a held-pose option and the additional start frame needed to animate a hand raise. Motion prompts remain explicitly untested.

All media and curriculum remain behind the authenticated workshop API. WebP previews are generated at 480/1280 widths. Migration 0007 extends course progress while retaining all existing rows.

## Verification

58 tests pass, including access control, VN/EN delivery, independent progress, invalid module rejection, asset registration and migration preservation. Typecheck, lint, production build and public-export leak check pass (71 text assets).

Live deployment: `d174a42c` at https://genyzstudio.com/workshop/directors-framework (2026-10-14). Migration 0007 applied remotely; all 5 prior progress rows compared byte-for-byte through JSON snapshots and unchanged. D1 export endpoint rejected OAuth authorization; read-only SQL backup succeeded before migration. Signed-in browser verified VN overview, prompts, input reference and both WebP images loaded; English overview verified. Anonymous curriculum and preview image endpoints return 401. Screenshot: `artifacts/directors-framework/live-overview.png`. Live deployment is not a Git push.

Revision 2026-10-14: replaced the separate Mai/beacon exercise with the same Master Frame Guardians example at the user's request. All VN/EN narrative, timing, review, motion exercise and overview images now use Linh and the Light Collector. Shared prompt/evidence imports prevent provenance drift. 58 tests, typecheck, lint, build and export checks pass. Live browser verified the updated story and reused prompt notice; screenshot `artifacts/directors-framework/live-guardians.png`. No schema/progress changes in this revision.

## L1–L6 expansion (2026-10-14)

The user identified that the intro exercise omitted the actual numbered lessons. The course now exposes nine sections: introduction, L1, L2, L3, L4, L5, L6, recap, final project. Existing story/planning/frames/review/delivery IDs are retained; new sections use previously unused references/motion/edit/sound IDs for this course. No DB migration or progress reset.

Source evidence: `artifacts/directors-framework/lessons-source.json`, read through the signed-in classroom UI. All six written lessons read. L1–L3 Loom transcripts read in full; L4–L6 grounded in detailed written classroom material (not a claim of complete video/frame analysis). Source links use the same classroom with these md IDs:

- L1 `e110d82a1c014937af3a1070e98ceaf2`: spatial control, visual hierarchy, blocking, eyelines/axis, composition systems, camera height and depth. Video `e0ba9cf4429c4a62bbcf127d68981650`.
- L2 `8b6a8441f41c4f8e86aa51b4fa123b08`: script, storyboard, character, costume/props, environment, shot list, individual frame generation. Video `e78b0dec68c042bba1f1c1eaea511c6a`.
- L3 `ab37f0dac7384ff69aafc280fada2abd`: sequence-first, per-shot prompts, model/settings, iterations, individual clip review, manual assembly; camera movement guide. Video `35976e505dcb4a85b829f23e20c5fda9`.
- L4 `e07f93b2be47430aaef8c7fcd268bf96`: composition across a sequence, nine listed framing/attention devices, 5–7 shot assignment with at least three composition systems.
- L5 `4de621cce7a043f2aaf65cbed0f38547`: negative fill, edge contrast, softness, motivated light, 80/20 shorthand, atmospheric layers, warm/cool contrast, rim-only light, exposure contrast, dynamic light; 5–15 second prompt assignment.
- L6 `e4013ceba8994861b444518963c27309`: three layers, separation, depth of field, light, atmosphere, lens/camera distance, parallax; three studies with two characters in different layers, no dialogue or character action.

Adaptation: all original examples use Guardians and shared Master Frame assets. Extended storyboard/composition/spatial studies are retained, while learners select two shots for the main edit. Freepik node roles become a shot table, ChatGPT planning, individual Flow generations and manual editing; no tool equivalence guarantee. Source absolutes are qualified: softness depends on apparent source size, perspective on camera position, three layers/80:20 are exercises or heuristics, and static lighting is valid. Tested still prompts and inputs import the existing evidence registry. New image/planning/video exercise prompts are explicitly untested; no new video generation claimed.

Expansion release verified: `5bcb0988` at https://genyzstudio.com/workshop/directors-framework. Nine sections / 49 steps. 59 tests pass, typecheck/lint/build pass, protected-export scan passes (71 assets). Signed-in live UI opened L1 through L6 individually without errors, verified English navigation, and confirmed final overview points to L4 for the frame prompts. Screenshots and per-lesson UI evidence: `artifacts/directors-framework/live-l1-l6-overview.png`, `live-l1-l6-checks.json`. Final review’s one content-flow issue was corrected by replacing duplicated L2 shot instructions with an explicit two-shot selection step. No database migration in this expansion.

## L1–L6 actual prompt tests — 2026-10-14

Supersedes the earlier untested-exercise status above. `workshop-director-test-results.json` records 10 new imagegen outputs and 7 Google Flow outputs (including repair/retry runs), with exact submitted Vietnamese prompts, ordered inputs, settings and bilingual reviews. Google Flow project: https://flow.google.com/project/a8748bd0-af46-467e-963c-868b27c4e8b4 (GenYZ Studio). All video runs used Frames to Video, Veo 3.1 Fast, 16:9, 720p, 8 seconds, x1; originals downloaded through Flow’s 720p menu. No API calls or video substitutes. Contact sheets sampled at one-second intervals and Flow playback provide bounded visual review, not frame-perfect certification or audio review.

L1 A/B includes the wrong-arm first attempt and exact image repair. L2 includes props and empty environment; text planning responses are explicitly authored ChatGPT worked responses. L3 pairs each individual wide/medium/dolly prompt with its actual take; the tighter dolly retry improves pose adherence. L4 negative space omits the core and is explicitly not continuity-approved. L5 negative-fill darkens more than the cheek; both dynamic-light takes still over-bloom, labeled as failures of the subtle-light requirement. L6 has three new spatial studies and the actual parallax attempt; excessive travel and late occlusion are disclosed. No generated take is silently represented as perfect.

Prompts/results are attached on the server before protected content delivery. Existing lesson IDs/progress remain unchanged. Images use generated 480/1280 WebP previews; full PNGs remain available. Videos retain native controls, posters and `preload="none"`. Evidence: `artifacts/directors-framework/prompt-tests/`, including initial jobs, exact retry prompts, video contact sheets and Flow screenshot. Assets: `public/api/workshop/examples/director-*`.

Release `d0c84602` deployed to https://genyzstudio.com/workshop/directors-framework. 60 tests, typecheck, lint, production build and protected-export scan passed. Live VN L1–L6 contained the expected new image/video pairs with no stale untested messages; actual L3 dolly playback and L6 image rendering verified, and EN L3 contains four videos plus translated reviews. Screenshots: `prompt-tests/live-l3-video.png`, `prompt-tests/live-l6-image.png`. Initial post-deploy CSS propagation resolved after reload; final screenshot confirms styled rendering. No database changes or Git push in this release.
