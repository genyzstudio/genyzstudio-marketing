import type { PromptPair } from './workshop-seedance-masterclass-prompts';

/** Authored exercises; each media run is evidenced separately in the asset manifest. */
export const seedance25Prompts = {
  composeThree: [
    'Ảnh 1 là cảnh chòi đã có đúng một đèn tắt trên ghế. Ảnh 2 là chân dung chuẩn Lan. Ảnh 3 là ảnh toàn thân Lan. Giữ nguyên camera, chòi, ghế, đèn, cây, đường và ánh sáng của ảnh 1. Thêm đúng một Lan gần lối vào, bên trái ghế; giữ mặt từ ảnh 2, trang phục và ba lô từ ảnh 3. Chừa lối đi tới ghế. Một khung phim 16:9, không chia ô, không thêm người hoặc đèn.',
    'Image 1 is the shelter scene with exactly one unlit lantern already on the bench. Image 2 is Lan’s approved portrait. Image 3 is her full-body reference. Preserve image 1’s camera, shelter, bench, lantern, tree, path and light. Add exactly one Lan near the entrance, left of the bench; use image 2 for face and image 3 for outfit and backpack. Leave a clear route to the bench. One 16:9 film frame, no panels, extra people or extra lanterns.',
  ],
  composeTwo: [
    'Ảnh 1 là chòi đã ghép một đèn tắt trên ghế. Ảnh 2 là ảnh toàn thân Lan đã duyệt. Giữ camera, địa hình, đèn và ánh sáng ảnh 1. Thêm một Lan từ ảnh 2 gần lối vào, bên trái ghế, đủ đầu và chân; giữ mặt và trang phục nhìn thấy trong ảnh 2. Một khung 16:9, không chia ô. Không suy đoán ảnh thứ ba. Nếu mặt quá nhỏ để giữ nhận diện, dừng và yêu cầu ảnh chuẩn rõ hơn.',
    'Image 1 is the shelter with one unlit lantern already on the bench. Image 2 is the approved full-body Lan reference. Preserve image 1’s camera, geometry, lantern and light. Add one Lan from image 2 near the entrance, left of the bench, head and feet visible; preserve the visible face and clothing from image 2. One 16:9 frame, no panels. Do not assume a third image. If the face is too small to preserve identity, stop and ask for a clearer reference.',
  ],
  sceneProp: [
    'Ảnh 1 là chòi trống; ảnh 2 là đèn tắt. Giữ ảnh 1 làm nền và camera. Thêm đúng một đèn từ ảnh 2 lên mặt ghế bên phải, kích thước hợp lý, tiếp xúc mặt ghế và bóng đổ khớp ánh sáng. Không người, không thay kiến trúc, không chữ.',
    'Image 1 is the empty shelter; image 2 is the unlit lantern. Preserve image 1’s background and camera. Place exactly one lantern from image 2 on the right bench at a plausible scale, with contact and shadow matching the light. No people, architecture changes or text.',
  ],
  assistantTutor: [
    'Tôi muốn viết prompt Seedance 2.5 cho brief mới: [một nhân vật, nơi chốn, hành động]. Trước hết hỏi tối đa ba điều thật sự thiếu về ảnh, chế độ hoặc hành động. Sau câu trả lời, lập bảng file → vai trò → ô tải; viết một prompt ngắn; tách thiết lập giao diện; giải thích chức năng từng câu. Không tự thêm ảnh, thẻ, tính năng, camera hoặc lời thoại. Chỉ ra điều chưa chắc và ba lỗi tôi cần kiểm tra. Tôi sẽ duyệt trước khi tạo.',
    'Help me write a Seedance 2.5 prompt for this new brief: [one subject, place and action]. First ask up to three genuinely missing questions about assets, mode or action. After my answer, map file → role → upload slot, write one short prompt, separate interface settings, and explain each sentence’s purpose. Do not invent images, tags, features, camera moves or dialogue. Identify uncertainty and three output checks. I will review before generating.',
  ],
  cameraPush: [
    'Dùng ảnh đính kèm làm khung đầu. Lan đứng yên cạnh ghế, đèn tắt không di chuyển. Camera tiến chậm thẳng tới Lan, từ toàn thân tới trung cảnh, không zoom quang học, không xoay hoặc đổi hướng. Giữ nhận diện, trang phục và địa hình. Chuyển động chậm đều, một cảnh liên tục, không thoại, nhạc hoặc chữ.',
    'Use the attached image as the starting frame. Lan stays still beside the bench; the unlit lantern stays in place. The camera slowly moves straight toward Lan from a full-body view toward a medium view, without an optical zoom, orbit or direction change. Preserve identity, clothes and geometry. Slow steady movement, one continuous shot, no dialogue, music or text.',
  ],
  omni: [
    'Ảnh chân dung đính kèm chỉ định mặt Lan; ảnh toàn thân chỉ định áo và ba lô; ảnh chòi chỉ định địa điểm và vị trí ghế. Không lấy nền xám từ ảnh nhân vật. Tạo một cảnh tại chòi: Lan đứng cạnh ghế, quay nhẹ đầu nhìn con đường xuống thung lũng. Camera ngang mắt cố định, trung cảnh, ánh sáng chiều mềm. Không chia ô, không người thứ hai, không thoại hoặc nhạc. Chỉ dùng các file thực sự có trong danh sách tải lên.',
    'The attached portrait defines Lan’s face; the full-body image defines outfit and backpack; the shelter image defines the location and bench position. Do not copy the character images’ gray background. Create one scene in the shelter: Lan stands beside the bench and gently turns her head toward the valley path. Fixed eye-level medium view, soft afternoon light. No panels, second person, dialogue or music. Use only files actually present in the upload list.',
  ],
  endpoints: [
    'Ảnh đầu và ảnh cuối là cùng Lan trong cùng chòi, cùng camera. Chuyển động duy nhất là Lan quay đầu từ đèn ra đường xuống thung lũng. Giữ chân, ghế và đèn sáng đúng chỗ. Nối tư thế tự nhiên giữa hai ảnh, không biến hình, cắt cảnh, đổi trang phục hoặc thêm người. Nếu hai ảnh không cùng địa hình, tôi sẽ sửa ảnh trước khi tạo.',
    'The first and last images show the same Lan, shelter and camera. The only action is Lan turning her head from the lantern toward the valley path. Preserve feet, bench and lit lantern positions. Connect the poses naturally, without morphing, cuts, clothing changes or extra people. If the images have incompatible geometry, I will repair them before generating.',
  ],
  sequence: [
    'Lập video ba shot nối nhau, tổng thời lượng tôi chọn trong giao diện. Shot 1: toàn cảnh Lan tới ghế, đèn tắt. Shot 2: cận đèn sáng lên, Lan ngoài khung. Shot 3: trung cảnh Lan nhìn ra con đường xuống thung lũng, đèn vẫn sáng ở cạnh khung nếu thấy. Giữ Lan, chòi, thời gian trong ngày, hướng nhìn và trạng thái đạo cụ. Chỉ cắt giữa ba shot đã nêu; không thêm sự kiện, thoại hoặc nhạc. Mốc nhịp là định hướng, không phải bảo đảm thời gian chính xác.',
    'Create three connected shots within the duration selected in the interface. Shot 1: wide view, Lan approaches the bench, lantern unlit. Shot 2: close insert of the lantern glowing; Lan is outside the frame. Shot 3: medium view, Lan looks toward the valley path, lantern still lit at the frame edge if visible. Preserve Lan, shelter, time of day, eyeline and prop state. Cut only between these three shots; add no events, dialogue or music. Beats guide timing rather than guarantee exact timestamps.',
  ],
  extension: [
    'Kéo dài phần SAU của video đính kèm. Tiếp tục từ trạng thái cuối: Lan cạnh ghế, đèn đã sáng. Lan chỉ nhìn nhẹ về con đường xuống thung lũng rồi đứng yên. Giữ camera, nhân vật, ghế, vị trí đèn, ánh sáng và không khí. Không phát lại đoạn cũ, không đưa Lan về lối vào, không tắt đèn. Không thoại, nhạc hoặc chữ.',
    'Extend AFTER the attached video. Continue its ending state: Lan is beside the bench and the lantern is lit. Lan only shifts her gaze toward the valley path and holds still. Preserve camera, character, bench, lantern position, light and ambience. Do not replay the old action, reset Lan to the entrance or turn off the lantern. No dialogue, music or text.',
  ],
  timedEdit: [
    'Chỉnh video đính kèm. Trong đoạn [mốc bắt đầu]–[mốc kết thúc], chỉ sửa ba lô thành xanh rêu đúng ảnh chuẩn. Ngoài đoạn đó giữ nguyên. Trong đoạn sửa giữ mặt, áo vàng, tư thế, bước chân, camera, ghế, đèn, thời lượng và âm thanh. Không thêm góc cắt. Tôi sẽ kiểm tra cả phần trước, trong và sau đoạn sửa.',
    'Edit the attached video. Within [start time]–[end time], change only the backpack to the moss-green color in the reference. Preserve the rest. Inside the edit interval preserve face, mustard jacket, pose, steps, camera, bench, lantern, timing and audio. Add no cuts. I will inspect before, inside and after the edited interval.',
  ],
  perspective: [
    'Bài thử chỉnh góc nhìn: dùng video đính kèm, giữ nhân vật, hành động, nhịp, trang phục, đèn và bối cảnh. Chỉ đổi góc máy từ ngang mắt sang hơi thấp. Không thêm hành động hoặc đổi lời. Tôi sẽ so cả hình học và phần khuất mới xuất hiện; đây là tái tạo cảnh, không phải cắt ảnh đơn giản.',
    'Perspective-edit exercise: use the attached video and preserve character, action, timing, outfit, lantern and setting. Change only the camera viewpoint from eye level to slightly low. Add no action or speech changes. I will compare geometry and newly revealed areas; this reconstructs a scene rather than merely cropping it.',
  ],
  clay: [
    'Video mô hình khối đính kèm chỉ làm chuẩn cho camera, đường di chuyển, vị trí và nhịp. Ảnh Lan làm chuẩn cho nhận diện/trang phục; ảnh chòi làm chuẩn vật liệu và ánh sáng. Tạo cảnh chân thực, không giữ bề mặt xám của mô hình. Không đổi đường đi hoặc thứ tự hành động. Giữ một nhân vật, không thoại hoặc nhạc.',
    'Use the attached clay-model video only for camera, movement path, positions and timing. Use the Lan image for identity/outfit and the shelter image for materials and lighting. Render a realistic scene without retaining gray clay surfaces. Preserve the path and action order. One character, no dialogue or music.',
  ],
  diagnosis: [
    'Phân tích nhật ký này: [triệu chứng + mốc giây + mode + ảnh + prompt + chi phí]. Tách quan sát khỏi giả thuyết. Xếp tối đa ba nguyên nhân có thể, đề xuất kiểm tra rẻ nhất không tạo mới trước. Sau đó chọn một thay đổi và nêu phần giữ nguyên, dấu hiệu thành công, giới hạn chi phí và khi nào dừng. Nếu thiếu bằng chứng, nói chưa đủ; không khẳng định một câu prompt chắc chắn chữa được lỗi.',
    'Analyze this take log: [symptom + timestamp + mode + images + prompt + cost]. Separate observations from hypotheses. Rank at most three possible causes and suggest the cheapest check without a new generation first. Then choose one change and state invariants, success evidence, cost limit and stop condition. Say when evidence is insufficient; do not claim a particular phrase guarantees a fix.',
  ],
  capstone: [
    'Đóng vai biên tập viên góp ý cho brief mới của tôi: [brief]. Chỉ hỏi phần thiếu và phản biện kế hoạch; không tự thay ý tưởng bằng câu chuyện Lan. Kiểm tra kế hoạch shot, vai trò từng file, trạng thái đầu/cuối, camera, âm thanh, khả năng mode và ngân sách. Sau khi tôi tự chọn phương án, giúp viết prompt và chỉ ra giả định cần kiểm tra. Tôi quyết định và ghi lý do.',
    'Act as an editor reviewing my new brief: [brief]. Ask for missing details and challenge the plan; do not replace it with Lan’s story. Check shot plan, file roles, start/end state, camera, sound, mode support and budget. After I choose an approach, help write prompts and identify assumptions to test. I make and record the decisions.',
  ],
} satisfies Record<string, PromptPair>;
