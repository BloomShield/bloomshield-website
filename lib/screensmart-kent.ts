export const kentPartnershipInterest = "ScreenSmart Communities Kent — Partnership Enquiry";
export const kentPartnershipHref = `/contact?interest=${encodeURIComponent(kentPartnershipInterest)}`;

type ProjectUpdate = {
  id: string;
  title: string;
  description: string;
} & (
  | { status: "confirmed"; date: `${number}-${number}-${number}` }
  | { status: "planned"; date?: never }
);

// Add dated entries only after the milestone is confirmed. Keep future
// mobilisation, recruitment, training, engagement, learning and evaluation
// entries marked planned until there is evidence they have taken place.
export const kentProjectUpdates: readonly ProjectUpdate[] = [
  {
    id: "funding-award",
    status: "confirmed",
    date: "2026-11-16",
    title: "National Lottery funding award confirmed",
    description: "The National Lottery Community Fund confirmed funding for ScreenSmart Communities Kent.",
  },
  {
    id: "funds-received",
    status: "confirmed",
    date: "2026-11-27",
    title: "Grant funds received",
    description: "BloomShield CIC received the programme grant funds, enabling preparation for delivery.",
  },
  {
    id: "mobilisation",
    status: "planned",
    title: "Programme mobilisation",
    description: "Next, we plan to prepare resources and invite eligible community organisations to express partnership interest. Delivery dates will be shared when confirmed.",
  },
];
