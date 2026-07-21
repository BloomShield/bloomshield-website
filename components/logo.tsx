import Image from "next/image";
import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="BloomShield home"
      className={`inline-flex shrink-0 items-center gap-2.5 rounded-xl sm:gap-3 ${light ? "bg-white px-3 py-2" : ""}`}
    >
      <span aria-hidden="true" className="relative h-[60px] w-[49px] shrink-0 overflow-hidden sm:h-[72px] sm:w-[59px]">
        <Image
          src="/bloomshield-primary-logo.png"
          alt=""
          width={1536}
          height={1024}
          priority
          className="absolute -left-[59px] -top-[6px] h-[111px] w-[167px] max-w-none sm:-left-[71px] sm:-top-[8px] sm:h-[133px] sm:w-[200px]"
        />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="whitespace-nowrap font-display text-[25px] font-semibold leading-none tracking-[-.055em] sm:text-[30px]">
          <span className="text-teal-700">Bloom</span>
          <span className="text-[#071f34]">Shield</span>
        </span>
        <span className="mt-1.5 whitespace-nowrap text-[6px] font-bold uppercase leading-none tracking-[.1em] text-teal-700 sm:text-[7px] sm:tracking-[.12em]">
          Shielded by care. <span className="text-[#8c5d00]">Empowered to bloom.</span>
        </span>
      </span>
    </Link>
  );
}
