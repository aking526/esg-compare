import React from "react";

interface ResearchSectionProps {
  title: string;
  text: string;
}

const ResearchSection: React.FC<ResearchSectionProps> = ({ title , text}) => {
  return (
    <div className="flex flex-col items-center justify-evenly py-2.5">
      <h2 className="text-3xl">{title}</h2>
      <p className="text-base">{text}</p>
      <hr />
    </div>
  );
};

export default ResearchSection;