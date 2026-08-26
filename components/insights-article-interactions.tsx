"use client";

import { useRef, useState } from "react";
import { Check, Heart, Share2, ThumbsDown, ThumbsUp } from "lucide-react";
import { trackInsightsEvent } from "@/lib/analytics";

type ReactionType = "love" | "like" | "dislike";

type InsightsArticleInteractionsProps = {
  articleTitle: string;
  articleSlug: string;
  contentSection: string;
};

const reactions: Array<{
  type: ReactionType;
  label: string;
  Icon: typeof Heart;
}> = [
  { type: "love", label: "React with love", Icon: Heart },
  { type: "like", label: "Like this insight", Icon: ThumbsUp },
  { type: "dislike", label: "Not for me", Icon: ThumbsDown },
];

function getCanonicalUrl() {
  return document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href || window.location.href.split("#")[0];
}

function copyText(text: string) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);

  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.select();
  const copied = document.execCommand("copy");
  textArea.remove();
  return copied ? Promise.resolve() : Promise.reject(new Error("Copy failed"));
}

export function InsightsArticleInteractions({ articleTitle, articleSlug, contentSection }: InsightsArticleInteractionsProps) {
  const [selectedReaction, setSelectedReaction] = useState<ReactionType | null>(null);
  const [shareStatus, setShareStatus] = useState<"idle" | "sharing" | "copied" | "error">("idle");
  const sharePending = useRef(false);

  const eventContext = {
    article_title: articleTitle,
    article_slug: articleSlug,
    content_section: contentSection,
    source_page: typeof window === "undefined" ? undefined : window.location.pathname,
  };

  function selectReaction(reactionType: ReactionType) {
    if (reactionType === selectedReaction) return;
    setSelectedReaction(reactionType);
    trackInsightsEvent("insights_reaction", {
      ...eventContext,
      reaction_type: reactionType,
    });
  }

  async function shareArticle() {
    if (sharePending.current) return;
    sharePending.current = true;
    const url = getCanonicalUrl();
    setShareStatus("sharing");

    try {
      if (navigator.share) {
        await navigator.share({ title: articleTitle, url });
        trackInsightsEvent("insights_share", { ...eventContext, share_method: "native_share" });
        setShareStatus("idle");
        return;
      }

      await copyText(url);
      setShareStatus("copied");
      trackInsightsEvent("insights_share", { ...eventContext, share_method: "copy_link" });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        setShareStatus("idle");
        return;
      }

      try {
        await copyText(url);
        setShareStatus("copied");
        trackInsightsEvent("insights_share", { ...eventContext, share_method: "copy_link" });
      } catch {
        setShareStatus("error");
      }
    } finally {
      sharePending.current = false;
    }
  }

  return (
    <div className="mt-6 border-y border-teal-900/10 py-5 sm:flex sm:items-center sm:justify-between sm:gap-6" aria-labelledby="insight-reactions-heading">
      <p id="insight-reactions-heading" className="!m-0 font-display text-lg font-semibold text-ink">How did this insight land with you?</p>
      <div className="mt-4 flex items-center gap-2 sm:mt-0" role="group" aria-label="React to or share this insight">
        {reactions.map(({ type, label, Icon }) => {
          const selected = selectedReaction === type;
          return (
            <button
              key={type}
              type="button"
              aria-label={label}
              title={label}
              aria-pressed={selected}
              onClick={() => selectReaction(type)}
              className={`inline-flex size-11 shrink-0 items-center justify-center rounded-full border transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800 ${selected ? "border-[#b9892f] bg-[#f3ead6] text-[#75551b]" : "border-teal-900/15 bg-white text-teal-800 hover:border-teal-700/40 hover:bg-teal-50"}`}
            >
              <Icon aria-hidden="true" size={19} strokeWidth={selected ? 2.5 : 2} className={selected && type === "love" ? "fill-current" : undefined} />
              {selected ? <span className="sr-only">Selected</span> : null}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => void shareArticle()}
          disabled={shareStatus === "sharing"}
          className="inline-flex min-h-11 min-w-[6.75rem] items-center justify-center gap-2 rounded-full border border-teal-900/15 bg-white px-4 text-sm font-bold text-teal-800 transition hover:border-teal-700/40 hover:bg-teal-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800 disabled:cursor-wait disabled:opacity-70"
        >
          {shareStatus === "copied" ? <Check aria-hidden="true" size={17} /> : <Share2 aria-hidden="true" size={17} />}
          {shareStatus === "copied" ? "Copied" : "Share"}
        </button>
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {shareStatus === "copied" ? "Link copied to clipboard." : shareStatus === "error" ? "The link could not be copied. Please copy it from your browser address bar." : ""}
      </p>
    </div>
  );
}
