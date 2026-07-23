import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const publicRoutes = ["", "/about", "/programmes", "/programmes/screensmart-communities", "/programmes/screenaccess", "/programmes/screenconnect", "/consultancy", "/research-innovation", "/partnerships", "/contact", "/privacy", "/cookies", "/accessibility"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
