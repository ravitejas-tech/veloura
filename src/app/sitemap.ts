import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";

export const dynamic = "force-static";

/** /sitemap.xml: add an entry here for every new page you create. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteConfig.url}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: [siteConfig.ogImage.url],
    },
  ];
}
