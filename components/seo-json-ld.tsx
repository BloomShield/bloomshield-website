import { HOME_DESCRIPTION, ORGANIZATION_NAME, SITE_NAME, SITE_URL, socialLinks } from "@/lib/seo";

const ids = {
  organization: `${SITE_URL}/#organization`,
  website: `${SITE_URL}/#website`,
  founder: `${SITE_URL}/#founder`,
  ccpe: `${SITE_URL}/#ccpe`,
  screenSmart: `${SITE_URL}/#screensmart-communities`,
  screenAccess: `${SITE_URL}/#screenaccess`,
  screenConnect: `${SITE_URL}/#screenconnect`,
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
  | "screenconnect"
  | "consultancy"
  | "research"
  | "partnerships"
  | "knowledgeHub"
  | "medical"
  | "default";

type PageStructuredDataProps = {
  name: string;
  description: string;
  path: `/${string}` | "/";
  breadcrumb?: string;
  parentBreadcrumb?: { name: string; path: `/${string}` };
  kind?: PageKind;
  medicalAbout?: { type: "MedicalCondition" | "MedicalTest"; name: string }[];
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
    name: ORGANIZATION_NAME,
    alternateName: SITE_NAME,
    legalName: ORGANIZATION_NAME,
    url: SITE_URL,
    sameAs: [socialLinks.linkedin, socialLinks.instagram, socialLinks.x],
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

const screenConnectNode = {
  "@type": "Service",
  "@id": ids.screenConnect,
  name: "ScreenConnect™",
  description:
    "BloomShield CIC’s patient-navigation and care-coordination programme, identifying barriers and supporting patient tracking, follow-up and pathway equity across the cancer care continuum.",
  serviceType: "Patient navigation, cancer care coordination and implementation support programme",
  url: `${SITE_URL}/programmes/screenconnect`,
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
        screenConnectNode,
        communityProgrammesNode,
        consultancyNode,
        researchInnovationNode,
        partnershipsNode,
      ];
    case "about":
      return [founderNode, ccpeNode];
    case "programmes":
      return [ccpeNode, screenSmartNode, screenAccessNode, screenConnectNode, communityProgrammesNode];
    case "screensmart":
      return [ccpeNode, screenSmartNode];
    case "screenaccess":
      return [ccpeNode, screenAccessNode];
    case "screenconnect":
      return [ccpeNode, screenConnectNode];
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
    case "screenconnect":
      return ids.screenConnect;
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
    { "@id": ids.screenConnect },
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
  parentBreadcrumb,
  kind = "default",
  medicalAbout,
}: PageStructuredDataProps) {
  const url = new URL(path, SITE_URL).toString();
  const breadcrumbId = `${url}#breadcrumb`;
  const mainEntity = mainEntityFor(kind);
  const collectionId = `${url}#topics`;
  const pageType = kind === "knowledgeHub" ? "CollectionPage" : kind === "medical" ? "MedicalWebPage" : kind === "about" ? "AboutPage" : "WebPage";
  const healthAbout = kind === "knowledgeHub"
    ? [{ "@type": "Thing", name: "Cancer prevention" }, { "@type": "Thing", name: "Cancer screening" }]
    : kind === "medical"
      ? (medicalAbout ?? [{ type: "MedicalCondition" as const, name: "Bowel cancer" }, { type: "MedicalTest" as const, name: "Faecal immunochemical test" }]).map(item => ({ "@type": item.type, name: item.name }))
      : undefined;
  const graph: Record<string, unknown>[] = [
    organizationNode(kind === "about"),
    websiteNode,
    ...entitiesFor(kind),
    {
      "@type": pageType,
      "@id": `${url}#webpage`,
      url,
      name,
      description,
      isPartOf: { "@id": ids.website },
      publisher: { "@id": ids.organization },
      about: healthAbout ?? aboutFor(kind),
      ...(kind === "knowledgeHub" ? { mainEntity: { "@id": collectionId } } : mainEntity ? { mainEntity: { "@id": mainEntity } } : {}),
      ...(breadcrumb ? { breadcrumb: { "@id": breadcrumbId } } : {}),
      ...(kind === "medical" ? { specialty: "https://schema.org/Oncology" } : {}),
      inLanguage: "en-GB",
    },
  ];

  if (kind === "knowledgeHub") {
    graph.push({
      "@type": "ItemList",
      "@id": collectionId,
      name: "Cancer prevention and screening topics",
      numberOfItems: 16,
      itemListElement: [
        "Bowel cancer screening", "Cervical screening", "Breast screening", "NHS Lung Health Checks",
        "FIT test", "HPV test", "Mammogram", "PSA test", "Cancer symptoms", "Reducing cancer risk",
        "HPV vaccination", "Family history and inherited risk", "Understanding your screening invitation",
        "Why people miss cancer screening", "Screening and language barriers", "Supporting someone to attend screening",
      ].map((name, index) => ({ "@type": "ListItem", position: index + 1, name })),
    });
  }

  if (breadcrumb) {
    const isProgrammeDetail = kind === "screensmart" || kind === "screenaccess" || kind === "screenconnect";
    graph.push({
      "@type": "BreadcrumbList",
      "@id": breadcrumbId,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        ...(parentBreadcrumb
          ? [
              { "@type": "ListItem", position: 2, name: parentBreadcrumb.name, item: `${SITE_URL}${parentBreadcrumb.path}` },
              { "@type": "ListItem", position: 3, name: breadcrumb, item: url },
            ]
          : isProgrammeDetail
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
