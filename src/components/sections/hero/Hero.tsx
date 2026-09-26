import { hero } from "@/content/hero";
import { ArrowRightIcon, TruckIcon } from "@/components/ui/Icons";
import { cssVars } from "@/lib/utils";
import { GiftersCounter } from "./GiftersCounter";
import { HeroArt } from "./HeroArt";

/** Falling petals in the backdrop: x position, delay, duration, scale. */
const PETALS = [
  { x: "8%", d: "0s", t: "17s", s: ".9" },
  { x: "22%", d: "-6s", t: "21s", s: ".6" },
  { x: "38%", d: "-11s", t: "19s", s: "1" },
  { x: "55%", d: "-3s", t: "23s", s: ".7" },
];

export function Hero() {
  const { title, proof } = hero;

  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-blob blob-a"></div>
        <div className="hero-blob blob-b"></div>
        <div className="hero-blob blob-c"></div>
        <div className="petals">
          {PETALS.map((p) => (
            <i key={p.x} style={cssVars({ "--x": p.x, "--d": p.d, "--t": p.t, "--s": p.s })}></i>
          ))}
        </div>
      </div>

      <div className="hero-inner">
        <div className="hero-copy">
          <a href={hero.pill.href} className="hero-pill intro" style={cssVars({ "--i": 0 })}>
            <span className="pill-tag">{hero.pill.tag}</span>
            {hero.pill.label}
            <ArrowRightIcon aria-hidden />
          </a>

          <h1 className="hero-title">
            <span className="line intro" style={cssVars({ "--i": 1 })}>
              {title.lead}{" "}
              <em className="swash-word">
                {title.highlight}
                <svg className="swash" viewBox="0 0 220 28" preserveAspectRatio="none" aria-hidden="true">
                  <defs>
                    <linearGradient id="swashGrad" x1="0" x2="1">
                      <stop offset="0" stopColor="#ae91de" />
                      <stop offset="1" stopColor="#e59ac0" />
                    </linearGradient>
                  </defs>
                  <path pathLength={1} d="M4 18 C 50 6, 110 4, 150 12 S 205 24, 216 8" />
                </svg>
              </em>
            </span>
            {title.lines.map((line, i) => (
              <span key={line} className="line intro" style={cssVars({ "--i": i + 2 })}>
                {line}
              </span>
            ))}
          </h1>

          <p className="hero-sub intro" style={cssVars({ "--i": 4 })}>
            {hero.subtitle}
          </p>

          <div className="hero-ctas intro" style={cssVars({ "--i": 5 })}>
            <a href={hero.primaryCta.href} className="btn btn-solid btn-shine">
              {hero.primaryCta.label}
              <span className="btn-orb">
                <ArrowRightIcon aria-hidden />
              </span>
            </a>
            <a href={hero.secondaryCta.href} className="btn btn-ghost">
              {hero.secondaryCta.label}
            </a>
          </div>

          <div className="hero-proof intro" style={cssVars({ "--i": 6 })}>
            <div className="avatars" aria-hidden="true">
              {proof.avatars.map((src) => (
                <img key={src} src={src} alt="" />
              ))}
            </div>
            <div className="proof-text">
              <p className="stars">
                <span aria-hidden="true">★★★★★</span> <b>{proof.rating}</b> <small>{proof.reviews}</small>
              </p>
              <p>
                Loved by <GiftersCounter target={proof.gifters} /> gifters
              </p>
            </div>
            <span className="proof-rule" aria-hidden="true"></span>
            <div className="proof-chip">
              <TruckIcon />
              <p>
                <b>{proof.chip.title}</b>
                <span>{proof.chip.text}</span>
              </p>
            </div>
          </div>
        </div>

        <HeroArt />
      </div>

      <a href={hero.scrollCue.href} className="scroll-cue" aria-label="Scroll down">
        <span className="mouse">
          <i></i>
        </span>
        <span>{hero.scrollCue.label}</span>
      </a>
    </section>
  );
}
