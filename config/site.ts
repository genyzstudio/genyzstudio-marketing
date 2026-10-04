/** Public launch settings. Leave unknown values empty; never put secrets here.
 * Edit this file, then rebuild/redeploy. Full instructions are in README.md.
 */
export interface SiteConfig {
  siteUrl: string;
  contact: { zaloUrl: string; qrImage: string; phone: string; email: string; socialLinks: { label: string; url: string }[] };
  workshop: { city: string; venue: string; date: string; duration: string; capacity: number | null };
  instructor: { name: string; role: string; bio: string; photo: string };
  skool: { status: "coming-soon" | "available"; url: string };
}
export const siteConfig: SiteConfig = {
  // Public custom domain connected to Cloudflare Pages.
  siteUrl: "https://genyzstudio.com",
  contact: {
    zaloUrl: "https://zalo.me/0358155746",
    // Optional file under public/, e.g. /images/zalo-qr.png.
    qrImage: "",
    phone: "",
    email: "genyzstudio@gmail.com",
    socialLinks: [
      { label: "YouTube", url: "https://www.youtube.com/@GenYZStudio" },
      { label: "TikTok", url: "https://www.tiktok.com/@genyzstudio" },
    ],
  },
  workshop: {
    city: "",
    venue: "",
    // Human-readable Vietnamese date/time, including timezone when relevant.
    date: "",
    duration: "",
    capacity: null,
  },
  // Shown only when name and bio are filled in. Use real, owner-approved details;
  // photo is an optional local file such as /images/instructor.jpg.
  instructor: { name: "", role: "", bio: "", photo: "" },
  skool: { status: "coming-soon", url: "" },
};
