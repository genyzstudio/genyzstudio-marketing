# Studio video sources

Verified 2026-10-03 from the public Gen YZ Studio channels. The YouTube header links to TikTok; the TikTok biography links back to @GenYZStudio. The owner explicitly asked to use their videos on the training site.

- YouTube: https://www.youtube.com/@GenYZStudio
- TikTok: https://www.tiktok.com/@genyzstudio

## Featured work

| Video | Verified source | Local cover |
| --- | --- | --- |
| The Legend of Titus: The Mystery of the Glowing Scale | https://www.youtube.com/watch?v=VzmqrgQumGo | public/images/titus.jpg |
| Clever Little Rat: Through the Button Bridge | https://www.youtube.com/watch?v=1_EZiRh8o_o | public/images/button-bridge.jpg |
| Clever Little Rat: The First Clues | https://www.tiktok.com/@genyzstudio/video/7681309763950447893 | public/images/first-clues.jpg |

Covers are copies of the public poster images observed on those channel/video pages. Videos remain hosted on the original platforms. Vietnamese descriptions are original summaries based on public titles/descriptions; they do not claim particular production tools, workshop outcomes or student authorship.

Players load only after a visitor presses “Mở video”. YouTube uses youtube-nocookie.com; TikTok uses its official player/v1 endpoint. No autoplay. Direct source links remain available if embedding is blocked, a video is removed, or a platform requires authentication. Third-party player privacy behavior applies after activation.

Implementation references: https://developers.google.com/youtube/player_parameters and https://developers.tiktok.com/docs/en/embed-player.

## Native hero reel

The hero uses a 24-second silent excerpt (source time 00:03–00:27) from the finished studio export `Clever Little Rat/exports/final-video/scene-06-capcut-final-2026-09-20.mp4`. It depicts the Button Bridge scene linked to the existing studio YouTube example. Original export remains unchanged. Delivery file: `public/videos/studio-reel.mp4`, H.264, 1280px wide, no audio, fast-start metadata. The matching poster is `public/images/studio-reel.jpg`.

The native player loops silently, pauses offscreen or when the page is hidden, preserves manual pause, and does not automatically start with reduced motion enabled. A manual playback button and a direct full-film YouTube link remain available. The showcase YouTube/TikTok players retain click-to-load behavior.

## Technique gallery

The hero now presents two native Clever Little Rat excerpts and the existing click-to-load Titus YouTube player. Vietnamese teaching labels are editable in `content/hero-gallery.ts`. Scene 06's script documents the wide establishing shot, bridge-level tracking and character-scale consistency. The second excerpt uses source 00:23–00:36 from the same finished Scene 06 export. Titus is described as an example for observing world-building and connections between scenes, not as evidence of a particular generation tool. No local Titus export was found; its verified public studio link is retained. Only the first local clip autoplays. Both honor reduced motion and pause offscreen.

## Consolidated single-player gallery

Verified the public YouTube videos tab and TikTok profile on 2026-10-04. Added Missing Royal Bell (YouTube `3MRIcRKAgmM`), Zodiac Calendar Awakens (YouTube `LVj-obJOR-E`) and Morning Routine (TikTok `7677089767347014928`). Covers came from observed public YouTube thumbnails for those same films. The gallery uses six distinct films, not both excerpts of Button Bridge or multiple copies from different platforms. Content is now maintained only in `content/showcase.ts`.

The repeated showcase section and old hero-gallery content file were removed. The `#san-pham` navigation anchor now targets the single gallery. Previous/next wrap through the playlist; selectable thumbnails support Left/Right/Home/End. Only the selected player is mounted, and changing selection unmounts the old native video or iframe. There is no timed slide advancement.

## Behind-the-scenes process images

Added 2026-10-04 from the studio's own Clever Little Rat production repository. `public/images/process/leo-turnaround.webp` is the full-body row of the approved Leo sheet (`characters/leo-character-sheet.png`, approved 2026-09-28), with the baked-in "FULL BODY" label painted out in the backdrop colour; it is used in the hero. `public/images/process/mio-character-sheet.webp` is the approved Mio sheet (`characters/mio-character-sheet.png`), used for the character-sheet step. `public/images/process/scene-07-storyboard.webp` is the approved Scene 7 board 1 (`scenes/scene-07/dashboard/scene-07-board-01-dashboard.png`). The quoted prompt is an excerpt of `production/prompts/scene-07-seedance-25-approved-boards-v1/scene-07-board-01-seedance-25.txt`. The finished-film frame reuses the Button Bridge cover (`studio-reel.jpg`). Existing Scene 7 shot videos predate the approved sheet and board, so they are not shown as that storyboard's output. The page notes that the material spans several production stages.

## Scene 6, shot 2 case study (2026-10-04)

The behind-the-scenes section now follows one shot of the published *Clever Little Rat: Through the Button Bridge* (scene 6, public on YouTube `1_EZiRh8o_o` and TikTok since 2026-09-20 per `exports/final-video/scene-06-publication-2026-09-20.json`).

- Prompt: excerpt of Smartshot 46 in `scripts/scene-06.md`.
- 3D blocking: `scene-06-shot-02-blocking-v1`, downloaded with the owner's approval from the Google Flow project "Episode 1 — The Clever Little Rat" (GenYZ Studio account) into `production/flow/`, then re-encoded silent at 960px as `public/media/process/s06-shot02-blocking.mp4`.
- Shot plan: `scenes/scene-06/dashboard/scene-06-shot-02-dashboard.png` (labelled an archive layout study), exported as `public/images/process/s06-shot02-plan.webp`.
- AI-generated shot: `scenes/scene-06/videos/scene-06-shot-02-video.mp4`, re-encoded silent as `public/media/process/s06-shot02-shot.mp4`.

The copy does not claim the order in which these were produced or that this exact clip is the cut used in the episode; it states they are studio materials for the same shot. The Mio sheet and Scene 7 storyboard images are no longer used and were removed. 

## Coco and Pip farm, work in progress (2026-10-04)

Unreleased project shown as work in progress. Downloaded with the owner's approval:

- OpenArt shot plan "EXT. THE FARM" (GPT Image 2, created 2026-07-21, GenYZ Studio workspace, project Zodiac Village) into `production/openart/coco-pip-ext-farm-shot-plan-2026-07-21.png`; web copy `public/images/process/coco-pip-farm-board.webp`.
- Google Flow, project of 2026-07-06 (night farm): "Pip hamster explorer hat Coco" (8 s) and "Coco explains missing Golden Whistle" (10 s), 720p originals, into `production/flow/`; silent 960px web copies `public/media/process/coco-pip-cut1-pip.mp4` and `coco-pip-cut3-coco.mp4`. Google's Veo/Flow watermarks are kept.

The Flow shots predate the OpenArt board, so the page says they share story beats (cuts 1 and 3) and states both dates; it does not present the board as the plan the shots were generated from. A third Flow take ("no music", Pip close-up) was offered but not approved and was not downloaded.
