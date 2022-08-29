import React from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
} from "chart.js";
import StockDay from "../../types/StockDay";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

interface StockGraphProps {
	[index: string]: StockDay
}

const StockGraph: React.FC<StockGraphProps> = ({ data }) => {
	return (
		<div>

		</div>
	);
};

export default StockGraph;