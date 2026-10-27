export const africaPartnershipPath = "/research-innovation/accept-sims-africa-partnerships";
export const africaEnquiryInterest = "ACCEPT SIMS™ African Research Partnerships";
export const africaEnquiryHref = `/contact?interest=${encodeURIComponent(africaEnquiryInterest)}`;
export const africaDescription = "A proposed collaborative research and implementation programme exploring how digital screening intelligence can strengthen referral navigation and continuity of care in Nigeria, Zimbabwe and Kenya.";

export const africaCountries = [
  { name: "Nigeria", flag: "ng", role: "Community implementation and clinical research", workstream: "Co-design community recruitment, screening-to-referral workflows and navigation research with local clinical, academic and implementation teams. Explore how practical barriers and follow-up can be recorded in routine settings." },
  { name: "Zimbabwe", flag: "zw", role: "Research expansion and evaluation", workstream: "Explore adaptation to local clinical research settings, evaluate data completeness and workflow feasibility, and develop locally relevant implementation and evaluation questions." },
  { name: "Kenya", flag: "ke", role: "Health-system validation and impact", workstream: "Explore alignment with cancer-control priorities, referral systems and programme evaluation. Assess what evidence would be needed to understand feasibility, equity and potential health-system impact." },
] as const;

export const africaInstitutions = [
  { name: "BloomShield CIC", role: "Technology development and research coordination" },
  { name: "BOLSBOY International Limited", role: "Nigerian healthcare operations and proposed implementation" },
  { name: "Bowen University", role: "Nigerian academic research", url: "https://bowen.edu.ng/" },
  { name: "University of Zimbabwe / UZ-CTRC", role: "Clinical research and evaluation", detail: "University of Zimbabwe Clinical Trials Research Centre", url: "https://uz-ctrc.org/clinical-research/" },
  { name: "National Cancer Institute of Kenya", role: "Cancer-control research and programme evaluation", url: "https://www.ncikenya.go.ke/" },
];
