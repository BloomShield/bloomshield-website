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
    url: `/${string}`;
    width: number;
    height: number;
    alt: string;
  };
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
        url: imageUrl,
        width: image.width,
        height: image.height,
        alt: image.alt,
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [{
        url: imageUrl,
        width: image.width,
        height: image.height,
        alt: image.alt,
      }],
    },
  };
}
