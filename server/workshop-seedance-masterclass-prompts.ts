/** Original GenYZ teaching prompts; no generated results are claimed. */
import { seedanceStory } from './workshop-seedance-story';
export type PromptPair = readonly [vi: string, en: string];
const viIdentity = 'Lan là phụ nữ Việt Nam hư cấu khoảng 28 tuổi, mặt trái xoan, mắt nâu, tóc đen tết một bím, áo khoác vàng mù tạt không logo, quần xanh than, giày nâu và ba lô xanh rêu.';
const enIdentity = 'Lan is a fictional Vietnamese woman aged about 28, with an oval face, brown eyes, black hair in one braid, a logo-free mustard jacket, navy trousers, brown shoes and a moss-green backpack.';
export const seedanceCoursePrompts = {
  story: [
    `${seedanceStory.brief[0]}\n${viIdentity}`,
    `${seedanceStory.brief[1]}\n${enIdentity}`,
  ],
  portrait: [
    `Tạo một chân dung gốc chân thực. ${viIdentity} Nhìn thẳng, khung từ ngực lên, vẻ mặt thư giãn, thấy rõ mặt và chân tóc. Nền xám trung tính, ánh sáng mềm đều, da tự nhiên. Không chữ, không logo, không chia ô. Đây là ảnh nhận diện, chưa phải cảnh phim.`,
    `Generate one original photorealistic identity portrait. ${enIdentity} Front-facing, chest-up, relaxed expression, clearly visible face and hairline. Neutral gray background, soft even light, natural skin. No text, logos or panels. This is an identity reference, not a film scene.`,
  ],
  turnaround: [
    `Dùng chân dung Lan đính kèm làm chuẩn. ${viIdentity} Tạo bảng toàn thân bốn ô: chính diện, nghiêng, phía sau, góc ba phần tư. Cùng một người, trang phục, bím tóc, ba lô và tỷ lệ cơ thể trong mọi ô. Đứng tự nhiên, tay buông; thấy cả đầu và giày. Nền xám, ánh sáng mềm đồng nhất. Không chữ, không đạo cụ, không thêm người.`,
    `Use the attached Lan portrait as the identity reference. ${enIdentity} Generate four full-body panels: front, side, back and three-quarter views. Same person, outfit, braid, backpack and proportions in every panel. Neutral standing pose, relaxed arms, head and shoes fully visible. Gray background and consistent soft light. No text, props or extra people.`,
  ],
  details: [
    'Dùng chân dung và bảng toàn thân Lan đã duyệt, đính kèm. Tạo bảng ba ảnh cận: mặt nhìn thẳng, mặt góc ba phần tư, bím tóc và cổ áo. Giữ mặt, tuổi, màu mắt, tóc và chất liệu áo; không đổi tóc hoặc làm mịn da. Ánh sáng trung tính, không chữ, không tự thêm vết sẹo hay phụ kiện.',
    'Use the attached approved Lan portrait and turnaround. Create three detail panels: front face, three-quarter face, and braid with jacket collar. Preserve face, age, eye color, hair and jacket fabric; do not restyle hair or smooth skin. Neutral light, no text, invented scars or accessories.',
  ],
  imageRepair: [
    'Ảnh 1 cần sửa; ảnh 2 là chuẩn đã duyệt. Chỉ sửa tóc nhân vật trong ảnh 1 thành một bím đen giống ảnh 2. Giữ mặt, áo, ba lô, tư thế, nền, ánh sáng và bố cục của ảnh 1. Không thêm chi tiết.',
    'Image 1 needs repair; image 2 is the approved reference. Change only the hair in image 1 to the single black braid in image 2. Preserve image 1’s face, jacket, backpack, pose, background, light and composition. Add nothing else.',
  ],
  location: [
    'Tạo một ảnh bối cảnh gốc chân thực 16:9: chòi gỗ mở ra thung lũng ruộng bậc thang, ánh sáng chiều mềm. Máy quay ở lối vào nhìn ra thung lũng. Ghế gỗ chạy dọc tường bên phải chòi; cây lớn ở ngoài bên trái lối vào; đường đất dẫn xuống thung lũng. Chừa chỗ cho một người đứng cạnh ghế. Không người, đèn, chữ hoặc logo. Hình học rõ, không sương che địa hình.',
    'Generate one original photorealistic 16:9 location: an open wooden shelter above a terraced valley in soft afternoon light. Camera at the entrance facing the valley. A bench runs along the right wall; a large tree stands outside left of the entrance; a dirt path leads down into the valley. Leave room for a person beside the bench. No people, lanterns, text or logos. Clear geometry, without fog hiding the terrain.',
  ],
  locationAngles: [
    'Dùng ảnh bối cảnh đã duyệt. Tạo ba góc của CÙNG chòi: từ lối vào; từ cạnh ghế nhìn chéo ra thung lũng; từ phía thung lũng nhìn về lối vào. Giữ vị trí ghế so với tường, cây so với lối vào, đường đi, vật liệu và giờ trong ngày. Không tạo địa điểm mới; không cố giữ trái/phải trên màn hình khi camera đổi hướng. Không người, đèn hoặc chữ.',
    'Use the approved location. Create three views of the SAME shelter: from the entrance; beside the bench looking diagonally into the valley; from the valley side toward the entrance. Preserve bench-to-wall and tree-to-entrance relationships, path, materials and time of day. Do not invent a new place or force landmarks to stay on the same screen side when the camera turns. No people, lanterns or text.',
  ],
  prop: [
    'Tạo bảng một chiếc đèn vuông nhỏ bằng đồng cũ, tay cầm vòng tròn, bốn mặt kính trong, không nhãn. Ba ô cùng vật: chính diện tắt, nghiêng tắt, chính diện sáng vàng dịu. Giữ hình dạng và tỷ lệ. Nền xám, không tay người, chữ hoặc vật thứ hai.',
    'Create a sheet of one small square aged-brass lantern with a round loop handle, four clear glass sides and no branding. Three panels of the same object: unlit front, unlit side, and softly glowing amber front. Preserve shape and proportions. Gray background, no hands, text or second object.',
  ],
  startFrame: [
    'Ảnh 1 xác định mặt Lan; ảnh 2 trang phục toàn thân; ảnh 3 chòi; ảnh 4 đèn tắt. Tạo MỘT khung phim 16:9, không chia ô. Lan đứng gần lối vào, bên trái ghế trong bố cục này, sẵn sàng đi tới ghế. Đúng một đèn tắt trên mặt ghế. Giữ chòi, đường, cây, mặt, bím tóc và trang phục. Ánh sáng chiều dịu, camera ngang mắt tại lối vào, thấy toàn thân và thung lũng. Không chữ hoặc người khác.',
    'Image 1 defines Lan’s face; image 2 her full-body outfit; image 3 the shelter; image 4 the unlit lantern. Create ONE 16:9 film frame, not panels. Lan stands near the entrance, left of the bench in this composition, ready to approach it. Exactly one unlit lantern sits on the bench. Preserve shelter, path, tree, face, braid and outfit. Soft afternoon light, eye-level entrance camera, full body and valley visible. No text or other people.',
  ],
  guide: [
    `Bạn là trợ lý viết prompt cho “Ai đang gọi mình?”. Bạn viết chữ; công cụ ảnh tạo ảnh; Seedance tạo video; CapCut dựng phim.
Câu chuyện: ${seedanceStory.synopsis[0]}
Quy tắc phần hình: một Lan, một chòi gỗ, một đèn đồng; 16:9, chiều dịu. Shot 1: Lan bước hai bước tới ghế, dừng, đèn tắt. Shot 2: đèn tự sáng, Lan nhìn xuống. Shot 3: đèn vẫn sáng, Lan nhìn ra con đường trống rồi đứng yên, miệng khép; không đáp và không đi theo. Tạo clip không lời nói hay nhạc. Tiếng chân thừa, hai lần gọi và màn đen được thêm trong CapCut. Không đưa yêu cầu âm thanh hậu kỳ vào prompt tạo hình, không tạo thêm người gọi.
Tôi đính kèm ảnh và ghi vai trò từng file. Trước khi viết, lập bảng file → vai trò → ô tham chiếu. Hỏi nếu thiếu ảnh hoặc vai trò chưa rõ. Không giả định đã đọc file trên máy tôi khi tôi chưa đính kèm.
Mỗi shot trả về: ảnh cần tải; prompt ngắn gồm camera, nhân vật, hành động, bối cảnh, tính liên tục; trạng thái đầu/cuối; thiết lập chọn riêng trong giao diện. Chỉ dùng thời lượng và đầu vào công cụ của tôi hỗ trợ. Không hứa prompt bảo đảm mặt, thời gian hoặc FPS.
Khi sửa lỗi, đổi một vấn đề, giữ phần đã đạt. Không tự thêm góc cắt, nhân vật, đạo cụ, nhạc hoặc động tác phức tạp.`,
    `You write prompts for “Who Is Calling Me?”. You write text; an image tool creates images; Seedance creates video; CapCut edits it.
Story: ${seedanceStory.synopsis[1]}
Picture rules: one Lan, one wooden shelter, one brass lantern; 16:9, soft afternoon light. Shot 1: two steps toward bench, stop, lantern unlit. Shot 2: lantern lights itself, Lan looks down. Shot 3: lantern stays lit, Lan looks toward the empty valley path and holds still, mouth closed; she neither answers nor follows. Generate clips without speech or music. Add the extra footsteps, both calls and the black ending in CapCut. Keep post-production sound instructions out of picture-generation prompts; do not generate a caller.
I attach images and label each file’s role. First make a file → role → reference-slot table. Ask if images are missing or roles unclear. Never assume you read local files I have not attached.
For each shot return: uploads needed; short prompt covering camera, subject, action, setting, continuity; starting/ending state; settings to select separately in the interface. Use only durations and inputs my tool supports. Do not promise text guarantees identity, timing or FPS.
For revisions change one issue, preserving what works. Do not add cuts, characters, props, music or complex actions.`,
  ],
  promptRequest: [
    'Theo hướng dẫn dự án trên, viết prompt shot 1. Tôi đính kèm shot-01-start.png đã ghép Lan, chòi, đèn tắt; đây là ảnh đầu, không phải bảng nhiều ô. Tôi chọn 5 giây nếu giao diện hỗ trợ. Camera cố định ngang mắt. Lan đi hai bước nhỏ tới ghế rồi dừng, không chạm đèn. Đèn giữ vị trí và tắt. Không thoại, nhạc hoặc cắt cảnh. Trả prompt ngắn, thiết lập chọn riêng và ba điều cần kiểm tra. Không thêm sự kiện.',
    'Using the project guide above, write shot 1. I attached shot-01-start.png with Lan, shelter and unlit lantern; this is a starting frame, not a panel sheet. I will select five seconds if supported. Fixed eye-level camera. Lan takes two small steps toward the bench and stops without touching the lantern. It stays in place and unlit. No dialogue, music or cuts. Return a short prompt, separate settings and three checks. Add no events.',
  ],
  shot1: [
    'Dùng ảnh đính kèm làm khung đầu. Camera cố định ngang mắt ở lối vào chòi. Lan đi hai bước nhỏ tới ghế rồi dừng. Giữ mặt, một bím tóc đen, áo vàng mù tạt và ba lô xanh rêu. Đèn đồng nằm yên trên ghế, chưa sáng; Lan không chạm đèn. Giữ ghế, cây, đường và ánh sáng chiều dịu. Một cảnh liên tục, chuyển động tự nhiên, không quay chậm, chữ, thoại hoặc nhạc.',
    'Use the attached image as the starting frame. Fixed eye-level camera at the shelter entrance. Lan takes two small steps toward the bench and stops. Preserve face, single black braid, mustard jacket and moss-green backpack. The brass lantern stays on the bench, unlit; Lan does not touch it. Preserve bench, tree, path and soft afternoon light. One continuous shot, natural motion, no slow motion, text, dialogue or music.',
  ],
  timelineRequest: [
    'Viết lại shot 1 thành ba nhịp trong MỘT cảnh liên tục dự kiến 5 giây: 0–1 giữ khung; 1–4 Lan đi hai bước nhỏ; 4–5 dừng. Giữ mọi ràng buộc về nhân vật, chòi và đèn. Cho thêm bản “nhịp 1/2/3” không mốc giây. Nêu rõ mốc thời gian chỉ định hướng. Không biến ba nhịp thành ba góc cắt.',
    'Rewrite shot 1 as three beats in ONE intended five-second continuous shot: 0–1 hold; 1–4 Lan takes two small steps; 4–5 stop. Preserve all character, shelter and lantern constraints. Also give a “beat 1/2/3” version without timestamps. Explain that timing is only guidance. Do not turn beats into cuts.',
  ],
  revise: [
    'Prompt hiện tại là shot 1 ở trên. Lỗi: ba lô xanh rêu chuyển đỏ ở giây 3. Mặt, chuyển động và bố cục đã đạt. Chỉ sửa yêu cầu giữ ba lô xanh rêu, đề xuất ảnh chuẩn cần đính kèm lại. Trả prompt đầy đủ đã sửa, một câu giải thích thay đổi và checklist. Không hứa chắc lần sau đúng.',
    'The current prompt is shot 1 above. Defect: the moss-green backpack turns red at second 3. Face, motion and composition work. Revise only backpack consistency and suggest which reference to reattach. Return the full revised prompt, one sentence explaining the change and a checklist. Do not promise the next result will be correct.',
  ],
  shot2: [
    'Dùng khung cuối sạch của shot 1 làm khung đầu. Lan giữ vị trí dừng thực tế trong khung cuối shot 1, không tự dịch tới sát ghế. Giữ camera và mọi vị trí. Đèn đồng trên ghế từ từ sáng vàng dịu; Lan nhìn xuống, không chạm đèn. Đèn không di chuyển hay đổi hình. Giữ mặt, tóc, áo, ba lô, chòi và ánh sáng môi trường. Một cảnh liên tục, không chữ, thoại hoặc nhạc.',
    'Use the clean ending frame of shot 1 as the starting frame. Lan stays at the actual stopping position in shot 1’s ending frame; do not reposition her beside the bench. Preserve camera and all positions. The brass lantern gradually glows soft amber; Lan looks down without touching it. The lantern does not move or change shape. Preserve face, hair, outfit, backpack, shelter and ambient light. One continuous shot, no text, dialogue or music.',
  ],
  shot3: [
    'Dùng khung cuối sạch của shot 2 làm khung đầu. Lan giữ vị trí cuối shot 2, đèn đồng vẫn sáng vàng dịu. Lan từ từ nhìn từ đèn ra con đường trống xuống thung lũng rồi đứng yên, miệng khép. Cô hơi căng người, không mỉm cười, không vẫy tay hay bước đi. Giữ camera, mặt, trang phục, ba lô, đèn và chòi. Không thêm người hoặc bóng người trên đường. Một cảnh liên tục, ánh sáng chiều dịu, không chữ, thoại hoặc nhạc.',
    'Use the clean ending frame of shot 2 as the starting frame. Lan stays at shot 2’s ending position, lantern still glowing soft amber. She slowly shifts her gaze from the lantern to the empty valley path, then holds still with her mouth closed. Her posture is slightly tense; no smile, wave or step. Preserve camera, face, outfit, backpack, lantern and shelter. Add no person or human silhouette on the path. One continuous shot, soft afternoon light, no text, dialogue or music.',
  ],
  continuityRepair: [
    'Ảnh 1 là khung cuối cần sửa; ảnh 2 là đèn chuẩn. Đèn bị mất trong ảnh 1. Chỉ đặt lại một đèn đúng như ảnh 2 lên vị trí cũ trên ghế, sáng vàng dịu. Giữ Lan, tư thế, mặt, camera, chòi, cây, đường và màu tổng thể. Không thêm đèn thứ hai.',
    'Image 1 is the ending frame to repair; image 2 is the approved lantern. It is missing in image 1. Restore only that single lantern to its previous place on the bench with a soft amber glow. Preserve Lan, pose, face, camera, shelter, tree, path and overall color. Do not add a second lantern.',
  ],
  voice: [
    'Bài thử tùy chọn: dùng ảnh cuối shot 3. Lan nói tiếng Việt: “Mình về thôi.” Giọng phụ nữ trưởng thành, âm vực trung, ấm, tốc độ chậm vừa, âm lượng tự nhiên. Giữ mặt, áo, ba lô, camera, đèn sáng. Một người nói, không nhạc hoặc phụ đề. Nếu đính kèm file giọng và chế độ hỗ trợ, lấy lời và nhịp từ file, không đổi câu.',
    'Optional test: use the ending image of shot 3. Lan says in Vietnamese: “Mình về thôi.” Adult woman’s voice, mid pitch, warm tone, moderately slow pace, natural volume. Preserve face, jacket, backpack, camera and lit lantern. One speaker, no music or subtitles. If an audio file is attached and the mode supports it, use its words and timing without rewriting.',
  ],
  performance: [
    'Ảnh tham chiếu là Lan trong chòi; video tham chiếu là màn diễn tôi tự quay. Chuyển động đầu và tay Lan bám theo video, cùng cỡ cảnh nửa người. Giữ nhận diện Lan và bối cảnh ảnh. Chỉ giữ thoại từ video nếu chế độ hỗ trợ. Lá ngoài chòi chuyển động nhẹ, camera cố định. Không thêm động tác hoặc người.',
    'The image shows Lan in the shelter; the video is my own recorded performance. Guide Lan’s head and hand movements with the video, matching waist-up framing. Preserve her identity and the image environment. Retain video dialogue only if the mode supports it. Leaves outside move gently, camera fixed. Add no actions or people.',
  ],
  vfx: [
    'Bài sửa video tùy chọn: video là người diễn trước nền đơn giản; ảnh là chòi đã duyệt. Chỉ thay nền bằng chòi. Giữ mặt, tóc, tay, áo, chuyển động và thời gian video. Khớp ánh sáng chiều dịu. Không thay hoặc tái tạo chữ trên vật phía trước.',
    'Optional video edit: the video shows a performer against a simple background; the image is the approved shelter. Replace only the background. Preserve face, hair, hands, clothing, motion and timing. Match soft afternoon light. Do not replace or regenerate text on foreground objects.',
  ],
} satisfies Record<string, PromptPair>;

