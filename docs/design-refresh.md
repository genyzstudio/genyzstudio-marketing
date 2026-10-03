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
