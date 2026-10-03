/** Public studio-owned videos verified on @GenYZStudio and @genyzstudio.
 * Covers are local copies of the videos' public thumbnails; see docs/video-sources.md.
 */
export interface StudioVideo {
  title: string;
  description: string;
  platform: "YouTube" | "TikTok";
  url: string;
  thumbnail: string;
  lesson?: string;
  previewSrc?: string;
}
export const studioVideos: StudioVideo[] = [
  {
    title: "The Legend of Titus",
    description: "Cuộc phiêu lưu của chú mèo Titus và những người bạn. Quan sát cách nhân vật, bối cảnh và các cảnh quay cùng tạo nên một câu chuyện hoạt hình.",
    lesson: "Kể chuyện qua nhiều cảnh",
    platform: "YouTube",
    url: "https://www.youtube.com/watch?v=VzmqrgQumGo",
    thumbnail: "/images/titus.jpg",
  },
  {
    title: "Clever Little Rat: Through the Button Bridge",
    description: "Leo, Mio và Pip cùng vượt qua cây cầu nhỏ. Một ví dụ để quan sát chuyển động nhân vật và cách sắp xếp hành động trong một cảnh ngắn.",
    lesson: "Nhân vật & chuyển động",
    platform: "YouTube",
    url: "https://www.youtube.com/watch?v=1_EZiRh8o_o",
    thumbnail: "/images/studio-reel.jpg",
    previewSrc: "/videos/studio-reel.mp4",
  },
  {
    title: "Clever Little Rat: The First Clues",
    description: "Một mẩu vụn vàng, một dải ruy băng và dấu chân bí ẩn. Xem cách những chi tiết nhỏ gợi tò mò trong một đoạn hoạt hình trên TikTok.",
    lesson: "Chi tiết & nhịp kể",
    platform: "TikTok",
    url: "https://www.tiktok.com/@genyzstudio/video/7681309763950447893",
    thumbnail: "/images/first-clues.jpg",
  },
  { title: "Clever Little Rat: The Missing Royal Bell", description: "Chiếc chuông hoàng gia biến mất. Quan sát cách một vấn đề dẫn nhân vật bước vào câu chuyện.", lesson: "Mở đầu & tình huống", platform: "YouTube", url: "https://www.youtube.com/watch?v=3MRIcRKAgmM", thumbnail: "/images/royal-bell.jpg" },
  { title: "Clever Little Rat: The Zodiac Calendar Awakens", description: "Một cuốn lịch kỳ diệu mở cánh cửa đến vương quốc chuột. Quan sát cách bối cảnh đưa người xem vào thế giới mới.", lesson: "Bối cảnh & thế giới", platform: "YouTube", url: "https://www.youtube.com/watch?v=LVj-obJOR-E", thumbnail: "/images/zodiac.jpg" },
  { title: "Leo & Mio’s Morning Routine", description: "Một buổi sáng qua âm nhạc và hoạt hình. Mở video để quan sát cách hành động và nhịp nhạc kể câu chuyện quen thuộc.", lesson: "Âm nhạc & nhịp dựng", platform: "TikTok", url: "https://www.tiktok.com/@genyzstudio/video/7677089767347014928", thumbnail: "/images/morning.jpg" },

];
export const showcaseCopy = {
  eyebrow: "SẢN PHẨM CỦA GENYZ STUDIO",
  title: "Từ ý tưởng đến những câu chuyện thật sự.",
  description: "Xem các video hoạt hình do GenYZ Studio thực hiện, rồi khám phá điều bạn có thể học từ mỗi ví dụ. Đây là sản phẩm của studio, không phải kết quả học viên hay cam kết đầu ra của workshop.",
  watch: "Xem trên",
  load: "Mở video",
  close: "Đóng trình phát",
  playerNote: "Nhấn mở video để tải trình phát YouTube hoặc TikTok. Nếu video không phát, bạn có thể xem trực tiếp trên nền tảng.",
  channels: "Khám phá thêm từ studio",
};
