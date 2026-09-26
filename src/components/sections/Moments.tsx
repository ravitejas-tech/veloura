import { moments } from "@/content/testimonials";

/**
 * #VelouraMoments: an endless gallery marquee (pauses on hover).
 * Images are rendered twice for a seamless loop; the copy is decorative.
 */
export function Moments() {
  return (
    <section className="moments" aria-label="Customer moments gallery">
      <div className="moments-head">
        <h2>{moments.title}</h2>
        <p>{moments.text}</p>
      </div>
      <div className="moments-track" id="momentsTrack">
        {moments.images.map((image) => (
          <img key={image.src} src={image.src} alt={image.alt} loading="lazy" decoding="async" />
        ))}
        {moments.images.map((image) => (
          <img key={`copy-${image.src}`} src={image.src} alt="" aria-hidden="true" loading="lazy" decoding="async" />
        ))}
      </div>
    </section>
  );
}
