import { LegalPage } from "@/components/legal-page";
import { PageStructuredData } from "@/components/seo-json-ld";
import { createMetadata } from "@/lib/seo";

const description = "Learn how BloomShield CIC uses essential storage and privacy-conscious analytics on this website.";
export const metadata = createMetadata({ title: "Cookie Notice", description, path: "/cookies" });
export default function Cookies(){return <><PageStructuredData name="Cookie Notice" description={description} path="/cookies" breadcrumb="Cookie Notice"/><LegalPage title="Cookie notice" updated="21 July 2026" sections={[["Our approach","We aim to keep tracking to a minimum. Essential cookies may be used where necessary for security and core site operation."],["Analytics","We use privacy-conscious Vercel Analytics to understand aggregate website performance and usage. It is designed not to build individual user profiles or use cross-site tracking."],["Managing cookies","You can control or delete cookies using your browser settings. Blocking essential storage may affect some website functions."],["Changes","We will update this notice if the technologies or purposes used on this website change."],["Contact","For questions about our use of cookies, please use the contact form on this website."]]}/></>}
