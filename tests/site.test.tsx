import { test } from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { siteConfig, type SiteConfig } from "../config/site";
import { isZaloUrl, isPreview, validateSite, getSiteUrl, canIndex } from "../lib/site";
import { Registration } from "../components/registration";
import { ContactDetails } from "../components/contact-details";
import { WorkshopDetails } from "../components/workshop-details";

const emptyConfig = (): SiteConfig => ({ ...structuredClone(siteConfig), contact: { zaloUrl: "", qrImage: "", phone: "", email: "", socialLinks: [] } });

test("registration stays closed without a destination", () => {
  const html = renderToStaticMarkup(<Registration url="" />);
  assert.match(html, /Đăng ký sẽ mở sớm/);
  assert.match(html, /aria-disabled="true"/);
  assert.doesNotMatch(html, /href=/);
});
test("registration uses the exact configured Zalo destination", () => {
  const url = "https://zalo.me/g/example";
  const html = renderToStaticMarkup(<Registration url={url} />);
  assert.match(html, /Đăng ký quan tâm qua Zalo/);
  assert.ok(html.includes(`href="${url}"`));
  assert.match(html, /rel="noopener noreferrer"/);
});
test("Zalo rejects unsafe, misleading and incomplete URLs", () => {
  for (const url of ["", "http://zalo.me/example", "https://zalo.me", "https://zalo.me/", "https://zalo.me.evil.test/example", "https://zalo.me@evil.test/example", "javascript:alert(1)", "https://zalo.me:444/example", "https://user:pass@zalo.me/example"]) assert.equal(isZaloUrl(url), false, url);
  for (const url of ["https://zalo.me/example", "https://zalo.me/g/example"]) assert.equal(isZaloUrl(url), true, url);
});
test("empty Zalo allows hosting while configured invalid destinations are rejected", () => {
  const config = emptyConfig();
  assert.deepEqual(validateSite(config), []);
  config.contact.zaloUrl = "https://zalo.me/example";
  assert.deepEqual(validateSite(config), []);
  config.contact.zaloUrl = "bad-link";
  assert.ok(validateSite(config).length);
});
test("Vercel production indexing cannot be changed with local preview flag", () => {
  assert.equal(isPreview({ VERCEL_ENV: "production", SITE_BUILD_MODE: "preview" }), false);
  assert.equal(isPreview({ VERCEL_ENV: "preview" }), true);
  assert.equal(isPreview({ SITE_BUILD_MODE: "preview" }), true);
  assert.equal(isPreview({}), false);
});
test("unset contact fields render no links or QR", () => {
  assert.equal(renderToStaticMarkup(<ContactDetails contact={emptyConfig().contact} />), "");
});
test("configured contact fields render with valid schemes", () => {
  const contact = { ...emptyConfig().contact, email: "studio@example.com", phone: "+84 123 456 789", socialLinks: [{ label: "YouTube", url: "https://www.youtube.com/@example" }] };
  const html = renderToStaticMarkup(<ContactDetails contact={contact} />);
  assert.match(html, /href="mailto:studio@example.com"/);
  assert.match(html, /href="tel:\+84123456789"/);
  assert.match(html, /YouTube/);
});
test("unscheduled workshop shows pending date and city, hides optional details", () => {
  const html = renderToStaticMarkup(<WorkshopDetails workshop={{ city: "", venue: "", date: "", duration: "", capacity: null }} />);
  assert.equal((html.match(/Sẽ thông báo/g) || []).length, 2);
  for (const label of ["Địa chỉ", "Thời lượng", "Số chỗ"]) assert.ok(!html.includes(label));
});
test("configured workshop details are visible", () => {
  const html = renderToStaticMarkup(<WorkshopDetails workshop={{ city: "Hà Nội", venue: "Địa điểm mẫu", date: "Ngày đã xác nhận", duration: "2 giờ", capacity: 12 }} />);
  for (const value of ["Hà Nội", "Địa điểm mẫu", "Ngày đã xác nhận", "2 giờ", "12 người"]) assert.ok(html.includes(value));
  assert.doesNotMatch(html, /Sẽ thông báo/);
});
test("metadata uses configured production origin and preview deployment URL", () => {
  const config = { ...emptyConfig(), siteUrl: "https://example.com" };
  assert.equal(getSiteUrl(config, { VERCEL_ENV: "production" }), "https://example.com");
  assert.equal(getSiteUrl(config, { VERCEL_ENV: "preview", VERCEL_URL: "preview.vercel.app" }), "https://preview.vercel.app");
  assert.equal(getSiteUrl(emptyConfig(), { VERCEL_PROJECT_PRODUCTION_URL: "studio.vercel.app" }), "https://studio.vercel.app");
  assert.equal(canIndex({ VERCEL_ENV: "preview" }), false);
  assert.equal(canIndex({ VERCEL_ENV: "production" }), true);
  assert.equal(canIndex({}), false);
});
test("optional settings cannot silently introduce unsafe destinations", () => {
  const config = emptyConfig();
  config.contact.qrImage = "https://outside.test/qr.png";
  config.contact.socialLinks = [{ label: "Profile", url: "javascript:alert(1)" }];
  config.siteUrl = "https://example.com/path";
  config.workshop.capacity = -1;
  config.skool.status = "available";
  const errors = validateSite(config);
  for (const field of ["qrImage", "socialLinks", "siteUrl", "capacity", "skool.url"]) assert.ok(errors.some(error => error.includes(field)), field);
});

