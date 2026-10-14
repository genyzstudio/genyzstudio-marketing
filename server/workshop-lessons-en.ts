// Protected English edition. Never import this module into client components.
import { workshopLessons } from './workshop-lessons';
import type { WorkshopLesson } from '../content/workshop/types';

type Translation = {
  goal: string; terms: string; input: string;
  steps: [title: string, tool: string, instruction: string, save: string][];
  checks: string[]; fixes: [string, string][]; example: [string, string];
};
const translations: Record<WorkshopLesson['id'], Translation> = {
  story: {
    goal: 'Plan “Chiếc thuyền nhỏ” (The Little Paper Boat): a boat gets stuck, then continues its journey. Use one main prop and one setting.',
    terms: 'A creative brief defines the project. A script describes what viewers see and hear, rather than emotions alone.',
    input: 'Create a folder named Chiec-thuyen-nho. Make a landscape 16:9 film of about 20 seconds, with four shots and no dialogue.',
    steps: [
      ['Write a small creative brief', 'Gemini · New chat', 'Open the chat tool and sign in with your own account. Paste the prompt into the message box and send it. Read the result before continuing. Keep the sample brief for your first attempt.', '01-brief.txt'],
      ['Break the story into four shots', 'Gemini · Chat', 'Paste the next prompt. Check that the durations total 20 seconds. Remove any extra characters or changed props. These are intended durations in the edit, not limits of the video generation tool.', '02-kich-ban.txt'],
      ['Tell the story before generating images', 'Notes on your computer', 'Read the four shots to someone, or say them aloud. The listener should understand the obstacle and how the boat gets free. Revise the script before generating images; you do not need to spend video credits yet.', 'Reviewed 02-kich-ban.txt'],
    ],
    checks: ['The story has a clear change by the end.', 'There are exactly four shots, totaling about 20 seconds.', 'There are no complex actions or extra characters.'],
    fixes: [['The AI writes a long story.', 'Ask for exactly four rows, each with one visible action and no narrative prose.']],
    example: ['Learning the reveal from Titus', 'The Titus materials move from a reflection to a scale, then to a question about its origin. Study the pacing of that reveal. The paper-boat exercise is a new practice project, not the Titus script.'],
  },
  references: {
    goal: 'Create one boat reference and one setting reference to reuse in every shot.',
    terms: 'Continuity means keeping the object’s shape, color, size, and position consistent and believable across shots.',
    input: 'Your approved 01-brief.txt and 02-kich-ban.txt.',
    steps: [
      ['Lock the design description', 'Notes', 'Copy this description into your notes. Reuse the exact description in later image prompts. The boat is the character in this exercise. For a project with a person, similarly lock their face, hair, and clothing.', '03-tham-chieu.txt'],
      ['Generate the boat reference', 'Gemini · Image generation', 'Ask the chat tool to generate an image. Choose one with clear folds and a clearly visible flag, then download it. You do not need many variants. If your tool cannot generate images, choose one that can before continuing.', 'reference-thuyen.png (or retain the downloaded image extension)'],
      ['Generate the garden reference', 'Gemini · Image generation', 'Generate the setting separately, without the boat. Download it and keep it beside the boat reference. Use these same two images in later modules; change them only if you decide to rebuild the entire set of frames.', 'reference-suoi.png'],
    ],
    checks: ['The boat has yellow paper, exactly one red flag, and no text.', 'The setting leaves space for the action.', 'Both references have compatible style and lighting.'],
    fixes: [['The flag or boat changes between images.', 'Choose one primary reference. Attach it when generating a new scene and ask to preserve the design. Naming the boat alone is not enough.']],
    example: ['The Titus identity references', 'Orange stripes, a brass bell, and a blue cord are identity details in the studio materials. Yellow paper and a red flag serve the same purpose in this exercise.'],
  },
  planning: {
    goal: 'Know exactly what each shot must show before generating polished images.',
    terms: 'A wide shot shows the setting; a medium shot brings the subject closer; a close-up highlights a detail. Screen direction is the direction an object travels within the frame.',
    input: 'Your four-shot script, boat reference, and stream reference.',
    steps: [
      ['Plan the camera angles', 'Gemini · Chat', 'Paste your approved script before the prompt. Keep every camera on the same side of the stream so the boat continues to move right. You do not need to learn 3D staging for this first exercise.', '04-shot-list.txt'],
      ['Sketch a storyboard', 'Paper and pencil or Gemini · Image generation', 'Four hand-drawn boxes are enough. If using AI, attach both references. This board helps you read the story; do not feed the full four-panel board into the video tool.', '05-storyboard.png or a photo of your sketch'],
      ['Test the timing with still images', 'CapCut · New project', 'Create a project and import four separate rough images, cropping the board into individual images if necessary. Drag S01–S04 onto the timeline in order. Set each to five seconds and watch. If the leaf obstacle is unclear, fix the storyboard now.', 'CapCut project Chiec-thuyen-nho-nhap'],
    ],
    checks: ['The story makes sense without narration.', 'The boat points right in all four shots.', 'The storyboard and shot list use the same order.'],
    fixes: [['The next shot appears to reverse direction.', 'Keep the camera on the same bank. Correct the bow direction and composition in the storyboard first.']],
    example: ['The Titus shot board', 'The project’s shot board is a planning document. Its text and annotation panels are not elements that should appear in a video input frame.'],
  },
  frames: {
    goal: 'Prepare four separate, clean, consistent start frames for four clips.',
    terms: 'A start frame is the first image of a shot. Image-to-video generates video starting from an image.',
    input: 'Both reference images and your shot list. Create a frames/ folder.',
    steps: [
      ['Generate the S01 start frame', 'Gemini · Image generation', 'Use the tool’s image attachment button to attach the boat and stream references. Paste the prompt. Select landscape 16:9 if available. Review and download the image; do not use a screenshot containing the tool interface.', 'frames/S01.png'],
      ['Generate the other three start frames', 'Gemini · Image generation', 'Repeat separately for S02, S03, and S04. Attach both references and S01 each time to preserve the style. Replace the bracketed section with one composition from the list. Do not generate motion yet.', 'frames/S02.png, S03.png, S04.png'],
      ['Fix incorrect frames before generating clips', 'Gemini · Image editing', 'View all four images side by side. If just one flag is wrong, attach that image and the boat reference, then use the targeted edit prompt. Put selected final images in frames/ and move rejected versions to a drafts folder.', 'Deliberately replace the selected frame; keep drafts separately'],
    ],
    checks: ['Each file contains one clean frame without labels or interface elements.', 'The boat, flag, direction, and lighting stay consistent.', 'S02 begins before the boat touches the leaf.'],
    fixes: [['The image looks good but shows the end of the action.', 'Request the state immediately before the action. The start frame determines whether the AI has room to perform the movement.']],
    example: ['Planning panels versus clean frames', 'This Titus image is a labeled storyboard panel. The project archive does not verify it as the actual video-generation input. Export a separate clean frame for your exercise.'],
  },
  motion: {
    goal: 'Generate readable motion. Test S01 before making the remaining shots.',
    terms: 'Generate means making a trial output. A locked camera stays still; you do not need to rotate, zoom, and move it at once.',
    input: 'The four images in frames/. Check your Flow access and available credits before generating.',
    steps: [
      ['Set up the first generation', 'Google Flow · New project', 'Open Flow, sign in, and create a project. In the prompt box, click the model name and select Video → Frames. Drag frames/S01.png into “Add start frame”. Older interfaces may call this Frames to Video. Select landscape 16:9 and an available duration long enough to obtain five usable seconds. Record the displayed model, duration, and cost. Start with one variant. A prompt cannot reliably replace an unavailable tool setting.', '06-nhat-ky-tao.txt: S01, model, duration, displayed credits'],
      ['Generate S01', 'Google Flow · Video prompt', 'Paste the prompt, check the start frame and settings, then generate. Wait for completion. Download the actual clip and play it. A preview image is not a completed video file.', 'clips/S01-take01.mp4 and the prompt in your generation log'],
      ['Generate S02–S04 separately', 'Google Flow · Video → Frames', 'Replace the start frame before each generation. Use one of the three action instructions, not all three at once. Keep the camera locked. Limit your first session to two attempts per shot. If errors remain, fix the frame before spending more credits.', 'clips/S02-take01.mp4, S03-take01.mp4, S04-take01.mp4; log each attempt'],
    ],
    checks: ['Every MP4 has been downloaded and played.', 'Each clip has one main action and no unexpected cuts.', 'The prompt, start frame, model, and attempt count are recorded.'],
    fixes: [['The boat changes into another object.', 'Reduce the motion, lock the camera, and review the start frame. Change just one factor per attempt.'], ['You have no credits or Flow access.', 'Stop video generation. Use the four stills in CapCut to finish a timing draft, and mark motion practice as incomplete. Understand the cost before buying a plan.']],
    example: ['Watch an archived Titus take', 'This is a silent production excerpt. Watch how the character’s shape holds through motion. A direct connection between this clip and the planning panel has not been verified.'],
  },
  review: {
    goal: 'Choose footage that actually works, rather than choosing only a beautiful first frame.',
    terms: 'A retake is another attempt at the same shot. A timecode marks a position; for example, 00:01–00:06 is a five-second section.',
    input: 'Your downloaded clips, script, and references.',
    steps: [
      ['Watch three times with a purpose', 'Video player on your computer', 'First, check whether the action matches the script. Second, watch the hull, flag, and leaf. Third, compare direction and lighting across adjacent shots. Record the start and end of each usable section. You do not need AI to make the decision for you.', '07-review.txt: shot | take | usable section | issue | decision'],
      ['Turn an observed issue into a correction', 'Gemini · Chat', 'Replace the bracketed text with an issue you actually saw, then send the prompt. AI helps write a correction. Without the clip, it cannot verify whether the result passes review.', 'One correction to try in 07-review.txt'],
      ['Choose a take or regenerate', 'Google Flow and your project folder', 'If you have enough usable footage, choose it and record its in/out points. Otherwise, return to the start frame or motion prompt and change one thing. Keep the old take, give the new take a new number, and review the downloaded result again.', 'Selected takes and timecodes in 07-review.txt'],
    ],
    checks: ['Every selected section has clear in/out timecodes.', 'The boat and flag remain consistent throughout the selected footage.', 'Each retake addresses one observed issue.'],
    fixes: [['No take has five usable seconds.', 'Use a shorter clean section and shorten the edit, or fix the start frame and retry. Do not stretch faulty footage just to reach 20 seconds.']],
    example: ['Your own review log', 'GenYZ has not published comparisons of rejected and selected takes for the films on this site. Use your own log as evidence; do not infer review status from a filename.'],
  },
  edit: {
    goal: 'Assemble the selected footage into a clear story with a natural rhythm.',
    terms: 'The timeline arranges clips in time. A cut joins shots directly. A rough cut is an early edit used to check the story.',
    input: 'Your selected clips and their usable timecodes from 07-review.txt.',
    steps: [
      ['Build the picture edit', 'CapCut Desktop', 'Create Chiec-thuyen-nho-final. Import the four clips and drag S01–S04 onto the timeline in order. Set 16:9. Trim clip edges to the approved sections, or split at the timecodes and remove the excess. Save the project.', 'CapCut project Chiec-thuyen-nho-final'],
      ['Check the cuts and pacing', 'CapCut · Timeline', 'Temporarily mute each clip’s original audio and watch the entire edit. Use straight cuts without transitions. If positions jump, choose a better cut point or return to review. The prompt helps plan; you still make the cuts manually in CapCut.', '08-edit-plan.txt and the edited timeline'],
      ['Export a picture preview', 'CapCut · Export', 'Export a preview and open it outside CapCut. Check order, black borders, and pacing. The editable project and exported MP4 are separate things; keep both.', 'exports/ban-dung-hinh.mp4'],
    ],
    checks: ['The four shots are in order, with no black gaps.', 'The story makes sense with sound muted.', 'Both the editable project and MP4 are saved.'],
    fixes: [['The flag is cropped or the clip has black borders.', 'Check the project aspect ratio and how each clip fits the frame. Avoid excessive zooming to hide an aspect-ratio mismatch.']],
    example: ['Pacing in a finished film', 'Watch films in the GenYZ library to see how shots connect. The site does not publish complete editing timelines; this CapCut guide is a new practice exercise.'],
  },
  sound: {
    goal: 'Add enough sound to convey the stream and the moment the boat gets free.',
    terms: 'Ambience is the background sound of a space. A sound effect accompanies an action. Mixing balances the sound layers.',
    input: 'Your picture edit, headphones, and audio you have permission to use. Record water yourself or use an appropriately licensed library.',
    steps: [
      ['Plan the sound', 'Gemini · Chat', 'Supply the actual edit duration. Use the prompt to list sounds to find or record, not to ask AI to pretend it has created files. Buying a music generation tool is optional.', '09-sound-plan.txt'],
      ['Place audio on the timeline', 'CapCut · Audio', 'Import your recorded or licensed water sound. Drag it below the video and trim it to the film. Add a ripple sound at S03. If using music, listen separately, then lower it so the water remains audible. Mute generated clip audio if it contains unrelated voices or sounds.', 'Timeline with water, effects, and optional music'],
      ['Add optional narration', 'Your own recording or text-to-speech', 'The sample works without narration. If you add it, record yourself or use an available licensed voice without impersonating someone. Paste the prompt into chat, then record the line you choose. Check pronunciation and lower music beneath the voice.', 'Optional voice.wav; record audio sources and permissions in 09-sound-plan.txt'],
      ['Listen on two devices', 'Headphones and phone speaker', 'Listen from start to finish at moderate volume. Check distortion, music masking speech, and abrupt starts or stops. Add gentle fades where needed, then save the project.', 'Project with balanced audio'],
    ],
    checks: ['There are no unintended voices or sounds.', 'Every word is clear if narration is used.', 'The source and usage terms of each sound are recorded.'],
    fixes: [['Separated speech still has background noise.', 'Voice separation can leave artifacts. Recording a short line again is often simpler for a first project than repairing a noisy take.']],
    example: ['Listen to the isolated Titus voice', 'This is an intermediate voice-isolation output, not a stem from the final mix. Listen for remaining noise.'],
  },
  delivery: {
    goal: 'Produce a reviewed film file with the information needed to share it when ready.',
    terms: 'Export creates the film file. A master is the best saved version of this finished edit. Publishing uploads it to a platform.',
    input: 'Your approved picture and sound edit, plus asset-source records.',
    steps: [
      ['Export the film', 'CapCut · Export', 'Export MP4 in landscape 16:9. Use 1080p if the sources support it. Keep the frame rate consistent with the project, such as 24 or 30 fps. Do not upscale just for a larger number. Name the file clearly and wait for export to finish.', 'exports/Chiec-thuyen-nho-v01.mp4'],
      ['Review the actual exported file', 'Video player outside CapCut', 'Open the MP4 from exports/ and watch and listen all the way through. Check black frames, missing audio, title spelling, disappearing flags, and unwanted watermarks. Also watch on a phone. If you revise, export v02 and review v02.', 'Personally completed 10-final-check.txt'],
      ['Prepare the introduction', 'Gemini · Chat', 'Paste the prompt, choose a title, and edit it to match your film. Before publishing, check the platform’s current AI-disclosure requirements. Confirm privacy settings and asset permissions before posting.', '11-tieu-de-mo-ta.txt'],
      ['Keep everything for your next film', 'Project folder', 'Keep the script, references, frames, prompts, selected clips, CapCut project, sound sources, and final MP4. Write three lessons learned and one improvement to try. Complete the checklists for all nine modules to finish the workshop.', '12-rut-kinh-nghiem.txt and the complete project folder'],
    ],
    checks: ['The final exported file has been watched in full with sound.', 'Asset sources and tools are recorded.', 'The editable project is saved for future changes.'],
    fixes: [['The timeline looks correct but the export is faulty.', 'Check the actual export, available storage, and export in/out points. Fix the issue and export a new version. Running Export alone does not prove completion.']],
    example: ['A longer film starts with small decisions', 'Titus, Great Gulp, and Clever Little Rat are studio references. This first workshop focuses on practicing a short sequence; it does not promise equivalent production quality.'],
  },
};
export const workshopLessonsEn: WorkshopLesson[] = workshopLessons.map(base => {
  const t = translations[base.id];
  if (t.steps.length !== base.steps.length) throw new Error(`Translation step mismatch: ${base.id}`);
  return { id: base.id, goal: t.goal, terms: t.terms, input: t.input,
    steps: t.steps.map(([title, tool, instruction, save], i) => ({ title, tool, instruction, save,
      ...(base.steps[i].prompt ? { prompt: base.steps[i].prompt!.replaceAll('Vietnamese', 'English').replace('correct English accents in titles', 'correct spelling in titles') } : {}),
    })), checks: t.checks, troubleshooting: t.fixes.map(([problem, fix]) => ({ problem, fix })),
    example: { ...base.example, title: t.example[0], text: t.example[1] },
  };
});
