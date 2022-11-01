import React from "react";
import ThreeDotLoader from "../../animations/ThreeDotLoader";

interface RankingsLoadingProps {
	metric: string;
	filters?: string;
}

const RankingsLoading: React.FC<RankingsLoadingProps> = ({ metric, filters }) => {
	return (
		<div className="flex flex-col justify-center items-center pt-5">
			<h1 className="text-5xl text-slate-900 text-center">Loading Rankings By {metric}</h1>
			<ThreeDotLoader />
		</div>
	);
};

export default RankingsLoading;