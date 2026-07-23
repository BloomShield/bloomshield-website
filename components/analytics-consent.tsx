"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

type ConsentChoice = "accepted" | "rejected" | null;
type GtagArguments = [command: string, ...values: unknown[]];

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: GtagArguments) => void;
    bloomshieldGaConfigured?: boolean;
  }
}

const CONSENT_KEY = "bloomshield-analytics-consent";
const SETTINGS_EVENT = "bloomshield:open-cookie-settings";
const COOKIE_PREFIXES = ["_ga", "_gid", "_gat"];

function initialiseDataLayer() {
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = window.gtag ?? function gtag() {
    // Google Tag expects the native Arguments object used by its standard snippet.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  };
}

function setConsentState(analyticsStorage: "granted" | "denied") {
  initialiseDataLayer();
  window.gtag?.("consent", "update", {
    analytics_storage: analyticsStorage,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

function grantAnalyticsConsent() {
  initialiseDataLayer();
  if (!window.bloomshieldGaConfigured) {
    window.gtag?.("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  }
  setConsentState("granted");
}

function removeAnalyticsCookies() {
  const hostParts = window.location.hostname.split(".");
  const domains = ["", window.location.hostname, `.${window.location.hostname}`];
  if (hostParts.length > 1) domains.push(`.${hostParts.slice(-2).join(".")}`);

  document.cookie.split(";").forEach((entry) => {
    const name = entry.split("=")[0]?.trim();
    if (!name || !COOKIE_PREFIXES.some((prefix) => name.startsWith(prefix))) return;
    domains.forEach((domain) => {
      const domainAttribute = domain ? `; domain=${domain}` : "";
      document.cookie = `${name}=; Max-Age=0; path=/${domainAttribute}; SameSite=Lax`;
    });
  });
}

function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const configured = useRef(false);
  const lastPage = useRef<string | null>(null);
  const pagePath = pathname;

  const configure = useCallback(() => {
    if (configured.current) return;
    configured.current = true;
    initialiseDataLayer();
    window.bloomshieldGaConfigured = true;
    window.gtag?.("js", new Date());
    window.gtag?.("config", measurementId, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      ads_data_redaction: true,
    });
    setReady(true);
  }, [measurementId]);

  useEffect(() => {
    if (!ready || lastPage.current === pagePath) return;
    lastPage.current = pagePath;
    window.gtag?.("event", "page_view", {
      page_title: document.title,
      page_location: `${window.location.origin}${pagePath}`,
      page_path: pagePath,
    });
  }, [pagePath, ready]);

  return (
    <Script
      id="bloomshield-google-analytics"
      src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`}
      strategy="afterInteractive"
      onLoad={configure}
      onReady={configure}
    />
  );
}

export function CookieSettingsButton() {
  return (
    <button type="button" className="text-left hover:text-white" onClick={() => window.dispatchEvent(new Event(SETTINGS_EVENT))}>
      Cookie settings
    </button>
  );
}

export function AnalyticsConsent() {
  const [choice, setChoice] = useState<ConsentChoice>(null);
  const [loaded, setLoaded] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const analyticsEnabled = process.env.NODE_ENV === "production" && Boolean(measurementId);

  useEffect(() => {
    const saved = window.localStorage.getItem(CONSENT_KEY);
    if (saved === "accepted") grantAnalyticsConsent();
    setChoice(saved === "accepted" || saved === "rejected" ? saved : null);
    setLoaded(true);
    const openSettings = () => setSettingsOpen(true);
    window.addEventListener(SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(SETTINGS_EVENT, openSettings);
  }, []);

  function saveChoice(nextChoice: Exclude<ConsentChoice, null>) {
    window.localStorage.setItem(CONSENT_KEY, nextChoice);
    setChoice(nextChoice);
    setSettingsOpen(false);
    if (nextChoice === "accepted") {
      grantAnalyticsConsent();
    } else {
      if (window.gtag) setConsentState("denied");
      removeAnalyticsCookies();
    }
  }

  const showPanel = loaded && (choice === null || settingsOpen);

  return (
    <>
      {analyticsEnabled && choice === "accepted" && measurementId ? <GoogleAnalytics measurementId={measurementId} /> : null}
      {showPanel ? (
        <section role="region" aria-live="polite" aria-labelledby="cookie-consent-title" className="fixed inset-x-4 bottom-4 z-[110] mx-auto max-w-3xl rounded-3xl border border-teal-900/15 bg-white p-5 shadow-[0_24px_80px_-24px_rgba(7,31,52,.45)] sm:p-6">
          <div className="sm:flex sm:items-start sm:justify-between sm:gap-8">
            <div>
              <h2 id="cookie-consent-title" className="font-display text-xl font-semibold text-ink">Analytics Cookies</h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">Optional Google Analytics cookies help us understand aggregate website use and improve BloomShield. The website works without them.</p>
              <a href="/cookies" className="mt-2 inline-block text-sm font-semibold text-teal-800 underline underline-offset-4">Read our cookie notice</a>
            </div>
            <div className="mt-5 grid shrink-0 gap-3 sm:mt-0 sm:min-w-52">
              <button type="button" className="min-h-11 rounded-full border border-teal-700 bg-white px-5 py-2 text-sm font-bold text-teal-800 hover:bg-teal-50" onClick={() => saveChoice("accepted")}>Accept analytics cookies</button>
              <button type="button" className="min-h-11 rounded-full border border-teal-700 bg-white px-5 py-2 text-sm font-bold text-teal-800 hover:bg-teal-50" onClick={() => saveChoice("rejected")}>Reject analytics cookies</button>
              {choice !== null && settingsOpen ? <button type="button" className="min-h-10 px-4 text-sm font-semibold text-slate-600 underline underline-offset-4" onClick={() => setSettingsOpen(false)}>Keep current choice</button> : null}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
