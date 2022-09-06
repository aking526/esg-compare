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


interface StockPriceChartProps {
	ticker: string;
	name: string;
	from: number;
	to: number;
	prices: CPair[];
}

const StockPriceChart: React.FC<StockPriceChartProps> = ({ ticker, name, from, to, prices }) => {
	prices.reverse();
	const data = {
		labels: getDatesFormatted(prices).slice(prices.length - 15, prices.length),
		datasets: [
			{
				label: "Stock Price",
				data: getPrices(prices).slice(prices.length - 15, prices.length),
				backgroundColor: [
					"rgba(75,192,192,1)",
					"#ecf0f1",
					"#50AF95",
					"#f3ba2f",
					"#2a71d0",
				],
				borderColor: "black",
				borderWidth: 2
			}
		]
	};

	const options = {
		plugins: {
			zoomAndPan: {

			}
		}
	};

	return (
		<div>
			<Line data={data} width={500} height={500}/>
		</div>
	);
};

export default StockPriceChart;