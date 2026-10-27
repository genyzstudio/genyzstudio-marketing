# Seedance 2.5 curriculum critique and expansion plan

Reviewed 26 October 2026. **The current course is a useful guided first-film introduction. It is not yet detailed enough for reliable self-paced beginner learning, independent production, or Seedance 2.5 mastery.** The most valuable improvements are demonstrated outputs, explicit workflow decisions, and progressively less guided practice. Adding more prompt text alone will not close those gaps.

Claude Code and GPT Codex reviewed the current English and Vietnamese course independently. Claude returned ten depth findings successfully using `claude-sonnet-5-5`; Codex assessed the curriculum, checked current official documentation, and reconciled the reviews. This assessment goes beyond the earlier seven-item proofreading pass. It evaluates teaching evidence, not learner outcomes: no novice usability study or media-generation trial has been conducted.

## What the course currently teaches

The current inventory is seven modules, 23 core steps, five optional labs and 20 bilingual prompt pairs. There are no populated tested-example records or lesson media examples. The learner curriculum contains no explicit Seedance 2.5 mention, and its model link still points to Seedance 2.0.

| Learning outcome | Current assessment | Why |
| --- | --- | --- |
| Understand the production workflow | Good foundation | Tool responsibilities, saved files, budget and a small story are clear. |
| Make a first clip with help | Plausible, unproven | The path is guided, but access, references and usable outputs have not been demonstrated end to end. |
| Finish the prescribed three-shot film | Partially supported | The steps exist; visual quality standards, recovery examples and some fallback handoffs are missing. |
| Adapt the workflow to a new brief | Insufficient | Nearly every action and prompt is supplied. There is no transfer assignment with feedback. |
| Choose and use Seedance 2.5 workflows | Insufficient | Core practice uses first-frame generation, with little model-specific comparison or instruction. |
| Demonstrate mastery | Unsupported | Completion is self-attested; there is no independent capstone, assessed repair exercise or repeated performance evidence. |

Preserve the single-character story, small first milestone, tool-role explanation, bilingual support, saved filenames, timestamped defect notes, budget limits and honest untested labels. Keep complicated work out of the first-success lesson. The existing 3–5-hour estimate describes an introductory exercise, not mastery.

## The version-specific teaching gap

