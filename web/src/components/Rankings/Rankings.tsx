import React from "react";
import { Link } from "react-router-dom";
import { ICompanyData } from "../../types/ICompanyData";
import Metrics from "../../mods/Metrics";
import DataRefToText from "../../mods/DataRefToText";

interface RankingsProps {
	rankings: ICompanyData[];
	metric: string;
}

const Rankings: React.FC<RankingsProps> = ({ rankings, metric }) => {
	return (
		<div className="relative m-2">
			<div className="absolute top-0 left-0 right-0 bottom-0">
				<ul className="relative h-max w-max ">
					{rankings.map((company: ICompanyData, key: number) => {
						return <li className="m-0.5 p-0.5 border-2 border-black rounded bg-indigo-300" key={key}><Link className="mr-1.5" to={`/company/${company.ticker}`}>{key+1}. {company.name}</Link> {
							Metrics.map((curr_m: string, key: number) => {
								const RankingMetricStyle = "mx-1";
								return <span className={RankingMetricStyle} key={key}><strong className={curr_m === metric ? "text-green-600" : ""}>{DataRefToText[curr_m]}: </strong>{company[curr_m]}</span>;
							})
						} </li>
					})}
				</ul>
			</div>
		</div>
	);
};

export default Rankings;