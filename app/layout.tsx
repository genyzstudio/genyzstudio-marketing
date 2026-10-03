import type { Metadata, Viewport } from "next";
import { home } from "@/content/home";
import { siteConfig } from "@/config/site";
import { canIndex, getSiteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl(siteConfig)),
  title: home.metadata.title,
  description: home.metadata.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website", locale: "vi_VN", siteName: "GenYZ Studio",
    title: home.metadata.title, description: home.metadata.description, url: "/",
    images: [{ url: "/images/social-preview.jpg", width: 1200, height: 630, alt: "GenYZ Studio — Tự tay làm video AI đầu tiên" }],
  },
  twitter: { card: "summary_large_image", title: home.metadata.title, description: home.metadata.description, images: ["/images/social-preview.jpg"] },
  robots: { index: canIndex(), follow: canIndex() },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: [{ media: "(prefers-color-scheme: light)", color: "#faf9f6" }, { media: "(prefers-color-scheme: dark)", color: "#131313" }] };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body>{children}</body></html>;
}
