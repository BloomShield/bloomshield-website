type ScreenSmartProgramme = {
  name: string;
  href: `/programmes/screensmart-communities/${string}`;
  location: string;
  description: string;
  funding: string;
};

// Add location-specific programmes here only when they are confirmed.
export const currentScreenSmartProgrammes: readonly ScreenSmartProgramme[] = [
  {
    name: "ScreenSmart Communities™ Kent",
    href: "/programmes/screensmart-communities/kent",
    location: "Kent and Medway",
    description: "A 12-month community cancer-awareness and NHS screening signposting programme, working with eligible faith-based and non-faith community organisations.",
    funding: "Funded by The National Lottery Community Fund.",
  },
];
