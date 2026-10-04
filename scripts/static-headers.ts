import { writeFileSync } from "node:fs";
import { staticHeaders } from "../lib/site";

// Cloudflare Pages serves these headers alongside the exported static assets.
writeFileSync("out/_headers", staticHeaders());
