import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const publicRoutes = ["", "/about", "/programmes", "/programmes/screensmart-communities", "/programmes/screenaccess", "/programmes/screenconnect", "/insights", "/insights/conversations", "/insights/conversations/from-diagnostics-to-access-africa", "/insights/evidence-policy/hpv-self-testing-screening-gap", "/cancer-prevention-screening", "/cancer-prevention-screening/bowel-screening", "/cancer-prevention-screening/cervical-screening", "/cancer-prevention-screening/breast-screening", "/cancer-prevention-screening/lung-health-checks", "/cancer-prevention-screening/fit-test", "/cancer-prevention-screening/hpv-test", "/cancer-prevention-screening/mammogram", "/cancer-prevention-screening/psa-test", "/cancer-prevention-screening/cancer-symptoms", "/cancer-prevention-screening/reducing-cancer-risk", "/cancer-prevention-screening/hpv-vaccination", "/cancer-prevention-screening/family-history-inherited-risk", "/consultancy", "/faith-community-funding-development", "/research-innovation", "/research/vcse-digital-capacity-study", "/partnerships", "/contact", "/privacy", "/cookies", "/accessibility"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
