import type { Metadata } from "next";

export const SITE_URL = "https://bloomshield.org";
export const SITE_NAME = "BloomShield CIC";
export const SOCIAL_IMAGE = "/bloomshield-social-card.png";
export const HOME_DESCRIPTION =
  "BloomShield CIC works with communities, health systems and partners to improve equitable cancer prevention through implementation science, research and community-led programmes.";

type PageMetadata = {
  title: string;
  description: string;
  path: `/${string}` | "/";
  absoluteTitle?: boolean;
};

export function createMetadata({ title, description, path, absoluteTitle = false }: PageMetadata): Metadata {
  const canonical = new URL(path, SITE_URL).toString();
  const socialTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "en_GB",
      siteName: SITE_NAME,
      url: canonical,
      title: socialTitle,
      description,
      images: [{
        url: SOCIAL_IMAGE,
        width: 1200,
        height: 630,
        alt: "BloomShield — Shielded by Care, Empowered to Bloom.",
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [SOCIAL_IMAGE],
    },
  };
}
