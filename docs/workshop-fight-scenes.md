# AI Action Scenes — Guardians of the Red River

Routes: `/workshop/fight-scenes` and `/en/workshop/fight-scenes`.

Source: Meta Instincts, https://www.youtube.com/watch?v=SdtaDI8plF4. Full available captions exported through the browser; retained privately in `artifacts/fight-scenes/source-transcript.txt`. Source anchors: concrete moves at 1:00, Who/Where/What/How workflow at 2:20, move library at 4:38, speed variation at 6:11, tracking/orbit/projectile camera at 7:45, trimming at 9:41. The source uses Seedance via Pippit. This course adapts its principles to imagegen and Google Flow; it does not claim access to the creator's private prompt template or equivalent model behavior.

Eight lessons put four foundations before the story application: readability, concrete moves, speed contrast, camera paths; then shared scene/frame, generation/review, editing, delivery. Same Linh, Light Collector and market bridge; final exercise remains one or two shots. The source story is not reproduced.

## Media and provenance

- `fight-principles-v1.png`: authored diagram rendered from local SVG; no claim of AI generation.
- `fight-start-v1.png`: built-in imagegen result using exact Vietnamese `start` prompt in `server/workshop-fight-prompts.json` and `frame-repair-v1.png` as its single reference. Original generated output: `exec-61abe6fe-016b-4d0c-ab99-fbd649a9df9f.png`. Actual result 1672×941. Retains identity and scene, but distance remains approximate.
- `fight-static-v1.mp4`: exact `static` prompt from the same JSON; Google Flow / Veo 3.1 Fast / Frames / 16:9 / 720p / 8 seconds / x1; input fight-start-v1. Downloaded through Flow UI. Actual 1280×720, 24 fps, eight seconds, with audio. Review/contact sheet in private artifacts.
- The video is explicitly a failed-brief diagnosis exercise: additional attacks, reaching contact, turquoise drift onto chest/other arm, a changed guard and slight camera advance. It is not presented as an approved final film.
- `fight-speed-v1.mp4`: same take retimed to 1.25× by ffmpeg `setpts=PTS/1.25`, 30 fps, no audio, H264 CRF23 faststart. This is an editing comparison, not a second generation; defects persist.
- Initial release left tracking untested; the camera follow-up below supersedes that status. No generated slow-motion or final two-shot film is claimed.

Images have protected 480/1280px WebP previews; videos preload none with posters. All curriculum stays behind the authenticated API and is included in the workbook export. New progress uses course key fight-scenes. Migration 0008 expands the course check while retaining historical data.

## Validation

62 tests, typecheck, lint, production build and export scan (81 public text assets) pass. Final independent review approved. Remote migration 0008 applied; all six previous progress rows matched exactly between private SQL snapshots. Browser live proof to be recorded after deployment. Working-tree deployment is not a Git push.

Live release verified: `f1cf654b` at https://genyzstudio.com/workshop/fight-scenes. Authenticated VN and EN curriculum loaded; VN video reached eight seconds with readyState4 and no media error. Both concept and generated frame WebP previews loaded. Anonymous content/video returned401. Screenshots: `artifacts/fight-scenes/live-overview.png`, `live-video.png`. All prior progress rows preserved; only this course's navigation created its own new progress entry during verification.

## Camera and repair tests — 14 October

Additional Flow tests isolate camera motion from the two-character choreography. Tracking v2 (Veo 3.1 Quality, 720p, 6s, 16:9, x1) uses the single-character `fight-camera-start-v1.png`; it demonstrates parallel following but exceeds three steps and changes framing slightly. Projectile v2 uses `fight-projectile-start-v2.png` with the same settings; it follows the orb to the shield, with residual orb-size drift and a fiery impact. Exact Vietnamese prompts are in the server prompt JSON. Frame recreation prompts and their actual input/output images are included with the lesson.

Failed exploratory videos stay in private `artifacts/fight-scenes/camera-tests/`, not the media registry. Tracking v1 turns into running; orbit v2 adds magic and character rotation; action v2/v3 add attacks/effects. These are not approved illustrations. The original failed take remains a diagnosis exercise. No final two-shot edit or successful full attack/dodge exchange is inferred from isolated camera tests.

Orbit v4 uses Flow / Omni 1.1 Flash / 720p / 6s / 16:9 / x1 with the same single-character start. It shows a pronounced arc and changing background perspective while Linh holds position. It also recenters the subject; the requested 90-degree arc is not a measured camera trajectory. Earlier orbit v3 was too subtle and is retained privately. The isolated-dodge Veo retry rendered successfully but still added effects and a forward lunge; it is not promoted.

Action repair v5: Flow / Omni 1.1 Flash / 720p / 6s / 16:9 / x1, input fight-start-v1. The main one-punch/duck exchange now reads clearly, without the reach, extra attacks or magic seen in earlier takes. It still punches with the unlit hand, not the requested left amber-gauntlet hand, and recovers rather than holds the end. The curriculum explicitly records these continuity limits and does not approve a left-gauntlet match cut. Exact prompt is `repair` in the JSON; original failed take A is kept beside revised B.

## Seedance replacement and linked choreography

User requested OpenArt Seedance 2.5 instead of Flow for the fight, testing at 480p first. OpenArt project `0ymWBZydoJIPtzgVfbBP` in GenYZ Studio. Exact Start frame is still fight-start-v1; Enhance Prompt was not used.

