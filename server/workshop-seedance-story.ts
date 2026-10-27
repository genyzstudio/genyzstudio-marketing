import type { Curriculum } from './workshop-content';
import type { PromptPair } from './workshop-seedance-masterclass-prompts';
import type { LessonStep } from '../content/workshop/types';

/** Original fictional teaching script. Timing belongs to the edit, not a model guarantee. */
export const seedanceStory = {
  title: ['Ai đang gọi mình?', 'Who Is Calling Me?'],
  synopsis: [
    'Lan ghé vào một chòi gỗ trước khi xuống núi. Cô dừng lại, nhưng tiếng bước chân vẫn tiếp tục. Chiếc đèn trên ghế tự sáng. Từ con dốc không một bóng người, có tiếng gọi: “Về thôi, Lan.” Cô không bước xuống. Màn hình chuyển đen; cũng giọng ấy, lần này ở rất gần: “Về thôi, Lan.”',
    'Lan stops at a wooden shelter before heading down the mountain. She stops walking, but the footsteps continue. A lantern on the bench lights itself. From the empty path comes a voice: “Về thôi, Lan.” (“Let’s go home, Lan.”) She stays where she is. Cut to black. The same voice repeats the line, now uncomfortably close.',
  ],
  brief: [
    'Viết kế hoạch phim ngắn hồi hộp “Ai đang gọi mình?” theo câu chuyện sau: Lan muốn xuống núi trước khi trời tối và ghé chòi nghỉ chân. Shot 1: cô bước hai bước tới ghế rồi dừng, đèn còn tắt; khi cô đã đứng yên, người xem nghe thêm hai tiếng chân. Shot 2: đèn tự sáng, Lan nhìn xuống mà không chạm vào. Shot 3: từ đường vắng có tiếng “Về thôi, Lan.”; cô nhìn ra đường rồi đứng yên, không đáp và không đi theo. Cắt đen: cùng câu gọi vang lên thật gần. Chỉ thấy một nhân vật, một chòi, một chiếc đèn. Người gọi không xuất hiện và không được giải thích. Giọng gọi không được mặc định là giọng của Lan.\nTạo ba clip hình riêng, mỗi clip khoảng 5–8 giây nếu công cụ hỗ trợ; 16:9, ánh sáng chiều dịu đủ rõ. Clip không có lời nói hay nhạc. Thu tiếng chân và câu gọi riêng, ghép trong CapCut; màn đen cũng tạo trong phần mềm dựng, không cần lượt tạo video thứ tư. Tổng bản dựng khoảng 18–22 giây, điều chỉnh theo đoạn hình dùng được.\nTrả về: một câu nêu mục đích của Lan và điều ngăn cô lại; bảng shot / hình nhìn thấy / âm thanh thêm khi dựng / câu hỏi của người xem / trạng thái đèn / ảnh đầu / điểm cắt; danh sách file. Giải thích shot là gì. Không thêm người, quái vật, rượt đuổi, mưa hay chuyển đêm. Phân biệt thời gian dựng mẫu với thời lượng tạo; không tự khẳng định giới hạn Seedance.',
    'Plan the suspense short “Who Is Calling Me?”: Lan wants to get down the mountain before dark and pauses at a shelter. Shot 1: she takes two steps toward the bench and stops, lantern unlit; two extra footsteps are heard after she stops. Shot 2: the lantern lights itself and Lan looks down without touching it. Shot 3: a voice from the empty path says “Về thôi, Lan.” (“Let’s go home, Lan.”); she looks toward the path, then stays still, neither answering nor following. Cut to black: the same line repeats very close. Only one visible character, one shelter and one lantern. Never show or explain the caller. Do not assume it is Lan’s own voice.\nGenerate three separate picture clips, around 5–8 seconds each if supported, in 16:9 with readable soft afternoon light. No speech or music in the generated clips. Record footsteps and the call separately and place them in CapCut. Make the black ending in the editor; no fourth video generation is needed. Aim for an 18–22-second edit, adapting to the usable footage.\nReturn: one sentence stating Lan’s goal and what interrupts it; a table of shot / visible action / sound added in the edit / viewer question / lantern state / starting image / cut point; and a file list. Explain a shot. Add no people, monsters, chases, rain or night transition. Separate example edit timing from generation duration and do not invent Seedance limits.',
  ],
  overview: [
  "ĐỌC ĐỂ HÌNH DUNG CÂU CHUYỆN\nLan ghé chòi nghỉ trước khi xuống núi. Những tiếng động lạ khiến cô không dám đi tiếp. Bài này chỉ lập kế hoạch bằng chữ, chưa tạo ảnh hay video.\n\n“Cảnh” ở đây là một shot: một đoạn hình liên tục, chưa có điểm cắt ở giữa.\n\nCẢNH 1 — LAN DỪNG, NHƯNG TIẾNG CHÂN VẪN CÒN\n- Nhìn thấy: Lan bước hai bước tới ghế rồi đứng yên. Chiếc đèn trên ghế đang tắt.\n- Nghe thấy trong phim hoàn chỉnh: sau khi Lan dừng, có thêm hai tiếng bước chân. Không thấy người thứ hai.\n\nCẢNH 2 — CHIẾC ĐÈN TỰ SÁNG\n- Nhìn thấy: đèn sáng lên dù Lan không chạm vào. Cô nhìn xuống chiếc đèn.\n- Điều khiến người xem tò mò: ai vừa bật đèn?\n\nCẢNH 3 — TIẾNG GỌI TỪ CON ĐƯỜNG VẮNG\n- Nghe thấy: “Về thôi, Lan.” từ phía con đường.\n- Nhìn thấy: Lan nhìn ra đường nhưng không có ai. Cô đứng yên, không trả lời và không đi theo. Đèn vẫn sáng.\n\nĐOẠN KẾT\nMàn hình chuyển đen. Cùng câu gọi vang lên lần nữa, lần này nghe rất gần. Màn đen và âm thanh sẽ được ghép ở bài 7; không cần tạo thêm clip thứ tư.\n\nVIỆC CỦA BẠN Ở BÀI NÀY\nSau khi nhờ ChatGPT hoặc Claude lập kế hoạch, kiểm tra ba điều:\n1. Cảnh 1: Lan dừng lại, đèn còn tắt.\n2. Cảnh 2: đèn sáng lên, Lan nhìn xuống.\n3. Cảnh 3: Lan nhìn ra đường vắng, đèn vẫn sáng.\nNếu AI thêm người, đổi thứ tự hoặc cho Lan đi theo tiếng gọi, yêu cầu sửa lại. Giữ bản kế hoạch trong cuộc trò chuyện. Sau khi tạo thư mục ở mục 3 của bài này, lưu bản bạn chọn vào story-and-shots.txt trong thư mục 00-project. Không cần điền thêm phiếu. Tiếng chân, lời gọi và thời điểm cắt sẽ học ở bài 7.\n\nĐây là câu chuyện mẫu do khóa học biên soạn, chưa phải kết quả video đã tạo.",
  "READ TO PICTURE THE STORY\nLan rests at a shelter before heading down the mountain. Strange sounds make her hesitate to continue. This module plans the story in words; you are not generating images or video yet.\n\nA shot is one continuous piece of picture with no cut inside it.\n\nSHOT 1 — LAN STOPS, BUT THE FOOTSTEPS CONTINUE\n- Picture: Lan takes two steps toward the bench and stands still. The lantern on the bench is unlit.\n- Sound in the finished film: two more footsteps after she stops. No second person appears.\n\nSHOT 2 — THE LANTERN LIGHTS ITSELF\n- Picture: the lantern lights up without Lan touching it. She looks down at it.\n- The viewer’s question: who switched it on?\n\nSHOT 3 — A CALL FROM THE EMPTY PATH\n- Sound: “Về thôi, Lan.” (“Let’s go home, Lan.”) from the path.\n- Picture: Lan looks toward the empty path. She stays still, neither answering nor following. The lantern remains lit.\n\nENDING\nThe screen turns black. The same call repeats, now sounding very close. You add black and sound in Module 7; no fourth generated clip is needed.\n\nYOUR TASK IN THIS MODULE\nAfter asking ChatGPT or Claude for a plan, check three things:\n1. Shot 1: Lan stops; the lantern is still unlit.\n2. Shot 2: the lantern lights up; Lan looks down.\n3. Shot 3: Lan looks toward the empty path; the lantern stays lit.\nIf AI adds a person, changes the order or makes Lan follow the voice, ask it to revise the plan. Keep the plan in your chat. After creating folders in section 3 of this module, save your chosen plan as story-and-shots.txt inside 00-project. No extra worksheet to fill. Footsteps, the call and cut timing are taught in Module 7.\n\nThis is an authored story example, not a generated video result."
],
  script: [
    `KỊCH BẢN MẪU · khoảng 20 giây, chưa phải video đã tạo
Lan muốn xuống núi trước khi trời tối. Cô chỉ ghé chòi nghỉ một lát. Tiếng gọi khiến cô không dám đi tiếp.

SHOT 1 · 0–6 giây · Có ai đi cùng?
Hình: toàn cảnh cố định. Lan bước hai bước tới ghế rồi dừng. Đèn tắt. Giữ khoảng một giây cô đứng yên.
Tiếng: hai bước khớp chân Lan. Sau khi cô dừng, thêm hai bước chậm, nhỏ hơn. Không có người thứ hai trong hình.
Cắt: sau tiếng chân thừa thứ hai. Nếu clip ngắn, giữ một ảnh cuối sạch thêm tối đa một giây; ghi rõ đó là ảnh tĩnh.

SHOT 2 · 6–12 giây · Ai vừa bật đèn?
Hình: nối từ đúng vị trí cuối shot 1. Đèn sáng vàng dịu dù Lan không chạm vào; cô nhìn xuống. Đường phía ngoài vẫn trống.
Tiếng: tiếng gió nhẹ, ngừng tiếng chân. Để người xem có một nhịp nhìn rõ chiếc đèn; không chèn tiếng nổ hay nhạc giật mình.
Cắt: khi Lan đã nhìn xuống và ánh đèn ổn định.

SHOT 3 · 12–18 giây · Có nên đi theo tiếng gọi?
Hình: đèn vẫn sáng. Lan nhìn ra con đường, rồi đứng lại, miệng khép. Không có ai ở đó. Cô không đáp, không bước xuống dốc.
Tiếng: đặt “Về thôi, Lan.” ngay trước lúc cô nhìn ra. Giọng nhỏ và hơi vọng như từ dưới dốc. Để khoảng một giây yên sau câu nói.
Cắt: khi Lan đang đứng yên, trước khi cô quay lại hoặc bước đi.

ĐOẠN KẾT · 18–20 giây · Tiếng gọi đã đến gần
Hình: cắt thẳng sang màn đen, giữ khoảng hai giây. Đây là đoạn dựng, không phải shot AI mới.
Tiếng: dùng lại đúng bản thu “Về thôi, Lan.”, lần này rõ, gần, không thêm vang. Kết sau khi câu nói dứt; đừng cắt mất từ “Lan”.

Người xem cần nhận ra khoảng cách của tiếng gọi đã đổi. Không cần biết ai gọi hay tại sao đèn sáng. Nếu chưa có video, dựng ba ảnh với đúng âm thanh này và ghi ANIMATIC.
File hình giữ như bài: lan-portrait.png, lan-turnaround.png, lan-full.png, location-master.png, lantern-sheet.png, lantern-off.png, lantern-on.png, shot-01-start.png.
Âm thanh tự thu: 05-edit/audio/steps-original.m4a và call-original.m4a (hoặc định dạng thật của máy). Lưu bản dựng thử trước khi tạo lại bất cứ clip nào.`,
    `AUTHORED SCRIPT · about 20 seconds, not a generated video
Lan wants to get down the mountain before dark. She pauses at the shelter to rest. The call makes her hesitate to continue.

SHOT 1 · 0–6 seconds · Is someone following?
Picture: fixed wide shot. Lan takes two steps toward the bench and stops. Lantern unlit. Hold her still for about a second.
Sound: two footsteps match her feet. After she stops, add two slower, quieter steps. No second person appears.
Cut: after the second extra step. If footage is short, hold a clean ending still for at most one extra second and label it as a still hold.

SHOT 2 · 6–12 seconds · Who lit the lantern?
Picture: continue from shot 1’s actual ending position. The lantern glows soft amber without Lan touching it. She looks down. The path remains empty.
Sound: quiet wind, no footsteps. Give the audience time to see the lantern; no bang or jump-scare music.
Cut: when her gaze has settled and the lantern’s light is stable.

SHOT 3 · 12–18 seconds · Should she follow the voice?
Picture: lantern still lit. Lan looks toward the path, then holds still with her mouth closed. Nobody is there. She neither answers nor goes down the path.
Sound: place “Về thôi, Lan.” (“Let’s go home, Lan.”) just before she looks out. Make it quieter and slightly reverberant, as if from down the slope. Leave about a second of quiet after it.
Cut: while Lan is still, before she turns around or walks away.

ENDING · 18–20 seconds · The voice is closer
Picture: a hard cut to about two seconds of black, made in the editor rather than a new AI shot.
Sound: reuse exactly the same recording of the line, now clear, close and without added reverb. End after the whole line; do not clip the name.

The viewer should hear the distance change. The caller’s identity and the lantern’s cause stay unresolved. With no video, edit three stills with the same sound and label the result ANIMATIC.
Keep the lesson image files: lan-portrait.png, lan-turnaround.png, lan-full.png, location-master.png, lantern-sheet.png, lantern-off.png, lantern-on.png, shot-01-start.png.
Self-recorded sound: 05-edit/audio/steps-original.m4a and call-original.m4a (or the recorder’s actual format). Try the edit before regenerating footage.`,
  ],
} satisfies Record<string, PromptPair>;

