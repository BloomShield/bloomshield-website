export type FeaturedCampaign = {
  programme: string;
  kicker: string;
  title: string;
  description: string;
  line: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  href: `/${string}`;
  cta: string;
  accent: "pink" | "emerald";
};

export const tlcCampaign = {
  programme: "ScreenSmart",
  kicker: "Breast Awareness Month",
  title: "TLC — Touch. Look. Check.",
  description: "Get to know what is normal for you. Notice changes. If something looks or feels different, speak to your GP.",
  line: "Small changes can matter.",
  image: "/images/campaigns/tlc-breast-awareness.png",
  imageWidth: 1254,
  imageHeight: 1254,
  imageAlt: "BloomShield TLC breast awareness campaign: Touch, Look, Check.",
  href: "/programmes/screensmart-communities/tlc-breast-awareness",
  cta: "Explore the TLC campaign →",
  accent: "pink",
} satisfies FeaturedCampaign;

// Rotate the homepage campaign here; the permanent TLC page keeps its own data.
export const featuredCampaign: FeaturedCampaign = tlcCampaign;

export const tlcSteps = [
  { title: "Touch", text: "Get to know how your breasts normally feel." },
  { title: "Look", text: "Notice any changes in size, shape, skin or nipple appearance." },
  { title: "Check", text: "If something feels or looks different, speak to your GP." },
];

export const tlcDisclaimer = "TLC supports breast awareness and help-seeking. It does not replace NHS breast screening or advice from a healthcare professional.";