test("studio video validation accepts only matching public platform links", async () => {
  const { validateShowcase } = await import("../lib/showcase");
  const video = { title: "Studio example", description: "Studio-owned film", platform: "YouTube" as const, url: "https://www.youtube.com/watch?v=VzmqrgQumGo", thumbnail: "" };
  assert.deepEqual(validateShowcase([video]), []);
  for (const url of ["javascript:alert(1)", "https://youtube.com.evil.test/watch", "https://www.tiktok.com/@example/video/7681309763950447893", "https://www.youtube.com/"]) assert.ok(validateShowcase([{ ...video, url }]).length, url);
  assert.deepEqual(validateShowcase([{ ...video, platform: "TikTok", url: "https://www.tiktok.com/@example/video/7681309763950447893" }]), []);
});
test("studio thumbnails must be local image paths and duplicate videos are rejected", async () => {
  const { validateShowcase } = await import("../lib/showcase");
  const video = { title: "Studio example", description: "Studio-owned film", platform: "YouTube" as const, url: "https://youtu.be/VzmqrgQumGo", thumbnail: "/images/example.webp" };
  assert.deepEqual(validateShowcase([video]), []);
  for (const thumbnail of ["https://outside.test/image.jpg", "/images/../../private.png", "/images/example.svg"]) assert.ok(validateShowcase([{ ...video, thumbnail }]).length, thumbnail);
  assert.ok(validateShowcase([video, video]).some(error => error.includes("duplicate")));
});

test("embed URLs are derived from supported IDs, never arbitrary destinations", async () => {
  const { getVideoEmbed } = await import("../lib/video");
  assert.equal(getVideoEmbed({ platform: "YouTube", url: "https://www.youtube.com/watch?v=VzmqrgQumGo" }), "https://www.youtube-nocookie.com/embed/VzmqrgQumGo?rel=0&hl=vi");
  assert.match(getVideoEmbed({ platform: "TikTok", url: "https://www.tiktok.com/@genyzstudio/video/7681309763950447893" }) || "", /^https:\/\/www.tiktok.com\/player\/v1\/7681309763950447893\?/);
  for (const url of ["https://youtu.be/bad", "https://www.youtube.com/@GenYZStudio", "https://www.youtube.com/watch?v=../../bad", "https://evil.test/watch?v=VzmqrgQumGo"]) assert.equal(getVideoEmbed({ platform: "YouTube", url }), null);
});
test("video players render local posters and no third-party iframe before interaction", async () => {
  const { VideoPlayer } = await import("../components/video-player");
  const { studioVideos } = await import("../content/showcase");
  for (const video of studioVideos) {
    const html = renderToStaticMarkup(<VideoPlayer video={video} />);
    assert.match(html, /Mở video/);
    assert.doesNotMatch(html, /<iframe/);
  }
});
