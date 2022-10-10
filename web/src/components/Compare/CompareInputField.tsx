import React from "react";
import CompareSearchBar from "./CompareSearchBar";

interface CInputFieldProps {
	index: number;
	prevSelected: string | undefined;
	names: string[][] | undefined;
}

const CompareInputField: React.FC<CInputFieldProps> = ({ index, prevSelected, names  }) => {
	return (
		<div className="m-3 p-4 bg-slate-100 shadow-light rounded-xl">
			<h1>Select a company below</h1>
			<CompareSearchBar placeholder="Search a company..." data={names} prevSelected={prevSelected} />
		</div>
	);
};

export default CompareInputField;