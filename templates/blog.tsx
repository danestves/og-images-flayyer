// Dependencies
import React from "react";
import { Variable as V, Validator, Static } from "@flayyer/variables";
import { TemplateProps } from "@flayyer/flayyer-types";
import clsx from "clsx";

// Components
import { Layer } from "../components";

// Static
import background from "../static/background.jpeg";
import alternative from "../static/alternative.jpeg";

// Styles
import "../styles/tailwind.css";

// Utils
import { formatDate } from "../utils";

/**
 * Export to enable variables UI on Flayyer.com
 */
export const schema = V.Object({
  title: V.String({ default: "Created with React.js and Tailwind" }),
  date: V.Optional(V.String()),
  dateLegend: V.Optional(V.String()),
  description: V.Optional(V.String()),
  image: V.Image({
    title: "Background image URL",
    examples: [alternative],
    default: background,
  }),
  lang: V.Optional(V.String()),
});
type Variables = Static<typeof schema>;

const validator = new Validator(schema);

// Make sure to 'export default' a React component
export default function MainTemplate(props: TemplateProps<Variables>) {
  const { variables } = props;
  if (!validator.validate(variables)) {
    return <img className="object-cover w-full h-full" src={background} />; // Fallback for invalid variables
  }

  const {
    title,
    date,
    dateLegend = "Published at",
    description,
    image,
    lang = "en",
  } = variables;

  return (
    <>
      <Layer>
        <div className="absolute inset-0 bg-no-repeat bg-cover svg-pattern" />
      </Layer>
      <Layer className="opacity-0 bg-gradient-to-t from-black banner:opacity-60" />
      <Layer className="flex flex-col items-center justify-center px-4 py-4 text-center text-white banner:flex-row banner:justify-between">
        <div
          className={clsx(
            !description &&
              "banner:flex banner:items-center banner:justify-between banner:w-full",
            "sq:flex sq:flex-col"
          )}
        >
          <img
            alt={title}
            src={image}
            className="object-cover rounded-sm banner:w-1/2 story:rounded-md story:mx-auto sq:w-11/12"
          />
          <div className="flex-col hidden w-1/2 banner:flex sq:w-11/12">
            <h1 className="hidden mt-1 font-extrabold leading-tight tracking-tight text-md banner:block banner:text-right banner:text banner:w-auto banner:pl-2 sq:text-center sq:mt-4 story:w-11/12 story:mx-auto">
              {title}
            </h1>
            {date && (
              <p
                className="w-full font-light text-right sq:text-center"
                style={{ fontSize: 24 }}
              >
                {dateLegend} {formatDate(date, "d, LLLL yyyy", lang)}
              </p>
            )}
          </div>
        </div>
        {description && (
          <h2 className="hidden tracking-tight text-gray-50 banner:block">
            {description}
          </h2>
        )}
      </Layer>
    </>
  );
}
