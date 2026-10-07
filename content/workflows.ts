import type { Locale } from './locales';
import { getHome } from './locales';
import { greatGulp, studioCopy } from './studio';
import { studioVideos } from './showcase';
import { studioVideosEn } from './showcase-en';
import type { StudioVideo } from './showcase';

export const stageIds = ['story', 'characters', 'storyboard', 'motion', 'film'] as const;
export type StageId = typeof stageIds[number];
type Media = { src: string; alt: string; caption: string; poster?: string };
export interface WorkflowStage { title: string; text: string; lesson: string; quote?: string; media?: Media[]; film?: StudioVideo }
export interface WorkflowProject { id: string; title: string; subtitle: string; cover: string; stages: Partial<Record<StageId, WorkflowStage>>; notice?: string }
export const workflowCopy = {
  en: { title: 'Different worlds.\nOne storytelling craft.', description: 'Choose a film. Explore the story, character design and creative decisions behind it.', projects: 'Choose a project', stages: 'Explore the workflow', labels: ['Story', 'Characters', 'Storyboard', 'Motion', 'Finished film'], unavailable: 'Not yet published', watch: 'Watch on YouTube', learn: 'Learn filmmaking', lesson: 'What you can learn', note: 'Studio production materials. Examples illustrate creative decisions, not promised workshop outcomes.' },
  vi: { title: 'Nhiều thế giới.\nCùng nghệ thuật kể chuyện.', description: 'Chọn một bộ phim. Khám phá câu chuyện, thiết kế nhân vật và những quyết định sáng tạo phía sau.', projects: 'Chọn dự án', stages: 'Khám phá quy trình', labels: ['Câu chuyện', 'Nhân vật', 'Storyboard', 'Chuyển động', 'Phim hoàn chỉnh'], unavailable: 'Chưa công bố', watch: 'Xem trên YouTube', learn: 'Học làm phim', lesson: 'Điều bạn có thể học', note: 'Tư liệu sản xuất của studio. Các ví dụ minh hoạ quyết định sáng tạo, không phải cam kết đầu ra của workshop.' },
};

