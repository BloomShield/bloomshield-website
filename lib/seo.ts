import type { Metadata } from "next";

export const SITE_URL = "https://bloomshield.org";
export const SITE_NAME = "BloomShield CIC";
export const ORGANIZATION_NAME = "BloomShield Community Interest Company";
export const socialLinks = {
  instagram: "https://www.instagram.com/bloomshieldcic/",
  linkedin: "https://www.linkedin.com/company/bloomshield-cic/",
  x: "https://x.com/BloomShieldCIC",
} as const;
export const SOCIAL_IMAGE = "/bloomshield-social-card.png";
export const HOME_DESCRIPTION =
  "BloomShield CIC works with communities, health systems and partners to improve equitable cancer prevention through implementation science, research and community-led programmes.";

type PageMetadata = {
  title: string;
  description: string;
  path: `/${string}` | "/";
  absoluteTitle?: boolean;
  socialImage?: {
    url: `/${string}` | string;
    width: number;
    height: number;
    alt: string;
    secureUrl?: `/${string}` | string;
    type?: "image/jpeg" | "image/png" | "image/webp";
  };
};

type InsightMetadata = {
  title: string;
  description: string;
  path: string;
  socialImage: string;
  socialImageAlt: string;
  socialImageWidth: number;
  socialImageHeight: number;
  type?: "website" | "article";
  keywords?: readonly string[];
  authors?: readonly string[];
  datePublished?: string;
  dateModified?: string;
};

export function createMetadata({ title, description, path, absoluteTitle = false, socialImage }: PageMetadata): Metadata {
  const canonical = new URL(path, SITE_URL).toString();
  const socialTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  const image = socialImage ?? {
    url: SOCIAL_IMAGE,
    width: 1200,
    height: 630,
    alt: "BloomShield — Shielded by Care, Empowered to Bloom.",
  };
  const imageUrl = new URL(image.url, SITE_URL).toString();
  const openGraphImage = {
    url: imageUrl,
    width: image.width,
    height: image.height,
    alt: image.alt,
    ...(socialImage?.secureUrl ? { secureUrl: new URL(socialImage.secureUrl, SITE_URL).toString() } : {}),
    ...(socialImage?.type ? { type: socialImage.type } : {}),
  };

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
      images: [openGraphImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [openGraphImage],
    },
  };
}

export function createInsightMetadata({ title, description, path, socialImage, socialImageAlt, socialImageWidth, socialImageHeight, type = "website", keywords, authors, datePublished, dateModified }: InsightMetadata): Metadata {
  const canonical = new URL(path, SITE_URL).toString();
  const imageUrl = new URL(socialImage, SITE_URL).toString();
  const image = {
    url: imageUrl,
    secureUrl: imageUrl,
    type: "image/png",
    width: socialImageWidth,
    height: socialImageHeight,
    alt: socialImageAlt,
  };

  return {
    title,
    description,
    keywords: keywords ? [...keywords] : undefined,
    authors: authors?.map(name => ({ name })),
    publisher: "BloomShield Insights",
    alternates: { canonical },
    openGraph: {
      type,
      locale: "en_GB",
      siteName: "BloomShield Insights",
      url: canonical,
      title,
      description,
      images: [image],
      ...(type === "article" ? {
        publishedTime: datePublished,
        modifiedTime: dateModified,
        authors: authors ? [...authors] : undefined,
        tags: keywords ? [...keywords] : undefined,
      } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
