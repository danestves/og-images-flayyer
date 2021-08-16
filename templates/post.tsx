// Dependencies
import * as React from "react";
import { FlyyerAgentName } from "@flyyer/types";
import { proxy } from "@flyyer/proxy";
import { Variable as V, Validator } from "@flyyer/variables";
import type { TemplateProps } from "@flyyer/types";
import type { Static } from "@flyyer/variables";

// Internals
import { Layer } from "../components";
import alternative from "../static/alternative.jpeg";
import background from "../static/background.jpeg";
import bg from "../static/bg.svg";
import me from "../static/me.jpeg";
import "../styles/tailwind.css";

/**
 * Export to enable variables UI on Flayyer.com
 */
export const schema = V.Object({
  image: V.Image({
    default: background,
    description: "The image to use for the post",
    examples: [alternative],
    title: "Post image",
  }),
  title: V.String({
    default: "Created with React.js, TailwindCSS & Flayyer",
    description: "The title of the post",
    examples: ["Created with React.js, TailwindCSS & Flayyer"],
    title: "Post title",
  }),
  content: V.String({
    default:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam phasellus vestibulum lorem sed. Scelerisque fermentum dui faucibus in ornare quam viverra. Consectetur libero id faucibus nisl tincidunt eget nullam non nisi. Ornare arcu dui vivamus arcu felis bibendum ut tristique. Dui nunc mattis enim ut tellus. Est pellentesque elit ullamcorper dignissim cras. Consequat semper viverra nam libero. Velit euismod in pellentesque massa.",
    description: "The content of the post",
    title: "Post content",
  }),
  date: V.DateTime({
    default: "2005-12-24T04:00:00.000Z",
    description: "The date of the post",
    examples: [new Date().toISOString()],
    title: "Post date",
  }),
});
type Variables = Static<typeof schema>;

const validator = new Validator(schema);

export default function PostTemplate(props: TemplateProps<Variables>) {
  const { agent, height, variables, width } = props;

  if (!validator.validate(variables)) {
    // Fallback for invalid variables
    return null;
  }

  const { image, title, content, date: dateRaw } = variables;

  const date = dateRaw && new Date(dateRaw);
  const formatter = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const isThumnail = height <= 1080 && width <= 1080;
  if (agent.name === FlyyerAgentName.WHATSAPP || isThumnail) {
    return (
      <Layer>
        <img
          alt=""
          className="absolute inset-0 z-0 object-cover w-full h-full"
          src={bg}
        />

        <Layer className="z-10 p-2">
          <img
            alt={title}
            className="w-full h-full rounded-full"
            loading="eager"
            src={proxy(me)}
          />
        </Layer>
      </Layer>
    );
  }

  return (
    <Layer className="bg-[#E8EAEE] flex items-center px-2">
      <img
        alt=""
        className="absolute inset-0 z-0 object-cover w-full h-full"
        src={bg}
      />

      <div className="relative z-10 grid items-center w-full grid-cols-2 gap-2 p-2 bg-white rounded-md shadow-xl">
        <div>
          <img
            alt={title}
            className="w-full rounded-md"
            loading="eager"
            src={proxy(image)}
          />
        </div>
        <div className="space-y-2">
          <h1 className="text-[32px] text-[#333] font-medium leading-none">
            {title}
          </h1>
          <p className="text-[20px] text-[#B3B3B3] line-clamp-3">{content}</p>
          <div className="flex items-center space-x-2">
            <img
              alt="Daniel Esteves"
              className="w-4 h-4 rounded-full"
              loading="eager"
              src={proxy(me)}
            />
            <div className="text-[20px] text-[#333] font-medium leading-none">
              <p>Daniel Esteves</p>
              {date && (
                <time
                  className="text-[16px] font-light text-[#B3B3B3] mt-[4px] inline-block"
                  dateTime={dateRaw}
                >
                  {formatter.format(date)}
                </time>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layer>
  );
}
