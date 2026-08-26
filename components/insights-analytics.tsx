"use client";

import { useEffect, useRef } from "react";
import { GA_READY_EVENT, type InsightsEventName, trackInsightsEvent } from "@/lib/analytics";

type InsightsAnalyticsProps = {
  articleTitle?: string;
  articleSlug?: string;
  contentSection?: string;
  trackArticle?: boolean;
};

const scrollMilestones = [25, 50, 75, 90] as const;

export function InsightsAnalytics({ articleTitle, articleSlug, contentSection, trackArticle = false }: InsightsAnalyticsProps) {
  const articleViewSent = useRef(false);
  const scrollEventsSent = useRef(new Set<number>());

  useEffect(() => {
    const sendArticleView = () => {
      if (!trackArticle || articleViewSent.current || !window.bloomshieldGaConfigured) return;
      articleViewSent.current = true;
      trackInsightsEvent("insights_article_view", {
        article_title: articleTitle,
        article_slug: articleSlug,
        content_section: contentSection,
        source_page: window.location.pathname,
      });
    };

    sendArticleView();
    window.addEventListener(GA_READY_EVENT, sendArticleView);
    return () => window.removeEventListener(GA_READY_EVENT, sendArticleView);
  }, [articleSlug, articleTitle, contentSection, trackArticle]);

  useEffect(() => {
    if (!trackArticle) return;

    const measureScroll = () => {
      if (!window.bloomshieldGaConfigured) return;
      const article = document.querySelector<HTMLElement>("[data-insights-article]");
      if (!article) return;
      const articleTop = article.getBoundingClientRect().top + window.scrollY;
      const trackableHeight = Math.max(article.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(100, Math.max(0, ((window.scrollY - articleTop) / trackableHeight) * 100));

      scrollMilestones.forEach((milestone) => {
        if (progress < milestone || scrollEventsSent.current.has(milestone)) return;
        scrollEventsSent.current.add(milestone);
        trackInsightsEvent("insights_scroll_depth", {
          article_title: articleTitle,
          article_slug: articleSlug,
          scroll_percent: milestone,
        });
      });
    };

    measureScroll();
    window.addEventListener("scroll", measureScroll, { passive: true });
    window.addEventListener(GA_READY_EVENT, measureScroll);
    return () => {
      window.removeEventListener("scroll", measureScroll);
      window.removeEventListener(GA_READY_EVENT, measureScroll);
    };
  }, [articleSlug, articleTitle, trackArticle]);

  useEffect(() => {
    const trackClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-insights-event]") : null;
      if (!target) return;
      const eventName = target.dataset.insightsEvent as InsightsEventName | undefined;
      if (!eventName) return;
      trackInsightsEvent(eventName, {
        article_title: articleTitle,
        article_slug: articleSlug,
        content_section: target.dataset.contentSection ?? contentSection,
        destination_url: target instanceof HTMLAnchorElement ? target.href : target.dataset.destinationUrl,
        source_page: window.location.pathname,
      });
    };

    document.addEventListener("click", trackClick);
    return () => document.removeEventListener("click", trackClick);
  }, [articleSlug, articleTitle, contentSection]);

  return null;
}
