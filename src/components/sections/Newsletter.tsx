"use client";

import { useState, type FormEvent } from "react";
import { newsletter } from "@/content/testimonials";
import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * "Letters from Veloura" envelope sign-up.
 *
 * The form only validates and shows a message. To collect emails, send
 * `email` to your provider (Mailchimp, ConvertKit, Klaviyo, Formspree…)
 * inside handleSubmit. See docs/CUSTOMIZATION.md.
 */
export function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!EMAIL_PATTERN.test(email.trim())) {
      setMessage(newsletter.invalidMessage);
      return;
    }
    // TODO: subscribe `email.trim()` with your newsletter provider here.
    setMessage(newsletter.successMessage);
    setEmail("");
  };

  return (
    <section className="letter section">
      <Reveal className="envelope">
        <div className="envelope-flap" aria-hidden="true"></div>
        <div className="envelope-body">
          <p className="eyebrow">
            <span className="spark">✦</span> {newsletter.eyebrow}
          </p>
          <h2 className="section-title">
            <RichText text={newsletter.title} />
          </h2>
          <p className="section-lede">{newsletter.lede}</p>
          <form className="letter-form" id="letterForm" noValidate onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder={newsletter.placeholder}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="btn btn-solid" type="submit">
              {newsletter.button}
            </button>
          </form>
          <p className="form-msg" id="formMsg" role="status">
            {message}
          </p>
        </div>
        <span className="wax-seal" aria-hidden="true">
          {newsletter.sealLetter}
        </span>
      </Reveal>
    </section>
  );
}
