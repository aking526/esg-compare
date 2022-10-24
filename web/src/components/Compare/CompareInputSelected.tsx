import React from "react";
import { XCircleIcon } from "@heroicons/react/20/solid";

interface CInputSelectedProps {
  ticker: string;
  handleClick: React.MouseEventHandler<SVGSVGElement>;
}

const CompareInputSelected: React.FC<CInputSelectedProps> = ({ ticker, handleClick }) => {
  return (
    <div className="flex flex-row rounded-2xl bg-slate-100 p-10">
      <XCircleIcon className="w-5 h-5" onClick={handleClick} />
      <p className="text-3xl">{ticker.toUpperCase()}</p>
    </div>
  );
};

export default CompareInputSelected;