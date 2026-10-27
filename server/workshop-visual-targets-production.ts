import type { Curriculum, WorkshopCourse } from './workshop-content';
import type { LessonStep } from '../content/workshop/types';

/** Illustrations are separate from the original prompt/output evidence. */
export function addProductionVisualTargets(course: Curriculum, locale: 'vi' | 'en', courseId: WorkshopCourse): void {
  const t = (vi: string, en: string) => locale === 'vi' ? vi : en;
  const put = (step: LessonStep, name: string, vi: string, en: string) => {
    if (step.media?.length || step.testedExample) return;
    step.visualTarget = {
      image: `/api/workshop/examples/${name}.png`, width: 1672, height: 941,
      alt: t(vi, en), caption: t(vi, en), evidence: 'gpt-image-illustration',
    };
  };
  const at = (id: string, index: number, name: string, vi: string, en: string) => {
    const step = course.lessons.find(l => l.id === id)?.steps[index];
    if (!step) throw new Error(`Missing visual target step: ${courseId}/${id}/${index}`);
    put(step, name, vi, en);
  };

  if (courseId === 'visual-effects') {
    const targets = [
      ['wv-vfx-light', 'Nhìn vùng má và mép áo nhận nắng từ trái, bụi trong nếp vải và thành phố xa nhạt hơn. Ảnh minh họa ánh sáng hòa hợp; không chứng minh đã quay bằng LED volume.', 'Look at the cheek and jacket edge lit from the left, dust in fabric folds and the lower-contrast distant city. This illustrates matching light; it does not demonstrate a real LED-volume shoot.'],
      ['wv-vfx-fire', 'So hình ngọn lửa, khói nghiêng sang phải và ánh hắt trên xe. Đây là một khoảnh khắc minh họa; cần video để kiểm tra lửa có lặp hay tàn lửa có rơi và tắt.', 'Compare flame shapes, smoke drifting right and warm reflections on the bus. This is one illustrated moment; only a video can show whether flames loop or embers fall and fade.'],
      ['wv-vfx-wire', 'Nhìn điểm đỡ ở hông, chân rời mặt cầu và tư thế giữ thăng bằng. Đây là tư thế minh họa giữa hành động; tạo ảnh mở đầu của riêng bạn nếu cần trạng thái trước khi treo. Video mới cho thấy quán tính và độ trễ của áo.', 'Inspect hip support, clearance below the feet and the balancing pose. This illustrates a moment during suspension; create your own opening image if you need the state before suspension. Video is needed to assess inertia and clothing delay.'],
      ['wv-vfx-rain', 'Nhìn vai áo ướt, vòng gợn trong vũng nước và rãnh thoát nước. Khi làm video, kiểm tra gợn bắt đầu tại điểm giọt chạm rồi lan ra; ảnh tĩnh chỉ cho thấy trạng thái bề mặt.', 'Look at wet shoulders, puddle ripples and the drainage channel. In video, check that ripples begin where drops hit and expand; the still only shows surface states.'],
      ['wv-vfx-miniature', 'So tỷ lệ vết sứt với trụ cầu lớn và độ tương phản giảm theo khoảng cách. Ảnh gợi vật liệu thật ở quy mô lớn; không phải ảnh chụp mô hình thu nhỏ hoặc bằng chứng kỹ thuật quay.', 'Compare chipped edges with the large pier and contrast falling with distance. The image suggests tactile material at full scale; it is not a photographed miniature or proof of a filming technique.'],
      ['wv-vfx-hybrid', 'Tay và khối bê tông ở gần; người ở lớp giữa; thành phố ở xa. So bóng tiếp xúc và hướng sáng. Khi máy trượt ngang trong video, lớp gần phải dịch nhiều hơn lớp xa; ảnh này chưa kiểm chứng thị sai.', 'The hand and concrete are near, the person is in the middle, and the city is distant. Compare contact shadow and light direction. In a sideways-moving video, near layers should shift more than far layers; this still does not verify parallax.'],
    ];
    targets.forEach(([name, vi, en], index) => {
      // Place the cue beside the observation task and the image-making task.
      for (const step of [course.lessons[index].steps[0], course.lessons[index].steps[4]]) put(step, name, vi, en);
    });
    at('edit', 0, 'wv-vfx-rain', 'Ví dụ chọn một kỹ thuật: mưa. Mục tiêu nhìn thấy là vai áo ướt và nước chạm vũng. Chọn YAML mưa ở bài tương ứng; không ghép cả sáu hiệu ứng.', 'Example of choosing one technique: rain. The visible goals are wet shoulders and drops hitting a puddle. Choose the rain YAML from its lesson rather than combining all six effects.');
    return;
  }
  if (courseId !== 'ai-cinema-workflow') return;
  at('story', 1, 'wv-cinema-character', 'Mẫu nhận diện An ở ba góc: trước, bên, sau. So mũ xanh, áo kem, quần tối và ván. Bước này chỉ cần một ảnh nhận diện tốt; bảng ba góc cho thấy cách mở rộng ở L10.', 'An’s identity in front, side and rear views. Compare teal helmet, cream jacket, dark trousers and board. This step needs one clear identity image; the three-view sheet previews the expansion in L10.');
  at('story', 2, 'wv-cinema-sketch', 'Đọc sáu ô từ trái sang phải, hàng trên rồi hàng dưới: đến chỗ ván, nhìn đường, nhấc ván, đặt chân, trượt ngang, đi xa. Bảng màu nhẹ này chỉ minh họa bố cục; các ô chưa đúng tỷ lệ yêu cầu. Bài nộp của bạn cần một tờ đen trắng với sáu ô 16:9. Kiểm tra cỡ cảnh và tỷ lệ trước khi dựng ảnh riêng.', 'Read six panels left to right, top row then bottom: approach, check road, lift board, place foot, ride laterally, recede. This lightly colored board illustrates composition only; its panels are not the required aspect ratio. Your deliverable is a black-and-white sheet with six 16:9 panels. Check framing and ratio before making individual frames.');
  for (const i of [3, 4]) at('story', i, 'wv-cinema-frames', 'Bảng so sánh sáu khoảnh khắc để kiểm tra mũ, áo, hướng đi, biển và ánh sáng. Đây là contact sheet minh họa, chưa đáp ứng yêu cầu sáu file riêng. Tạo từng shot theo cỡ cảnh của kịch bản và lưu sáu ảnh 16:9.', 'A six-moment comparison board for helmet, jacket, travel direction, sea and light. This illustrative contact sheet does not satisfy the six-file requirement. Generate each shot at the script’s framing and save six individual 16:9 images.');
  at('planning', 0, 'wv-cinema-depth', 'Ảnh đầu vào mẫu: lan can gần, An ở giữa, biển xa. Giữ ảnh gốc này cố định khi thử camera. Không dùng sơ đồ đường đi của máy làm ảnh đầu vào cho video.', 'Sample input: near railing, An in the middle, distant sea. Keep this original fixed for camera comparisons. Do not upload the camera-path diagrams as video start images.');
  at('planning', 2, 'wv-cinema-camera-optics', 'Ô 1→2 minh họa khung rộng và khung cắt chặt hơn khi giữ điểm nhìn. Ô 3→4 minh họa chuyển vùng nét. Bảng dùng bánh ván làm vật gần để dễ thấy; bài thực hành dùng lan can. Cần xem video để phân biệt zoom, dolly và rack focus.', 'Panels 1→2 illustrate a wider view and a tighter crop from the same viewpoint. Panels 3→4 illustrate changing the focus plane. The board uses a nearby wheel for clarity; the exercise uses a railing. Watch video to distinguish zoom, dolly and rack focus.');
  at('frames', 0, 'wv-cinema-character', 'Đối chiếu mặt trước, bên và sau: cùng nhận diện, trang phục và tỷ lệ. Bảng này là tham chiếu, không phải một frame cảnh có ba người. Nếu công cụ cần ảnh đơn, tạo và lưu riêng từng góc.', 'Compare front, side and rear: the same identity, clothing and proportions. This is a reference sheet, not a scene with three people. If the tool needs single images, generate and save each view separately.');
  at('frames', 1, 'wv-cinema-depth', 'Một frame hoàn chỉnh có nhân vật, ván, tiền cảnh và hậu cảnh rõ. Dùng ảnh đơn đã duyệt để tạo video; không đưa bảng ba góc vào ô start frame.', 'A complete frame with character, board, foreground and background. Animate an approved single image; do not put the turnaround sheet into the start-frame slot.');
  const cuts = [
    ['Ô 1→2: cùng góc máy, tư thế chờ đổi để gợi thời gian đã trôi. Đây là hai mốc dự kiến cho jump cut.', 'Panels 1→2: the same camera angle with a changed waiting pose suggests elapsed time. These are planned jump-cut endpoints.'],
    ['Ô 3→4: bánh ván và mặt đồng hồ nối bằng hình tròn cùng vị trí. Ví dụ minh họa nguyên tắc graphic match; chọn vật thể đúng với câu chuyện của bạn.', 'Panels 3→4: wheel and clock connect through a circle in the same screen position. This illustrates graphic matching; choose objects that fit your story.'],
    ['Ô 5→6: đổi từ cảnh vừa sang cận trong lúc cùng bàn tay nhấc ván. Dựng tại cùng pha hành động, rồi xem video để tránh tay hoặc ván nhảy vị trí.', 'Panels 5→6: switch from medium to close during the same hand lifting the board. Cut at a matching action phase, then watch video for hand or board jumps.'],
  ];
  cuts.forEach(([vi, en], i) => at('motion', i + 1, 'wv-cinema-cuts', vi, en));
  at('review', 0, 'wv-cinema-framing', 'Bảy cỡ cảnh, từ toàn cực rộng đến đặc tả mắt. So lượng không gian và chi tiết còn thấy ở mỗi ô; đây là lựa chọn bố cục, không phải bảy chuyển động camera.', 'Seven framings, from extreme wide to an eye detail. Compare how much setting and detail each retains; these are composition choices, not seven camera movements.');
  at('delivery', 0, 'wv-cinema-final', 'Kế hoạch L13: góc cao mở cảnh, toàn cảnh trượt, cảnh vừa quay đầu, cận mặt, nhảy nhỏ, toàn cảnh kết. Bảng chỉ biểu diễn các mốc; nó chưa chứng minh đã tạo video 15 giây hoặc các chuyển cảnh trong YAML.', 'L13 plan: aerial opening, wide ride, medium head turn, face close-up, small hop, final wide. This board shows key moments; it does not prove a generated 15-second video or the YAML transitions.');

  const cameraGuides: Record<number, [string, string, string]> = {
    1: ['travel', 'Ô 1: máy tiến trên trục lens; nhân vật đứng yên.', 'Panel 1: camera advances on the lens axis; the subject stays still.'],
    2: ['travel', 'Ô 1, đảo chiều mũi tên để lùi máy.', 'Panel 1, reversing the arrow for dolly out.'],
    3: ['travel', 'Ô 1: cùng đường tiến, tốc độ nhanh hơn rồi dừng êm; ảnh không cho thấy tốc độ.', 'Panel 1: the same forward path, faster with a smooth stop; a still cannot show speed.'],
    4: ['travel', 'Ô 2: máy dịch ngang, giữ hướng lens. Kiểm tra thị sai trong video.', 'Panel 2: camera translates sideways, keeping lens orientation. Check parallax in video.'],
    5: ['travel', 'Ô 2, đảo chiều để dịch trái; không xoay máy quanh nhân vật.', 'Panel 2, reversing direction for truck left; do not rotate around the subject.'],
    6: ['rotate', 'Ô 1: pan trái quanh một vị trí máy cố định.', 'Panel 1: pan left around a fixed camera position.'],
    7: ['rotate', 'Ô 2: pan phải quanh một vị trí máy cố định.', 'Panel 2: pan right around a fixed camera position.'],
    8: ['rotate', 'Ô 3: ngẩng lens, không nâng cả máy.', 'Panel 3: tilt the lens up without raising the whole camera.'],
    9: ['rotate', 'Ô 4: cúi lens, không hạ cả máy.', 'Panel 4: tilt the lens down without lowering the whole camera.'],
    10: ['travel', 'Ô 3: nâng cả máy thẳng đứng, giữ hướng nhìn ngang.', 'Panel 3: raise the whole camera vertically, keeping it level.'],
    11: ['travel', 'Ô 3, đảo chiều để hạ máy; giữ hướng nhìn ngang.', 'Panel 3, reversing direction to lower the camera while keeping it level.'],
    12: ['orbit', 'Ô 1: cung ngắn, lens luôn hướng về An.', 'Panel 1: a short arc with the lens aimed at An.'],
    13: ['orbit', 'Ô 2: nửa vòng quanh An; kiểm tra mặt sau có giữ nhận diện.', 'Panel 2: half a circle around An; check identity from the rear.'],
    14: ['orbit', 'Ô 3: một vòng đầy đủ; camera trở về gần điểm bắt đầu.', 'Panel 3: a full circle, returning near the starting viewpoint.'],
    15: ['travel', 'Ô 4: đường nâng của cần máy, khác pedestal thẳng đứng.', 'Panel 4: a rising boom path, distinct from a vertical pedestal.'],
    16: ['travel', 'Ô 4, đảo chiều để cần máy đi xuống.', 'Panel 4, reversing the path for crane down.'],
    17: ['optics', 'Ô 1→2: khung chặt hơn từ cùng điểm nhìn; không dịch máy.', 'Panels 1→2: tighter framing from the same viewpoint without translating the camera.'],
    18: ['optics', 'Ô 2→1: mở khung từ cùng điểm nhìn.', 'Panels 2→1: wider framing from the same viewpoint.'],
    19: ['optics', 'Ô 1→2 là mốc bố cục; crash zoom xảy ra nhanh, cần video để kiểm tốc độ.', 'Panels 1→2 are framing endpoints; a crash zoom is fast, which requires video to assess.'],
    20: ['optics', 'Ô 3→4: đổi vùng nét từ vật gần sang mặt. Ví dụ dùng bánh ván; bài dùng lan can.', 'Panels 3→4: shift focus from near object to face. This example uses a wheel; the exercise uses a railing.'],
    21: ['optics', 'Ô 4 cho thấy mặt rõ sau lấy nét. Bài reveal bắt đầu toàn ảnh mờ, khác rack focus có vật gần rõ.', 'Panel 4 shows the face resolved after focusing. A reveal begins fully blurred, unlike rack focus with a sharp near object.'],
  };
  for (const lab of course.lessons.find(l => l.id === 'planning')!.techniques ?? []) {
    const number = Number(lab.id.replace('camera-', ''));
    const guide = cameraGuides[number];
    if (guide) put(lab.steps[0], `wv-cinema-camera-${guide[0]}`, guide[1], guide[2]);
    else {
      const caption = t('Ảnh baseline để so bố cục. ', 'Baseline image for comparing framing. ') + lab.goal;
      put(lab.steps[0], 'wv-cinema-depth', caption, caption);
    }
  }
}
