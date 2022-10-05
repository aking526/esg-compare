import React from "react";
import CompareSearchBar from "./CompareSearchBar";

interface CInputFieldProps {
	index: number;
	prevSelected: string | undefined;
	names: string[][] | undefined;
}

const CompareInputField: React.FC<CInputFieldProps> = ({ index, prevSelected, names  }) => {
	return (
		<div>
			<CompareSearchBar placeholder="Search a company..." data={names} prevSelected={prevSelected} />
		</div>
	);
};

export default CompareInputField;