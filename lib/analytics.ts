export const GA_READY_EVENT = "bloomshield:ga-ready";

export type InsightsEventName =
  | "insights_article_view"
  | "insights_linkedin_click"
  | "insights_contact_click"
  | "insights_related_content_click"
  | "insights_category_click"
  | "insights_reaction"
  | "insights_share"
  | "insights_scroll_depth";

export type SiteSearchEventName =
  | "site_search_open"
  | "site_search_submit"
  | "site_search_result_click"
  | "site_search_no_results";

export type AnalyticsParameters = Record<string, string | number | boolean | undefined>;

export function trackInsightsEvent(eventName: InsightsEventName, parameters: AnalyticsParameters = {}) {
  if (typeof window === "undefined" || !window.bloomshieldGaConfigured || !window.gtag) return;
  window.gtag("event", eventName, parameters);
}

export function trackSiteSearchEvent(eventName: SiteSearchEventName, parameters: AnalyticsParameters = {}) {
  if (typeof window === "undefined" || !window.bloomshieldGaConfigured || !window.gtag) return;
  window.gtag("event", eventName, parameters);
}
