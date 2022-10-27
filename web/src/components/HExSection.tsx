import React from "react";
import { capitalizeFirstLetter } from "../utils/stringFunctions";
import StylingProps from "../types/StylingProps";

interface HSectionProps extends StylingProps {
	metric: string;
	factors: string[];
}

const HExSection: React.FC<HSectionProps> = ({ metric, factors, styles }) => {
	return (
			<div className={`my-2 ${styles}`}>
				{/*<h1 className="text-lg"><strong>{capitalizeFirstLetter(metric)}</strong></h1>*/}
				<p>Examples of {metric.toLowerCase()} factors include:</p>
				<ul>
					{factors.map((value, k) => {
						return <li key={k}>{value}</li>;
					})}
				</ul>
			</div>
	);
};

export default HExSection;