import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve, join } from 'node:path';
import { execFileSync } from 'node:child_process';
import assets from '../server/workshop-seedance25-assets.json';

// The bundle contains images and blank forms only. Full lesson text stays in the
// access-filtered classroom/workbook, including when only a module is public.
const root = resolve('public/api/workshop/examples');
const stage = mkdtempSync(join(tmpdir(), 'genyz-sd25-pack-'));
const archive = join(root, 'sd25-practice-pack.zip');
try {
  mkdirSync(join(stage, 'images'));
  mkdirSync(join(stage, 'worksheets'));
  for (const asset of assets.assets) copyFileSync(join(root, `sd25-${asset.key}.png`), join(stage, 'images', `sd25-${asset.key}.png`));
  const forms: Record<string, string> = {
    'brief': 'Goal / Mục tiêu\tAudience / Người xem\tStory / Câu chuyện\tDuration / Thời lượng\tBudget / Ngân sách\tPath: video or animatic / Đường học',
    'asset-qa': 'File\tRole / Vai trò\tAuthority / Ảnh chuẩn\tAccept-repair-unclear / Nhận-sửa-chưa rõ\tReason / Lý do\tVersion / Phiên bản',
    'shot-plan': 'Shot\tStart / Đầu\tAction / Hành động\tCamera\tEnd / Cuối\tProp state / Trạng thái đạo cụ\tInput file / File đầu vào',
    'take-log': 'Take\tProvider-model-mode / Công cụ-model-chế độ\tInputs / Đầu vào\tPrompt file / File prompt\tSettings / Thiết lập\tQuote / Báo giá\tActual cost / Phí thực\tOutput / Kết quả\tTimestamp-defect / Mốc-lỗi\tOne change / Một thay đổi\tKeep-stop-retry / Giữ-dừng-thử',
    'continuity': 'Cut / Điểm cắt\tOutgoing frame / Khung ra\tIncoming frame / Khung vào\tIdentity / Nhận diện\tPosition / Vị trí\tProp / Đạo cụ\tLight / Ánh sáng\tSound / Âm thanh\tDecision / Quyết định',
    'audio-review': 'File\tIntended line / Câu dự định\tListener transcription / Người nghe chép lại\tPronunciation / Phát âm\tLip sync / Khớp miệng\tBackground / Tiếng nền\tResult / Kết quả\tReviewer-date / Người duyệt-ngày',
    'assessment': 'Criterion / Tiêu chí\tScore 0-3 or N/A / Điểm\tEvidence file-timestamp / File-mốc minh chứng\tReason / Lý do\tNext improvement / Sửa tiếp',
    'beginner-pilot': 'Date / Ngày\tPrior experience / Kinh nghiệm\tTask / Bài\tConfusion / Chỗ mắc\tHelp / Trợ giúp\tTime-cost / Thời gian-phí\tOutcome / Kết quả\tRevision / Điều chỉnh',
  };
  for (const [name, header] of Object.entries(forms)) writeFileSync(join(stage, 'worksheets', `${name}.tsv`), '\uFEFF' + header + '\n' + '\t'.repeat(header.split('\t').length - 1) + '\n');
  writeFileSync(join(stage, 'README.txt'), 'GENYZ STUDIO · SEEDANCE 2.5 PRACTICE PACK\n\nOpen images at full size. Use sd25-start.png for the first-clip exercise. Multi-panel sheets are references, not video starting frames: extract one panel before use. Blank TSV forms open in a spreadsheet or text editor. Download your access-filtered bilingual course workbook separately in the classroom.\n\nMở ảnh ở kích thước đầy đủ. Dùng sd25-start.png cho clip đầu tiên. Bảng nhiều ô dùng để tham chiếu, không đưa nguyên bảng vào ô khung đầu video. Tách một ô trước khi dùng. Các phiếu TSV trống mở bằng bảng tính hoặc trình soạn chữ. Tải sổ khóa học riêng trong lớp để có hướng dẫn và prompt được quyền truy cập.\n\nAll supplied images were generated using GPT Image in Codex. They are original teaching assets. No Seedance demonstration video has been generated; no beginner pilot has been performed. Read asset-provenance.json for observed limitations.\nẢnh được tạo bằng GPT Image trong Codex. Chưa có video Seedance minh họa hoặc thử nghiệm với người mới thực tế. Đọc asset-provenance.json để biết giới hạn đã quan sát.\n');
  writeFileSync(join(stage, 'asset-provenance.json'), JSON.stringify({ tool: assets.tool, date: assets.date, videoStatus: assets.videoStatus, assets: assets.assets.map(({ key, width, height, inputs, reviewVi, reviewEn }) => ({ file: `sd25-${key}.png`, width, height, inputs, reviewVi, reviewEn })) }, null, 2));
  rmSync(archive, { force: true });
  execFileSync('zip', ['-q', '-r', archive, '.'], { cwd: stage });
  console.log(`Seedance practice pack: ${assets.assets.length} images, ${Object.keys(forms).length} blank forms, ${readFileSync(archive).length} bytes`);
} finally {
  rmSync(stage, { recursive: true, force: true });
}
