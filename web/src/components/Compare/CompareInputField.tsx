import React, { useState, useEffect } from "react";
import CompareSearchBar from "./CompareSearchBar";
import { RectangleGroupIcon } from "@heroicons/react/20/solid";

interface CInputFieldProps {
	index: number;
	prevSelected: string | undefined;
	names: string[][] | undefined;
	passBack: Function;
	passBackFocused: Function;
	otherSelected: string | null;
	otherFocused: boolean;
	hasIndustryAvgOption: boolean;
	onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const CompareInputField: React.FC<CInputFieldProps> = ({ index, prevSelected, names, passBack, passBackFocused, otherSelected, otherFocused, hasIndustryAvgOption, onClick }) => {
	const [ticker, setTicker] = useState<string | undefined>(undefined);

	useEffect(() => {
		if (!ticker) return;

		passBack(ticker);
	}, [ticker]);

	return (
		<div className="flex flex-col justify-evenly">
			<div className="flex flex-col justify-center items-center m-3 p-5 bg-white shadow-light rounded-xl font-modern">
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
			</div>
			{ hasIndustryAvgOption && onClick ?
				<div className="flex flex-row items-center mt-2 border-2 border-black rounded-xl p-3 bg-white w-fit ml-auto mr-auto hover:cursor-pointer" onClick={otherSelected ? onClick : () => null}>
					<span className="text-sm mr-2.5">Compare to Industry Average</span>
					<RectangleGroupIcon className="w-6 h-6"/>
				</div>
					:
				<div className="h-[52px] mt-2"></div>
			}
		</div>
	);
};

export default CompareInputField;