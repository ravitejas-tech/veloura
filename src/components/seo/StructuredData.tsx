import { products } from "@/content/products";
import { siteConfig } from "@/content/site";

/**
 * JSON-LD structured data (schema.org) for search engines and AI crawlers:
 * - OnlineStore: brand name, logo, description, social profiles
 * - WebSite:     site name for Google's site-name display
 * - ItemList:    the Lavender Edit products with prices (Product + Offer)
 *
 * Everything is generated from src/content, so it stays in sync with the page.
 * Validate at https://search.google.com/test/rich-results after deploying.
 */
export function StructuredData() {
  const url = siteConfig.url;
  const organizationId = `${url}/#organization`;
  const socialProfiles = siteConfig.socials.map((s) => s.href).filter((href) => href.startsWith("http"));

  const graph = [
    {
      "@type": "OnlineStore",
      "@id": organizationId,
      name: siteConfig.name,
      legalName: siteConfig.legalName,
      url,
      logo: `${url}/icon.svg`,
      image: siteConfig.ogImage.url,
      description: siteConfig.description,
      slogan: siteConfig.tagline,
      ...(socialProfiles.length > 0 && { sameAs: socialProfiles }),
    },
    {
      "@type": "WebSite",
      "@id": `${url}/#website`,
      url,
      name: siteConfig.name,
      description: siteConfig.description,
      inLanguage: siteConfig.language,
      publisher: { "@id": organizationId },
    },
    {
      "@type": "ItemList",
      "@id": `${url}/#bestsellers`,
      name: "The Lavender Edit: Bestsellers",
      itemListElement: products.map((product, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Product",
          name: product.name,
          description: product.description,
          image: product.image.src,
          brand: { "@type": "Brand", name: siteConfig.name },
          offers: {
            "@type": "Offer",
            price: product.price.toFixed(2),
            priceCurrency: siteConfig.currency,
            availability: "https://schema.org/InStock",
            url: `${url}/#edit`,
            seller: { "@id": organizationId },
          },
        },
      })),
    },
  ];

  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });

  return (
    <script
      type="application/ld+json"
      // escape "<" so content can never close the script tag
      dangerouslySetInnerHTML={{ __html: json.replace(/</g, "\\u003c") }}
    />
  );
}
