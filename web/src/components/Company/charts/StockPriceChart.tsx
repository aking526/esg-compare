import React from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler
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
	Legend,
	Filler
);


interface StockPriceChartProps {
	ticker: string;
	name: string;
	spcLen: string,
	prices: CPair[];
}

const StockPriceChart: React.FC<StockPriceChartProps> = ({ ticker, name, spcLen, prices }) => {
	const data = {
		labels: getDatesFormatted(prices),
		datasets: [
			{
				label: "Price",
				data: getPrices(prices),
				backgroundColor: "rgba(125, 211, 252, 0.25)",
				borderColor: "rgba(125, 211, 252, 1)",
				fill: true,
				pointRadius: 0.5,
				borderWidth: 1.5
			}
		]
	};

	const lineOptions = {
		hover: {
			intersect: false
		},
		scales: {
			x: {
				grid: {
					display: false
				}
			}
		},
		plugins: {
			legend: {},
			zoomAndPan: {}
		},
		animation: {
			duration: 2000
		}
	};

	return (
		<div>
			<Line data={data} options={lineOptions} width={800} height={400}/>
		</div>
	);
};

export default StockPriceChart;