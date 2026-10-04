import type { Viewport } from "next";
import { pageMetadata } from "@/lib/seo";
import "../globals.css";
export const metadata = pageMetadata("vi");
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: [{ media: "(prefers-color-scheme: light)", color: "#faf9f6" }, { media: "(prefers-color-scheme: dark)", color: "#131313" }] };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
 return <html lang="vi"><body>{children}</body></html>;
}
