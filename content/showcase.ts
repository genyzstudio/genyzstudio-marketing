/** Only publish studio-owned or permission-cleared work. Add public video URLs.
 * Keep empty until the owner's channel/video links are confirmed.
 * Store thumbnails locally in public/images; do not include private account data.
 */
export interface StudioVideo {
  title: string;
  description: string;
  platform: "YouTube" | "TikTok";
  url: string;
  thumbnail: string;
}
export const studioVideos: StudioVideo[] = [];
export const showcaseCopy = {
  eyebrow: "SẢN PHẨM CỦA GENYZ STUDIO",
  title: "Những câu chuyện đã thành hình.",
  description: "Khám phá các video do GenYZ Studio thực hiện. Đây là sản phẩm của studio, không phải bài tập hay kết quả học viên.",
  watch: "Xem trên",
};
