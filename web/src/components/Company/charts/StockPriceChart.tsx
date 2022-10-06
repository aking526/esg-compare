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
	const data = {
		labels: getDatesFormatted(prices).slice(prices.length - 20, prices.length),
		datasets: [
			{
				label: "Price",
				data: getPrices(prices).slice(prices.length - 20, prices.length),
				backgroundColor: [
					"rgb(125 211 252)",
				],
				borderColor: "black",
				borderWidth: 0.5
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
			<Line data={data} width={1000} height={400}/>
		</div>
	);
};

export default StockPriceChart;