import { Fragment } from "react";

/**
 * Renders headline strings from the content files:
 *   *word*  → <em>word</em>   (italic gradient accent)
 *   \n      → <br />
 *
 * Example: "Find the *moment*,\nwe'll find the gift."
 */
export function RichText({ text }: { text: string }) {
  return text.split("\n").map((line, lineIndex) => (
    <Fragment key={lineIndex}>
      {lineIndex > 0 && <br />}
      {line.split(/(\*[^*]+\*)/g).map((part, i) =>
        part.startsWith("*") && part.endsWith("*") && part.length > 2 ? (
          <em key={i}>{part.slice(1, -1)}</em>
        ) : (
          part && <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </Fragment>
  ));
}
