import { HOME_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";

const organisationId = `${SITE_URL}/#organization`;
const websiteId = `${SITE_URL}/#website`;

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function SiteStructuredData() {
  return <JsonLd data={{
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organisationId,
        name: "BloomShield Community Interest Company",
        alternateName: SITE_NAME,
        legalName: "BloomShield Community Interest Company",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/bloomshield-square-lockup.png`,
          width: 545,
          height: 590,
        },
        description: HOME_DESCRIPTION,
        identifier: {
          "@type": "PropertyValue",
          propertyID: "Companies House company number",
          value: "17341879",
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "124 City Road",
          addressLocality: "London",
          postalCode: "EC1V 2NX",
          addressCountry: "GB",
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "general enquiries",
          url: `${SITE_URL}/contact`,
          availableLanguage: "English",
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: SITE_URL,
        name: SITE_NAME,
        description: HOME_DESCRIPTION,
        publisher: { "@id": organisationId },
        inLanguage: "en-GB",
      },
    ],
  }} />;
}

type PageStructuredDataProps = {
  name: string;
  description: string;
  path: `/${string}` | "/";
  breadcrumb?: string;
};

export function PageStructuredData({ name, description, path, breadcrumb }: PageStructuredDataProps) {
  const url = new URL(path, SITE_URL).toString();
  const graph: Record<string, unknown>[] = [{
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { "@id": websiteId },
    about: { "@id": organisationId },
    inLanguage: "en-GB",
  }];

  if (breadcrumb) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: breadcrumb, item: url },
      ],
    });
  }

  return <JsonLd data={{ "@context": "https://schema.org", "@graph": graph }} />;
}
