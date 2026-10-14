import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { workshopCurriculum } from '../server/workshop-content';

const files = (directory: string): string[] => readdirSync(directory, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? files(join(directory, entry.name)) : [join(directory, entry.name)]);
const needles = (['clever-rat', 'five-levels', 'master-frame', 'directors-framework', 'fight-scenes'] as const).flatMap(course => (['vi', 'en'] as const).flatMap(locale => {
  const content = workshopCurriculum(locale, course);
  return [...content.lessons.flatMap(lesson => (lesson.visualExamples || []).flatMap(example => [example.instruction, example.review, ...(example.promptVi ? [example.promptVi.slice(0, 90)] : [])])), ...content.lessons.flatMap(lesson => (lesson.techniques || []).flatMap(lab => [lab.goal, lab.input, lab.check, lab.fix, ...lab.steps.flatMap(step => [step.instruction, ...(step.promptVi ? [step.promptVi.slice(0, 90)] : []), ...(step.prompt ? [step.prompt.slice(0, 90)] : [])])])), ...content.lessons.flatMap(lesson => [lesson.goal, ...lesson.steps.flatMap(step => [step.instruction, ...(step.promptVi ? [step.promptVi.slice(0, 90)] : []), ...(step.prompt ? [step.prompt.slice(0, 90)] : [])])]),
    ...content.syllabus.map(module => module.summary), ...content.preparation.steps.map(step => step.text), content.preparation.intro,
    ...(content.preparation.visualGuide || []).flatMap(guide => [guide.intro, guide.tryIt, ...guide.captions, ...(guide.recreation ? [guide.recreation.promptVi.slice(0,90)] : [])]),
    ...content.glossary.map(entry => entry[1]), ...content.tools.map(tool => tool.purpose)];
}));
let count = 0;
for (const file of files('out').filter(path => /\.(html|js|json|txt|map)$/.test(path))) {
  const text = readFileSync(file, 'utf8'); count++;
  if (text.includes('/workshop/phoenix')) throw new Error(`Retired workshop link found: ${file}`);
  for (const needle of needles) {
    const escaped = JSON.stringify(needle).slice(1, -1);
    if (text.includes(needle) || text.includes(escaped)) throw new Error(`Protected prompt found in public export: ${file}`);
  }
  if (text.includes('GENYZ-LOCAL-PREVIEW-ONLY')) throw new Error(`Local fixture leaked into public export: ${file}`);
}
console.log(`Checked ${count} public text assets: no protected lesson prompts or local access fixture.`);

const routes = JSON.parse(readFileSync('out/_routes.json', 'utf8'));
if (!routes.include.includes('/api/workshop/*') || routes.exclude.length) throw new Error('Workshop asset routes must pass through authentication.');
if (existsSync('out/images/workshop-five-levels')) throw new Error('Workshop test images must not have public aliases.');
