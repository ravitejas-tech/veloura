import { StructuredData } from "@/components/seo/StructuredData";
import { Hero } from "@/components/sections/hero/Hero";
import { Ribbons } from "@/components/sections/Ribbons";
import { Occasions } from "@/components/sections/Occasions";
import { LavenderEdit } from "@/components/sections/lavender-edit/LavenderEdit";
import { BuildABox } from "@/components/sections/builder/BuildABox";
import { Story } from "@/components/sections/Story";
import { FieldQuote } from "@/components/sections/FieldQuote";
import { LoveNotes } from "@/components/sections/LoveNotes";
import { Moments } from "@/components/sections/Moments";
import { Newsletter } from "@/components/sections/Newsletter";

/**
 * Home page. Sections render top to bottom in this order: reorder, remove
 * or duplicate them freely. Each one reads its copy from src/content.
 */
export default function HomePage() {
  return (
    <>
      <StructuredData />
      <main>
        <Hero />
        <Ribbons />
        <Occasions />
        <LavenderEdit />
        <BuildABox />
        <Story />
        <FieldQuote />
        <LoveNotes />
        <Moments />
        <Newsletter />
      </main>
    </>
  );
}
