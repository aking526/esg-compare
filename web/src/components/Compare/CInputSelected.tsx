import React from "react";

interface CInputSelectedProps {
  ticker: string;
}

const CInputSelected: React.FC<CInputSelectedProps> = ({ ticker }) => {
  return (
    <div className="rounded-2xl bg-slate-100 p-5">
      <p className="text-3xl">{ticker}</p>
    </div>
  );
};

export default CInputSelected;