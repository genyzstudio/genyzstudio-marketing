# GenYZ Studio session handoff

Updated 8 October 2026. The requested Titus archive update is implemented and deployed to https://genyzstudio.com. There is no unfinished implementation or deployment task. This handoff is for a new coding session in the same repository.

## Starting prompt

```text
Continue in /Users/minhvu/workspace/genyzstudio/genyzstudio-marketing.
Read AGENTS.md and docs/session-handoff-2026-10-08.md first.
The latest completed change is the Titus production archive integration,
deployed to genyzstudio.com at commit 8330be4. Inspect the current working
tree and remote main before changing anything. Preserve unrelated .codex/
files and production source repositories. Keep the bilingual site, shared
project selection, and distinction between actual project evidence and
illustrative methods. Await my next requested change; do not redeploy or
repeat completed work just because this handoff mentions it.
```

## Product direction

The site markets GenYZ Studio as an AI film studio and filmmaking training provider. It demonstrates a common production method through multiple real films: The Great Gulp, Clever Little Rat, and The Legend of Titus. Project selection must synchronize the film gallery, workflow illustrations, supporting assets, and playback. Never make the site appear to describe only one project.

The nine interactive steps are story, visual references, storyboard and shot planning, shot frames, motion, review and retakes, editing, sound, and finishing and publishing. They form three illustrated lanes on desktop and a vertical journey on mobile. Each step opens a native dialog with the method, expected output, review question, and available project evidence. Previous and next controls navigate steps; image sequences support thumbnail selection.

The original research compared a traditional 3D production diagram with published text in the authenticated IDALL AI classroom. The site presents an original synthesis; it does not reproduce course videos or assignments. Research and source links are in docs/ai-filmmaking-pipeline.md.

## Repository and release state

- Workspace: `/Users/minhvu/workspace/genyzstudio/genyzstudio-marketing`
- Remote: `https://github.com/genyzstudio/genyzstudio-marketing.git`
- Local branch: `codex/studio-storytelling`
- Local HEAD and remote main verified at handoff: `8330be4b180a993ed4b8688c4d08c8b321ebdb82`
- Latest commit: `feat: add Titus production archive to interactive workflow`
- Earlier commits: `591d562` illustrated interactive pipeline; `47088ce` synchronized multi-project workflows.
- Live hosting: Cloudflare Pages, publishing from main. A Vercel integration also exists; it is not proof that the custom domain has updated.
- Routes: `/` Vietnamese, `/en` English; workflow anchor `#pipeline-map`.
- Before this document was created, the only untracked item was unrelated `.codex/`. Leave it alone. This document is a local, uncommitted addition.

Read repository AGENTS.md before changes. Next.js is 16.3.8 with React 19 and TypeScript; read relevant guides under node_modules/next/dist/docs before changing framework code. Node 24.x is required. The app exports static files to out/.

## Code map

| File | Responsibility |
| --- | --- |
| content/showcase.ts | Film gallery content and film destinations |
| components/project-selection.tsx | Shared selected-project context |
| components/hero-gallery.tsx | Gallery and selected player |
| content/workflows.ts | Workflow types and project evidence; imports Titus content |
| content/titus.ts | Bilingual Titus story, references, planning, clips, and audio |
| content/pipeline.ts | Nine shared methods and per-project evidence resolution |
| components/workflow-explorer.tsx | Interactive lanes, dialogs, navigation, media and audio controls |
| components/pipeline-art.tsx | Project-specific node illustrations |
| components/storyboard-sequence.tsx | Selectable reference and storyboard images |
| app/globals.css | Responsive styling and audio comparison layout |
| tests/seo.test.tsx | Content, assets, project workflow and pipeline coverage |
| docs/video-sources.md | Source provenance and media transformation details |
| docs/ai-filmmaking-pipeline.md | Research, workflow decisions and evidence limitations |

WorkflowStage supports audio entries with src and label. WorkflowProject supports pipelineEvidence overrides for frames, review, edit, and sound. Existing five-stage project data remains compatible with the nine-step explorer. Audio loads on demand; playing one comparison track pauses the other. Closing dialogs unmounts players. Project changes must not leave stale playback running.

## Titus integration

