import React, { useState, useEffect } from "react";
import CompareSearchBar from "./CompareSearchBar";

interface CInputFieldProps {
	index: number;
	prevSelected: string | undefined;
	names: string[][] | undefined;
	passBack: Function;
}

const CompareInputField: React.FC<CInputFieldProps> = ({ index, prevSelected, names, passBack  }) => {
	const [ticker, setTicker] = useState<string | undefined>(undefined);

	useEffect(() => {
		if (!ticker) return;

		passBack(ticker);
	}, [ticker]);

	return (
		<div className="m-3 p-4 bg-slate-100 shadow-light rounded-xl">
			<h1>Select a company below</h1>
			<CompareSearchBar placeholder="Search a company..." data={names} prevSelected={prevSelected} passBack={(t: string) => {
				setTicker(t);
			}}/>
		</div>
	);
};

export default CompareInputField;