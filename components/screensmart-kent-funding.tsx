import Image from "next/image";

export function ScreenSmartKentFunding({ programmeSummary = false }: { programmeSummary?: boolean }) {
  return <div className="rounded-2xl bg-white p-6 text-slate-700">
    {/* Preserve the supplied file, including its white space. Extra padding
        keeps nearby text outside half the crossed-fingers symbol height. */}
    <Image src="/images/funders/national-lottery-community-fund-colour-english.png" alt="The National Lottery Community Fund" width={2426} height={1186} sizes="256px" className="mx-auto h-auto w-64 max-w-full" />
    <p className="mt-6 text-base leading-7">{programmeSummary ? "ScreenSmart Communities Kent is a 12-month community cancer-awareness and NHS screening signposting programme funded by The National Lottery Community Fund." : "Funded by The National Lottery Community Fund. Thank you to National Lottery players for supporting ScreenSmart Communities™ Kent."}</p>
  </div>;
}
