import { ORGANIZATION_NAME, SITE_URL } from "@/lib/seo";

type InsightsCollectionStructuredDataProps = {
  title: string;
  description: string;
  path: string;
  image: string;
  keywords: readonly string[];
  items?: { name: string; url: string }[];
};

export function InsightsCollectionStructuredData({ title, description, path, image, keywords, items = [] }: InsightsCollectionStructuredDataProps) {
  const url = new URL(path, SITE_URL).toString();
  const data = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#collection`,
    name: title,
    description,
    url,
    image: new URL(image, SITE_URL).toString(),
    keywords: keywords.join(", "),
    isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}/#website`, name: "BloomShield CIC", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "BloomShield Insights",
      url: `${SITE_URL}/insights`,
      parentOrganization: { "@type": "Organization", name: ORGANIZATION_NAME, url: SITE_URL },
    },
    ...(items.length ? { hasPart: items.map(item => ({ "@type": "CreativeWork", name: item.name, url: new URL(item.url, SITE_URL).toString() })) } : {}),
    inLanguage: "en-GB",
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
