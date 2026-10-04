import { studioVideos } from './showcase';
const translations: Record<string, { lesson: string; description: string }> = {
  'The Legend of Titus': { lesson: 'Storytelling across scenes', description: 'Follow Titus the cat and his friends. Observe how characters, settings and shots work together to create an animated story.' },
  'Clever Little Rat: Through the Button Bridge': { lesson: 'Characters & motion', description: 'Leo, Mio and Pip cross a tiny bridge. Observe character movement and how actions are arranged within a short scene.' },
  'Clever Little Rat: The First Clues': { lesson: 'Details & story rhythm', description: 'A golden crumb, a ribbon and mysterious footprints. See how small details build curiosity in a short TikTok animation.' },
  'Clever Little Rat: The Missing Royal Bell': { lesson: 'Openings & story problems', description: 'The royal bell has disappeared. Observe how a problem draws the characters into a story.' },
  'Clever Little Rat: The Zodiac Calendar Awakens': { lesson: 'Settings & worldbuilding', description: 'A magical calendar opens a door to the rat kingdom. Observe how a setting draws viewers into a new world.' },
  'Leo & Mio’s Morning Routine': { lesson: 'Music & editing rhythm', description: 'A morning told through music and animation. Watch how action and musical rhythm tell a familiar story.' }
};
export const studioVideosEn = studioVideos.map(video => ({ ...video, ...translations[video.title] }));
