import React from "react";
import { Link } from "react-router-dom";

interface CompanyInfoProps {
	name: string;
	ticker: string;
	cik: string;
	exchange: string;
	industry: string;
	logo: string;
	weburl: string;
}

const CompanyInfo: React.FC<CompanyInfoProps> = ({ name, ticker, cik, exchange, industry, logo, weburl}) => {
	return (
			<div className="flex flex-row w-full justify-between">
				<div>
					<div className="flex flex-row">
						<h1 className="mr-2 font-extrabold text-4xl">{name}</h1>
						<h2 className="ml-2 mt-2 text-3xl">({ticker.toUpperCase()})</h2>
						<span className="text-sm text-blue-600 ml-2 mt-6"><Link to={`/compare?companies=${ticker}`}>Compare</Link></span>
					</div>
					<p className="text-lg">{exchange}</p>
					<div className="flex flex-row text-lg">
						<p className="font-extrabold mr-1">Industry:</p>
						<p>{industry}</p>
					</div>
					<div>
						<p className="text-sm text-blue-600"><a href={weburl}>Company Website</a></p>
					</div>
					<div>
						<h3 className="text-sm text-blue-600"><a href={`https://www.sec.gov/edgar/browse/?CIK=${cik}&owner=exclude`}>Company SEC Filings</a></h3>
					</div>
				</div>
				<div className="border-2 border-black h-min">
					<img
						className="w-[5rem] h-[5rem]"
						src={logo}
						alt={`${ticker.toUpperCase()} Logo`}
					/>
				</div>
			</div>
	);
};

export default CompanyInfo;