- `fight-seedance-basic-v1.mp4`: asset `okGsim8W8CS3TahcOQdD`, Seedance 2.5, 480p, 6s, x1, audio on, actual 852x480/24fps. Exact `seedanceBasic` prompt. Correct gauntlet attack and duck but long initial pause and only one exchange. Kept as baseline B.
- `fight-seedance-choreography-v2.mp4`: asset `NBqMUiytmpilRguca2jm`, same settings at 10s; actual 852x480/24fps/10.048s. Exact `seedanceChoreography` prompt. Closes distance, ducks, exchanges close strikes, pushes toward railing, then railing-assisted kick visibly drives opponent back. Chest counter is not a cleanly identifiable elbow and wrist glow continuity remains a review point. No upscaling or retiming. Published as 480p choreography draft C.
- Source method is specific move ideas without rigid second cues (2:01–2:17); railing-swing kick at 5:43. Hook/parry/elbow sequence is an original scene adaptation, not an exact source quotation.
- Replaces the planned Omni fight take B before deployment; its private original remains in artifacts. Three Flow camera examples retain accurate model labels and are separate exercises.

Live release `3eebc096` verified at https://genyzstudio.com/workshop/fight-scenes. 62 tests, typecheck, lint, production build and export scan passed. Authenticated Vietnamese Seedance C played to 10.048s at 852x480, readyState 4, no media error. Tracking, orbit and projectile-follow each played to the end at 1280x720, readyState 4, no media error. English Take C heading and translated review loaded. Anonymous video and curriculum requests returned 401. No D1 schema change. Proof screenshot: artifacts/fight-scenes/seedance-tests/live-choreography.png. Working-tree deployment only; no Git push claimed.

## 2026-10-15 — complete rapid scenes and paired speed comparisons

Scope: action workshop only. Google Flow camera demos and the failed Veo take are removed from the returned curriculum. Other workshop providers and progress are unchanged. OpenArt Seedance 2.5 is used for every action-course video generation; ChatGPT imagegen supplies the reference frames.

Six new 480p, six-second, Audio On scenes use Hộ Vệ Sông Hồng. The prompts request immediate action, connected attack/defense/counter beats and a brief visible resolution. Static, tracking and orbit use the same frame and choreography with only the camera clause changed. Projectile, slide and vault each retain a motivating threat, action and safe outcome. Model adherence is reviewed honestly beside every result; camera framing, oversized energy effects and missed details remain noted.

| Scene | OpenArt asset ID | Input |
| --- | --- | --- |
| Static | AOiaFSHecO6T0gIhDmxK | fight-start-v1.png |
| Tracking | BdTaspSm0BSA2uF5TrLD | fight-start-v1.png |
| Orbit | LUKU9SZfrLmPFp6dUp4L | fight-start-v1.png |
| Projectile | hoCLc5O0gsADIoiFVFrl | fight-projectile-start-v1.png |
| Slide | 2PnBtokD2C3qADaGAojQ | fight-slide-start-v1.png |
| Vault | UOZkxmYCV4t1nQGiJXup | fight-vault-start-v1.png |
| Broad prompt control (10s) | FjKflWDEov8GDyrIjhUH | fight-start-v1.png |
| Rigid timing control (10s) | Z8FldIndzYUp9E2KrdGn | fight-start-v1.png |

The two ten-second prompt controls are explicitly diagnostic, not the recommended rapid choreography. Comparing these with the six-second rewrite changes both choreography and duration; the lesson discloses that this is not a single-variable experiment.

Every displayed video step pairs the complete 1× scene with a 1.25× derivative of that same source. FFmpeg uses `setpts=(PTS-STARTPTS)/1.25` and `atempo=1.25`, preserving audio pitch without adding AI-generated motion or cutting away setup/resolution. The initial CFR export was corrected after review: fast versions now preserve every source frame at 30 fps instead of 24 fps, giving exactly 1.25× video timing (145 frames: 6.041667s → 4.833333s). Audio uses atempo=1.25; AAC container padding may differ by a few milliseconds. Final checks require equal frame counts, video-duration ratio within 0.0001 of 1.25, 480p and audio end drift below 0.1s. Both versions are web-encoded at CRF 21 with faststart; originals remain in the private artifacts directory. A separate full-scene pacing edit slows 1.6–2.2s to 0.75×, then returns to normal; it also has a paired 1.25× comparison.

Exact prompts live in `server/workshop-fight-demos.json`. Extra image prompts and references are in `server/workshop-fight-extra-frames.json`. Browser detail proofs, downloaded source files, contact sheets and prompt/stream/duration verification are under `artifacts/fight-scenes/full-scenes/`. Earlier 6/8/10-second exploratory outputs are not substituted for the six final rapid-scene prompts. No upscaling, credit purchase, D1 migration or progress reset was performed.

Coverage: story/causality/readability → static scene; concrete moves/duck/parry/rail-assisted kick → tracking; vague and rigid wording → diagnostic controls; sidestep/footing → full combat scenes; slide/vault → dedicated scenes; shield and flight → projectile; static/tracking/orbit → shared-scene camera comparison; pacing → all 1×/1.25× pairs and full-scene slow-beat edit; selection/continuity/audio/delivery → reviewed complete scenes, exact inputs and workbook exports.

Release verification: final deployment `ab9bc374` on `https://genyzstudio.com/workshop/fight-scenes` (preceded by media deployment `b087082b`). Typecheck, lint, 62 tests, production build and the 81-public-text export leak check passed. All 18 production videos loaded to HTMLMediaElement readyState 4 with no media error in the authenticated browser; evidence files are `live-camera-ready.json`, `live-library-ready.json`, and `live-slowbeat-ready.json`. Anonymous lesson and new video requests return 401. Final timing checks are in `final-media-check.json`; the earlier `media-check.json` reflects the superseded 24fps retime. Final 18-video payload is 31.68 MB versus 67.37 MB before web encoding. Git checkout remains uncommitted and no Git push was performed.
