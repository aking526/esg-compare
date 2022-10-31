import React from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";

interface CInputSelectedProps {
  ticker: string;
  handleClick: React.MouseEventHandler<SVGSVGElement>;
}

const CompareInputSelected: React.FC<CInputSelectedProps> = ({ ticker, handleClick }) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-center items-center rounded-2xl bg-white p-10 m-3 shadow-light w-[296px] h-[160px]">
        <XMarkIcon className="w-5 h-5 mx-1.5 my-0.5" onClick={handleClick} />
        <p className="text-3xl">{ticker.toUpperCase()}</p>
      </div>
      <div className="h-[52px] mt-2"></div>
    </div>
  );
};

export default CompareInputSelected;