export function getWorkflows(locale: Locale): WorkflowProject[] {
  const en = locale === 'en';
  const home = getHome(locale);
  const gulp = studioCopy[locale];
  return [
    {
      id: 'great-gulp', title: 'The Great Gulp', subtitle: en ? 'Character contrast & emotional payoff' : 'Tính cách đối lập & cảm xúc', cover: '/images/great-gulp/sunset.webp',
      stages: {
        story: { title: gulp.caseTitle, text: gulp.caseDescription, lesson: en ? 'Build the story around what each character wants. Their differences create both the comedy and the resolution.' : 'Bắt đầu từ điều mỗi nhân vật mong muốn. Sự khác biệt tạo nên cả tiếng cười lẫn cách khép lại câu chuyện.', quote: '“Did you schedule that?”\n“No. It’s not on the list.”', media: [{ src: '/images/great-gulp/setup.webp', alt: gulp.chapters[0].alt, caption: en ? 'Original storyboard · The Long Brunch Philosophy' : 'Storyboard gốc · The Long Brunch Philosophy' }] },
        characters: { title: en ? 'Personality you can see.' : 'Tính cách thể hiện qua tạo hình.', text: en ? 'Barnaby’s napkin and Hildebrand’s clipboard make their priorities visible before either character speaks.' : 'Chiếc khăn ăn của Barnaby và bảng lịch trình của Hildebrand cho thấy điều họ quan tâm trước cả lời thoại.', lesson: en ? 'Use silhouette, wardrobe and a recurring prop to make a character readable across shots.' : 'Dùng dáng hình, trang phục và đạo cụ xuyên suốt để nhân vật dễ nhận ra qua nhiều cảnh.', media: [{ src:'/images/great-gulp/barnaby-reference.webp', alt:gulp.barnaby, caption:gulp.barnaby },{ src:'/images/great-gulp/hildebrand-reference.webp', alt:gulp.hildebrand, caption:gulp.hildebrand }] },
        storyboard: { title: gulp.chaptersTitle, text: en ? 'Three selected frames from the 28-frame project: introduce the contrast, let the plan collapse, then make room for a quiet ending.' : 'Ba khung chọn từ storyboard 28 khung: giới thiệu sự đối lập, để kế hoạch đổ vỡ, rồi dành chỗ cho một kết thúc lắng lại.', lesson: en ? 'Plan the emotional progression, not just a collection of attractive images.' : 'Lên nhịp cảm xúc, thay vì chỉ tạo một tập hợp hình ảnh đẹp.', media: gulp.chapters.map(c=>({src:c.image,alt:c.alt,caption:c.name})) },
        motion: { title: en ? 'Slow down to let the feeling land.' : 'Chậm lại để cảm xúc chạm tới người xem.', text: en ? 'This silent excerpt from the finished edit shows the sunset sequence. Compare its pacing and framing with the storyboard; the production artwork and final shot are different interpretations of the same story beat.' : 'Trích đoạn không tiếng từ bản dựng hoàn chỉnh cho thấy cảnh hoàng hôn. So sánh nhịp và góc máy với storyboard: tư liệu tạo hình và cảnh phim diễn đạt cùng nhịp truyện theo cách khác nhau.', lesson: en ? 'Judge movement by what it communicates. A quiet shot can carry the turning point of a film.' : 'Đánh giá chuyển động qua điều nó truyền tải. Một cảnh tĩnh lặng có thể là bước ngoặt của cả phim.', media:[{src:greatGulp.preview,poster:greatGulp.poster,alt:gulp.chapters[2].alt,caption:en?'12-second excerpt from the finished edit':'Trích đoạn 12 giây từ bản dựng hoàn chỉnh'}] },
        film: { title: greatGulp.title, text: gulp.caseDescription, lesson: en ? 'Watch how the final edit brings character, comic timing and sound together across the 3:58 film.' : 'Xem cách bản dựng kết nối nhân vật, nhịp hài và âm thanh trong bộ phim dài 3 phút 58 giây.', film:{title:greatGulp.title,url:greatGulp.url,thumbnail:greatGulp.poster,platform:'YouTube',description:gulp.caseDescription} },
      },
    },
    {
      id:'little-rat',title:'Clever Little Rat',subtitle:en?'Character continuity & shot planning':'Nhân vật nhất quán & kế hoạch cảnh quay',cover:'/images/studio-reel.jpg',
      stages: {
        story:{title:en?'A tiny bridge. A shared challenge.':'Cây cầu nhỏ. Thử thách chung.',text:en?'A bridge made of buttons is perfect for Pip, but too small for Leo and unstable for Mio. The setting itself creates the problem, while their different sizes shape the action.':'Cây cầu cúc áo vừa vặn với Pip, nhưng quá nhỏ với Leo và không vững với Mio. Chính bối cảnh tạo ra thử thách, còn khác biệt kích thước dẫn dắt hành động.',quote:'Pip: “See? Perfectly simple.”\nMio: “For tiny sneaker feet!”',lesson:en?'Let the world create a problem that only these characters would face.':'Để thế giới trong phim tạo ra thử thách riêng cho các nhân vật.',media:[{src:'/images/studio-reel.jpg',alt:home.process.result.alt,caption:'Clever Little Rat: Through the Button Bridge'}]},
        characters:{title:en?'Keep Leo recognisable from every angle.':'Giữ Leo nhất quán từ mọi góc nhìn.',text:home.hero.turnaround.caption,lesson:en?'Lock the character reference before exploring new shots. Keep wardrobe, proportions and identity consistent.':'Chốt ảnh tham chiếu trước khi phát triển cảnh mới. Giữ trang phục, tỷ lệ và nhận diện xuyên suốt.',media:[{src:'/images/process/leo-turnaround.webp',alt:home.hero.turnaround.alt,caption:en?'Leo · Character turnaround':'Leo · Các góc nhìn nhân vật'}]},
        storyboard:{title:home.process.plan.title,text:home.process.plan.text,lesson:en?'Give each cut a purpose. Coordinate action, camera and dialogue before judging a generated take.':'Cho mỗi nhịp cắt một mục đích. Phối hợp hành động, góc máy và lời thoại trước khi đánh giá cảnh tạo bằng AI.',media:[{src:home.process.plan.image,alt:home.process.plan.alt,caption:en?'Scene 6, shot 2 · Shot-planning study':'Cảnh 6, shot 2 · Bảng nghiên cứu cảnh quay'}]},
        motion:{title:en?'From simple shapes to a moving character.':'Từ khối đơn giản đến nhân vật chuyển động.',text:en?'Compare the 3D blocking and AI-generated shot for scene 6, shot 2. Both are studio materials for the same shot; this comparison does not imply that one was generated directly from the other.':'So sánh bản dựng khối 3D và cảnh tạo bằng AI của cảnh 6, shot 2. Đây là tư liệu studio cho cùng một cảnh, không khẳng định cảnh AI được tạo trực tiếp từ bản dựng khối này.',lesson:en?'Check the path, scale and camera movement separately from surface detail.':'Kiểm tra đường đi, tỷ lệ và chuyển động máy quay trước khi chú ý tiểu tiết.',media:[{src:home.process.blocking.src,poster:home.process.blocking.poster,alt:home.process.blocking.alt,caption:home.process.blocking.label},{src:home.process.shot.src,poster:home.process.shot.poster,alt:home.process.shot.alt,caption:home.process.shot.label}]},
        film:{title:'Clever Little Rat: Through the Button Bridge',text:home.process.result.text,lesson:en?'See how individual shots become a continuous adventure through editing and sound.':'Quan sát cách dựng phim và âm thanh kết nối từng cảnh thành cuộc phiêu lưu liền mạch.',film:{title:'Clever Little Rat: Through the Button Bridge',description:home.process.result.text,platform:'YouTube',url:'https://www.youtube.com/watch?v=1_EZiRh8o_o',thumbnail:'/images/studio-reel.jpg'}},
      },
    },
    {
      id:'titus',title:'The Legend of Titus',subtitle:en?'Adventure & worldbuilding':'Phiêu lưu & xây dựng thế giới',cover:'/images/titus.jpg',notice:en?'Explore the finished film. The production breakdown has not been published here yet.':'Khám phá phim hoàn chỉnh. Phần phân tích quy trình sản xuất chưa được công bố tại đây.',
      stages:{film:{title:'The Legend of Titus',text:en?'Follow Titus the cat and his friends in an animated adventure. Watch how the characters and settings connect from one scene to the next.':'Theo chân chú mèo Titus và những người bạn trong cuộc phiêu lưu hoạt hình. Quan sát cách nhân vật và bối cảnh kết nối từ cảnh này sang cảnh khác.',lesson:en?'Watch for continuity: what helps you recognise the same character and world when the shot changes?':'Quan sát tính liên tục: điều gì giúp bạn nhận ra cùng nhân vật và thế giới khi cảnh quay thay đổi?',film:{title:'The Legend of Titus',description:'GenYZ Studio',platform:'YouTube',url:'https://www.youtube.com/watch?v=VzmqrgQumGo',thumbnail:'/images/titus.jpg'}}},
    },
  ];
}

/** Films without documented production assets show only their own finished film. */
export function getSelectedWorkflow(locale: Locale, url: string): WorkflowProject {
  const projects = getWorkflows(locale);
  const documented = projects.find(project => project.stages.film?.film?.url === url);
  if (documented) return documented;
  const film = (locale === 'en' ? studioVideosEn : studioVideos).find(video => video.url === url);
  if (!film) return projects[0];
  return {
    id: film.url, title: film.title, subtitle: film.lesson || '', cover: film.thumbnail,
    notice: locale === 'en' ? 'The production breakdown for this film has not been published here yet.' : 'Phần phân tích quy trình sản xuất của phim này chưa được công bố tại đây.',
    stages: { film: { title: film.title, text: film.description, lesson: film.lesson || film.description, film } },
  };
}
