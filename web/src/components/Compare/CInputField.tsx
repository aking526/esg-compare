import React, { useState, useEffect } from "react";
import CSearchBar from "./CSearchBar";

interface CInputFieldProps {
	passBack: (selected: string, index: number) => void;
	index: number;
	names: string[][] | undefined;
}

const CInputField: React.FC<CInputFieldProps> = ({ passBack, index, names }) => {
	const [selected, setSelected] = useState<string | undefined>(undefined);

	useEffect(() => {
		if (selected) passBack(selected, index);
	}, [selected]);

	return (
		<div>
			{!selected && <CSearchBar placeholder="Search a company..." data={names} passBack={(ticker: string) => {
				setSelected(ticker);
			}}/>
			}
		</div>
	);
};

export default CInputField;