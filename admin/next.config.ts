import type { NextConfig } from "next";
const config: NextConfig = { distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next", experimental: { externalDir: true }, async headers() { return [{ source: "/:path*", headers: [{key:"Cache-Control",value:"no-store"},{key:"X-Robots-Tag",value:"noindex, nofollow"},{key:"X-Frame-Options",value:"DENY"},{key:"Referrer-Policy",value:"no-referrer"},{key:"X-Content-Type-Options",value:"nosniff"},{key:"Content-Security-Policy",value:"frame-ancestors 'none'; base-uri 'self'; object-src 'none'"}] }]; } };
export default config;
