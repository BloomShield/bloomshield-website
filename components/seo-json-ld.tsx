import { HOME_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";

const ids = {
  organization: `${SITE_URL}/#organization`,
  website: `${SITE_URL}/#website`,
  founder: `${SITE_URL}/#founder`,
  ccpe: `${SITE_URL}/#ccpe`,
  screenSmart: `${SITE_URL}/#screensmart-communities`,
  screenAccess: `${SITE_URL}/#screenaccess`,
  communityProgrammes: `${SITE_URL}/#community-programmes`,
  consultancy: `${SITE_URL}/consultancy#service`,
  researchInnovation: `${SITE_URL}/research-innovation#service`,
  partnerships: `${SITE_URL}/partnerships#service`,
} as const;

type PageKind =
  | "home"
  | "about"
  | "programmes"
  | "screensmart"
  | "screenaccess"
  | "consultancy"
  | "research"
  | "partnerships"
  | "default";

type PageStructuredDataProps = {
  name: string;
  description: string;
  path: `/${string}` | "/";
  breadcrumb?: string;
  kind?: PageKind;
};

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

function organizationNode(includeFounder: boolean) {
  return {
    "@type": "Organization",
    "@id": ids.organization,
    name: SITE_NAME,
    alternateName: "BloomShield Community Interest Company",
    legalName: "BloomShield Community Interest Company",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/bloomshield-square-lockup.png`,
      width: 545,
      height: 590,
    },
    description:
      "BloomShield CIC is a UK community interest company advancing equitable cancer prevention, health-system implementation, professional learning and responsible healthcare innovation.",
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
    ...(includeFounder ? { founder: { "@id": ids.founder } } : {}),
  };
}

const websiteNode = {
  "@type": "WebSite",
  "@id": ids.website,
  url: SITE_URL,
  name: SITE_NAME,
  description: HOME_DESCRIPTION,
  publisher: { "@id": ids.organization },
  inLanguage: "en-GB",
};

const founderNode = {
  "@type": "Person",
  "@id": ids.founder,
  name: "Dr Olufemi Olaleye",
  alternateName: "Dr Femi Olaleye",
  description: "Founder of BloomShield CIC.",
};

const ccpeNode = {
  "@type": "CreativeWork",
  "@id": ids.ccpe,
  name: "Cancer Care Partnership Ecosystem",
  alternateName: "CCPE",
  description:
    "An implementation framework developed by BloomShield CIC to connect communities, healthcare professionals, delivery organisations and partners around equitable cancer prevention and implementation.",
  url: `${SITE_URL}/about#ccpe`,
  creator: { "@id": ids.organization },
  publisher: { "@id": ids.organization },
  inLanguage: "en-GB",
};

const screenSmartNode = {
  "@type": "Service",
  "@id": ids.screenSmart,
  name: "ScreenSmart Communities™",
  description:
    "A flagship community cancer-prevention programme delivered by BloomShield CIC through the Cancer Care Partnership Ecosystem implementation framework.",
  serviceType: "Community cancer prevention, screening participation and early-diagnosis programme",
  url: `${SITE_URL}/programmes/screensmart-communities`,
  provider: { "@id": ids.organization },
  isBasedOn: { "@id": ids.ccpe },
  inLanguage: "en-GB",
};

const screenAccessNode = {
  "@type": "Service",
  "@id": ids.screenAccess,
  name: "ScreenAccess™",
  description:
    "A BloomShield CIC programme that identifies and removes practical, social, geographical and organisational barriers to cancer screening participation.",
  serviceType: "Equitable cancer screening access and participation programme",
  url: `${SITE_URL}/programmes/screenaccess`,
  provider: { "@id": ids.organization },
  isBasedOn: { "@id": ids.ccpe },
  inLanguage: "en-GB",
};

const communityProgrammesNode = {
  "@type": "Service",
  "@id": ids.communityProgrammes,
  name: "Community programmes",
  serviceType: "Community-led cancer prevention programmes",
  description:
    "Community-led, evidence-informed programmes that improve cancer prevention understanding, informed choice and access.",
  url: `${SITE_URL}/programmes`,
  provider: { "@id": ids.organization },
};

const consultancyNode = {
  "@type": "Service",
  "@id": ids.consultancy,
  name: "Consultancy and advisory",
  serviceType: "Health-system implementation consultancy and advisory",
  description:
    "Strategic implementation, health systems, cancer prevention, evaluation and responsible AI advisory from BloomShield CIC.",
  url: `${SITE_URL}/consultancy`,
  provider: { "@id": ids.organization },
};

const researchInnovationNode = {
  "@type": "Service",
  "@id": ids.researchInnovation,
  name: "Research and innovation",
  serviceType: "Applied research and responsible healthcare innovation",
  description:
    "Applied research in implementation science, digital health, responsible AI, evaluation and learning health systems from BloomShield CIC.",
  url: `${SITE_URL}/research-innovation`,
  provider: { "@id": ids.organization },
};

const partnershipsNode = {
  "@type": "Service",
  "@id": ids.partnerships,
  name: "Partnerships",
  serviceType: "Cancer prevention partnerships",
  description:
    "Partnership development connecting communities, health systems, universities, innovators, charities and international collaborators.",
  url: `${SITE_URL}/partnerships`,
  provider: { "@id": ids.organization },
};

function entitiesFor(kind: PageKind) {
  switch (kind) {
    case "home":
      return [
        ccpeNode,
        screenSmartNode,
        screenAccessNode,
        communityProgrammesNode,
        consultancyNode,
        researchInnovationNode,
        partnershipsNode,
      ];
    case "about":
      return [founderNode, ccpeNode];
    case "programmes":
      return [ccpeNode, screenSmartNode, screenAccessNode, communityProgrammesNode];
    case "screensmart":
      return [ccpeNode, screenSmartNode];
    case "screenaccess":
      return [ccpeNode, screenAccessNode];
    case "consultancy":
      return [consultancyNode];
    case "research":
      return [researchInnovationNode];
    case "partnerships":
      return [partnershipsNode];
    default:
      return [];
  }
}

function mainEntityFor(kind: PageKind) {
  switch (kind) {
    case "programmes":
    case "screensmart":
      return ids.screenSmart;
    case "screenaccess":
      return ids.screenAccess;
    case "consultancy":
      return ids.consultancy;
    case "research":
      return ids.researchInnovation;
    case "partnerships":
      return ids.partnerships;
    case "home":
    case "about":
      return ids.organization;
    default:
      return undefined;
  }
}

function aboutFor(kind: PageKind) {
  if (kind !== "home") return [{ "@id": ids.organization }];
  return [
    { "@id": ids.organization },
    { "@id": ids.ccpe },
    { "@id": ids.screenSmart },
    { "@id": ids.screenAccess },
    { "@id": ids.communityProgrammes },
    { "@id": ids.consultancy },
    { "@id": ids.researchInnovation },
    { "@id": ids.partnerships },
  ];
}

export function PageStructuredData({
  name,
  description,
  path,
  breadcrumb,
  kind = "default",
}: PageStructuredDataProps) {
  const url = new URL(path, SITE_URL).toString();
  const breadcrumbId = `${url}#breadcrumb`;
  const mainEntity = mainEntityFor(kind);
  const graph: Record<string, unknown>[] = [
    organizationNode(kind === "about"),
    websiteNode,
    ...entitiesFor(kind),
    {
      "@type": kind === "about" ? "AboutPage" : "WebPage",
      "@id": `${url}#webpage`,
      url,
      name,
      description,
      isPartOf: { "@id": ids.website },
      publisher: { "@id": ids.organization },
      about: aboutFor(kind),
      ...(mainEntity ? { mainEntity: { "@id": mainEntity } } : {}),
      ...(breadcrumb ? { breadcrumb: { "@id": breadcrumbId } } : {}),
      inLanguage: "en-GB",
    },
  ];

  if (breadcrumb) {
    const isProgrammeDetail = kind === "screensmart" || kind === "screenaccess";
    graph.push({
      "@type": "BreadcrumbList",
      "@id": breadcrumbId,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        ...(isProgrammeDetail
          ? [
              { "@type": "ListItem", position: 2, name: "Programmes", item: `${SITE_URL}/programmes` },
              { "@type": "ListItem", position: 3, name: breadcrumb, item: url },
            ]
          : [{ "@type": "ListItem", position: 2, name: breadcrumb, item: url }]),
      ],
    });
  }

  return <JsonLd data={{ "@context": "https://schema.org", "@graph": graph }} />;
}
