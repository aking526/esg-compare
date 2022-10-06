import React from "react";
import CircleLoader from "../../animations/CircleLoader";

interface LoadingProps {
	company: string | undefined;
}

const CompanyLoading: React.FC<LoadingProps> = ({ company }) => {
	return (
		<div className="absolute left-0 right-0 flex flex-col justify-center items-center p-36 font-modern">
			<h1 className="text-6xl my-1"><b>{company?.toUpperCase()}</b></h1>
			<h1 className="text-5xl my-2">Loading...</h1>
			<CircleLoader styles="mt-3" baseColor="border-slate-200" switchColor="border-t-sky-300" />
		</div>
	);
};

export default CompanyLoading;