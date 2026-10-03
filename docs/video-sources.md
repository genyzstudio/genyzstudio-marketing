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
