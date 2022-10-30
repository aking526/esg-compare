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
		labels: getDatesFormatted(pricesA),
		datasets: [
			{
				label: `${tickerA.toUpperCase()} Stock Price`,
				data: getPrices(pricesA),
				backgroundColor: [
					"rgba(255, 99, 132, 0.5)"
				],
				borderColor: "rgba(255, 99, 132, 0.5)",
				borderWidth: 2,
				pointRadius: 1.5
			},
			{
				label: `${tickerB.toUpperCase()} Stock Price`,
				data: getPrices(pricesB),
				backgroundColor: [
					"rgba(53, 162, 235, 0.5)"
				],
				borderColor: "rgba(53, 162, 235, 0.5)",
				borderWidth: 2,
				pointRadius: 1.5
			}
		]
	};

	const options = {
		responsive: true,
		scales: {
			x: {
				grid: {
					display: false
				}
			}
		},
		plugins: {
			title: {
				display: true,
				text: "Stock Price Comparison",
			},
		},
	};

	return (
		<div>
			<Line data={data} options={options} width={1200} height={400} />
		</div>
	);
};

export default CompareStockChart;