Seedance 2.5 has a broader advertised scope than the course currently teaches. The model page describes longer generation, extension, creative reference interpretation and advanced production controls. The launch material also describes richer multimodal inputs and targeted audiovisual editing, while acknowledging remaining difficulties with complex physical interactions. These are model claims, not evidence that a selected account exposes every feature. [Model overview](https://seed.bytedance.com/en/seedance2_5) · [Official launch](https://seed.bytedance.com/en/blog/one-take-creation-flexible-referencing-introducing-seedance-2-5).

The provider distinction matters. BytePlus documents a formal Draft-to-final process using a saved task ID, with prescribed preview/final resolutions and separate billing. That differs from rerunning an ordinary prompt at higher resolution. Its documentation also specifies task-dependent input/output rules and a separate route for real-person portrait assets. Those details belong in a dated provider appendix and a tested walkthrough; they should not be generalized to every consumer interface. [BytePlus tutorial](https://docs.byteplus.com/en/docs/ModelArk/seedance-2-5) · [Task API](https://docs.byteplus.com/en/docs/modelark/create-video-generation-task-api).

For a novice, explain these as decisions with examples: “generate from this first image,” “use these assets as references,” “continue this video,” “change part of this video,” or “finish this approved draft.” Keep API code optional. A model selector, reference slot, prompt instruction and editor operation are different things.

## Priority findings and required improvements

### 1. Give learners a demonstrated first success before the reference workload

**Evidence:** The first video is in Module 5, after two image-production modules and a prompt-writing module. All examples are explicitly untested.

**Consequence:** A newcomer can spend much of the course creating references before discovering that their selected service cannot accept the required input. They have no image or clip showing what “good enough” looks like.

**Improvement:** Begin with a validated starter frame and a short recorded demonstration on one named provider. Show model selection, the starting-image slot, the cost estimate, generation, download and playback. Then return to creating original character and location assets. Supply the starter assets so a novice can continue even when their first image attempts fail.

**Acceptance:** A new learner produces and downloads one clip, identifies the selected version/mode and records its cost without instructor intervention. A provider rejection has an explained next step. The baseline budget is set before this attempt.

### 2. Build a visual evidence pack

**Evidence:** Modules 2–6 repeatedly ask the learner to inspect identity, geometry, motion and joins, but provide no actual visual comparisons.

**Improvement:** Produce an original GenYZ sample pack containing an approved portrait, turnaround and extracted views; a master location and landmark sketch; lantern states; the composed first frame; three selected clips; at least two genuinely failed takes; marked failure frames; a repaired example; and the finished edit. Record the exact inputs, prompts, model/provider, settings, date and spend. Add captions/transcripts to teaching videos and useful descriptions to comparison images.

**Acceptance:** Each quality criterion points to a concrete pass/fail example. Every demonstration labeled as tested has its own matching run record. One successful pilot must not remove the untested label from unrelated prompts.

### 3. Repair two remaining logic gaps before expanding

**Reference mapping:** Module 3’s limited-slot fallback combines the shelter and lantern, leaving three inputs. The copyable prompt still defines four images, including a separate fourth lantern image. See [composition instruction](../server/workshop-seedance-masterclass.ts#L83) and [four-image prompt](../server/workshop-seedance-masterclass-prompts.ts#L44). Provide separate complete mappings/prompts for the actual number of inputs. If a tool accepts fewer inputs still, explain a compatible staged edit instead of silently assuming three slots.

**Fallback completion:** Module 5 permits a still-image fallback, while its checklist requires a generated clip or usable segment; Module 6 requires three clips. See [Module 5 checks](../server/workshop-seedance-masterclass.ts#L122) and [Module 6 checks](../server/workshop-seedance-masterclass.ts#L146). Define separate outcomes for a planning/animatic draft and a generated-video exercise. A learner should be able to record the former honestly without claiming the latter.

**Acceptance:** Every reference mentioned in the copyable prompt exists in the upload manifest. Both budget paths have achievable, accurately named completion criteria.

### 4. Teach reference design and rejection

**Evidence:** The character and location workflows generate useful assets but mainly tell learners to check that they match.

**Improvement:** Explain why a portrait anchors facial identity, a full-body view anchors proportions/outfit, and a location sheet anchors spatial relationships. Include examples of conflicting clothing, changed facial structure, cropped limbs, tiny faces, duplicate people, incompatible lighting and inconsistent landmarks. Show how cropping and resolution affect what remains visible. Use a simple floor plan to distinguish physical left/right from screen left/right. Include one verified edit sequence in Codex GPT Image and one in Nano Banana, showing actual attachments and saved files.

**Acceptance:** The learner rejects a flawed asset pack, explains each rejection and assembles a consistent reference manifest. They can select fewer relevant assets rather than assuming more images always improve results. Use supplied defects for early practice rather than requiring paid generations with knowingly bad inputs.

### 5. Teach prompt reasoning, with assistants supporting the learner

**Evidence:** Module 4 supplies a project guide and full prompts, but does little to explain individual clauses or evaluate alternatives.

**Improvement:** Add an annotated prompt anatomy: subject, observable action, environment, camera/framing, timing, continuity and audio. Show a real ChatGPT/Claude exchange from vague brief through clarification, an imperfect response, human correction and final prompt. Explain which statements describe an intended result and which settings must be selected in the UI. Compare one changed variable while recording stochastic variation; two different outputs do not prove causation.

**Acceptance:** With ChatGPT or Claude available, the learner turns a new brief into a shot, catches an invented action or unsupported reference, explains their choices and revises after inspecting output. The goal is independent judgment with tools, not a ban on assistants or memorization of magic phrases. An unaided drafting exercise can diagnose understanding, but it is not a prerequisite for all learners.

### 6. Add camera, action and spatial storytelling progressively

**Evidence:** A fixed camera is appropriate for the first project, but there is no subsequent lesson on shot size, camera movement, screen direction or blocking.

**Improvement:** Introduce wide/medium/close/insert examples; distinguish subject motion from camera motion; show a push-in, pan and tracking move; teach staging and eyelines using the shelter layout. Add an insert and one controlled movement after the fixed-camera clip succeeds. Later introduce two subjects with explicit roles and interaction constraints.

**Acceptance:** The learner predicts what should change on screen, compares intended and observed movement, preserves spatial relationships and explains a cut. Do not impose “every adjacent shot must have a different size”: repeated framing and fixed-camera continuity can be intentional.

### 7. Teach the Seedance 2.5 operation choices

**Evidence:** The core exercises cover a single first-frame workflow. Ending-frame chaining is taught without comparison to native extension. Optional labs mention reference video and VFX but do not supply enough practice to establish competence.

**Improvement:** Add a feature map with a task, relevant inputs, provider control, example, failure case and fallback for each operation. Compare first-frame and reference-driven generation on one small action. Compare a longer multi-shot plan with separate clips; distinguish native extension from manually chaining a still. Add first/last-frame constraints where exposed. Teach native editing separately from image repair and CapCut edits. Place camera-perspective, green-screen and clay/white-model control in advanced electives with their own prerequisite assets.

**Acceptance:** Learners select an operation for a fresh brief and justify it. Unsupported features are marked unavailable, not passed. A feature demonstrated only in an instructor video counts as awareness, not practical mastery.

### 8. Expand audio and performance beyond one optional paragraph

**Evidence:** The optional voice exercise and basic volume adjustment are a useful introduction, but do not teach a complete audiovisual workflow.

**Improvement:** Add a sound plan with dialogue, ambience, effects and silence; a reference-audio preparation example; a motion-reference example that separates pose/timing from appearance; and a Vietnamese listening check for wording, tone and lip timing. Show when native audio, replacement audio and external voiceover are appropriate. Retain the existing own-or-permitted-reference guidance; the course already contains it.

**Acceptance:** A reviewer can understand the intended line, hear it clearly on two playback devices and identify obvious timing or voice changes. The student can explain which reference controls which property. Silent first-film learners can progress without this lab, but should not receive an audio-performance competency claim.

### 9. Make diagnosis, repair and budgeting operational

**Evidence:** A good one-issue revision habit exists, but the single invented backpack example and short FAQs do not teach diagnosis across unfamiliar failures.

**Improvement:** Provide a defect gallery and a table of symptom, possible cause, cheapest diagnostic, repair option and stopping condition. Include face drift, duplicate props, geometry changes, temporal flicker, impossible motion, missed beats, unwanted camera motion, wrong audio and rejected inputs. Compare changing the input, revising the prompt, changing mode, targeted video editing, cutting around a fault and regenerating. Distinguish formal Draft-to-final, ordinary reruns and upscaling. Supply a take/cost log with inputs, changed variable, output review and kept duration. Treat cost per usable second as a decision aid, not the only quality measure.

**Acceptance:** Learners diagnose a supplied unfamiliar failure, choose a bounded next action and verify both the repaired region and the parts meant to remain unchanged. They can stop at budget without misreporting success.

### 10. Assess transfer and repeatability

**Evidence:** Completion currently consists of self-checks for one heavily guided story. Repository tests verify software behavior; they do not establish learning effectiveness or generated-media quality.

**Improvement:** Add a supported recreation, a constrained variation and an independent capstone with feedback. Require a brief, shot plan, reference manifest, prompts/settings, selected and rejected takes, cost log, repair rationale and final film. Use a new character or location for transfer rather than a renamed Lan prompt. Pilot with several genuine beginners and log where they stall before claiming the course is self-sufficient.

**Acceptance:** An independent reviewer can follow the evidence and score the work. The student can explain and repeat the process on another small brief. Course completion and demonstrated competency must remain distinct.

## Proposed learning path

This is a proposed curriculum, not an implemented expansion. It preserves the first-film exercise and adds depth after early success.

| Stage | Lessons | Evidence produced | Progression gate |
| --- | --- | --- | --- |
| 1. First clip | Access/version probe; budget; generation from a supplied validated frame | Mode/settings record, first clip, short output review | Learner can select the intended mode, download and inspect a result. |
| 2. Build original assets | Character identity and views; location/prop sheets; composition and asset mapping | Reviewed reference pack and original starting frame | Every reference has a purpose; identity, geometry and inputs pass the rubric. |
| 3. Direct a shot | Prompt anatomy; ChatGPT/Claude dialogue; camera versus subject motion; controlled comparisons | Annotated prompts, comparison log, new-brief shot | Learner can explain decisions and correct a bounded error. |
| 4. Build a sequence | Shot sizes/blocking; first-frame versus references; multi-shot planning; chaining versus extension | Three-shot film and seam comparison | Actions and state remain coherent; learner justifies their chosen workflow. |
| 5. Refine and deliver | Audio/performance; repair triage; Draft/final choices; editing and export | Repaired take, sound plan, cost record, final film | Output meets the brief and plays correctly; revisions preserve intended elements. |
| 6. Demonstrate independence | Constrained variation; fresh capstone; feedback and revision | Submission pack and assessed second project | Competency demonstrated on a new brief, with assistants allowed. |
| Advanced electives | Targeted audiovisual edits; perspective/green-screen work; clay/white-model control | Feature-specific before/after evidence and explanation | Completion scoped to the feature actually available and demonstrated. |

Do not promise a fixed number of hours to mastery. Estimate practice and generation time after piloting each stage. Keep optional advanced tools from blocking first-film progress.

## Required lesson pattern

Each major lesson needs a clear outcome, prerequisites and input files; a short explanation of the decision; an annotated demonstration; a complete worked example; a bounded exercise; a failure example with diagnosis; a quality rubric; and an independent variation. Downloadable assets and blank templates should make recovery possible. Long paragraphs should be split where a novice must perform a separate action or inspect a result.

For example, a lesson comparing **first-frame control with reference-driven generation** should:

1. Show two actual results for the same small action, with the chosen provider/modes recorded.
2. Explain exactly which inputs each mode uses and what each asset contributes.
3. Present a correct attachment manifest and a deliberately mismatched one for a no-cost diagnosis exercise.
4. Let the learner choose a mode for a fresh brief, then make a bounded attempt within a declared budget.
5. Review identity, layout, action and unintended changes at marked timestamps. Permit an inconclusive comparison rather than claiming one mode always wins.
6. Finish with a mode-choice explanation and a next action. If only one mode is available, record a partial practical result rather than manufacturing a comparison.

## Competency rubric

Use a common four-level rubric: **0** no evidence; **1** completes with substantial help or unresolved defects; **2** meets the brief with limited help and explains decisions; **3** repeats the result on a new brief, diagnoses problems and defends tradeoffs. These are proposed teaching criteria, not a measured score for existing learners.

Assess brief fidelity, reference quality, input/mode selection, camera/action control, temporal and spatial continuity, repair judgment, audio when required, delivery and budget records. A capstone should reach at least level 2 in the applicable core areas, with no major unexplained identity/state break or missing required story beat. Advanced claims require demonstrated advanced tasks; a silent film cannot prove audio competence. More than one successful project is needed to support a claim of repeatability.

## How the two reviews were reconciled

Both reviews identify the same central gaps: model-specific depth, visual evidence, prompt reasoning, camera/continuity practice, systematic diagnosis and independent assessment. Claude particularly highlighted the delay before first generation and the fact that most reference assets feed the image compositor rather than Seedance directly. Codex additionally found the three/four-image mismatch, fallback/checklist conflict and the formal Draft workflow distinction in current documentation.

Some Claude suggestions were narrowed. Adjacent shots do not universally require different sizes. Fixed framing does not automatically create a bad jump cut. The course already permits only owned or authorized reference material, so it does not need a claim that permission guidance is absent. A mandatory language A/B test and paid use of deliberately bad references are not essential beginner tasks. Assistants remain available during independent work; independence means making and checking decisions. Labels become “tested” only for the exact demonstrations with actual evidence.

## Implementation priority

First fix the two logic gaps and update version/source framing. Then select and test one teaching provider, produce the demonstration/reference pack, and move a first clip earlier. Next add prompt/mode decision exercises, deeper reference QA and failure diagnosis. Expand sequence, audio and advanced editing practice only after those foundations work. Finish with the independent capstone and novice pilot.

Until that work is demonstrated, the honest promise is **“Create your first AI film with a guided Seedance workflow.”** A future **“Seedance 2.5 from foundations to advanced production”** course needs the staged practical evidence above; a “masterclass” label alone cannot supply it.

The existing learner curriculum was not changed during this critique. The chosen provider and access to its advanced controls remain implementation decisions; no paid generation was run.

## Review artifacts

- [Codex independent critique](../output/seedance-2.5-curriculum-review-20261026/codex-independent-review.txt)
- [Claude independent critique](../output/seedance-2.5-curriculum-review-20261026/claude-review.txt)
- [Claude execution result](../output/seedance-2.5-curriculum-review-20261026/claude-review.json)
- [Curriculum inventory](../output/seedance-2.5-curriculum-review-20261026/course-inventory.json)
- [English course snapshot](../output/seedance-2.5-curriculum-review-20261026/course-en.txt)
- [Vietnamese course snapshot](../output/seedance-2.5-curriculum-review-20261026/course-vi.txt)



## Implementation status — 27 October 2026

The approved expansion is implemented locally: 39 core steps, 14 optional labs, 34 bilingual practice prompt pairs, eight GPT Image assets, blank worksheets, reference/mode decisions, prompt anatomy, camera/continuity/repair practice, constrained variation and an evidence-based capstone. Claude Code proofreading corrections and the Codex/code-review fixes are recorded in [the course implementation notes](workshop-seedance-masterclass.md).

Still pending are actual Seedance demonstration videos and genuine video failure/repair pairs (provider credit unavailable), advanced-mode output verification and a real beginner pilot. Image creation and diagram repair were actually run with GPT Image; video or beginner mastery is not inferred from those images. No production deployment was performed.

## Obsidian references

- Obsidian unavailable; no notes consulted.
