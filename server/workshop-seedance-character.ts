import masterSheet from './workshop-seedance-master-sheet.json';
import type { Curriculum } from './workshop-content';

/** Original Lan exercises informed by the linked asset-preparation workflow. */
export function adaptSeedanceCharacterLesson(course: Curriculum, locale: 'vi' | 'en'): void {
  const t = (vi: string, en: string) => locale === 'vi' ? vi : en;
  const lesson = course.lessons.find(item => item.id === 'references')!;
  const [choose, portrait, sheet, repair, review] = lesson.steps;
  lesson.goal = t('Tạo một bộ ảnh Lan để các bài sau dùng cùng một nhân vật: ảnh cận mặt, ảnh trang phục không mặt, bảng góc nhìn và ảnh toàn thân đã ghép.', 'Create a Lan reference pack for the following modules: a face close-up, a face-excluded outfit reference, a view sheet and a combined full-body image.');
  lesson.inputPoints = [
    t('Kịch bản ba cảnh từ bài 1. Bài này chỉ làm nhân vật Lan; chòi và chiếc đèn sẽ làm ở bài 3.', 'Your three-shot plan from Module 1. This module makes Lan; the shelter and lantern come in Module 3.'),
    t('Một công cụ tạo ảnh: GPT Image trong Codex hoặc Nano Banana trong Gemini. Chọn công cụ tài khoản của bạn dùng được.', 'An image tool: GPT Image in Codex or Nano Banana in Gemini. Choose one your account supports.'),
    t('Thư mục 01-character để lưu ảnh gốc tải về. Chưa mở Seedance hay tạo video.', 'The 01-character folder for downloaded originals. No Seedance or video generation yet.'),
  ];
  lesson.termsTitle = t('Thuật ngữ dùng trong bài nhân vật', 'Terms used in this character lesson');
  lesson.termDefinitions = [
    { term: t('Chân dung (portrait)', 'Portrait'), definition: t('Ảnh nhìn rõ mặt để đối chiếu nhận diện.', 'A clear view of the face for identity checks.') },
    { term: t('Toàn thân (full-body view)', 'Full-body view'), definition: t('Ảnh đủ đầu đến giày để thấy tỷ lệ người, trang phục và ba lô.', 'A head-to-shoes view showing proportions, clothing and the backpack.') },
    { term: t('Ảnh trang phục (outfit reference)', 'Outfit reference'), definition: t('Ảnh chỉ có quần áo, giày và ba lô theo kiểu người mẫu vô hình (ghost mannequin); không có da hay bộ phận cơ thể. Ảnh này chỉ làm chuẩn quần áo và phụ kiện; khác với ảnh toàn thân có đầu sẽ ghép ở bước sau.', 'A ghost-mannequin image containing only clothes, shoes and a backpack, with no skin or body parts, used only for clothing and accessories. It differs from the head-to-toe image assembled later.') },
    { term: t('Bảng góc nhìn (character sheet / turnaround)', 'Character sheet / turnaround'), definition: t('Nhiều góc của cùng một người để đối chiếu. Đây chưa phải khung đầu của video.', 'Several views of one person for comparison. It is not a video starting frame.') },
    { term: t('Ảnh chuẩn đã duyệt (approved reference)', 'Approved reference'), definition: t('Ảnh bạn đã kiểm tra và chọn làm mốc cho những lần tạo tiếp theo.', 'An image you have checked and chosen as the reference for later generations.') },
  ];
  choose.title = t('Chốt diện mạo Lan trước khi tạo ảnh', 'Decide what Lan looks like before generating');
  choose.instruction = t('Đọc mô tả dưới đây rồi chọn cách làm. Mục tiêu là giữ cùng một Lan qua cả ba cảnh.', 'Read the description below and choose a route. The aim is to keep the same Lan across all three shots.');
  choose.instructionPoints = locale === 'vi' ? [
    'Khuôn mặt và tóc: Lan khoảng 28 tuổi, mặt trái xoan, mắt nâu, tóc đen tết một bím. Đây là những chi tiết cần so lại khi tạo góc mới.',
    'Trang phục và phụ kiện: áo vàng mù tạt, quần xanh than, giày nâu, ba lô xanh rêu; không logo. Không đổi đồ giữa ba cảnh của phim mẫu.',
    'Tự làm ảnh: theo bước 2 đến bước 5 bên dưới. Chọn một chân dung đạt rồi dùng chính ảnh đó làm chuẩn.',
    'Dùng ảnh mẫu: tải chân dung và bảng góc nhìn Lan có sẵn trong bài. Nếu dùng trọn bộ mẫu, bạn có thể bỏ qua việc tạo ảnh mới ở bước 3; vẫn kiểm tra và cắt ảnh toàn thân ở bước 5. Không trộn mặt tự tạo với trang phục của một bộ nhân vật khác.',
    'Nền xám và ánh sáng mềm giúp bài tập dễ đối chiếu chi tiết. Đây là lựa chọn cho bộ ảnh này, không bảo đảm AI luôn giữ đúng mặt.',
  ] : [
    'Face and hair: Lan is about 28, with an oval face, brown eyes and black hair in one braid. Compare these features whenever you make another view.',
    'Clothing and accessories: mustard jacket, navy trousers, brown shoes and a moss-green backpack, without logos. Keep this outfit across the three example shots.',
    'Create your own images: follow steps 2–5 below. Approve one portrait and use that exact image as the identity reference.',
    'Use the samples: download the supplied Lan portrait and view sheet in this lesson. If using the complete supplied pack, you may skip new outfit generation in step 3; still check and crop the full-body image in step 5. Do not mix a new face with a different character pack.',
    'A gray background and soft light make details easier to compare in this exercise. They do not guarantee that AI will preserve the face.',
  ];
  choose.resultTitle = t('Mẫu mô tả nhân vật: giữ những gì giống nhau?', 'Character description: what should stay the same?');
  choose.resultText = t('NHÂN VẬT: Lan, người đi bộ đường núi.\nMẶT: khoảng 28 tuổi, mặt trái xoan, mắt nâu.\nTÓC: đen, đúng một bím.\nTRANG PHỤC: áo vàng mù tạt, quần xanh than, giày nâu.\nPHỤ KIỆN: một ba lô xanh rêu.\n\nDùng mẫu này để kiểm tra ảnh, không cần điền một hồ sơ mới. Ví dụ: ảnh có hai bím tóc hoặc ba lô xanh dương thì chưa khớp. Ảnh phía sau không thấy mặt thì chỉ kiểm tra tóc, đồ và tỷ lệ; không kết luận khuôn mặt đã đúng.', 'CHARACTER: Lan, a mountain walker.\nFACE: about 28, oval face, brown eyes.\nHAIR: black, exactly one braid.\nOUTFIT: mustard jacket, navy trousers, brown shoes.\nACCESSORY: one moss-green backpack.\n\nUse this description to inspect images; no new form is required. Two braids or a blue backpack do not match. For a back view, inspect hair, clothes and proportions; a hidden face cannot prove facial identity.');
  portrait.instruction = t('Tạo ảnh rõ mặt trước. Đây sẽ là ảnh bạn quay lại mỗi khi cần kiểm tra Lan có còn là cùng một người không.', 'Create a clear face portrait first. Return to this image whenever you need to check whether Lan is still the same person.');
  portrait.instructionPoints = locale === 'vi' ? [
    'Trong Codex: mở chat mới và yêu cầu dùng GPT Image để tạo ảnh theo prompt bên dưới. Trong Gemini: chọn chức năng tạo ảnh mà tài khoản hỗ trợ rồi dùng cùng prompt. Chỉ cần chọn một cách.',
    'Sao chép một bản prompt, Việt hoặc Anh. Đây là yêu cầu tạo ảnh mới; chưa có ảnh Lan thì không cần đính kèm ảnh.',
    'Mở kết quả ở kích thước lớn. Kiểm tra mắt, đường tóc, bím tóc và da; tránh chọn ảnh có mặt bị che, nhòe hoặc nét mặt quá khác giữa các lần thử.',
    'Chọn một ảnh đạt và tải bản gốc về thành 01-character/lan-portrait.png. Không lấy ảnh chụp màn hình có nút giao diện.',
    'Các ảnh mẫu bên dưới đã có sẵn để tham khảo. Prompt thực hành không được ghi là đã thử chỉ vì có ảnh minh họa.',
  ] : [
    'In Codex, open a chat and ask GPT Image to generate an image with the prompt below. In Gemini, select the image feature your account supports and use the same prompt. Choose one route.',
    'Copy one prompt language. This makes a new image; if Lan does not exist yet, no image attachment is required.',
    'Open the result at full size. Inspect eyes, hairline, braid and skin. Avoid an obscured or blurred face and inconsistent facial features.',
    'Choose one acceptable portrait and download the original as 01-character/lan-portrait.png. Do not save an interface screenshot.',
    'The supplied images are references you can inspect. Their presence does not mean the practice prompt has been tested.',
  ];
  portrait.title = t('Ảnh 1: cận mặt rõ nét trên nền xám', 'Image 1: a clear face close-up on gray');
  portrait.prompt = 'Create one photorealistic facial identity reference of Lan, a Vietnamese woman aged about 28 with an oval face, brown eyes and black hair tied into one braid. Tight front-facing head-and-neck close-up: include the entire head, hairline, ears and chin, with the face filling most of the image. Neutral expression, eyes open and looking at the camera. Show skin texture and facial features clearly. Plain medium-gray background, soft even studio lighting, no harsh shadows. No hair covering the eyes, no sunglasses, no hat, no beauty filter, no text, no collage. Do not show the full body or showcase clothing. One person, one image.';
  portrait.promptVi = 'Tạo một ảnh chân thực làm chuẩn khuôn mặt cho Lan, phụ nữ Việt Nam khoảng 28 tuổi, mặt trái xoan, mắt nâu, tóc đen buộc thành một bím. Cận mặt chính diện, chỉ lấy đầu và cổ: giữ trọn đầu, chân tóc, tai và cằm; khuôn mặt chiếm phần lớn ảnh. Biểu cảm tự nhiên, mắt mở nhìn vào máy. Thấy rõ đường nét mặt và kết cấu da. Nền xám trung tính, ánh sáng studio mềm và đều, không bóng gắt. Không tóc che mắt, kính râm, mũ, làm mịn da, chữ hay ghép nhiều ô. Không lấy toàn thân hoặc tập trung vào quần áo. Một người trong một ảnh.';
  portrait.promptLanguage = 'en';
  portrait.promptEvidence = t('Prompt cận mặt mới để thực hành, chưa chạy thử. Ảnh mẫu có sẵn được tạo trước lần sửa này.', 'New face close-up practice prompt; not yet test-run. Existing samples predate this revision.');
  portrait.instructionPoints![2] = t('Mở ảnh ở kích thước lớn: cả hai mắt, mũi, miệng, cằm và chân tóc phải rõ, không bị che. Ảnh này dùng để nhận diện khuôn mặt, không dùng để kiểm tra toàn bộ bím tóc hay trang phục.', 'Inspect the full-size image: both eyes, nose, mouth, chin and hairline must be clear and unobscured. This image establishes facial identity, not the complete braid or outfit.');
  lesson.steps.splice(2, 0, {
    title: t('Ảnh 2: bộ trang phục trên người mẫu vô hình (ghost mannequin)', 'Image 2: ghost-mannequin outfit reference'),
    tool: 'Codex · GPT Image / Gemini',
    instruction: t('Ảnh này chỉ làm chuẩn trang phục. Quần áo giữ dáng như đang được mặc, nhưng không có người hay ma-nơ-canh bên trong.', 'This image establishes clothing only. The garments hold their worn shape, with no person or visible mannequin inside.'),
    instructionPoints: [
      t('Tạo ảnh mới bằng prompt bên dưới; không cần đính kèm chân dung vì ảnh này không có khuôn mặt hoặc da.', 'Generate a new image with the prompt below. No portrait attachment is needed because this image contains no face or skin.'),
      t('Giữ đủ áo, quần, hai giày và ba lô. Cổ áo và đầu tay áo phải rỗng; không còn cổ, bàn tay hay phần cơ thể nào.', 'Keep the entire jacket, trousers, both shoes and backpack. The collar and sleeve openings must be empty, with no neck, hands or other body parts.'),
      t('Dùng nền xám và ánh sáng mềm đều. Chọn góc chếch nhẹ để nhìn rõ dây và phần bên của ba lô.', 'Use a gray background and soft even lighting. Choose a slight three-quarter angle to reveal the straps and side of the backpack.'),
      t('Lưu thành lan-outfit.png. Giữ ảnh mặt và ảnh bộ đồ thành hai file riêng; sang bước tiếp theo mới đính kèm cả hai để tạo Lan mặc đúng bộ đồ.', 'Save as lan-outfit.png. Keep the face and outfit in separate files; attach both in the next step to create Lan wearing this outfit.'),
    ],
    prompt: "Create one photorealistic ghost-mannequin outfit reference for a female mountain walker. Show only a mustard-yellow hiking jacket, navy trousers, a pair of brown hiking shoes and one moss-green backpack. Arrange the clothes in a natural upright wearing position with realistic adult proportions as if worn by an invisible person. Empty jacket collar and empty sleeve openings; no visible mannequin, head, face, neck, skin, hands, arms or human body anywhere. Sleeves hang naturally slightly away from the jacket. Slight three-quarter view so the backpack straps and side are visible. Include the complete outfit from the top of the jacket collar to the soles of both shoes, with gray space above and below. Plain medium-gray studio background, soft even lighting, realistic fabric texture, clear garment colors. No logos, text, collage, scenery or extra items. One complete outfit in one image.",
    promptVi: "Tạo một ảnh tham chiếu trang phục chân thực kiểu người mẫu vô hình (ghost mannequin) cho một phụ nữ đi bộ đường núi. Chỉ có áo khoác vàng mù tạt, quần xanh than, một đôi giày đi bộ màu nâu và một ba lô xanh rêu. Sắp xếp quần áo theo dáng đứng tự nhiên, tỷ lệ người lớn, như được mặc bởi một người vô hình. Cổ áo và đầu tay áo rỗng; không thấy ma-nơ-canh, đầu, mặt, cổ, da, bàn tay, cánh tay hay bất kỳ phần cơ thể nào. Tay áo buông tự nhiên, hơi tách khỏi thân áo. Góc chếch nhẹ ba phần tư để thấy dây và phần bên của ba lô. Giữ trọn bộ đồ từ đỉnh cổ áo đến hết đế hai giày, có khoảng nền xám ở trên và dưới. Nền studio xám trung tính, ánh sáng mềm đều, rõ chất vải và màu trang phục. Không logo, chữ, ghép nhiều ô, phong cảnh hoặc đồ thừa. Một bộ đồ hoàn chỉnh trong một ảnh.",
    promptLanguage: 'en',
    promptKind: 'image',
    promptEvidence: t('Prompt thực hành mới, chưa chạy thử; chưa có ảnh mẫu cho khung trang phục không mặt.', 'New practice prompt, not yet test-run; no sample is available for this face-excluded outfit framing.'),
    save: '01-character/lan-outfit.png',
  });
  sheet.title = t('Ghép hai tham chiếu thành bảng góc nhìn của Lan', 'Build Lan’s view sheet from both references');
  sheet.instruction = t('Đính kèm hai ảnh: lan-portrait.png làm chuẩn mặt và lan-outfit.png làm chuẩn trang phục, rồi dùng prompt bên dưới. Bảng góc nhìn là bước ghép hai phần lại thành cùng một Lan.', 'Attach both lan-portrait.png for facial identity and lan-outfit.png for clothing, then use the prompt below. The view sheet brings both references together as the same Lan.');
  sheet.prompt = 'Reference image 1 is the face; reference image 2 is the outfit. Preserve facial identity from image 1 and clothing, shoes and backpack from image 2. ' + sheet.prompt;
  sheet.promptVi = 'Ảnh tham chiếu 1 là khuôn mặt; ảnh 2 là trang phục. Giữ nhận diện khuôn mặt từ ảnh 1, quần áo, giày và ba lô từ ảnh 2. ' + sheet.promptVi;
  sheet.promptEvidence = t('Prompt đã sửa để dùng hai ảnh tham chiếu, chưa chạy thử bản mới. Bảng mẫu hiện có được tạo bằng quy trình trước.', 'Revised two-reference prompt, not yet test-run. The existing sample sheet was generated using the earlier workflow.');
  sheet.instructionPoints = locale === 'vi' ? [
    'Chờ ảnh đính kèm hiện thành hình thu nhỏ rồi mới gửi prompt. Nếu công cụ không nhận ảnh tham chiếu, dùng cách tạo ảnh còn lại hoặc bộ mẫu.',
    'Bảng của bài này gồm bốn góc: chính diện (front), nghiêng (side), sau lưng (back) và chếch ba phần tư (three-quarter). Mỗi ô phải thấy đủ đầu và giày.',
    'So mặt ở góc chính diện và chếch với chân dung. So áo, quần, giày, bím tóc và ba lô giữa các ô. Ở góc sau, kiểm tra ba lô và tóc; không yêu cầu thấy mặt.',
    'Nếu bảng tạo ra nhiều người khác nhau, thử từng góc riêng với cả ảnh mặt và ảnh trang phục đính kèm. Không lấy góc đã sai để tạo tiếp góc sau.',
    'Tải bảng đạt về thành lan-turnaround.png. Ảnh này để đối chiếu; không tải nguyên bảng nhiều ô vào ô ảnh đầu của Seedance.',
  ] : [
    'Wait for the attachment thumbnail before sending the prompt. If the tool cannot accept image references, use the other image route or the supplied pack.',
    'This exercise uses four views: front, side, back and three-quarter. Keep the entire head and both shoes inside each panel.',
    'Compare visible faces with the portrait. Compare clothes, shoes, braid and backpack across panels. In the back view, inspect the backpack and hair rather than demanding a visible face.',
    'If the sheet looks like several people, generate views separately using both the approved face and outfit references. Do not build a new angle from an already incorrect one.',
    'Download the accepted sheet as lan-turnaround.png. Use it for comparison, not as a multi-panel starting frame in Seedance.',
  ];
  repair.instruction = t('Chỉ sửa khi có lỗi thật. Sau khi duyệt bảng, tách một ảnh chính diện toàn thân để dùng ở bài 3.', 'Repair only a real defect. After approving the sheet, separate a front full-body image for Module 3.');
  repair.instructionPoints = locale === 'vi' ? [
    'Ví dụ bím tóc sai: tải ảnh cần sửa làm ảnh 1, chân dung đã duyệt làm ảnh 2, rồi dùng prompt sửa bên dưới. Nếu lỗi là áo hoặc ba lô, thay yêu cầu sửa tóc bằng đúng lỗi đó.',
    'Mỗi lượt sửa một chi tiết. Kiểm tra lại cả khuôn mặt và những phần phải giữ nguyên; lưu bản mới với tên có v02, không ghi đè bản đã duyệt.',
    'Khi bảng đạt, mở bằng công cụ cắt ảnh trên máy. Cắt riêng ô chính diện, giữ cả đầu và giày, bỏ các ô bên cạnh rồi lưu lan-full.png.',
    'Nếu ô chính diện quá nhỏ hoặc mờ, tạo một ảnh toàn thân riêng với cả lan-portrait.png và lan-outfit.png đã duyệt. Đừng kéo giãn ảnh nhỏ rồi coi đó là thêm chi tiết.',
    'Ảnh so sánh ba lô bên dưới minh họa cách sửa một chi tiết. Prompt sửa tóc là một bài luyện khác; nó chưa có kết quả minh chứng riêng.',
  ] : [
    'For an incorrect braid, attach the faulty image as image 1 and the approved portrait as image 2, then use the repair prompt. If the defect is clothing or the backpack, replace the hair request with that specific defect.',
    'Change one detail per attempt. Recheck the face and everything meant to stay unchanged. Save a v02 file without overwriting the approved original.',
    'Once the sheet passes, open it in your computer’s crop tool. Crop the front panel with the full head and shoes, remove neighboring panels and save lan-full.png.',
    'If the front panel is too small or blurred, generate a separate full-body view using both the approved lan-portrait.png and lan-outfit.png. Stretching a small image does not add detail.',
    'The backpack comparison below illustrates a single-detail repair. The hair-repair prompt is a separate exercise without its own demonstrated result.',
  ];
  review.title = t('Duyệt bộ tham chiếu trước khi sang bài 3', 'Approve the reference pack before Module 3');
  review.instruction = t('Mở lan-portrait.png, lan-outfit.png, lan-turnaround.png và lan-full.png cạnh nhau. Nếu dùng trọn bộ mẫu có sẵn thì không bắt buộc có lan-outfit.png. Chỉ chuyển sang ghép cảnh khi bộ ảnh nhất quán.', 'Open lan-portrait.png, lan-outfit.png, lan-turnaround.png and lan-full.png side by side. The complete supplied sample route does not require lan-outfit.png. Proceed to scene composition only when they agree.');
  review.instructionPoints = locale === 'vi' ? [
    'Đúng mặt: so mắt, dáng mặt và chân tóc ở các góc có thấy mặt. Nếu chưa chắc, đánh dấu cần xem lại, đừng chọn chỉ vì ảnh đẹp.',
    'Đúng trang phục: áo vàng mù tạt, quần xanh than, giày nâu và ba lô xanh rêu. Kiểm tra dây ba lô và số bím tóc.',
    'Ảnh dùng được: đủ đầu và giày, không dính tay/chân vào đồ vật, không chữ hoặc người thừa. Bản toàn thân chỉ có một người trong một khung.',
    'Giữ các file đã duyệt trong 01-character. Nếu sửa, giữ cả bản cũ và bản mới để so; chọn rõ một bản sẽ dùng ở bài 3.',
    'Nếu dùng Higgsfield và có Create Element, bạn có thể lưu bộ ảnh đã duyệt thành một tài sản tên Lan để tìm lại. Đây là tùy chọn; ở Codex/Gemini chỉ cần giữ file và đính kèm lại khi dùng. Không giả định ChatGPT/Claude tự nhìn thấy ảnh vừa lưu ở ứng dụng khác.',
    'Muốn thử đổi trang phục thì làm bản riêng sau bài chính: đính kèm chân dung đã duyệt, mô tả đúng phần quần áo cần đổi và kiểm tra lại mặt. Không trộn bản đó vào ba cảnh đang dùng áo vàng.',
  ] : [
    'Face: compare eyes, face shape and hairline in views where they are visible. Mark uncertain details for review instead of accepting an image just because it looks attractive.',
    'Outfit: mustard jacket, navy trousers, brown shoes and moss-green backpack. Check the straps and number of braids.',
    'Usability: full head and shoes, no fused limbs, extra text or extra people. The separate full-body image contains one person in one frame.',
    'Keep the approved files in 01-character. Keep old and revised versions for comparison and explicitly choose the version for Module 3.',
    'If Higgsfield offers Create Element, optionally save the approved pack as a reusable asset named Lan. In Codex/Gemini, keeping the files and attaching them again is enough. Do not assume ChatGPT/Claude sees images saved in another app.',
    'Try a different outfit separately after the core exercise: attach the approved portrait, describe only the clothing change and recheck the face. Do not mix that variation into the three mustard-jacket shots.',
  ];
  lesson.checks = [
    t('Tôi có ảnh cận mặt làm chuẩn nhận diện và ảnh trang phục kiểu người mẫu vô hình; hoặc đã chọn dùng trọn bộ mẫu.', 'I have a face close-up and a ghost-mannequin outfit reference, or have chosen the complete supplied sample pack.'),
    t('Bảng góc nhìn và ảnh toàn thân giữ đúng mặt ở góc nhìn thấy, tóc, trang phục và ba lô.', 'The sheet and full-body image match the visible face, hair, outfit and backpack.'),
    t('lan-full.png là ảnh đơn đủ đầu và giày, không có ô bên cạnh.', 'lan-full.png is a single image with the head and shoes intact and no neighboring panel.'),
    t('Tôi biết các ảnh này dùng để tham chiếu; khung đầu của cảnh sẽ ghép ở bài 3.', 'I know these are references; the scene’s starting frame is composed in Module 3.'),
  ];
  lesson.example = {
    title: t('Tham khảo cách chuẩn bị tư liệu của Higgsfield', 'Reference: Higgsfield’s asset preparation'),
    text: t('Bài này vận dụng cách chuẩn bị nhân vật trước khi tạo video từ bài phân tích của Higgsfield. Các hướng dẫn và prompt ở đây được viết cho Lan. Bài nguồn nói về Seedance 2.0 4K; các thông số và nhận xét chất lượng của họ không được coi là bảo đảm cho Seedance 2.5. Ảnh minh họa hiện có giữ nguyên nguồn gốc; không có ảnh hay video mới được tạo trong lần cập nhật này.', 'This lesson adapts asset-first character preparation from Higgsfield’s breakdown into exercises for Lan. The source covers Seedance 2.0 4K; its specifications and quality claims are not guarantees for Seedance 2.5. Existing examples retain their provenance; this update generated no new images or videos.'),
    href: 'https://higgsfield.ai/blog/seedance4k-breakdown',
    hrefLabel: t('Đọc bài tham khảo của Higgsfield', 'Read the Higgsfield reference'),
  };
  const faceSrc = '/api/workshop/examples/sd25-lan-face-gray-v2.png';
  const outfitSrc = '/api/workshop/examples/sd25-lan-outfit-ghost-v3.png';
  const outfit = lesson.steps.find(step => step.save === '01-character/lan-outfit.png')!;
  delete portrait.visualTarget;
  portrait.media = [{ label: t('Ảnh mẫu mới: cận mặt trên nền xám', 'New sample: face close-up on gray'), src: faceSrc, kind: 'image', width: 1312, height: 1199 }];
  portrait.promptEvidence = t('Đã tạo bằng GPT Image trong Codex với prompt tiếng Anh, sau đó chỉnh khung một lượt để giữ trọn đỉnh đầu. Bản tiếng Việt là bản dịch, chưa chạy thử.', 'Generated with GPT Image in Codex using the English prompt, then reframed once to include the top of the head. The Vietnamese translation is not yet test-run.');
  portrait.resultReview = t('Kết quả: rõ hai mắt, mũi, miệng, cằm và chân tóc; có khoảng nền xám phía trên đầu. Lượt đầu bị cắt đỉnh đầu nên đã yêu cầu chỉnh khung. Prompt chỉnh: “Adjust only framing of this portrait: zoom out slightly to include the entire top of the hair/head with a small visible margin of gray background above it, both ears and chin. Keep the exact same face, skin texture, expression, hairstyle, gray background and even lighting. Still a tight head-and-neck close-up, no full body or clothing showcase.”', 'Review: clear eyes, nose, mouth, chin and hairline, with gray space above the head. The first result cropped the crown, so one framing correction was requested: “Adjust only framing of this portrait: zoom out slightly to include the entire top of the hair/head with a small visible margin of gray background above it, both ears and chin. Keep the exact same face, skin texture, expression, hairstyle, gray background and even lighting. Still a tight head-and-neck close-up, no full body or clothing showcase.”');
  portrait.instructionPoints![4] = t('Ảnh mới bên dưới là kết quả thực hành. Có thể tải về làm lan-portrait.png rồi dùng với ảnh trang phục mới ở bước tiếp theo.', 'The new image below is the practice result. Download it as lan-portrait.png and pair it with the new outfit sample in the next step.');
  outfit.media = [{ label: t('Ảnh mẫu: bộ đồ trên người mẫu vô hình', 'Sample: ghost-mannequin outfit'), src: outfitSrc, kind: 'image', width: 1024, height: 1536 }];
  delete outfit.referenceImages;
  lesson.visualExamples = [{
    id: 'lan-face-and-ghost-outfit',
    title: t('Hai ảnh tham chiếu: bộ đồ và khuôn mặt', 'Two references: outfit and face'),
    instruction: t('Bên trái chỉ là bộ đồ; bên phải là khuôn mặt. Dùng hai file riêng ở bước tạo bảng góc nhìn, để AI biết lấy trang phục và nhận diện từ đâu.', 'The left image contains clothing only; the right establishes facial identity. Use the two separate files when generating the view sheet so the model has a clear source for each.'),
    settings: t('GPT Image trong Codex · nền xám · prompt tiếng Anh. Ảnh mặt có một lượt chỉnh khung; ảnh bộ đồ tạo mới, không đính kèm ảnh.', 'GPT Image in Codex · gray background · English prompts. Face: one framing correction. Outfit: generated without an image attachment.'),
    review: t('Chỉ có ảnh mặt chứa người. Ảnh trang phục có cổ áo và tay áo rỗng, đủ áo, quần, hai giày và ba lô. Đây là bộ tham chiếu mới, chưa tạo bảng góc nhìn hoặc video.', 'Only the face image contains a person. The outfit has empty collar and sleeve openings, with jacket, trousers, both shoes and backpack intact. This new pair has not yet been used for a view sheet or video.'),
    inputs: [],
    outputs: [outfit.media[0], portrait.media[0]],
  }, ...(lesson.visualExamples ?? [])];
  outfit.promptEvidence = t('Đã tạo bằng GPT Image trong Codex với đúng prompt tiếng Anh bên dưới không đính kèm ảnh tham chiếu. Bản tiếng Việt chưa chạy thử.', 'Generated with GPT Image in Codex using the exact English prompt below with no image attachment. The Vietnamese translation is not yet test-run.');
  outfit.resultReview = t('Kết quả: chỉ có bộ đồ, không có đầu, cổ, da hoặc bàn tay; đủ hai giày; áo vàng, quần xanh than, giày nâu và ba lô xanh rêu rõ trên nền xám. Bộ hai ảnh mới này chưa được dùng để tạo bảng góc nhìn hoặc video. Khi theo bộ mới, hãy tạo bảng góc nhìn ở bước sau; không ghép mặt mới vào bảng Lan cũ có sẵn.', 'Review: clothing only, with no head, neck, skin or hands; both shoes visible; mustard jacket, navy trousers, brown shoes and moss-green backpack against gray. This new pair has not yet been used to generate a view sheet or video. If following the new pair, generate the view sheet next; do not mix the new face with the older supplied Lan sheet.');
  lesson.example.text = t('Bài này vận dụng cách chuẩn bị nhân vật của Higgsfield cho Lan. Bài nguồn nói về Seedance 2.0 4K. Hai ảnh mẫu mới ở bước 2–3 được tạo bằng GPT Image trong Codex; bảng góc nhìn và các cảnh có sẵn vẫn thuộc bộ Lan trước đó.', 'This lesson adapts Higgsfield’s character preparation for Lan. The source covers Seedance 2.0 4K. The new samples in steps 2–3 were generated with GPT Image in Codex; the existing view sheet and scenes belong to the earlier Lan pack.');
  // Replace the earlier portrait/turnaround examples together to avoid mixing identities.
  const turnaroundSrc = '/api/workshop/examples/sd25-lan-turnaround-v3.png';
  delete choose.visualTarget;
  delete sheet.visualTarget;
  delete repair.visualTarget;
  delete review.visualTarget;
  repair.instructionPoints![4] = t('Dùng bảng mới trong bước trước để luyện sửa. Nếu chưa thấy lỗi thì bỏ qua prompt sửa tóc và chỉ cắt ô chính diện; không cần tạo lỗi để làm đủ bước.', 'Use the new sheet from the previous step for repair practice. If you find no defect, skip the hair-repair prompt and crop the front panel; do not introduce a defect just to complete the exercise.');
  sheet.referenceImages = [{ label: '1 · lan-portrait.png', src: faceSrc }, { label: '2 · lan-outfit.png', src: outfitSrc }];
  sheet.media = [{ label: t('Lan: chính diện · nghiêng · sau lưng · ba phần tư', 'Lan: front · side · back · three-quarter'), src: turnaroundSrc, kind: 'image', width: 1536, height: 1024 }];
  sheet.promptEvidence = t('Đã tạo bằng GPT Image trong Codex với đúng prompt tiếng Anh và hai ảnh đầu vào bên dưới. Bản tiếng Việt chưa chạy thử.', 'Generated with GPT Image in Codex using the exact English prompt and both inputs below. The Vietnamese translation is not yet test-run.');
  sheet.resultReview = t('Bảng mới có bốn cột, từ trái sang phải: chính diện, nghiêng, sau lưng và ba phần tư. Đủ đầu và giày ở mỗi ô; áo vàng, quần xanh than, giày nâu và ba lô xanh rêu nhất quán. So khuôn mặt ở ô chính diện và ba phần tư với chân dung. Góc sau dùng để kiểm tra ba lô và tóc; các chi tiết phía sau không có trong ảnh đầu vào là phần AI suy ra, cần duyệt trước khi dùng. Chưa thử bộ này trong Seedance.', 'The new sheet has four columns: front, side, back and three-quarter. Heads and shoes are intact, with consistent mustard jacket, navy trousers, brown shoes and moss-green backpack. Compare the front and three-quarter faces against the portrait. Use the back view to inspect backpack and hair; unseen rear details are inferred by the model and need approval. This pack has not been tested in Seedance.');
  lesson.visualExamples = lesson.visualExamples!.filter(example => !['sd25-portrait', 'sd25-turnaround'].includes(example.id));
  lesson.visualExamples[0].review = t('Hai ảnh này là đầu vào thực tế của bảng góc nhìn mới bên dưới. Giữ riêng từng file để tải lên đúng thứ tự.', 'These are the actual inputs used for the new view sheet below. Keep them as separate files and upload them in the stated order.');
  lesson.visualExamples.push({ id: 'lan-turnaround-v3', title: t('Kết quả: Lan từ hai ảnh tham chiếu mới', 'Result: Lan from the two new references'), instruction: sheet.instruction, promptEn: sheet.prompt, promptVi: sheet.promptVi, settings: sheet.promptEvidence, inputs: sheet.referenceImages, outputs: sheet.media, review: sheet.resultReview });
  outfit.resultReview = t('Bộ đồ có cổ áo và tay áo rỗng, không có da hay cơ thể, đủ hai giày và ba lô. Ảnh này cùng chân dung mới đã được dùng để tạo bảng góc nhìn ở bước tiếp theo.', 'The outfit has empty collar and sleeve openings, no skin or body, and complete shoes and backpack. It and the new portrait were used to generate the view sheet in the next step.');
  choose.instructionPoints![3] = t('Dùng bộ mẫu mới: tải ảnh cận mặt, bộ đồ ghost mannequin và bảng góc nhìn trong bài này. Ở bước 5, cắt ô chính diện của bảng mới thành lan-full.png.', 'Use the new sample pack: download the face close-up, ghost-mannequin outfit and view sheet in this lesson. In step 5, crop the front panel of the new sheet as lan-full.png.');
  lesson.example.text = t('Bài này vận dụng cách chuẩn bị nhân vật của Higgsfield cho Lan. Bài nguồn nói về Seedance 2.0 4K. Chân dung, bộ đồ và bảng góc nhìn trong bài 2 là bộ mới tạo bằng GPT Image trong Codex. Các cảnh mẫu ở những bài sau vẫn thuộc bộ Lan trước đó; khi theo bộ mới, hãy tạo lại cảnh bằng bộ tham chiếu này.', 'This lesson adapts Higgsfield’s character preparation for Lan; the source covers Seedance 2.0 4K. Module 2 now uses the new GPT Image portrait, outfit and view sheet. Sample scenes in later modules still belong to the earlier Lan pack; when following the new pack, recreate scenes using these references.');
  // Present one combined sheet; keep original files available for reproducing each exercise.
  for (const step of [portrait, outfit, sheet]) {
    step.downloads = [...(step.downloads ?? []), ...(step.media ?? []).map(output => ({ label: output.label, src: output.src }))];
    delete step.media;
  }
  portrait.instructionPoints![4] = t('Xem ô cận mặt trong bảng tổng hợp cuối bài. File chân dung gốc vẫn có ở nút tải của bước này để bạn dùng làm đầu vào.', 'See the face panel in the combined sheet at the end. The original portrait remains downloadable in this step for use as an input.');
  lesson.visualExamples = [{
    id: 'lan-master-sheet-v4',
    title: t('Lan — một bảng nhân vật hoàn chỉnh', 'Lan — one complete character sheet'),
    instruction: t('Một ảnh gồm sáu ô. Hàng trên: cận mặt, bộ đồ ghost mannequin, chính diện. Hàng dưới: nghiêng, sau lưng, góc ba phần tư. Bấm vào ảnh để xem lớn hoặc tải toàn bộ bảng.', 'One image with six panels. Top: face close-up, ghost-mannequin outfit, front view. Bottom: side, back, three-quarter. Open the image at full size or download the complete sheet.'),
    promptEn: masterSheet.promptEn,
    settings: t('GPT Image trong Codex · tạo từ ba file đã duyệt · prompt tiếng Anh. Đây là ảnh được AI tạo lại theo bố cục tổng hợp, không phải ghép pixel nguyên bản. Các prompt tiếng Việt ở các bước trước chưa chạy thử.', 'GPT Image in Codex · generated from three approved files · English prompt. This is a generated composite, not a pixel-exact collage. The Vietnamese translation is not yet test-run for the earlier exercises.'),
    inputs: masterSheet.inputs.map((file, index) => ({ label: `${index + 1} · ${file}`, src: `/api/workshop/examples/${file}` })),
    outputs: [{ label: t('Tải bảng tổng hợp Lan — 6 ô', 'Lan complete sheet — 6 panels'), src: `/api/workshop/examples/${masterSheet.output}`, kind: 'image', width: masterSheet.width, height: masterSheet.height }],
    review: t('Đủ khuôn mặt, bộ đồ và bốn góc nhìn trên cùng nền xám. AI đã thêm phần cổ áo vào ô cận mặt khi sắp lại bố cục. Dùng bảng để xem và đối chiếu; file gốc vẫn nằm ở từng bước. Khi cần một khung đầu video, hãy dùng ảnh đơn đã ghép cảnh, không đưa cả bảng sáu ô vào ô ảnh đầu.', 'Face, outfit and four views share one gray-background sheet. The model added a jacket collar to the face panel while recomposing. Use the sheet for inspection; original inputs remain available in their steps. For a video starting frame, use a single composed scene rather than this six-panel sheet.'),
  }];

}
