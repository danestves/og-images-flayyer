// Dependencies
import * as React from "react";
import { TemplateProps, FlayyerAgentName } from "@flayyer/flayyer-types";
import clsx from "classnames";

// Static
import logo from "../static/logo.png";

// Styles
import "../styles/tailwind.css";

type Variables = { title: string; img?: string; description?: string };

function Layer({ className, ...props }: React.ComponentProps<"div">) {
  return <div {...props} className={clsx("absolute inset-0", className)} />;
}

export default function BlogTemplate({
  agent,
  variables,
}: TemplateProps<Variables>): JSX.Element {
  const {
    title,
    img = "https://picsum.photos/id/0/1200/630",
    description,
  } = variables;

  if (agent.name === FlayyerAgentName.WHATSAPP) {
    return (
      <Layer className="p-20 bg-secondary">
        <img
          src={logo}
          alt="Daniel Esteves - @danestves"
          className="w-full h-full"
        />
      </Layer>
    );
  }

  return (
    <div>
      <Layer>
        <img
          src={img}
          alt={title}
          className="object-cover object-center w-full h-full"
        />
      </Layer>
      <Layer className="bg-gradient-to-r from-black" />
      <Layer className="flex flex-col items-start justify-center w-9/12 px-12 py-12">
        <img
          src={logo}
          alt="Daniel Esteves - @danestves"
          className="w-24 h-24 mb-4"
        />
        <h1 className="mb-4 font-semibold tracking-tight text-white text-7xl">
          {title}
        </h1>
        {description && <p className="text-3xl text-white">{description}</p>}
      </Layer>
    </div>
  );
}
