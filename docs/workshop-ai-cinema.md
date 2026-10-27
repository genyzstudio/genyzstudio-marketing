# AI Cinema Workflow & Camera Language

Routes: `/workshop/ai-cinema-workflow` (Vietnamese) and `/en/workshop/ai-cinema-workflow` (English). Seven lessons retain Step 4's order and assignments. Course content stays server-side behind the existing workshop policy; migration 0010 adds independent progress and policy support without making the course public.

## Source evidence

Reviewed classroom text and complete English captions for Lessons 7–12, the complete visible Loom transcript for Lesson 13, and sampled video frames/contact sheets for all seven recordings. This is a caption-and-visual review, not a claim of listening to every spoken word or watching every frame continuously. Source recordings are private research files in ignored `artifacts/ai-cinema-workflow/source/`, never bundled as workshop assets.

All classroom lessons share `https://www.skool.com/idall-lite-1529/classroom/11b0205e` with the following `md` values:

| Lesson | Source title | md | Recording | Required output |
|---|---|---|---|---|
| 7 | Freepik Scene Building | 47f8151a396146d7a4945cb15188ad98 | 5:22 | Script → character → 3×2 sketch sheet → six separate cinematic frames |
| 8 | Seedance Motion Generation | 96ebd428092a4301a43112f182c4b69f | 13:51 | Prompt + video + 5–7 sentences on speed, camera and physical emotion |
| 9 | Kling Camera Control | 8d4cb54670cf44e89444dd0a0b810ecd | 13:42 | Three camera videos with prompts and reasons |
| 10 | Luma and Runway Integration | 864c2b183de34f149d646be15840d272 | 7:15 | Character turnaround + cinematic still + animation |
| 11 | Camera Movement | 61e4b345a3354de59677a93d37d31543 | 4:46 | Jump cut, match cut and cut-on-action sequences; 1–2 sentences each |
| 12 | Shot Sizes and Framing | 7b07873ca4b14b49bb3b646c001df204 | 16:13 | Silent five-second prompt, two time blocks, 3–5 sentence rationale; generated or explicitly expected result |
| 13 | Cinematic Video in Seedance 2 | 46a75bfc04ac4db99f6b9d13439de054 | 6:17 | Six-shot storyboard + structured YAML + video with at least three transition types |

Total recording duration: 67:26. Practice estimates are authored estimates, excluding queues/retries.

Lesson 13: [Darren Maen's Loom](https://www.loom.com/share/7db77e6fca8c44cb924fb31935770356). Anchors: 0:20 character, 0:33 six-shot sequence, 0:54 upload storyboard, 1:08 identity reference, 1:37 YAML blocks, 2:47 simple camera instructions, 3:12 continuous timeline, 4:00 production notes, 4:13 transitions. The inspected YAML frame is saved privately as `lesson-13-yaml.jpg`.

## Editorial decisions and terminology

- L7 distinguishes the requested separate images from a rendered grid visible in the demonstration. One sheet is not six files.
- L8 retains Force → Sequence → Camera → Human reaction and all ten example categories. Numeric directions are targets, not proof of simulated physics. Slow-motion speed is stated unambiguously.
- L9 includes all 25 demonstrations in source order. Dolly translation, zoom, rack focus, rotation and camera tilt are not conflated. Dutch angle is an angle, not necessarily movement.
- L10's recording teaches Luma Uni-1 with Kling/Ray 3.14 comparison, despite the broader classroom title. No unsupported Runway procedure was invented.
- L11 demonstrates six editing techniques despite its camera title and a closing reference to five. The assignment still requests only three sequences. Graphic match and match on action are distinguished.
- L12's final assignment explicitly has no audio, even though sound appears in the teaching. Establishing shot is a narrative function; size boundaries are approximate. “Practical-effects look” describes style, not real-footage provenance.
- L13 retains the 0–2–4–6–8–12–15 timeline. Cut at 2s, horizontal whip at 4s, smash at 6s, action continuation around 8s (lead-in 7.6s), upward whip at 12s, hold to 15s. The original An scene makes the crouch explicit on both sides of the action cut.

All practice prompts are original adaptations using fictional adult An, a consistent wardrobe and skateboard. Both language versions are explicitly untested generation prompts. There are no invented generated results. Tool/version references describe the recordings, not guaranteed present-day account availability.

## YAML integrity

`server/workshop-ai-cinema-yaml.ts` emits valid YAML with quoted scalar values, two/four-space indentation, six non-overlapping intervals and the core `character_modeling`, `cinematic_storyboard`, `production_notes` blocks. Per-shot `sfx` follows the audio field name visible in the Loom screenshot. This is an authored prompt structure, not an official Seedance API schema. Keys remain English in both translations.

`LessonStep.promptFormat = 'yaml'` bypasses prose sentence formatting. The same raw text feeds display and clipboard in both the main and alternate-language prompt. Four-line collapse changes presentation only. Workbook export keeps both raw YAML blocks. Regression tests parse both versions, compare rendered `<pre>` text and workbook contents byte for byte, check coverage 0–15 seconds, and test migration preservation and isolated authenticated progress.

## Verification and release — 17 October 2026 (Asia/Ho_Chi_Minh)

- 79 tests passed, including parsed bilingual YAML, exact rendered/exported YAML, migration row preservation, protected access and course-isolated progress.
- Typecheck, ESLint, `git diff --check`, production build and the 99-public-text-asset protected-content scan passed.
- Local browser verification covered VI/EN lesson navigation, all 25 camera labs, expand/collapse and Copy. The actual `navigator.clipboard.writeText` call was observed while delegating to the original browser method: Vietnamese 2,927 characters and English 3,117 characters exactly matched their full YAML blocks with indentation and `sfx` retained. The alternate Vietnamese copy in the English edition also matched. Browser virtual clipboard readback was unavailable, so this is an observed API-call/success check, not an OS clipboard paste test. Temporary instrumentation was removed by reload; the local test policy was removed. No test HTML remains in the export.
- Production migration 0010 succeeded. Before/after exports of the affected tables retained all seven existing INSERT statements unchanged, including existing progress and policies. The new course has no public policy row and defaults to protected.
- Cloudflare Pages production deployment: `517239b6`, https://517239b6.genyzstudio-marketing.pages.dev. Both language pages return HTTP 200 on the deployment URL and custom domain; both anonymous content APIs return HTTP 401, with protected curriculum absent from page HTML.
- Live browser verification confirmed both routes and language switching at the login gate. Complete lesson UI/copy checks were local; no authenticated production lesson-view claim is made.
- Deployed from the existing working tree on `codex/vietnamese-video-workshop`; no Git commit or push was performed. Existing unrelated local work was retained.

Detailed command logs, screenshots and machine-readable checks are in ignored `artifacts/ai-cinema-workflow/`. Production SQL backups are private local artifacts and are not deployment assets.
