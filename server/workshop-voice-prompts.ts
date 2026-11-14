/**
 * Prompts for the voice consistency workshop. Adapted from Joey's free Voicesheet v1 skill
 * (https://www.youtube.com/watch?v=r2K2ZvJio7I) and applied to Linh from Guardians of the Red River.
 * None of these prompts has been run yet; the curriculum labels them as untested.
 */

export const MIN_VOICE_SECONDS = 5;
export const MAX_VOICE_SECONDS = 15;
const MAX_LEFT_SHOTS = 7;
const INSERT_SECONDS = 2;

export interface VoiceReferenceTiming { seconds: number; leftShots: number; firstShotSeconds: number }

/** Left-panel montage timing from the voice video's whole-second length (Voicesheet stage 7). */
export function voiceReferenceTiming(seconds: number): VoiceReferenceTiming {
  if (!Number.isInteger(seconds) || seconds < MIN_VOICE_SECONDS || seconds > MAX_VOICE_SECONDS) {
    throw new RangeError(`Voice video length must be a whole number of seconds from ${MIN_VOICE_SECONDS} to ${MAX_VOICE_SECONDS}; received ${seconds}.`);
  }
  const leftShots = Math.min(MAX_LEFT_SHOTS, Math.floor(seconds / INSERT_SECONDS));
  return { seconds, leftShots, firstShotSeconds: seconds - INSERT_SECONDS * (leftShots - 1) };
}

/** Workshop-authored Vietnamese draft. Not a published standard: read it aloud before use. */
export const VIETNAMESE_PANGRAM = 'Bé Mai dặn ông khách già phải nhớ trả lại chiếc đũa bạc. Ơ, xem này, sao chú cứ muốn chạy vòng quanh thế? Hả?! Con mèo nghịch ngợm vừa ăn trộm bát phở của người ta rồi! Thôi, nó nấp ở đằng kia, gần ghế kìa.';

/** Stock pangrams quoted in Voicesheet v1. */
export const ENGLISH_PANGRAM = 'The beige hue on the waters of the loch impressed all, including the French queen, before she heard that symphony again, just as young Arthur wanted.';
export const KOREAN_PANGRAM = '키스의 고유 조건은 입술끼리 만나야 하고 특별한 기술은 필요치 않다. 얘, 도대체 왜 뛰어? 뭐?! 예쁜 쥐가 내 짬뽕 훔쳐 갔대! 봐, 저기 있네.';

/** Sound → example word, so learners can check coverage themselves. */
export const VIETNAMESE_COVERAGE: readonly (readonly [string, string])[] = [
  ['b · m · ph · v', 'Bé, Mai, phải, vòng'], ['d · gi · r', 'dặn, già, rồi'], ['đ · t · th · tr', 'đũa, ta, thế, trả'],
  ['c · k · q · kh', 'cứ, kìa, quanh, khách'], ['g · gh · ng · ngh', 'gần, ghế, ngợm, nghịch'], ['ch · nh · n · l · s · x · h', 'chú, nhớ, nó, lại, sao, xem, Hả'],
  ['a ă â', 'ta, ăn, nấp'], ['e ê', 'mèo, thế'], ['o ô ơ', 'con, ông, phở'], ['u ư i/y', 'chú, cứ, kìa, chạy'],
  ['iê/ia · uô/ua · ươ/ưa', 'chiếc/kìa · muốn/đũa · người/vừa'], ['-c -ch -p -t', 'bạc, khách, nấp, bát'], ['-m -n -ng -nh', 'trộm, gần, vòng, quanh'],
  ['ngang · huyền · sắc', 'Mai, già, nhớ'], ['hỏi · ngã · nặng', 'phải, đũa, dặn'],
];

/** One English ElevenLabs tag per clause; the Vietnamese text is unchanged. Linh: calm, determined, dry. */
export const LINH_TAGGED_PANGRAM = '[calm, measured] Bé Mai dặn ông khách già... [dry, faintly amused] phải nhớ trả lại chiếc đũa bạc. [short, dry laugh] Ơ, xem này, [sharp, clipped] sao chú cứ muốn chạy vòng quanh thế? [gasps] Hả?! [raised, cold disbelief] Con mèo nghịch ngợm vừa ăn trộm bát phở của người ta rồi! [sighs] Thôi, [whispers] nó nấp ở đằng kia, gần ghế kìa.';

export const LINH_VOICE_DESIGN = 'A Vietnamese woman in her late twenties with a calm, clear, low mid-register voice. Measured pace and steady volume that never tips into shouting, precise Northern Vietnamese diction with crisp tones and clean final consonants, short exact sentences and deliberate pauses before key words. Dry and composed, with a faint private amusement underneath and quiet resolve. Recorded close in a quiet room.';

