import { footer } from "@/content/navigation";
import { siteConfig } from "@/content/site";
import { LogoMark, SocialIconSvg } from "@/components/ui/Icons";

export function Footer() {
  const year = String(new Date().getFullYear());

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <a href="#" className="logo light" aria-label={`${siteConfig.name} home`}>
            <LogoMark />
            <span>{siteConfig.name}</span>
          </a>
          <p>{footer.blurb}</p>
          <div className="socials">
            {siteConfig.socials.map((social) => (
              <a key={social.label} href={social.href} aria-label={social.label}>
                <SocialIconSvg name={social.icon} />
              </a>
            ))}
          </div>
        </div>
        <div className="footer-cols">
          {footer.columns.map((column) => (
            <div key={column.title}>
              <h2>{column.title}</h2>
              {column.links.map((link) => (
                <a key={link.label} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
      <p className="footer-word" aria-hidden="true">
        {siteConfig.name}
      </p>
      <div className="footer-bottom">
        {footer.bottomLine.map((line) => (
          <span key={line}>{line.replace("{year}", year)}</span>
        ))}
      </div>
    </footer>
  );
}
