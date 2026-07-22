import { Building2, MapPin } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import { PageStructuredData } from "@/components/seo-json-ld";
import { createMetadata } from "@/lib/seo";

const description = "Contact BloomShield CIC about cancer prevention programmes, consultancy, applied research and partnerships.";
export const metadata = createMetadata({ title: "Contact BloomShield", description, path: "/contact" });

export default function Contact() {
  return <>
    <PageStructuredData name="Contact BloomShield" description={description} path="/contact" breadcrumb="Contact" />
    <PageHero visual="contact" eyebrow="Contact" title="Let’s start with what matters." intro="Tell us about the community, challenge or opportunity you are working on. We will respond with a thoughtful next step." />
    <section className="section-space">
      <div className="container-page grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
        <aside>
          <h2 className="text-2xl font-bold">Contact BloomShield</h2>
          <p className="mt-4 leading-7 text-slate-600">For partnership, programme, research and advisory enquiries, please use the contact form.</p>
          <div className="mt-8 rounded-2xl border border-teal-900/10 bg-teal-50 p-6">
            <Building2 className="text-teal-600" />
            <h3 className="mt-4 font-bold">BloomShield Community Interest Company</h3>
            <address className="mt-3 flex gap-3 text-sm not-italic leading-6 text-slate-600"><MapPin className="mt-1 shrink-0" size={18}/><span>Registered Address<br/>124 City Road<br/>London EC1V 2NX<br/>United Kingdom</span></address>
          </div>
          <div className="mt-6 rounded-2xl bg-mist p-6"><h3 className="font-bold">Please note</h3><p className="mt-2 text-sm leading-6 text-slate-600">BloomShield does not provide individual medical advice or emergency support. If you need urgent medical help, contact the appropriate emergency or health service in your country.</p></div>
        </aside>
        <ContactForm />
      </div>
    </section>
  </>;
}
