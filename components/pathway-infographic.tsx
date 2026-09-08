import Image from "next/image";

type PathwayInfographicProps = {
  src: string;
  alt: string;
  caption: string;
};

export function PathwayInfographic({ src, alt, caption }: PathwayInfographicProps) {
  return (
    <figure className="screenconnect-pathway-figure">
      <p className="screenconnect-pathway-scroll-hint">Swipe horizontally to explore the pathway</p>
      <div className="screenconnect-pathway-scroll" tabIndex={0} aria-label="Scrollable pathway infographic">
        <Image
          src={src}
          alt={alt}
          width={1672}
          height={941}
          sizes="(max-width: 767px) 1050px, (max-width: 1280px) 100vw, 1200px"
          className="screenconnect-pathway-image"
        />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
