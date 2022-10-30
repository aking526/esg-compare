import React from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";

interface CInputSelectedProps {
  ticker: string;
  handleClick: React.MouseEventHandler<SVGSVGElement>;
}

const CompareInputSelected: React.FC<CInputSelectedProps> = ({ ticker, handleClick }) => {
  return (
    <div className="flex flex-row justify-center items-evenly rounded-2xl bg-gray-200 p-10 shadow-light">
      <XMarkIcon className="w-5 h-5 mx-1.5 my-0.5" onClick={handleClick} />
      <p className="text-3xl">{ticker.toUpperCase()}</p>
    </div>
  );
};

export default CompareInputSelected;