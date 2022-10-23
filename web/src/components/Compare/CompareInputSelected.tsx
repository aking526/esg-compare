import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

interface CInputSelectedProps {
  ticker: string;
  handleClick: React.MouseEventHandler<SVGSVGElement>;
}

const CompareInputSelected: React.FC<CInputSelectedProps> = ({ ticker, handleClick }) => {
  return (
    <div className="flex flex-row rounded-2xl bg-slate-100 p-10">
      <FontAwesomeIcon icon={faCircleXmark} onClick={handleClick} />
      <p className="text-3xl">{ticker.toUpperCase()}</p>
    </div>
  );
};

export default CompareInputSelected;