export const VOICESHEET_ASK_VI = 'Dùng skill voicesheet-v1. Dựng voicesheet cho nhân vật Linh. Cô nói tiếng Việt (giọng Hà Nội). Tính cách: điềm tĩnh, quả quyết, hơi khô. Bắt đầu từ Stage 1: kiểm tra pangram tiếng Việt dưới đây, đưa bảng phủ âm và chỉ ra âm còn thiếu. Chưa viết prompt video.\n\n' + VIETNAMESE_PANGRAM;
export const VOICESHEET_ASK_EN = 'Use the voicesheet-v1 skill. Build a voicesheet for my character Linh. She speaks Vietnamese (Hanoi accent). Personality: calm, determined, a little dry. Start at Stage 1: check the Vietnamese pangram below, give me a coverage table and point out any missing sounds. Do not write the video prompt yet.\n\n' + VIETNAMESE_PANGRAM;

export const CASTKIT_SHEET_PROMPT = 'Use the attached Linh image as the only identity reference. Make a 3-panel character sheet on one continuous flat neutral 18% gray field, shadowless, with no cast shadow. Panel 1: headless full-body front view from the neck down to the boot soles. Panel 2: full-body rear view, head to boot soles. Panel 3: tight face close-up, dead-on, from crown to collarbone. Every panel is shot straight on, never a three-quarter turn. Keep her low black ponytail and short lock at the left temple, indigo áo dài-inspired technical armor with two short split panels over black trousers, brushed-bronze trim with original geometric patterns, and the single turquoise energy bracelet on her anatomical right wrist. Even soft frontal light, faithful skin, no makeup change, no extra props. No text, labels, logos or watermark.';

const LINH_TIMING = voiceReferenceTiming(12);

/** Voicesheet two-panel template filled for Linh with a 12-second voice video. */
export const LINH_REFERENCE_PROMPT = [
  `Two side-by-side panels, total ${LINH_TIMING.seconds} seconds. The LEFT panel is a montage of ${LINH_TIMING.leftShots} shots with hard cuts inside the left panel only — shot 1 runs ${LINH_TIMING.firstShotSeconds} seconds, shots 2 through ${LINH_TIMING.leftShots} run 2 seconds each. The RIGHT panel is 1 continuous shot for the full ${LINH_TIMING.seconds} seconds, never cutting. No transitions, no dissolves. All footage real-time, no slow motion, no speed ramping anywhere.`,
  'Style: 8K photorealism, high dynamic range, large-format film look. NOT a 3D render, NOT a game engine, NOT a game-cutscene aesthetic, NOT a cartoon.',
  'Texture: matte non-reflective surfaces, indigo technical fabric, brushed bronze, black cotton trousers, matte leather boots, no digital gloss, no plastic sheen.',
  'Skin: pore-level realism, fine vellus hair, natural asymmetry, no smoothing, no retouching.',
  'Technical: real-time 24fps, true 180-degree shutter, genuine photographic motion blur. No flicker, no warping, no morphing, no frame interpolation.',
  'NO ON-SCREEN TEXT — CRITICAL: no captions, no subtitles, no burned-in dialogue, no karaoke text, no titles, no watermarks, no logos, no timecode, no UI overlays, no Vietnamese or Latin letters anywhere in frame from first frame to last.',
  `THE SPEECH IS THE PRIMARY SUBJECT — CRITICAL: in the RIGHT panel the woman speaks out loud to the attached voice recording in @Video 1, in Vietnamese, every syllable formed on her lips in time with it, for its full length. She is the speaker of this recording, never mouthing along. The words she forms, in order: "${VIETNAMESE_PANGRAM}" Every closed consonant lands as a complete visible lip seal held a beat before releasing — both lips press fully together on Bé, Mai, bạc, xem, muốn, mèo, ngợm, trộm, bát and nấp. Open vowels are held open, the jaw working with the phrasing, never mumbling. Her mouth is the focus of the right panel.`,
  'THE HEAD TURN AND THE MOUTH — CRITICAL: in the right panel she turns her head slowly and minimally while speaking, so the camera reads her expressions and bone structure from several angles. She starts a little left of front, drifts slowly to centre on the opening line, makes one sharp clipped turn to her right on "Hả?!", holds there through the raised line, then settles back to front with a slight chin drop for the whispered last line. Every turn stays about fifteen to twenty degrees either side of front. Her mouth stays unobstructed in every frame — no hand, no hair, no collar rising over it.',
  'THE TWO PANELS — CRITICAL: two equal side-by-side vertical panels on one continuous flat neutral 18% gray field, separated by a thin straight seam of the same gray. Every cut happens inside the LEFT panel only; the RIGHT panel runs unbroken. Only the right panel speaks — in the left panel her mouth stays closed. The layout never shifts, resizes or merges.',
  'ASSETS: @Image 1 = identity and wardrobe reference only — its layout and framing are never reproduced. A Vietnamese woman in her late twenties, oval face, brown eyes, natural brows, tidy low black ponytail with a short lock at her left temple; indigo áo dài-inspired technical armor with two short split panels, brushed-bronze trim with original geometric patterns, black trousers, dark matte boots, one turquoise energy bracelet on her right wrist only, unlit. THIS SCENE: standing alone on the gray field. Her face identical in both panels. 100% match to the reference.',
  'GEOMETRY MAP: LEFT panel — each montage shot centred on her body against the bare gray field. RIGHT panel — tight close-up from just above her crown to just below the armor collar, body angled slightly toward camera-left while the head turns on the neck. Nobody else is in either panel.',
  'FIRST FRAME: already in motion in both panels — the left panel already mid-turn, the right panel already drawing a slow, even breath before the first word.',
  'LENS LOCK LEFT, shots 1–3 = 84° (24mm) full body head to boot soles with clear gray margin. LENS LOCK LEFT, shots 4–6 = 12° (180mm) tight detail inserts. LENS LOCK RIGHT = 18° (120mm), long lens, gray thrown soft, only her face sharp.',
  'CAMERA: locked-off for every shot in both panels, real tripod weight, no movement.',
  'LIGHT: one broad, very soft diffused key from the front and slightly above, warm-neutral, a gentle triangle of light on the shadow cheek that travels across the face as the head turns. Completely shadowless background, no cast shadow at any point. Soft highlights travelling along the bronze trim.',
  'ACTION: LEFT panel, shot 1, full body: a slow, economical turn to her own left, front toward profile, right hand resting at her side. LEFT panel, shot 2, full body: her back to the lens, weight shifting hip to hip — ponytail, back panels, boot heels. LEFT panel, shot 3, full body: right profile completing the turn back to front, settling into a grounded, square stance, a brief level glance toward camera-right. LEFT panel, shot 4, insert: the turquoise bracelet on her right wrist and hand. LEFT panel, shot 5, insert: bronze trim and the split áo dài panels moving at the hip. LEFT panel, shot 6, insert: boots, one heel lifting as she shifts. RIGHT panel, throughout: she speaks with the recording while the head turns as described, eyes moving past the lens toward camera-left and back, never into the lens. Shoulders almost still.',
  'ACTING: RIGHT panel — calm, determined presence matched to each line in order: level brows and steady eyes on the measured opening; one corner of the mouth lifting on the dry, amused line; a short exhale through the nose on the dry laugh; brows drawing together on the sharp question; eyes widening and a quick intake of breath on the gasp; jaw set and chin lifting on the raised line, still controlled; shoulders dropping on the sigh; lids lowering and lips close together on the whisper. Every expression lives in real facial muscle. LEFT panel — upright, economical carriage, neutral face with natural blinking.',
  'AUDIO: the attached clip @Video 1 is the sole and complete audio source. Generate no additional audio — no room tone, no foley, no ambience, no added dialogue, no music.',
  'LOCKS: two panels for the full take — left a 6-shot outfit montage from three full-body angles into 3 detail inserts, right one unbroken close-up speaking with the recording while the head turns about fifteen to twenty degrees either side of front. One woman, identical to @Image 1 throughout — ponytail, temple lock, indigo armor, bronze trim and right-wrist bracelet unchanged. Only the right panel speaks. Shadowless background, identical soft light in both panels. Skin true cinematic matte, never plastic. No CGI, no AI smoothness, no frozen posing.',
].join('\n');