Source repository: `/Users/minhvu/workspace/genyzstudio/The Legend Of Titus`. It was inspected read-only. It contains six scene scripts, canonical character/location/prop references, shot dashboards, cut panels, a Flow prompt pack, downloaded motion clips, audio-separation intermediates, and a standalone credits render.

Eight pipeline steps now have relevant Titus material. Review and retakes still has no published comparison. Preserve these distinctions:

- Annotated cut panels are planning material, not verified clean generator inputs.
- Motion footage is an archived source take. Direct generation ancestry from the displayed board and inclusion in the final film are unverified.
- The credits render is a standalone editing asset, not an editing timeline or confirmed final-film segment.
- Source and isolated-voice audio illustrate an intermediate separation step, not final mix stems.
- A filename or prompt pack does not establish approval status or which model generated a shot.

Public derivatives are in public/images/titus-process/ and public/media/titus/. Images include Titus, Glimmer, the riverside, the scale prop, one shot dashboard, four cut panels, and clip posters. Clips are scene-01-shot-04.mp4 and credits.mp4; audio files are source-audio.mp3 and isolated-voice.mp3. They are optimized copies; source originals were not changed.

Exact source paths and encoding parameters are in the final Titus section of docs/video-sources.md. Its earlier missing-folder statements, and the old Titus evidence table in docs/ai-filmmaking-pipeline.md, are historical and explicitly superseded by the 8 October update at the end of each document.

Published Titus film: https://www.youtube.com/watch?v=VzmqrgQumGo.

## Other source repositories and browser access

- Great Gulp: `/Users/minhvu/workspace/genyzstudio/The great gulp and the cock`
- Little Rat: `/Users/minhvu/workspace/genyzstudio/Clever Little Rat`
- Great Gulp Flow project: https://flow.google.com/project/9cdb9ae5-7670-4584-989d-2d3b9a571a96
- Course classroom: https://www.skool.com/idall-lite-1529/classroom

For private studio projects use the Chrome profile signed in as genyzstudio@gmail.com, as explicitly requested by the user. Discover the current profile/tab rather than reusing old numeric IDs. A private-source 404 can indicate the wrong profile. Public visitors must receive playable public film links or local web assets, not authenticated Flow project URLs as playback destinations.

## Completed verification

For commit 8330be4, lint, typecheck, all 23 tests, and the production static build passed:

```sh
npm run lint
npm run typecheck
npm test
SITE_BUILD_MODE=production npm run build
```

Cloudflare Pages reported completed/success for that commit. The live English workflow was opened, Titus selected, and its sound dialog inspected with two audio controls. Both language routes returned indexable site HTML. SHA256 checks showed the live Titus character image, motion clip, and isolated-voice sample exactly matched local public files.

Before release, local browser checks covered the four Titus panels, both audio tracks playing, mutual audio pause, and player removal on dialog close. Live audio playback itself was not repeated after deployment.

Live verification screenshot: `/Users/minhvu/workspace/genyzstudio/genyzstudio-marketing/artifacts/live-titus-workflow.jpg`.

## Local preview and future deployment

```sh
npm run build:preview
npm run start -- -l 3101
```

A static server was started on port 3101 in the previous session; inspect before starting another. Tool session IDs and browser JavaScript bindings are ephemeral. The last in-app browser was viewing the live English Titus sound dialog. Reconnect through supported browser tools in a new session.

Preview builds are deliberately non-indexable. Always rebuild with SITE_BUILD_MODE=production before release. Fetch and inspect main before publishing; do not overwrite newer remote changes or unrelated local work.

The previous push used the already-authenticated GitHub account vutranminh. The default active account minhvu83 lacked write access. If that remains true, use the authorized account through a subprocess-scoped credential without printing or persisting tokens; avoid changing the global account unnecessarily. Do not force-push. Confirm the Cloudflare check for the exact commit and inspect the actual custom domain after publication.

## Remaining evidence opportunities

No additional work is currently assigned. Future requests could add real review and retake comparisons, an actual editing timeline, approved clean generation frames, or a final sound-mix breakdown when those materials are provided. Until then, keep the gaps visible and do not substitute another film's assets. Preserve Vietnamese and English parity, mobile interaction, reduced motion, and media cleanup when extending the experience.
