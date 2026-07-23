# BloomShield entity architecture v1

Status: Canonical
Version: 1.0
Canonical domain: https://bloomshield.org

## Purpose

This document is the source of truth for BloomShield's machine-readable entity architecture. It governs the JSON-LD emitted by the public website and keeps structured claims aligned with visible, approved content.

The architecture is intentionally narrow. It does not create entities for future programmes, unlaunched services, unconfirmed partners or unsupported affiliations.

## Stable entity identifiers

| Entity | Schema.org type | Canonical `@id` |
| --- | --- | --- |
| BloomShield CIC | `Organization` | `https://bloomshield.org/#organization` |
| BloomShield website | `WebSite` | `https://bloomshield.org/#website` |
| Dr Olufemi Olaleye / Dr Femi Olaleye | `Person` | `https://bloomshield.org/#founder` |
| Cancer Care Partnership Ecosystem | `CreativeWork` | `https://bloomshield.org/#ccpe` |
| ScreenSmart Communities™ | `CreativeWork` | `https://bloomshield.org/#screensmart-communities` |
| Community programmes | `Service` | `https://bloomshield.org/#community-programmes` |
| Consultancy and advisory | `Service` | `https://bloomshield.org/consultancy#service` |
| Research and innovation | `Service` | `https://bloomshield.org/research-innovation#service` |
| Partnerships | `Service` | `https://bloomshield.org/partnerships#service` |

## Entity definitions

### BloomShield CIC

- Legal name: BloomShield Community Interest Company
- Public name: BloomShield CIC
- Company number: 17341879
- Description: BloomShield CIC is a UK community interest company advancing equitable cancer prevention, health-system implementation, professional learning and responsible healthcare innovation.
- Canonical URL: https://bloomshield.org
- Schema.org type: `Organization`

The website does not use a more specific organisation subtype because the approved public content does not justify `MedicalOrganization`, `NGO`, `EducationalOrganization` or another narrower Schema.org type.

### Founder

- Legal/professional name: Dr Olufemi Olaleye
- Public professional name: Dr Femi Olaleye
- Relationship: Founder of BloomShield CIC
- Schema.org type: `Person`

The founder relationship is emitted only on the About page, where it is explicitly supported by visible content. `worksFor`, professional registrations, awards, affiliations and employment titles are not asserted.

### Cancer Care Partnership Ecosystem

- Name: Cancer Care Partnership Ecosystem
- Alternate name: CCPE
- Relationship: An implementation framework created by BloomShield CIC
- Purpose: Connect communities, healthcare professionals, delivery organisations and partners around equitable cancer prevention and implementation
- Schema.org type: `CreativeWork`
- Visible reference: https://bloomshield.org/about#ccpe

`CreativeWork` is used because CCPE is an intellectual implementation framework, not a legal organisation, healthcare provider, course or research project.

### ScreenSmart Communities™

- Name: ScreenSmart Communities™
- Relationship: A flagship community cancer-prevention programme delivered by BloomShield CIC through CCPE
- Schema.org type: `CreativeWork`
- Visible reference: https://bloomshield.org/programmes#screen-smart

`CreativeWork` reflects the programme's visible description as a delivery model. The programme uses `provider` to identify BloomShield CIC and `isBasedOn` to connect it to CCPE.

### Organisational functions

The following are `Service` nodes provided by BloomShield CIC, not separate organisations:

- Community programmes
- Consultancy and advisory
- Research and innovation
- Partnerships

Learning and capacity building is not yet a standalone entity because the current site presents it indirectly rather than as a defined public offering. Advocacy is not included in the Partnerships entity because advocacy is not yet visibly described as an organisational function.

## Relationship model

- `WebSite.publisher` → BloomShield CIC
- `Organization.founder` → Dr Femi Olaleye, on the About page only
- `CreativeWork.creator` and `CreativeWork.publisher` → BloomShield CIC for CCPE
- `CreativeWork.provider` → BloomShield CIC for ScreenSmart Communities™
- `ScreenSmart Communities™.isBasedOn` → CCPE
- `Service.provider` → BloomShield CIC
- Page `isPartOf` → BloomShield website
- Page `publisher` → BloomShield CIC
- Page `mainEntity` → its principal supported entity
- Page `about` → the supported entities visibly covered by that page
- Page `breadcrumb` → its `BreadcrumbList`

`worksFor` is intentionally omitted because the confirmed relationship is founder, not employment.

## Page graph rules

Every public route emits one JSON-LD script containing one `@graph`. Within a page:

- The organisation and website nodes appear once.
- Entity `@id` values are canonical and stable.
- The About page uses `AboutPage`; other routes use `WebPage`.
- The founder node appears only on the About page.
- Programme and service nodes appear only on pages where they are relevant, except the homepage, which provides the supported organisation-level overview.
- Legal and contact pages do not manufacture service or programme entities.
- Breadcrumb nodes are connected to their page node.

## Explicit exclusions

The graph must not add:

- ScreenAccess™ or ScreenConnect™ as structured entities until separately approved.
- Learning and capacity building as a service until its visible public definition is strengthened.
- Advocacy as a service until it is visibly established.
- Partners, social profiles, awards, reviews, ratings, citations or affiliations without confirmed public evidence.
- `llms.txt`, AI crawler directives or claims about AI rankings, recommendations or citations.

## Change control

Any new entity or relationship requires:

1. Confirmed organisational facts.
2. Clear visible content supporting the structured claim.
3. A stable canonical identifier.
4. A defensible existing Schema.org type and property.
5. An update to this document and the JSON-LD implementation in the same release.
