# Five Levels and Director’s Framework video regeneration — 2026-10-15

Scope: replace the problematic lesson demonstrations while preserving the original attempts as explicitly reviewed diagnostic examples. Master the Frame remains image-only; no video was generated for or attached to that course.

## Published candidates

The exact English generation prompts, Vietnamese reading translations, input filenames, provider settings, asset IDs and observed limitations are in `server/workshop-regenerated-videos.json`. English was actually submitted for these replacements; translations must not inherit the original Vietnamese-run evidence label.

| Course | New asset | What the lesson can demonstrate |
| --- | --- | --- |
| Director | director-medium-static-v3 | Fixed framing and a largely held raised-right-arm pose, with minor gaze/head/finger motion |
| Director | director-medium-dolly-v4 | Predominantly forward approach with pose continuity; no calibrated distance claim |
| Director | director-lighting-v4 | Restrained turquoise spill without the original white flare |
| Director | director-parallax-v3 | Relative layer movement, both characters/core visible without a new foreground obstruction |
| Five Levels | camera-static-vi-v3 | Stable window/table/lamp and held downward gaze |
| Five Levels | camera-dolly-vi-v4 | Forward approach rather than an actor leaning to simulate a dolly |
| Five Levels | lantern-ignition-vi-v2 | Match enters the existing chimney gap and lights the wick; hands/apron remain present |
| Five Levels | reaction-close-vi-v2 | Intended close-up, downward gaze and closed-mouth relief without white breath |
| Five Levels | lantern-hold-vi-v2 | Continuously lit ending with sleeves, apron and both hands still present; slight hand fidget disclosed |

Eight accepted clips use OpenArt Seedance 2.5, 480p, 5s, Audio On. The hold uses Google Flow / Veo 3.1 Fast, 720p, 8s, x1, Frames to Video, 16:9. No fixed-seed or controlled causal-benchmark claim is made.

The first six Flow replacement attempts failed review (drift, wrong camera path or invented foreground occlusion) and were not registered as accepted outputs. Their downloads and sampled frames remain under the ignored `artifacts/workshop-regeneration-2026-10-15/` audit directory. A Higgsfield Seedance attempt was rejected before job submission because the connected account requires a higher plan; no upgrade or purchase was made. The usable retries were generated in the existing signed-in OpenArt account. OpenArt generation used 2,400 existing credits; seven Flow generations used 10 existing credits each, including the accepted ending.

## Rebuilt film

`last-lantern-edit-vi-v2.mp4`: 20.000s, 852×480, 24fps, H.264, no audio. Four hard-cut shots use the first five seconds of:

1. camera-static-vi-v3
2. lantern-ignition-vi-v2
3. reaction-close-vi-v2
4. lantern-hold-vi-v2

The reaction cutaway deliberately elides match withdrawal and closing the chimney; the ignition take does not complete that procedure. This is a four-shot narrative edit, not an uninterrupted repair demonstration. The new ending preserves the repairer rather than removing him from the same room angle. Original v1 remains labeled as a continuity diagnosis. The film is now the final lesson’s lead example in both languages.

Film SHA-256: `abdf9a007f1bfc8b4d8a1126b967017768232f0110515adecd21aeddaf95918f`.

## Verification

- Reviewed dense contact sheets covering all nine complete clips, including endings, plus the complete film’s four beats. The black cells in short-clip contact sheets are unused grid cells, not black frames in the source.
- Full FFmpeg decode passed for all nine clips; ffprobe dimensions match their curriculum records. The assembled film is exactly 20 seconds.
- 70 tests pass, including exact-English-prompt provenance, Vietnamese translation retention, authenticated media registration, preserved diagnostic edit and image-only Master the Frame.
- Typecheck, lint, production static build and protected-export scan pass. The export scan checks 81 public text assets.
- A final read-only Claude App review and authenticated production checks are recorded below once complete.

Source and media are local working-tree changes; no commit or push is implied by deployment. Preserve unrelated existing dirty work.

## Claude App final QC

Claude App inspected all nine accepted contact sheets plus first/last frames extracted independently from the MP4s and the final-film sheet. Its verdict: all nine clips pass their stated lesson claims. It confirmed the repaired film’s visible match ignition, persistent repairer and close-up reaction, and confirmed no MP4 reference in either Master the Frame curriculum. Audio was not reviewed. The subtle lighting change was described as difficult to see in first/last frames but compatible with the restrained claim.

One stale storyboard review still described the original medium-shot reaction. Corrected both languages to distinguish the first rough cut from the regenerated close-up. Also clarified that the original reaction and empty-lantern ending belong to v1. No second review cycle was needed for those wording changes. Evidence: `artifacts/workshop-regeneration-2026-10-15/claude-final-qc-ax.txt`.

## Production verification

Final deployment: `c43e8b6c` (Cloudflare Pages production branch `main`), https://c43e8b6c.genyzstudio-marketing.pages.dev. The preceding substantive media deployment was `a952ce18`; the final deployment also corrects the English prompt alternative label to “Vietnamese version”, since newly submitted English prompts have translated Vietnamese versions.

- Live Vietnamese and English Five Levels and Director’s Framework opened under the existing authenticated session. All four downloaded workbooks contain every course-specific new video, exact submitted English prompt, Vietnamese translation and source ID.
- New 20-second film played to the end (`ended: true`, `readyState: 4`, no media error). New Director static, dolly, lighting and parallax clips and the Five Levels dolly each played to their endings without errors.
- All nine new standalone video endpoints returned 401 without authentication. A transient 404 on the first custom-domain request immediately after deployment resolved once propagation completed; the deployment URL returned 401 throughout verification.
- Both live Master the Frame routes render zero video elements, and both downloaded complete workbooks contain zero MP4 references.
- The final live English prompt UI contains “Vietnamese version” and no “Original Vietnamese prompt” label.
- Final build, protected-export scan (81 assets), 70 tests, typecheck and lint pass. Live evidence and workbook copies remain in `artifacts/workshop-regeneration-2026-10-15/`.
