import React from "react";
import { Link } from "react-router-dom";

interface CompanyInfoProps {
	name: string;
	ticker: string;
	exchange: string;
	industry: string;
	logo: string;
	weburl: string;
}

const CompanyInfo: React.FC<CompanyInfoProps> = ({ name, ticker, exchange, industry, logo, weburl}) => {
	return (
			<div className="flex flex-row w-full justify-between">
				<div>
					<div className="flex flex-row">
						<a href={weburl}><h1 className="mr-2 font-extrabold text-4xl">{name}</h1></a>
						<h2 className="ml-2 mt-2 text-2xl">({ticker.toUpperCase()})</h2>
						<span className="text-xs text-blue-600 ml-2 mt-6"><Link to={`/compare?companies=${ticker}`}>Compare</Link></span>
					</div>
					<p className="text-base">{exchange}</p>
					<div className="flex flex-row text-xs">
						<p className="font-extrabold mr-1">Industry:</p>
						<p>{industry}</p>
					</div>
				</div>
				<div className="border-2 border-black">
					<img
						className="w-20 h-20"
						src={logo}
						alt=""
					/>
				</div>
			</div>
	);
};

export default CompanyInfo;