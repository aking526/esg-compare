import React, {useEffect, useState} from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend, ChartData
} from "chart.js";
import { Line } from "react-chartjs-2";
import { StockDataConv } from "../../../mods/StockDataConv";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);


const convertData = (which: string, data: any) => {
	let conv: number[] = [];
	conv.pop();
	for (const date in data) {
		const str_num = data[date][StockDataConv[which]];
		conv.push(parseFloat(str_num));
	}
	conv.reverse();
	return conv;
};

const options = {
	plugins: {
		zoomAndPan: {

		}
	}
};


interface StockPriceChartProps {
	ticker: string;
	name: string;
	prices: any;
}

const StockPriceChart: React.FC<StockPriceChartProps> = ({ ticker, name, prices }) => {
	const [closingPrices, setClosingPrices] = useState<ChartData<"line"> | any>({});


	useEffect(() => {
		const k = Object.keys(prices);
		k.reverse();
		const data = {
			labels: Object.keys(k),
			datasets: [
				{
					label: "Stock Price",
					data: convertData("close", prices),
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
		setClosingPrices(data);
	}, []);

	return (
		<div>
			{/*<Line data={closingPrices} />*/}
		</div>
	);
};

export default StockPriceChart;