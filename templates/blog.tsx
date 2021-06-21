// Dependencies
import { FlayyerAgentName, TemplateProps } from "@flayyer/flayyer-types";
import { Variable as V, Validator, Static } from "@flayyer/variables";
import * as React from "react";

// Assets
import alternative from "../static/alternative.jpeg";
import background from "../static/background.jpeg";
import me from "../static/me.jpg";

// Components
import { Layer } from "../components";

// Styles
import "../styles/tailwind.css";

/**
 * Export to enable variables UI on Flayyer.com
 */
export const schema = V.Object({
  title: V.String({ default: "Created with React.js, TailwindCSS & Flayyer" }),
  image: V.Image({
    title: "Background image URL",
    examples: [alternative],
    default: background,
  }),
});
type Variables = Static<typeof schema>;

const validator = new Validator(schema);

// Make sure to 'export default' a React component
export default function MainTemplate(props: TemplateProps<Variables>) {
  const { agent, height, variables, width } = props;
  if (!validator.validate(variables)) {
    return <img className="w-full h-full object-cover" src={background} />; // Fallback for invalid variables
  }

  const { title, image } = variables;

  const isThumnail = height <= 1080 && width <= 1080;
  if (agent.name === FlayyerAgentName.WHATSAPP && isThumnail) {
    return (
      <Layer className="bg-black/10">
        <Layer className="opacity-10">
          <img
            src={image}
            loading="eager"
            alt={title}
            className="object-cover -rotate-12 scale-150 w-full h-full"
          />
        </Layer>
      </Layer>
    );
  }

  return (
    <Layer className="bg-black/10">
      <Layer className="overflow-hidden opacity-25">
        <div className="absolute transform scale-150 bg-[#00C389] rounded-full -top-4 right-2 h-32 w-32 filter blur-2xl mix-blend-multiply" />
        <div className="absolute transform scale-125 rounded-full bg-[#003AC3] bottom-2 right-[22.5%] h-32 w-32 filter blur-2xl mix-blend-multiply" />
        <div className="absolute transform scale-150 rounded-full bg-[#8900C3] -bottom-3 right-4 h-32 w-32 filter blur-2xl mix-blend-multiply" />
      </Layer>

      <Layer className="opacity-10">
        <img
          src={image}
          loading="eager"
          alt={title}
          className="object-cover -rotate-12 scale-150 w-full h-full"
        />
      </Layer>

      <Layer className="z-50 pt-4 pl-4 pr-4">
        <h1
          className={`font-bold tracking-tight leading-tight ${
            title.length > 25 ? "text-[2rem]" : "text-4xl"
          }`}
        >
          {title}
        </h1>
      </Layer>

      <Layer className="z-50 flex items-end justify-between pb-4 pl-4 pr-4">
        <div className="flex items-center">
          <div className="flex overflow-hidden rounded-full shadow-lg">
            <img
              src={me}
              alt="Daniel Esteves"
              loading="eager"
              width={84}
              height={84}
            />
          </div>
          <div className="ml-2 text-sm">
            <h2 className="font-medium tracking-tight">Daniel Esteves</h2>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium opacity-50">danestves.com</p>
        </div>
      </Layer>
    </Layer>
  );
}
