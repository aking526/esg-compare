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
import { Line } from "react-chartjs-2";
import { CPair, getDatesFormatted, getPrices } from "../../../classes/CPair";

ChartJS.register(
		CategoryScale,
		LinearScale,
		PointElement,
		LineElement,
		Title,
		Tooltip,
		Legend
);

interface CompareStockChartProps {
	tickerA: string;
	pricesA: CPair[];
	tickerB: string;
	pricesB: CPair[];
}

const CompareStockChart: React.FC<CompareStockChartProps> = ({ tickerA, pricesA, tickerB, pricesB }) => {
	const data = {
		labels: getDatesFormatted(pricesA).slice(pricesA.length - 20, pricesA.length),
		datasets: [
			{
				label: `${tickerA.toUpperCase()} Stock Price`,
				data: getPrices(pricesA).slice(pricesA.length - 20, pricesA.length),
				backgroundColor: [
					"rgba(255, 99, 132, 0.5)"
				],
				borderColor: "rgba(255, 99, 132, 0.5)",
				borderWidth: 1
			},
			{
				label: `${tickerB.toUpperCase()} Stock Price`,
				data: getPrices(pricesB).slice(pricesB.length - 20, pricesB.length),
				backgroundColor: [
					"rgba(53, 162, 235, 0.5)"
				],
				borderColor: "rgba(53, 162, 235, 0.5)",
				borderWidth: 1
			}
		]
	};

	const options = {
		responsive: true,
		plugins: {
			title: {
				display: true,
				text: "Stock Price Comparison",
			},
		},
	};

	return (
		<div>
			<Line data={data} options={options} />
		</div>
	);
};

export default CompareStockChart;