export function addSeedanceStory(course: Curriculum, locale: 'vi' | 'en'): void {
  const t = (vi: string, en: string) => locale === 'vi' ? vi : en;
  const pick = (pair: PromptPair) => pair[locale === 'vi' ? 0 : 1];
  const [story, , planning, , , review, delivery] = course.lessons;
  course.preparation.intro = t(
    'Bạn sẽ làm phim ngắn “Ai đang gọi mình?”: Lan dừng bước trong chòi nhưng vẫn nghe tiếng chân. Một chiếc đèn tự sáng, rồi có người gọi tên cô từ con dốc vắng. Bài chỉ cần một nhân vật, một địa điểm và ba clip. Bạn học cách tạo hình bằng Seedance, rồi dùng khoảng lặng và tiếng gọi để kể chuyện trong CapCut. Nếu chưa có lượt tạo video, bạn vẫn có thể thử kịch bản bằng ảnh tĩnh và âm thanh. Không cần biết lập trình.',
    'Make “Who Is Calling Me?”: Lan stops in a shelter, but the footsteps continue. A lantern lights itself, then someone calls her name from the empty path. You need one visible character, one location and three clips. Use Seedance for the picture, then build suspense with silence and the call in CapCut. Without video credits, try the script with stills and sound. No coding is needed.',
  );
  story.goal = t('Lên kế hoạch cho câu chuyện có dấu hiệu lạ, lựa chọn của nhân vật và một đoạn kết bất ngờ; sau đó chọn các công cụ sẽ dùng. Chưa cần tạo video ở bài này.', 'Plan a story with a strange clue, a character’s choice and a surprising ending, then choose the tools you will use. No video generation is needed in this module.');
  const plan = story.steps.find(step => step.save === '00-project/story-and-shots.txt')!;
  plan.title = t('Viết “Ai đang gọi mình?” thành ba cảnh', 'Plan “Who Is Calling Me?” in three shots');
  plan.instruction = t("Đọc câu chuyện mẫu bên dưới trước. Sau đó, mở ChatGPT hoặc Claude và dán một bản prompt, tiếng Việt hoặc tiếng Anh, để nhờ viết kế hoạch bằng chữ. Đây là prompt lập kế hoạch, không phải lệnh tạo video trong Seedance. Đối chiếu câu trả lời với ba cảnh mẫu và giữ bản bạn chọn trong cuộc trò chuyện; sau mục tạo thư mục, bạn sẽ lưu nó thành file. Ở bài 1, bạn chưa cần có ảnh nhân vật hay clip; các bài sau sẽ hướng dẫn tạo từng phần.", "Read the story example below first. Then open ChatGPT or Claude and paste one language version of the prompt to request a written plan. This is a planning prompt, not a video-generation command for Seedance. Compare the response with the three example shots and keep your chosen plan in the chat; save it as a file after the folder-setup section. You do not need character images or clips yet; later modules teach you to create them.");
  plan.resultTitle = t('Câu chuyện mẫu: ba cảnh sẽ làm', 'Story example: the three shots you will make');
  plan.resultText = pick(seedanceStory.overview);
  delivery.steps[0].resultTitle = t('Kịch bản dựng chi tiết: hình, tiếng và điểm cắt', 'Detailed edit script: picture, sound and cuts');
  delivery.steps[0].resultText = pick(seedanceStory.script);
  story.checks.push(t('Tôi phân biệt được hành động cần tạo trong video và tiếng động cần ghép khi dựng; biết vì sao Lan không đi xuống dốc.', 'I can separate the generated picture from sound added in the edit, and explain why Lan does not take the path.'));
  story.example = { title: t('Để người xem tự nhận ra điều bất thường', 'Let the viewer notice the mismatch'), text: t('Tiếng chân chỉ gây tò mò khi người xem đã thấy Lan dừng. Câu gọi cuối chỉ có tác dụng khi lần đầu nghe rõ là ở xa. Hãy cho mỗi chi tiết đủ thời gian để được nhận ra, thay vì thêm nhiều sự kiện.', 'The extra footsteps matter only after the viewer has seen Lan stop. The last call works only if the first sounded distant. Give each clue time to register before adding another event.') };
  planning.steps[3].instruction += t(' Giữ con đường trong khung hình và không có người trên đó: đến shot 3, người xem cần thấy nơi phát ra tiếng gọi đang trống. Giữ ánh sáng đủ rõ; cảm giác bất an đến từ chuyện xảy ra trong cảnh.', ' Keep the path visible and empty: in shot 3, viewers need to see that nobody stands where the call seems to come from. Keep the picture readable; the unsettling events create the mood.');
  review.steps[3].instruction += t(' Lan nghe một tiếng gọi mà người xem sẽ nghe ở bản dựng. Cô nhìn ra đường nhưng không đi theo; đừng thêm nụ cười hay động tác vẫy tay. Tạo phần hình không có lời nói. Sau này, đặt câu gọi ngay trước lúc cô nhìn để hành động có nguyên nhân.', ' Lan hears a call that viewers will hear in the edit. She looks toward the path but does not follow; add no smile or wave. Generate the picture without speech. Later, place the call just before her look so the action has a cause.');
  for (const lab of review.techniques ?? []) {
    if (!['voice-performance', 'sd25-audio-performance'].includes(lab.id)) continue;
    lab.input += t(' Đây là bài thử giọng nói riêng. Không nối câu Lan nói vào phim chính: trong “Ai đang gọi mình?”, Lan im lặng và tiếng gọi nằm ngoài hình.', ' This is a separate speech exercise. Do not append Lan’s spoken line to the main film: in “Who Is Calling Me?”, Lan stays silent and the call comes from offscreen.');
    for (const step of lab.steps) step.instruction = step.instruction.replace('giữ bộ phim không thoại', 'giữ clip hình không thoại; câu gọi của phim chính vẫn ghép trong CapCut').replace('keep the film dialogue-free', 'keep the generated picture silent; the main film’s call is still added in CapCut');
  }

  const soundStep: LessonStep = {
    title: t('Thu tiếng chân và một câu gọi', 'Record footsteps and one line'),
    instruction: t(
      'Trong phòng yên, mở ứng dụng ghi âm trên điện thoại hoặc máy tính. Thu hai bước chân chậm, để trống một chút ở đầu và cuối, rồi lưu file gốc vào 05-edit/audio/steps-original.m4a (giữ đuôi file thật nếu khác). Thu riêng “Về thôi, Lan.” bằng giọng bình thường, nhẹ như gọi người quen; dùng giọng của bạn hoặc người đồng ý thu. Lưu call-original.m4a. Đây là giọng người gọi ngoài hình, không mặc định là giọng Lan và không cần nhép môi. Nghe lại từng file: đủ chữ, không rè, không bị cắt đầu hay cuối. Chuyển file từ điện thoại sang máy bằng cáp hoặc công cụ chia sẻ file bạn có. Trong CapCut, chọn Import và nhập hai file này cùng các clip.',
      'In a quiet room, open a recorder on your phone or computer. Record two slow footsteps with a little silence before and after, then save the original to 05-edit/audio/steps-original.m4a (keep the actual extension if different). Separately record “Về thôi, Lan.”, gently calling someone familiar, using your own voice or a consenting speaker. Save call-original.m4a. This is an offscreen caller, not necessarily Lan’s voice, so no lip sync is needed. Listen for complete words, no distortion and intact beginnings and endings. Transfer phone files to the computer by cable or your usual file-sharing app. In CapCut, use Import to bring in both recordings with your clips.',
    ),
    tool: t('Ứng dụng ghi âm · CapCut Desktop', 'Voice recorder · CapCut Desktop'),
    save: '05-edit/audio/steps-original.m4a + call-original.m4a',
  };
  const mixStep: LessonStep = {
    title: t('Đặt tiếng chân sau lúc Lan dừng', 'Place footsteps after Lan stops'),
    instruction: t(
      'Chọn từng clip hình, đặt Volume/Âm lượng về 0 để bỏ âm thanh AI ngoài ý muốn. Kéo file tiếng chân xuống track âm thanh bên dưới. Cắt khoảng im đầu file, căn hai tiếng đầu vào lúc giày Lan chạm đất; nếu nhịp không khớp, tách hai tiếng để kéo riêng. Sao chép hai tiếng đó, đặt sau khi Lan đã đứng yên và giảm âm lượng để chúng có vẻ ở xa. Xem lại bằng mắt và tai: phải thấy cô đã dừng trước khi nghe tiếng chân thừa. Shot 2 để yên hoặc dùng gió nhẹ bạn tự thu. So độ sáng giữa các clip, chỉ chỉnh khi lệch rõ.',
      'Select each picture clip and set Volume to zero to remove unwanted AI sound. Drag the footsteps onto an audio track below the picture. Trim the leading silence and align the first two steps with Lan’s feet landing; split the sounds and move them separately if needed. Duplicate the two steps, place them after she is visibly still and lower their volume to suggest distance. Watch and listen: she must stop before the extra steps sound. Leave shot 2 quiet, or use soft wind you recorded. Compare clip brightness and adjust only obvious mismatches.',
    ), tool: 'CapCut Desktop', save: '05-edit/sound-and-color-notes.txt',
  };
  const endingStep: LessonStep = {
    title: t('Cho tiếng gọi đến gần ở đoạn kết', 'Bring the voice closer at the ending'),
    visualTarget: plan.visualTarget,
    instruction: t(
      'Kéo bản thu câu gọi xuống track âm thanh, đặt ngay trước lúc Lan nhìn ra đường trong shot 3. Giảm âm lượng vừa đủ để vẫn nghe rõ từng từ. Nếu có hiệu ứng vang miễn phí, thêm thật nhẹ cho lần gọi từ xa; không cần mua hiệu ứng. Sao chép đúng đoạn thu này cho đoạn kết, bỏ vang và trả về mức âm lượng tự nhiên, không tăng đến mức gây giật mình. Để làm màn đen: thêm một ảnh màu đen 16:9 từ công cụ vẽ có sẵn trên máy (1920×1080 là được), nhập vào CapCut và đặt sau shot 3, dài khoảng hai giây. Cắt thẳng sang ảnh đen, không dùng chuyển cảnh. Đặt câu gọi thứ hai trên đoạn đen, rồi kéo dài ảnh nếu câu nói chưa dứt. Nghe ở mức âm lượng thoải mái: lần đầu xa, lần sau gần. Nếu không có hiệu ứng vang, dùng chênh lệch âm lượng vừa phải và giảm tiếng nền ở lần gọi cuối. Đừng hứa hiệu ứng âm thanh nổi sẽ tạo cảm giác chính xác “sau lưng” trên mọi thiết bị.',
      'Drag the call onto an audio track just before Lan looks toward the path in shot 3. Lower its volume while keeping every word intelligible. If a free reverb effect is available, add a little to the distant call; buying an effect is unnecessary. Duplicate that exact recording for the ending, remove reverb and return it to a natural volume without a startling loudness jump. For the black ending, make a black 16:9 image in your computer’s drawing app (1920×1080 works), import it into CapCut and place it after shot 3 for about two seconds. Use a hard cut, with no transition. Place the second call over the black image and extend the image if the line has not finished. Listen at a comfortable level: first distant, then close. Without reverb, use a modest volume difference and lower the background under the last call. Do not assume stereo sound can put the voice precisely behind every listener.',
    ), tool: 'CapCut Desktop', save: '05-edit/black-end.png + sound-and-color-notes.txt',
    resultText: t('Nhịp dựng mẫu: 0–6s bước chân → 6–12s đèn → 12–18s tiếng gọi xa → 18–20s màn đen và tiếng gọi gần. Mốc giây được điều chỉnh theo hình; kiểm tra bằng cách xem và nghe bản xuất.', 'Example edit: 0–6s footsteps → 6–12s lantern → 12–18s distant call → 18–20s black and close call. Adjust to the footage and verify by watching and listening to the exported file.'),
  };
  // Apply after editorial and visual enrichment so their positional targets remain intact.
  const exportStep = delivery.steps[3];
  exportStep.instruction += t(' Riêng đoạn đen cuối phim là có chủ ý: kiểm tra nó xuất hiện sau shot 3, câu gọi vẫn còn và phim chỉ kết thúc khi lời đã dứt. Nhờ một người chưa đọc kịch bản xem một lần, rồi hỏi: “Tiếng chân lạ xuất hiện lúc nào? Hai lần gọi có khác khoảng cách không? Vì sao Lan đứng lại?” Nếu họ chưa nhận ra, sửa nhịp hoặc âm lượng trước khi tạo thêm video.', ' The final black section is intentional: check that it follows shot 3, the call is still audible, and the film ends after the line. Ask someone who has not read the script to watch once: “When did the extra footsteps happen? Did the calls sound different in distance? Why did Lan stay?” If they miss a clue, adjust timing or volume before generating more footage.');
  exportStep.instruction = exportStep.instruction.replace('có màn hình đen, chữ thừa', 'có khoảng đen ngoài ý muốn, chữ thừa').replace('black gaps, unwanted text', 'unintended black gaps, unwanted text');
  delivery.steps.splice(2, 1, soundStep, mixStep, endingStep);
  delivery.checks[0] = t('Người xem nhận ra tiếng chân còn tiếp tục khi Lan đã dừng, đèn tự sáng và cùng câu gọi từ xa chuyển đến gần. Lan không đi theo.', 'A viewer notices footsteps continuing after Lan stops, the lantern lighting itself and the same call moving from distant to close. Lan does not follow.');
  delivery.checks[1] = t('Bản xuất phát được; màn đen cuối có câu gọi đầy đủ, không có khoảng đen hoặc âm thanh thừa ở chỗ khác.', 'The export plays correctly; the intentional black ending contains the complete call, with no unintended gaps or sounds elsewhere.');
  delivery.example = { title: t('Thử nhịp phim trước khi tạo thêm', 'Test the edit before generating again'), text: t('Nếu người xem không nhận ra điều bất thường, thử đặt hai tiếng chân muộn hơn hoặc kéo dài khoảng lặng trước câu gọi cuối. Giữ nguyên hình khi so sánh hai bản dựng để biết thay đổi âm thanh có hiệu quả không. Bạn có thể thử ngay bằng animatic.', 'If a viewer misses the clue, try delaying the extra steps or holding the quiet before the last call. Keep the picture unchanged when comparing edits so you can hear what the sound change does. You can test this with an animatic.') };
  course.syllabus = course.syllabus.map(item => item.id === 'story' ? { ...item, summary: story.goal } : item);
}
