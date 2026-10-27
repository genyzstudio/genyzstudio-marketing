# Workshop library and classroom navigation

## Design and routes

Preserves the studio's existing dark surfaces, yellow accents, self-hosted typography and wordmark. Replaces the growing horizontal workshop navigation with two distinct surfaces:

- Public discovery: `/workshops` and `/en/workshops` show descriptive course cards, topic filters, suggested learning level and bilingual text search. Search accepts Vietnamese with or without accents and searches both languages and tool names.
- Classroom switching: the current course is shown in a compact trigger. A native modal dialog contains a searchable vertical list, a current-course indicator and a library link. Search receives focus when opened. Close/Escape restores focus to the trigger; background scrolling is locked while open.

All existing classroom URLs are retained, including `/workshop` and `/en/workshop` for The Clever Little Rat. Home navigation now leads to the library. The library is included in the production sitemap; protected classrooms retain their existing indexing/access policies.

On desktop, the existing lesson sidebar remains visible. At widths up to 760px, a sticky Lessons button displays completion count and current lesson. It expands a vertical, scrollable menu. Selection closes the menu, scrolls to the content and focuses the lesson area. Escape closes the menu and returns focus to its button. There is no horizontal lesson carousel.

## Maintenance and access

`content/workshop/catalog.ts` is the single public catalog used by both the library and switcher. It contains only public discovery copy, topic, learning level, search terms and course ID. No protected curriculum import is allowed in discovery components. Existing course IDs, server-side policy checks, authentication and per-course progress remain unchanged.

Add a course to the server registry and the public catalog together. The catalog-route test checks coverage against registered courses and verifies both language routes. Add only public descriptions, never lesson instructions or prompts.

## Verification

- 82 tests passed, including new checks for catalog completeness, route preservation, accented/unaccented bilingual search, combined filters, empty results and dialog semantics.
- Typecheck, lint, production build, whitespace checks and the protected-export scan passed (110 public text assets).
- Browser checks: VI/EN library navigation, keyword/topic filtering, no-results reset, opening the switcher, automatic search focus, current-course marking, close/Escape focus restoration and switching to another English course.
- Responsive checks: desktop, 390×844 and 320×740. Library and classroom had no horizontal document overflow. Mobile lesson selection closed the menu and focused the selected content in both languages; mobile Escape returned to the menu button.
- Full lesson UI was tested against a temporary local-only public policy for AI Cinema. That policy was removed before deployment. No production policy or database schema change is required.
- One final read-only code review found no actionable issues. Browser QA found and fixed native search-field Escape behavior so the first press closes the dialog.

Evidence and deployment logs: ignored `artifacts/workshop-navigation/`. Existing unrelated working-tree changes were preserved.

## Production release — 18 October 2026

Published Cloudflare Pages deployment `80a6b023` from the existing working tree. Live checks verified both library routes and all twelve localized classroom routes (HTTP 200), the new course switcher markup and anonymous HTTP 401 for both AI Cinema content locales. Live browser checks confirmed library search, switching into an English workshop, searchable course selection, Escape/focus restoration and returning to the Vietnamese library. No database migration, production access change, Git commit or push was performed.
