import React from "react";
import CircleLoader from "../../animations/CircleLoader";

interface CompareLoadingProps {
	tickers: string[];
}

const CompareLoading: React.FC<CompareLoadingProps> = ({ tickers }) => {
	return (
		<div>
			<div className="flex flex-col justify-center items-center p-36 font-modern">
				<h1 className="text-5xl my-2">Loading...</h1>
				<h1 className="text-6xl my-1"><b>{tickers[0].toUpperCase()} - {tickers[1].toUpperCase()}</b></h1>
				<CircleLoader styles="mt-3" baseColor="border-white" switchColor="border-t-sky-300"/>
			</div>
		</div>
	);
};

export default CompareLoading;