/** Handwritten expected responses, not model-run logs. */
export const seedanceWorkedResponses = {
  story: seedanceStory.script,
  mapping: [
    `Ví dụ trả lời do GenYZ biên soạn, không phải kết quả chạy AI:
File → vai trò → ô tải: shot-01-start.png → cảnh đã ghép Lan/chòi/đèn → ảnh bắt đầu.
Prompt để sao chép:
${seedanceCoursePrompts.shot1[0]}
Chọn riêng trong giao diện: Seedance; ảnh đầu → video; 16:9; 5 giây nếu có, nếu không chọn thời lượng ngắn được hỗ trợ và điều chỉnh nhịp; độ phân giải trong ngân sách.
Ba kiểm tra: Lan đi rồi dừng; đèn tắt đúng chỗ; mặt và ba lô không đổi.`,
    `Expected response authored by GenYZ, not an AI-run result:
File → role → upload slot: shot-01-start.png → composed Lan/shelter/lantern scene → starting frame.
Prompt to copy:
${seedanceCoursePrompts.shot1[1]}
Select separately: Seedance; starting-image-to-video; 16:9; five seconds if available, otherwise a supported short duration with adjusted pacing; resolution within budget.
Three checks: Lan walks then stops; lantern stays unlit in place; face and backpack stay consistent.`,
  ],
  revision: [
    `Ví dụ sửa do GenYZ biên soạn: thêm ràng buộc màu ba lô, giữ phần đã đạt.
${seedanceCoursePrompts.shot1[0]}
Ba lô giữ màu xanh rêu từ đầu đến cuối, không chuyển đỏ hoặc đổi chất liệu.
Đầu vào: dùng lại shot-01-start.png có ba lô đúng. Nếu chế độ nhận thêm tham chiếu, có thể thêm lan-full.png; nếu chỉ có ô ảnh đầu, không thêm thẻ ảnh giả vào prompt.
Kiểm tra lại giây 3, sau đó xem hết clip. Nếu vẫn lỗi, giảm hành động hoặc dùng đoạn tốt trong ngân sách.`,
    `Revision authored by GenYZ: add a backpack-color constraint while preserving the successful instructions.
${seedanceCoursePrompts.shot1[1]}
Keep the backpack moss-green from beginning to end; do not turn it red or change its material.
Inputs: reuse shot-01-start.png with the correct backpack. If the mode accepts additional references, optionally add lan-full.png; if it has only a first-frame slot, do not invent an extra image tag in the prompt.
Recheck second 3, then watch the whole clip. If it still fails, simplify the action or use a good segment within budget.`,
  ],
} satisfies Record<string, PromptPair>;
