import React from "react";
import ShapeChangeLoader from "../../animations/ShapeChangeLoader";

interface CompareLoadingProps {
	tickers: string[];
}

const CompareLoading: React.FC<CompareLoadingProps> = ({ tickers }) => {
	return (
		<div className="flex flex-col justify-center items-center p-36 font-modern">
			<ShapeChangeLoader
				text={`${tickers[0].toUpperCase()} - ${tickers[1].toUpperCase()}`}
			/>
		</div>
	);
};

export default CompareLoading;