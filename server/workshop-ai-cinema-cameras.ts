import type { WorkshopTechnique } from '../content/workshop/types';

// Ordered exactly as the 25 demonstrations in Lesson 9; wording and practice scene are original.
const cameras = [
  ['Slow dolly in', 'Máy tiến chậm về An; giữ tiêu cự, không zoom', 'Move slowly toward An; keep focal length fixed, no zoom', 'Đưa người xem đến gần nhân vật; so chuyển động tương đối của lan can và biển.', 'Bring attention closer to the person; compare the railing’s movement against the sea.'],
  ['Slow dolly out', 'Máy lùi chậm khỏi An; giữ tiêu cự', 'Move slowly away from An; keep focal length fixed', 'Mở thêm không gian quanh nhân vật; kiểm tra An nhỏ dần và phối cảnh đổi.', 'Reveal more surroundings; check that An shrinks and perspective changes.'],
  ['Fast dolly in', 'Máy tiến nhanh về An rồi dừng êm; không zoom', 'Move rapidly toward An, then settle smoothly; no zoom', 'Nhấn một phát hiện; tránh xuyên vào mặt hoặc đổi nhận diện.', 'Emphasize a discovery; reject face penetration or identity changes.'],
  ['Truck right', 'Máy dịch ngang sang phải, giữ hướng nhìn về trước', 'Translate the camera right, maintaining its forward orientation', 'Lan can gần dịch nhanh hơn biển xa; không nhầm với pan.', 'The near railing moves faster than the distant sea; distinguish this from a pan.'],
  ['Truck left', 'Máy dịch ngang sang trái, giữ hướng nhìn về trước', 'Translate the camera left, maintaining its forward orientation', 'Chọn hướng theo bố trí cảnh; kiểm tra chiều thị sai.', 'Choose direction from the scene layout; inspect the direction of parallax.'],
  ['Pan left', 'Máy đứng một chỗ, xoay ngang sang trái', 'Keep the camera in one position and pan left', 'Lộ thông tin bên trái; camera không trượt ngang.', 'Reveal information on the left without lateral camera travel.'],
  ['Pan right', 'Máy đứng một chỗ, xoay ngang sang phải', 'Keep the camera in one position and pan right', 'Theo hướng nhìn của An; không biến thành orbit.', 'Follow An’s eyeline without turning it into an orbit.'],
  ['Tilt up', 'Máy đứng một chỗ, ngẩng từ ván lên mặt An', 'Keep the camera in one position and tilt from the board up to An’s face', 'Đổi hướng nhìn theo chiều dọc; vị trí máy không nâng lên.', 'Redirect attention vertically; the camera position does not rise.'],
  ['Tilt down', 'Máy đứng một chỗ, cúi từ mặt An xuống ván', 'Keep the camera in one position and tilt from An’s face down to the board', 'Dẫn mắt đến đạo cụ; kiểm tra không có chuyển động hạ cả máy.', 'Guide attention to the prop without lowering the whole camera.'],
  ['Pedestal up', 'Nâng máy thẳng lên, giữ trục nhìn ngang', 'Raise the camera vertically, keeping it level', 'Đổi độ cao máy; phân biệt với tilt up.', 'Change camera height; distinguish this from tilt up.'],
  ['Pedestal down', 'Hạ máy thẳng xuống, giữ trục nhìn ngang', 'Lower the camera vertically, keeping it level', 'Theo tư thế hạ thấp của nhân vật; không chỉ cúi máy.', 'Follow a lower posture; do not merely tilt downward.'],
  ['Slow cinematic arc', 'Máy đi theo cung ngắn quanh An, luôn hướng vào An', 'Move along a short curved path around An, keeping An framed', 'Thấy thêm một mặt của nhân vật và bối cảnh; không cần trọn vòng.', 'Reveal another side of the subject and setting without a full circle.'],
  ['Orbit 180°', 'Máy đi nửa vòng quanh An, giữ khoảng cách', 'Travel halfway around An at a constant distance', 'Đổi góc nhìn từ một phía sang phía đối diện; ghi lại góc thực tế.', 'Move to the opposite side; record the actual angle achieved.'],
  ['Orbit 360°', 'Máy đi một vòng quanh An, trở lại góc đầu', 'Travel one full circle around An and return to the opening view', 'Kiểm tra môi trường và mặt sau nhân vật không bị bịa lại.', 'Check that the environment and the subject’s back remain consistent.'],
  ['Crane up', 'Máy nâng cao và lùi nhẹ, lộ toàn bộ đường ven biển', 'Rise and move slightly back to reveal the coastal road', 'Mở quy mô cảnh; phải thấy điểm nhìn thay đổi độ cao.', 'Reveal scale; the viewpoint must visibly gain height.'],
  ['Crane down', 'Máy hạ từ cao xuống ngang tầm An', 'Descend from a high viewpoint to An’s eye level', 'Đưa người xem vào không gian nhân vật; tránh thay cảnh đột ngột.', 'Enter the character’s space without an unexplained scene change.'],
  ['Smooth zoom in', 'Giữ vị trí máy, tăng tiêu cự chậm để lấy khung gần hơn', 'Keep camera position fixed and slowly increase focal length for tighter framing', 'Phóng lớn hình; không yêu cầu thị sai do máy di chuyển.', 'Magnify the image without parallax from camera travel.'],
  ['Smooth zoom out', 'Giữ vị trí máy, giảm tiêu cự chậm để mở khung', 'Keep camera position fixed and slowly reduce focal length for wider framing', 'Lộ bối cảnh bằng tiêu cự; phân biệt với dolly out.', 'Reveal context through focal length; distinguish this from dolly out.'],
  ['Crash zoom', 'Máy đứng yên, zoom nhanh vào mặt An', 'Keep the camera fixed and zoom rapidly into An’s face', 'Nhấn đột ngột theo phong cách; không tự thêm lao máy.', 'Create an abrupt stylistic emphasis without adding camera travel.'],
  ['Rack focus', 'Máy đứng yên; chuyển nét từ lan can tiền cảnh sang mặt An phía sau', 'Keep the camera fixed; shift focus from the foreground railing to An’s face behind it', 'Nối hai điểm chú ý bằng vùng nét; không phải zoom.', 'Connect two points of attention through focus; this is not a zoom.'],
  ['Reveal from blur', 'Máy đứng yên; bắt đầu mất nét rồi lấy nét rõ vào An', 'Keep the camera fixed; start out of focus and gradually bring An into sharp focus', 'Lộ thông tin bằng nét; không thay bằng hòa tan giữa hai ảnh.', 'Reveal information through focus, not a dissolve between images.'],
  ['Handheld', 'Giữ khung trung cảnh với dao động cầm tay nhẹ, tự nhiên', 'Hold a medium framing with subtle, natural handheld movement', 'Tạo cảm giác có người quan sát; tránh rung giật vô cớ.', 'Suggest a human observer; avoid arbitrary jitter.'],
  ['Dutch angle', 'Giữ máy với đường chân trời nghiêng nhẹ; không pan hoặc orbit', 'Hold a slightly rolled horizon; no pan or orbit', 'Đây là góc nghiêng của khung, không nhất thiết là chuyển động.', 'This is a rolled framing angle, not necessarily a movement.'],
  ['Whip pan', 'Xoay ngang máy nhanh sang phải, tạo vệt nhòe có hướng', 'Pan rapidly right, producing directional motion blur', 'Nối hai điểm chú ý bằng tốc độ; kiểm tra hướng trước và sau.', 'Connect two points of attention with speed; check the direction on both sides.'],
  ['Dolly zoom', 'Lùi máy đồng thời zoom vào; giữ An gần như cùng kích thước trong khung', 'Dolly backward while zooming in; keep An approximately the same size in frame', 'Chủ thể giữ kích thước, bối cảnh đổi phối cảnh; không gọi zoom thường là dolly zoom.', 'The subject stays similar in size while background perspective changes; a normal zoom is not a dolly zoom.'],
] as const;

