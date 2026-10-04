import Image from "next/image";
import type { SiteConfig } from "@/config/site";
import { getHome, type Locale } from "@/content/locales";

// Renders only real, owner-supplied details; with an empty name or bio the section is omitted.
export function Instructor({ instructor, locale }: { instructor: SiteConfig["instructor"]; locale: Locale }) {
  if (!instructor.name.trim() || !instructor.bio.trim()) return null;
  const home = getHome(locale);
  return <section className="section shell instructor" aria-labelledby="instructor-title">
    {instructor.photo && <Image className="instructor-photo" src={instructor.photo} alt={home.instructor.photoAlt} width={240} height={240} />}
    <div>
      <h2 id="instructor-title">{home.instructor.title}</h2>
      <p className="instructor-name">{instructor.name}{instructor.role && <span>{instructor.role}</span>}</p>
      <p className="instructor-bio">{instructor.bio}</p>
    </div>
  </section>;
}