export const SCENE_ASK_VI = 'Dùng skill shotcaller-v2, Seedance 2.5, 10 giây. Element "Linh-voice" là video character reference sheet: khóa ngoại hình, giọng nói và cách biểu cảm của Linh theo video này. Cảnh: Linh đứng trên cầu chợ ven Sông Hồng ban đêm, nói với người bán hàng: "Bác cứ đóng cửa sớm đi, tối nay cháu trực ở đây." Giọng nhỏ, quả quyết.';
export const SCENE_ASK_EN = 'Use the shotcaller-v2 skill, Seedance 2.5, 10 seconds. The Element "Linh-voice" is a video character reference sheet: lock Linh\'s look, voice and emotional performance to it. Scene: at night on the Red River market bridge, Linh tells a stall keeper, in Vietnamese: "Bác cứ đóng cửa sớm đi, tối nay cháu trực ở đây." Quiet and determined.';

export const PROP_ASK_VI = 'Dùng skill voicesheet-v1, Stage 8. Tạo prop scale reference cho vòng năng lượng ngọc lam của Linh: đường kính trong 7 cm, rộng 3 cm, đeo ở cổ tay phải. Ảnh đạo cụ đính kèm. Không thoại, không âm thanh; chỉ cầm, xoay và giơ ra trước ống kính.';
export const PROP_ASK_EN = 'Use the voicesheet-v1 skill, Stage 8. Make a prop scale reference for Linh\'s turquoise energy bracelet: 7 cm inner diameter, 3 cm wide, worn on her right wrist. Prop image attached. No dialogue, no audio; only held, turned and presented to the lens.';