export function cinemaCameraLabs(locale: 'vi' | 'en'): WorkshopTechnique[] {
  const t = (vi: string, en: string) => locale === 'vi' ? vi : en;
  return cameras.map(([name, vi, en, checkVi, checkEn], i) => ({
    id: `camera-${i + 1}`, title: `${String(i + 1).padStart(2, '0')} · ${name}`,
    goal: t(checkVi, checkEn),
    input: t('Dùng cùng một ảnh An đứng cạnh ván: lan can ở tiền cảnh, An ở trung cảnh, biển ở hậu cảnh. Giữ nguyên ảnh này cho mọi lượt thử.', 'Use one image of An beside the board: foreground railing, midground An, background sea. Keep this same input for every test.'),
    steps: [{ title: t('Chỉ thay chỉ dẫn camera', 'Change only the camera instruction'), tool: 'Freepik · Kling',
      instruction: t('Tải ảnh gốc lên và dùng cùng model, cùng thời lượng cho các lượt so sánh. Chỉ ghép chỉ dẫn bên dưới với cảnh cố định. Ghi tên model, phiên bản, thời lượng và kết quả thực tế.', 'Upload the original frame and use the same model and duration for every comparison. Apply only the instruction below to the fixed scene. Record the model, version, duration and actual result.'),
      prompt: `Use the attached reference image. An stands still beside a skateboard on a coastal road. Preserve the foreground railing, An in the middle distance, the sea behind, identity and lighting.\nCamera: ${en}.\nNo scene cuts or new character actions.`,
      promptVi: `Dùng ảnh tham chiếu đã tải lên. An đứng yên cạnh ván trượt trên đường ven biển. Giữ lan can tiền cảnh, An ở lớp giữa, biển phía sau, nhận diện và ánh sáng.\nCamera: ${vi}.\nKhông cắt cảnh hoặc thêm hành động của nhân vật.`, promptLanguage: 'en', promptKind: 'video',
      promptEvidence: t('Prompt thực hành do GenYZ biên soạn; cả hai ngôn ngữ chưa chạy thử.', 'GenYZ-authored practice prompt; neither language has been run.'), save: `L09-camera-${String(i + 1).padStart(2, '0')}.mp4 + settings.txt` }],
    check: t(checkVi, checkEn),
    fix: t('Nếu kết quả cho sai loại chuyển động, giữ nguyên ảnh và thiết lập, viết lại một chỉ dẫn camera rồi thử lại. Tên prompt không chứng minh kỹ thuật đã chạy đúng.', 'If the result shows the wrong technique, keep the image and settings, simplify one camera instruction and retry. A prompt label does not prove correct execution.'),
  }));
}
