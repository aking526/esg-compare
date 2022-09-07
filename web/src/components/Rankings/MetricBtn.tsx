import React, { useState, useEffect } from "react";
import StylingProps from "../../types/StylingProps";

interface FilterBtnProps extends StylingProps {
	text: string;
	thisMetric: string;
	currMetric: string;
	setMetric: Function;
}

const MetricBtn: React.FC<FilterBtnProps> = ({ text, thisMetric, currMetric, setMetric, styles }) => {
	const [color, setColor] = useState<string>("");

	const handleClick = () => setMetric(thisMetric);

	useEffect(() => {
		if (currMetric === thisMetric) setColor("bg-green-300");
		else setColor("");
	},[currMetric]);

	return (
		<div>
			<button className={`${styles} ${color}`} onClick={handleClick}>{text}</button>
		</div>
	);
};

export default MetricBtn;