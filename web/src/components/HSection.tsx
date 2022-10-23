import React from "react";
import { capitalizeFirstLetter } from "../utils/stringFunctions";

interface HSectionProps {
	metric: string;
	factors: string[];
}

const HSection: React.FC<HSectionProps> = ({ metric, factors }) => {
	return (
			<div className="m-2">
				<h1 className="text-lg"><strong>{capitalizeFirstLetter(metric)}</strong></h1>
				<p>Examples of {metric.toLowerCase()} factors include:</p>
				<ul>
					{factors.map((value, k) => {
						return <li key={k}>{value}</li>
					})}
				</ul>
			</div>
	);
};

export default HSection;