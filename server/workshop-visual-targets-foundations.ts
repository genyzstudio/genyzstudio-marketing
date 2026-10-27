import type { Curriculum, WorkshopCourse } from './workshop-content';

type Locale = 'vi' | 'en';

type Target = {
  image: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  evidence: 'gpt-image-illustration' | 'existing-course-example';
};

const src = (name: string) => `/api/workshop/examples/${name}.png`;

function target(name: string, width: number, height: number, alt: [string, string], caption: [string, string], locale: Locale, evidence: Target['evidence'] = 'existing-course-example'): Target {
  return { image: src(name), width, height, alt: locale === 'vi' ? alt[0] : alt[1], caption: locale === 'vi' ? caption[0] : caption[1], evidence };
}

function asset(image: string, width: number, height: number, alt: [string, string], caption: [string, string], locale: Locale): Target {
  return { image, width, height, alt: locale === 'vi' ? alt[0] : alt[1], caption: locale === 'vi' ? caption[0] : caption[1], evidence: 'existing-course-example' };
}

/**
 * Add a small number of visual targets where a beginner needs to see a planned
 * result. Existing tested images, prompts and generated media are never changed.
 */
export function addFoundationVisualTargets(course: Curriculum, locale: Locale, courseId: WorkshopCourse): void {
  const lesson = (id: string) => course.lessons.find(item => item.id === id)!;
  const put = (id: string, index: number, value: Target) => {
    const step = lesson(id).steps[index] as { media?: unknown[]; testedExample?: unknown; visualTarget?: Target };
    // A tested image or inline media is already the most honest example.
    if (step.media?.length || step.testedExample) return;
    step.visualTarget = value;
  };
  const note = (id: string, index: number, vi: string, en: string) => {
    const step = lesson(id).steps[index];
    if (!step.resultText) step.resultText = locale === 'vi' ? vi : en;
  };

  if (courseId === 'clever-rat') {
    put('story', 1, target('wv-rat-continuity', 1672, 941,
      ['Bảng hai ô: cảnh rộng Leo và Mio bên tháp gỗ, sau đó cảnh gần bàn tay Leo đặt cùng khối gỗ.', 'Two-panel board: a wide view of Leo and Mio by the block tower, then a closer view of Leo placing the same block.'],
      ['Mẫu kế hoạch từ cảnh rộng sang gần: so Leo, Mio, tháp, hướng sáng và tay đặt khối. Các vật nhỏ trong nền vẫn cần kiểm tra trước khi dùng hai ảnh làm frame liên tiếp.', 'A wide-to-close planning example: compare Leo, Mio, tower, light and block-placement hand. Small background objects still need checking before using the images as consecutive frames.'], locale, 'gpt-image-illustration'));
    note('story', 2, 'Mẫu cây thư mục dự kiến, chưa phải kết quả video:\nreferences/leo.png, mio.png\nframes/shot-a-v01.png, shot-b-v01.png\nclips/shot-a-v01.mp4, shot-b-v01.mp4\nreview/cut-notes-v01.txt\nexports/scene-1-v01.mp4', 'Planning folder example, not a video result:\nreferences/leo.png, mio.png\nframes/shot-a-v01.png, shot-b-v01.png\nclips/shot-a-v01.mp4, shot-b-v01.mp4\nreview/cut-notes-v01.txt\nexports/scene-1-v01.mp4');
    put('references', 2, target('wv-rat-continuity', 1672, 941,
      ['Bảng kiểm tra liên tục giữa cảnh rộng và cảnh gần.', 'Continuity check board between the wide and closer shot.'],
      ['So vị trí Mio, bàn tay Leo, đỉnh tháp và hướng nắng trước khi tạo chuyển động.', 'Compare Mio’s position, Leo’s hand, the tower top and window light before animating.'], locale, 'gpt-image-illustration'));
    return;
  }

  if (courseId === 'five-levels') {
    put('story', 0, target('lantern-vi-v1', 1672, 941,
      ['Người thợ sửa và chiếc đèn lồng chưa sáng trong xưởng.', 'The repairer and an unlit lantern in the workshop.'],
      ['Ảnh bắt đầu của bài: trước khi tạo video, chỉ rõ ai, vật chính, nơi chốn và trạng thái đèn.', 'The exercise starting image: before making video, identify the person, key object, location and lantern state.'], locale));
    put('story', 1, target('wv-lantern-beats', 1672, 941,
      ['Storyboard ba nhịp: đèn tắt, mồi lửa, rồi ánh sáng ổn định.', 'Three-beat storyboard: lantern dark, ignition begins, then a steady glow.'],
      ['Mẫu minh họa chỉ tập trung vào đạo cụ: đèn tắt → bấc bắt lửa → sáng ổn định. Giữ cùng kiểu đèn và vị trí trên bàn. Người thợ không xuất hiện trong bảng này.', 'This prop-only illustration isolates the change: dark → wick ignites → steady flame. Keep the same lantern design and tabletop position. The repairer is outside this board.'], locale, 'gpt-image-illustration'));
    put('story', 3, asset('/api/workshop/examples/lantern-image-vi-v1-poster.jpg', 852, 480,
      ['Poster của take image-to-video đã lưu.', 'Poster from the archived image-to-video take.'],
      ['Ví dụ lưu trữ, không phải benchmark: start frame giúp giữ thiết kế đèn gần ảnh mẫu hơn take text-only.', 'Archived example, not a benchmark: the start frame keeps the lantern design closer to the reference than the text-only take.'], locale));
    put('references', 1, target('repairer-sheet-vi-v1', 1145, 1374,
      ['Bảng nhân vật nhiều góc của người thợ sửa.', 'Multi-view character sheet for the repairer.'],
      ['Ảnh chuẩn giúp phân biệt vai trò của tham chiếu nhân vật với ảnh bối cảnh và ảnh đồ vật.', 'The reference distinguishes the role of a character sheet from a location or prop image.'], locale));
    put('references', 3, target('wv-lantern-beats', 1672, 941,
      ['Bảng kiểm tra ba khung đèn lồng.', 'Three-frame lantern review board.'],
      ['So kiểu đèn, vị trí trên bàn và thứ tự tắt/sáng. Với shot có người, kiểm tra thêm mặt và áo bằng bảng nhân vật.', 'Compare lantern design, tabletop position and unlit/lit order. For a shot containing the repairer, also check face and clothes against the character sheet.'], locale, 'gpt-image-illustration'));
    put('motion', 0, target('lantern-vi-v1', 1672, 941,
      ['Khung tĩnh: đèn lồng tắt trên bàn làm việc.', 'Static frame: an unlit lantern on the workbench.'],
      ['Đây là mốc baseline. Khi so camera, giữ nhân vật và trạng thái đèn này cố định.', 'This is the baseline. Keep the character and lantern state fixed when comparing camera movement.'], locale));
    put('motion', 1, asset('/api/workshop/examples/camera-dolly-vi-v1-poster.jpg', 852, 480,
      ['Poster của take dolly-in lỗi: người diễn viên nghiêng và khung trôi ngang.', 'Poster from the failed dolly-in take: the actor leans and the frame drifts sideways.'],
      ['Ví dụ lỗi đã lưu. Poster chỉ để nhận diện shot; hãy xem clip để đánh giá chuyển động camera và không gọi đây là dolly đúng.', 'Archived failure example. The poster identifies the shot; watch the clip to judge camera movement and do not label it a correct dolly.'], locale));
    put('motion', 2, asset('/api/workshop/examples/endpoints-vi-v1-poster.jpg', 852, 480,
      ['Poster take đã nối đèn tắt với đèn sáng.', 'Poster from the archived take connecting unlit and lit lantern states.'],
      ['Ví dụ take đã lưu: endpoint giới hạn trạng thái đầu/cuối, nhưng cần xem toàn clip để kiểm tra phần giữa.', 'Archived take: endpoints constrain start and finish, but watch the full clip to inspect the middle.'], locale));
    put('motion', 3, target('storyboard-vi-v1', 2172, 724,
      ['Storyboard bốn shot: chờ, thắp đèn, phản ứng, đèn sáng.', 'Four-shot storyboard: waiting, ignition, reaction, lit lantern.'],
      ['Mỗi ô là một mục đích shot. Đây là kế hoạch bố cục đã lưu, không phải bằng chứng chuyển động đã tạo.', 'Each panel has one shot purpose. This is an archived composition plan, not evidence of generated motion.'], locale));
    note('motion', 4, 'Mẫu ghi sửa, chưa phải kết quả quan sát: “00:02.1–00:03.4 · giữ take camera-dolly-vi-v1 làm lỗi tham chiếu; sửa: camera chỉ tiến theo trục lens, người và hai tay giữ yên; tạo take v02.”', 'Worked revision note, not an observed result: “00:02.1–00:03.4 · retain camera-dolly-vi-v1 as the failure reference; revise: camera advances only on lens axis, actor and hands held; generate take v02.”');
    put('review', 0, target('repairer-sheet-vi-v1', 1145, 1374,
      ['Bảng bốn vai trò ảnh tham chiếu.', 'Four-reference-role sheet.'],
      ['Chọn đúng ảnh cho mặt, trang phục và góc sau trước khi yêu cầu performance.', 'Choose the right image for face, wardrobe and rear view before asking for performance.'], locale));
    put('review', 1, asset('/api/workshop/examples/acting-vi-v1-poster.jpg', 852, 480,
      ['Poster take diễn xuất có beat thời gian.', 'Poster from the archived timed-performance take.'],
      ['Ví dụ lưu trữ: xem toàn clip để kiểm tra trình tự nhìn xuống, thở, nhìn lên và mỉm cười.', 'Archived example: watch the full clip to check the look-down, breath, look-up and smile sequence.'], locale));
    put('review', 2, target('workshop-lit-vi-v1', 1672, 941,
      ['Frame người thợ và đèn đã sáng.', 'Frame with the repairer and lit lantern.'],
      ['Dùng ảnh sáng này làm start frame cho reaction; không gọi nó là bằng chứng VFX trên live footage.', 'Use this lit image as the reaction start frame; it is not evidence of VFX on live footage.'], locale));
    put('review', 3, asset('/api/workshop/examples/reaction-close-vi-v2-poster.jpg', 852, 480,
      ['Poster reaction cận cảnh đã tạo lại.', 'Poster from the regenerated close reaction.'],
      ['Clip đã lưu cho thấy nụ cười nhỏ và mắt nhìn xuống; kiểm tra cả phần âm thanh nếu dùng voice reference.', 'The archived clip shows a restrained smile and downward gaze; inspect audio too if using a voice reference.'], locale));
    note('review', 4, 'Mẫu quyết định take, chưa phải đánh giá thật: “Giữ reaction-close-vi-v2 vì gaze và biểu cảm đúng; tạo lại camera-dolly-vi-v2 vì còn lateral drift. Lý do ghi theo lỗi quan sát được.”', 'Worked take decision, not an actual assessment: “Keep reaction-close-vi-v2 because gaze and expression work; regenerate camera-dolly-vi-v2 because lateral drift remains. Record the observed reason.”');
    put('delivery', 1, target('storyboard-vi-v1', 2172, 724,
      ['Storyboard ngang của chuỗi Ngọn đèn cuối cùng.', 'Horizontal storyboard for The Last Lantern sequence.'],
      ['Dùng storyboard để kiểm tra thứ tự shot trước khi ghép clip. Một storyboard là kế hoạch, chưa phải phim đã tạo.', 'Use the storyboard to check shot order before assembling clips. A storyboard is a plan, not generated film.'], locale));
    note('story', 0, 'Mẫu cài đặt trial, chưa phải kết quả: “Seedance Draft · 480p · 5 giây · tối đa 2 take · Audio On · dừng nếu đèn/khung sai.”', 'Trial-setting example, not an observed result: “Seedance Draft · 480p · 5 seconds · maximum 2 takes · Audio On · stop if lantern or framing fails.”');
    note('delivery', 0, 'Mẫu brief đã điền, chưa phải phim: “20 giây. Người thợ chờ bên đèn tắt; bấc sáng; cô nhìn thấy ánh sáng và mỉm cười; đèn sáng ổn định. Không thoại.”', 'Filled brief example, not a film: “20 seconds. A repairer waits beside an unlit lantern; the wick ignites; she sees the light and smiles; the lantern holds steady. No dialogue.”');
    note('delivery', 2, 'Mẫu lựa chọn take, chưa phải kết quả: “S02: endpoints-vi-v1.mp4 · giữ 00:00–00:05 · lý do: bấc sáng, camera gần như khóa. S03: reaction-close-vi-v2.mp4 · giữ 00:00–00:05 · lý do: mắt nhìn xuống, nụ cười nhỏ.”', 'Take-selection example, not an observed result: “S02: endpoints-vi-v1.mp4 · keep 00:00–00:05 · wick ignites and camera is mostly locked. S03: reaction-close-vi-v2.mp4 · keep 00:00–00:05 · downward gaze and restrained smile.”');
    note('delivery', 3, 'Mẫu edit decision, chưa phải MP4: “00:00–00:05 static; 00:05 hard cut to ignition; 00:10 hard cut to reaction close-up; 00:15 return to lit insert. Tắt audio trước export.”', 'Edit-decision example, not an MP4: “00:00–00:05 static; 00:05 hard cut to ignition; 00:10 hard cut to reaction close-up; 00:15 return to lit insert. Remove audio before export.”');
    note('delivery', 4, 'Mẫu kiểm tra export, chưa phải kiểm tra thật: “last-lantern-v02.mp4 · 852×480 · 24 fps · H.264 · 00:20 · không audio · mở lại từ đầu đến cuối để kiểm tra điểm cắt.”', 'Export-check example, not an actual inspection: “last-lantern-v02.mp4 · 852×480 · 24 fps · H.264 · 00:20 · no audio · reopen start to finish and inspect cuts.”');
    note('delivery', 5, 'Mẫu manifest dự kiến, chưa phải kết quả: “01-brief.txt; 02-shot-list.csv; S01-camera-static-vi-v3.mp4; S02-lantern-ignition-vi-v2.mp4; S03-reaction-close-vi-v2.mp4; S04-lantern-hold-vi-v2.mp4; last-lantern-v02.mp4; review-v02.txt.”', 'Planning manifest example, not an observed result: “01-brief.txt; 02-shot-list.csv; S01-camera-static-vi-v3.mp4; S02-lantern-ignition-vi-v2.mp4; S03-reaction-close-vi-v2.mp4; S04-lantern-hold-vi-v2.mp4; last-lantern-v02.mp4; review-v02.txt.”');
    addFiveLevelsTechniqueTargets(course, locale);
    return;
  }

  if (courseId === 'master-frame') {
    // Every core exercise has a tested example, so adding an illustrative board
    // would be redundant and could blur the distinction between plan and output.
    return;
  }

  if (courseId === 'directors-framework') {
    put('story', 0, target('wv-director-plan', 1672, 941,
      ['Hai khung kế hoạch: Linh nhận ra Kẻ Thu Sáng, rồi nâng tay phòng thủ.', 'Two planned frames: Linh notices the Light Collector, then raises a defensive guard.'],
      ['Một thay đổi dễ đọc cần được nhìn thấy giữa hai shot: Linh đi từ nhận ra nguy cơ đến hành động chặn lại.', 'A readable change must be visible between two shots: Linh moves from noticing the threat to blocking it.'], locale, 'gpt-image-illustration'));
    put('story', 1, target('wv-director-plan', 1672, 941,
      ['Bảng hai shot có tiền cảnh, nhân vật và nền xa.', 'Two-shot board with foreground, characters and distant background.'],
      ['Nhìn ba lớp: lan can/sạp gần máy, Linh và đối thủ ở lớp giữa, thành phố xa ở hậu cảnh.', 'Read three layers: a railing or stall near camera, Linh and opponent in the middle, city in the distance.'], locale, 'gpt-image-illustration'));
    put('planning', 0, target('wv-director-plan', 1672, 941,
      ['Storyboard hai shot trước giao đấu.', 'Two-shot pre-combat storyboard.'],
      ['Mỗi ô ghi được ai muốn gì, máy ở đâu và điều gì thay đổi trước khi tạo frame.', 'Each panel should make clear who wants what, where the camera is and what changes before frames are generated.'], locale, 'gpt-image-illustration'));
    put('planning', 5, target('wv-director-plan', 1672, 941,
      ['Shot list minh họa bằng hai khung rõ vai trò.', 'Illustrated shot list with two frames with clear roles.'],
      ['Shot list cần nối với storyboard: shot 1 giới thiệu lực cản, shot 2 thể hiện phản ứng của Linh.', 'The shot list must connect to the storyboard: shot 1 establishes resistance, shot 2 shows Linh’s response.'], locale, 'gpt-image-illustration'));
    put('frames', 2, target('wv-director-composition', 1672, 941,
      ['Bốn biến thể bố cục: đường chéo, đối xứng trung tâm, khoảng trống và khung tiền cảnh.', 'Four composition variants: diagonal, centered symmetry, negative space and foreground framing.'],
      ['Ô 1 dùng đường chéo; ô 2 đặt Linh giữa khung; ô 3 chừa khoảng nhìn sang phải; ô 4 dùng khung tiền cảnh. So điều gì hút mắt trước. Bảng này tập trung bố cục Linh, không thể hiện đầy đủ đối thủ và lõi.', 'Panel 1 uses a diagonal; 2 centers Linh; 3 leaves look-room to the right; 4 uses foreground framing. Compare what catches the eye first. This board isolates Linh’s composition rather than showing the full opponent-and-core scene.'], locale, 'gpt-image-illustration'));
    put('frames', 5, target('wv-director-composition', 1672, 941,
      ['Bảng bố cục nối tiếp qua nhiều shot.', 'Composition board carried across several shots.'],
      ['Giữ trục và hướng nhìn khi chuyển từ bố cục rộng sang khung gần hơn.', 'Keep axis and eyeline direction as the sequence moves from wider composition to closer framing.'], locale, 'gpt-image-illustration'));
    put('edit', 0, target('wv-director-light', 1672, 941,
      ['Bốn cách ánh sáng trên cùng khuôn mặt Linh.', 'Four lighting treatments on the same Linh face.'],
      ['Bắt đầu bằng nguồn sáng chính và hướng bóng. Mỗi ô chỉ thay một quyết định ánh sáng để dễ nhìn nguyên nhân.', 'Start with a key light and shadow direction. Each panel changes one lighting decision, making cause and effect easy to see.'], locale, 'gpt-image-illustration'));
    put('edit', 2, target('wv-director-light', 1672, 941,
      ['So sánh negative fill và exposure contrast.', 'Negative-fill and exposure-contrast comparison.'],
      ['Vùng tối cần có lý do từ hướng sáng và vật chặn sáng, không chỉ phủ bộ lọc tối.', 'Darkness needs a reason in light direction and blocked light, rather than a blanket dark filter.'], locale, 'gpt-image-illustration'));
    put('edit', 5, target('wv-director-light', 1672, 941,
      ['Bảng ánh sáng và lớp sương nền.', 'Lighting and atmospheric-depth board.'],
      ['Sương làm nền xa giảm tương phản; nó không được che mặt hoặc làm đổi hướng nguồn sáng.', 'Haze lowers background contrast; it should not hide the face or reverse light direction.'], locale, 'gpt-image-illustration'));
    put('sound', 1, target('director-depth-a-v1', 1672, 941,
      ['Frame có tiền cảnh, Linh ở lớp giữa và nền xa.', 'Frame with foreground, Linh in middle distance and background.'],
      ['Dùng ảnh thử thật này để nhìn tách lớp trước khi đánh giá depth of field.', 'Use this actual tested frame to read layer separation before judging depth of field.'], locale));
    put('review', 0, target('wv-director-plan', 1672, 941,
      ['Hai khung có mục đích kể chuyện khác nhau.', 'Two frames with distinct storytelling purposes.'],
      ['Bài đọc ba giây: người xem phải thấy Linh, mục tiêu và lực cản mà không cần prompt giải thích.', 'For the three-second reading, viewers should see Linh, the goal and resistance without the prompt explaining them.'], locale, 'gpt-image-illustration'));
    put('delivery', 0, target('wv-director-plan', 1672, 941,
      ['Animatic hai shot trước giao đấu.', 'Two-shot pre-combat animatic board.'],
      ['Đặt mỗi ảnh tĩnh lên timeline theo thời lượng dự kiến để kiểm tra nhịp trước khi chi credit tạo video.', 'Place each still in a timeline at its planned duration to test pacing before spending video credits.'], locale, 'gpt-image-illustration'));
  }
}

