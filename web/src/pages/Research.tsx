import React from "react";
import ResearchSection from "../components/ResearchSection";
import { Github_URL } from "../mods/Links";

const Research: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center pt-5 bg-slate-100 font-modern">
      <h1 className="text-6xl">Research</h1>
      <div className="mt-5">
        <ResearchSection title="ESG Ratings" text="Add text" />
        <ResearchSection title="Process" text="Add text" />
        <ResearchSection title="Data" text="Add text" />
      </div>
      <p className="mt-2">Full source code is posted on <span className="text-blue-600"><a href={Github_URL}>Github</a></span></p>
    </div>
  );
}

export default Research;