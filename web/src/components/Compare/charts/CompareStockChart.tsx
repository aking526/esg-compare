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
import { useSPCSlicer } from "../../../hooks/spc-hooks";

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
	spcLen: string;
}

const CompareStockChart: React.FC<CompareStockChartProps> = ({ tickerA, pricesA, tickerB, pricesB, spcLen }) => {
	const [startA, stopA] = useSPCSlicer(spcLen, pricesA);
	const [startB, stopB] = useSPCSlicer(spcLen, pricesB);
	const data = {
		labels: getDatesFormatted(pricesA).slice(startA, stopA),
		datasets: [
			{
				label: `${tickerA.toUpperCase()} Stock Price`,
				data: getPrices(pricesA).slice(startA, stopA),
				backgroundColor: [
					"rgba(255, 99, 132, 0.5)"
				],
				borderColor: "rgba(255, 99, 132, 0.5)",
				borderWidth: 2,
				pointRadius: 1.5
			},
			{
				label: `${tickerB.toUpperCase()} Stock Price`,
				data: getPrices(pricesB).slice(startB, stopB),
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
				font: {
					size: 24
				},
				padding: {
					top: 40
				}
			},
		},
	};

	return (
		<div>
			<Line data={data} options={options} height={450} width={1200}/>
		</div>
	);
};

export default CompareStockChart;