function addFiveLevelsTechniqueTargets(course: Curriculum, locale: Locale): void {
  const lessonTargets: Record<string, Target[]> = {
    story: [
      target('lantern-vi-v1', 1672, 941, ['Đèn lồng gốc để thay biến số có kiểm soát.', 'Original lantern used to change variables deliberately.'], ['Giữ ảnh đầu cố định khi chỉ thay một biến prompt.', 'Keep the start image fixed when changing one prompt variable.'], locale),
      target('repairer-front-vi-v1', 1145, 1374, ['Ảnh chân dung người thợ để đọc vai trò identity.', 'Repairer portrait for reading the identity role.'], ['Phân biệt ảnh mặt, ảnh bảng hiệu và ảnh đồ họa trước upload.', 'Separate face, sign and graphic roles before upload.'], locale),
      asset('/api/workshop/examples/reaction-close-vi-v2-poster.jpg', 852, 480, ['Poster cận cảnh reaction đã lưu.', 'Poster from archived reaction close-up.'], ['Xem clip để đánh giá identity drift theo thời gian.', 'Watch the clip to assess identity drift over time.'], locale),
      target('lantern-vi-v1', 1672, 941, ['Ảnh đèn khởi đầu.', 'Starting lantern still.'], ['Tách prompt ảnh tĩnh khỏi prompt chuyển động.', 'Separate still-image prompt from motion prompt.'], locale),
    ],
    references: [
      target('repairer-front-vi-v1', 1145, 1374, ['Chân dung identity rõ nét.', 'Clear identity portrait.'], ['Khóa danh tính trước khi đổi ánh sáng.', 'Lock identity before changing light.'], locale),
      target('workshop-medium-vi-v1', 1672, 941, ['Người, đèn và bối cảnh trong một frame.', 'Person, lantern and location in one frame.'], ['Kiểm tra từng asset sau khi ghép.', 'Review each asset after compositing.'], locale),
      target('wardrobe-vi-v1', 1672, 941, ['Kết quả thay áo có kiểm soát.', 'Controlled wardrobe-change result.'], ['So face, pose and set với ảnh trước thay áo.', 'Compare face, pose and set against the pre-change image.'], locale),
      target('shot-sizes-vi-v1', 2241, 702, ['Bảng năm cỡ cảnh.', 'Five shot-size board.'], ['Dùng bảng để chọn ba cỡ cảnh cho một ý tưởng.', 'Use the board to select three shot sizes for one idea.'], locale),
      target('camera-angles-vi-v1', 1672, 941, ['Bảng bốn góc máy.', 'Four-angle board.'], ['Kiểm tra địa lý phòng khi đổi viewpoint.', 'Check room geography when viewpoint changes.'], locale),
      target('workshop-medium-vi-v1', 1672, 941, ['Frame gốc cho reverse view.', 'Base frame for a reverse view.'], ['Giữ cùng beat khi đảo điểm nhìn.', 'Keep the same beat when reversing viewpoint.'], locale),
    ],
    motion: [
      asset('/api/workshop/examples/camera-static-vi-v1-poster.jpg', 852, 480, ['Poster baseline camera khóa.', 'Locked-camera baseline poster.'], ['Xem clip để tách chuyển động người khỏi chuyển động camera.', 'Watch the clip to separate actor from camera movement.'], locale),
      asset('/api/workshop/examples/camera-dolly-vi-v2-poster.jpg', 852, 480, ['Poster thử dolly revision.', 'Dolly revision trial poster.'], ['Ví dụ vẫn có lateral drift; kiểm tra clip trước khi giữ.', 'The example still has lateral drift; inspect clip before keeping it.'], locale),
      asset('/api/workshop/examples/endpoints-vi-v1-poster.jpg', 852, 480, ['Poster take nối frame đầu/cuối.', 'Start/end endpoint-take poster.'], ['Kiểm tra giữa clip, không chỉ hai endpoint.', 'Inspect the clip middle, not just the endpoints.'], locale),
      asset('/api/workshop/examples/reaction-vi-v1-poster.jpg', 852, 480, ['Poster reaction shot.', 'Reaction-shot poster.'], ['Viết shot theo lượt nói/nghe trước khi phân thời lượng.', 'Write around speaking/listening turns before allocating duration.'], locale),
      target('repairer-sheet-vi-v1', 1145, 1374, ['Bảng identity để debug lỗi.', 'Identity sheet for debugging errors.'], ['Liệt kê invariant trước khi sửa lỗi cụ thể đầu tiên.', 'List invariants before fixing the first specific error.'], locale),
      asset('/api/workshop/examples/camera-static-vi-v1-poster.jpg', 852, 480, ['Poster take draft.', 'Draft-take poster.'], ['Ghi tên take, setting và quyết định giữ/sửa.', 'Log take name, settings and keep/revise decision.'], locale),
    ],
    review: [
      target('repairer-sheet-vi-v1', 1145, 1374, ['Bảng bốn vai trò tham chiếu.', 'Four-reference-role sheet.'], ['Chuẩn bị manifest riêng cho mỗi shot.', 'Prepare a per-shot manifest.'], locale),
      asset('/api/workshop/examples/acting-vi-v1-poster.jpg', 852, 480, ['Poster performance take đã lưu.', 'Archived performance-take poster.'], ['Xem toàn clip để so beat tiếp xúc và phản ứng.', 'Watch the full clip to compare contact and reaction beats.'], locale),
      asset('/api/workshop/examples/reaction-close-vi-v2-poster.jpg', 852, 480, ['Poster reaction cận cảnh.', 'Close reaction poster.'], ['Kiểm tra từng từ và giọng nếu có thoại.', 'Check each word and voice if dialogue is used.'], locale),
      target('workshop-lit-vi-v1', 1672, 941, ['Frame đèn sáng để giữ performance.', 'Lit-lantern frame for preserving performance.'], ['So upscale và regenerate theo mặt, texture, edge và sound.', 'Compare upscale and regenerate on face, texture, edges and sound.'], locale),
      asset('/api/workshop/examples/acting-vi-v1-poster.jpg', 852, 480, ['Poster performance làm vật liệu.', 'Performance poster as source material.'], ['Plate thật cần tracking; clip AI này không chứng minh live-action VFX.', 'A real plate needs tracking; this AI clip does not prove live-action VFX.'], locale),
      asset('/api/workshop/examples/reaction-vi-v1-poster.jpg', 852, 480, ['Poster video-reference take.', 'Video-reference take poster.'], ['So timing, emotion, face và speech bằng clip đầy đủ.', 'Compare timing, emotion, face and speech using full clips.'], locale),
    ],
    delivery: [
      target('storyboard-vi-v1', 2172, 724, ['Storyboard bốn beat.', 'Four-beat storyboard.'], ['Chú thích moodboard theo mục đích kể chuyện.', 'Annotate a moodboard by story purpose.'], locale),
      target('storyboard-vi-v1', 2172, 724, ['Storyboard nối treatment và shot list.', 'Storyboard connecting treatment and shot list.'], ['Ghi entry/exit state cho từng shot trước polish frame.', 'Record entry and exit state for each shot before polishing frames.'], locale),
      target('workshop-medium-vi-v1', 1672, 941, ['Frame asset mở đầu.', 'Starting asset frame.'], ['Phân biệt candidate và selected asset trong lineage.', 'Distinguish candidate from selected asset in the lineage.'], locale),
      asset('/api/workshop/examples/last-lantern-edit-vi-v2-poster.jpg', 852, 480, ['Poster rough cut đã lưu.', 'Archived rough-cut poster.'], ['Picture lock trước, rồi mới xây ba lớp audio.', 'Lock picture before building three audio layers.'], locale),
      asset('/api/workshop/examples/last-lantern-edit-vi-v2-poster.jpg', 852, 480, ['Poster delivery video.', 'Delivery-video poster.'], ['Thumbnail phải đại diện đúng shot có trong bản nộp.', 'Thumbnail must truthfully represent a shot in the delivery.'], locale),
    ],
  };
  for (const lesson of course.lessons) {
    const targets = lessonTargets[lesson.id];
    const techniques = (lesson as unknown as { techniques?: { steps: { visualTarget?: Target }[] }[] }).techniques;
    if (!targets || !techniques) continue;
    let i = 0;
    for (const technique of techniques) for (const step of technique.steps) step.visualTarget ??= targets[i++ % targets.length];
  }
}
