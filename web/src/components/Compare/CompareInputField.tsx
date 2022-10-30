import React, { useState, useEffect } from "react";
import CompareSearchBar from "./CompareSearchBar";

interface CInputFieldProps {
	index: number;
	prevSelected: string | undefined;
	names: string[][] | undefined;
	passBack: Function;
	passBackFocused: Function;
	otherSelected: string | null;
	otherFocused: boolean;
	hasIndustryAvgOption: boolean;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const CompareInputField: React.FC<CInputFieldProps> = ({ index, prevSelected, names, passBack, passBackFocused, otherSelected, otherFocused, hasIndustryAvgOption, onClick }) => {
	const [ticker, setTicker] = useState<string | undefined>(undefined);

	useEffect(() => {
		if (!ticker) return;

		passBack(ticker);
	}, [ticker]);

	return (
		<div className="flex flex-col justify-center items-center m-3 p-5 bg-slate-100 shadow-light rounded-xl font-modern">
			<h1>Select a company below</h1>
			<CompareSearchBar
				placeholder="Search a company..."
				data={names}
				prevSelected={prevSelected}
				passBackFocused={passBackFocused}
				otherSelected={otherSelected}
				otherFocused={otherFocused}
				passBack={(t: string) => {
					setTicker(t);
				}}
			/>
			{ hasIndustryAvgOption && onClick &&
				<div className="mt-2 border-2 border-gray-400 rounded-xl p-2 bg-gray-400">
					<button onClick={onClick}>Compare to Industry Average</button>
				</div>
			}
		</div>
	);
};

export default CompareInputField;