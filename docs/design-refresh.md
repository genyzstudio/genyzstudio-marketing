# Cinematic design refresh

The design-taste-frontend skill guided this refresh. Design variance 7, motion 4, density 4: media-led studio work with restrained motion and clear Vietnamese teaching content.

## Audit and direction

Preserved the GenYZ Studio wordmark, coral identity, Vietnamese Be Vietnam Pro typography, navigation labels and anchor IDs, metadata, contact configuration, registration guard, video sources and consent copy. Retired the oversized asymmetric hero corner, equal three-card gallery, green accents and inverted workshop section.

Inspiration: [Higgsfield](https://higgsfield.ai/) for prominent media, compact navigation and restrained framing; [Runway](https://runway.com/) for creative-work-first presentation. No reference-site assets or product claims were copied.

The studio-owned Titus cover now leads the page, followed directly by a featured film and two companion examples. The original generated mountain illustration remains explicitly labelled in the learning-process section. All sections use semantic light/dark tokens, selected by the visitor's system preference. No additional JavaScript, dependencies or third-party requests were introduced.

## Verification

- 15 automated tests, ESLint, TypeScript and optimized preview build passed.
- Desktop 1280px and mobile 390px inspected in browser; no horizontal overflow.
- Light and dark system preferences verified, including readable film controls.
- Mobile menu opens and Escape closes it. Video activation focuses the close control; keyboard closing returns focus to the poster and removes the iframe.
- Reduced motion disables the hero animation. No video iframe loads before interaction.
- Production remains gated until a valid public Zalo destination is configured.
- Lighthouse was not run: the available browser automation interface does not expose a Lighthouse audit. No performance score is claimed.

## Obsidian references

- Not applicable: this is a marketing website; no agentic system is being designed.

## Production-sheet revamp (2026-10-04)

Direction: the page borrows the studio's own production materials. The page background is the light grey of the character-sheet backdrop (`#e8e5e0`), with cocoa ink (`#2b2118`), Leo's yellow (`#f4c430`) reserved for registration actions, Pip's lime (`#c9e27a`) only for "covered in the workshop", and the cheese-cave dark (`#1a140f`) for the film band. Type: Bricolage Grotesque Variable (display, `font-stretch:88%`) and Be Vietnam Pro (body), both self-hosted with Vietnamese subsets.

The one bold element is Leo's real turnaround in the hero, revealed view by view with a stepped `clip-path` (no motion with reduced-motion). Behind-the-scenes steps use storyboard panels with caption bars, mirroring the studio's boards. Numbers appear only on real sequences (learning path, production steps).

Deliberately avoided: the cream-and-coral palette of the previous refresh, all-caps eyebrows, a single accented headline word, middle-dot label strings, and identical card grids. Section order now puts the workshop offer straight after outcomes. The instructor block is config-gated (`siteConfig.instructor`) and hidden until real details are supplied.

## Studio and filmmaking refresh (2026-10-07)

The home page now introduces two offers: AI video production and filmmaking training. A charcoal cinema palette, amber actions, short introduction and actual studio artwork establish the studio identity. The Great Gulp case study connects opposing characters, escalating conflict and an emotional ending to specific filmmaking decisions. Original storyboards are distinct from the finished-film excerpt.

Both locales follow the same journey: studio introduction, production/training choices, featured film and interactive story chapters, film portfolio, learning path, introductory workshop, expandable production examples, FAQs and contact. Public film playback uses YouTube; the authenticated Flow editor remains a source rather than a customer-facing destination. Existing unknown workshop details and Skool availability remain explicitly pending.

Media uses 10px corners; action buttons use pills. Motion is limited to optional video playback and interaction feedback, with reduced-motion support. Heavy production examples are kept in a disclosure and clips play only when visible. Design dials: variance 7, motion 3, density 3. Source assets take priority over invented promotional artwork because the films are the evidence for the studio's work.

## Multi-project workflow explorer (2026-10-07)

The hero presents all three films. A shared explorer follows the portfolio, with project selectors and five consistent stages: story, characters, storyboard, motion and finished film. Switching projects retains the current stage where material exists. Each stage pairs actual studio media with a creative decision and a filmmaking lesson.

Great Gulp and Clever Little Rat have all five stages. Titus currently has only the published film; four unavailable stages are disabled and labelled, and selecting Titus opens the film. No script, storyboard or production history is invented. Project selection unmounts prior media players. The mobile selectors scroll within their own rows, while the media and explanation stack. Both Vietnamese and English are supported.

The hero links, gallery controls and workflow project buttons now share a single selected film URL. The gallery and workflow update in both directions, preserving the preferred workflow stage where available. Films with no published production breakdown display their own final film and an availability notice. The detailed Little Rat notebook only mounts for the Button Bridge film. Switching projects unmounts previous playback, and hero project links select their corresponding project before navigating to the workflow.
