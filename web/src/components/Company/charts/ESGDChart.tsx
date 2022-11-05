import React, { useState, useEffect, useReducer } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, ChartData } from "chart.js";

ChartJS.register(ArcElement);

interface EPCProps {
	env: number;
	soc: number;
	gov: number;
}

const ESGDChart: React.FC<EPCProps> = ({ env, soc, gov}) => {
	const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

	const [width, setWidth] = useState(window.innerWidth * 300 / 1440);
	const [height, setHeight] = useState(window.outerHeight * 200 / 900);

	const data : ChartData<"doughnut"> = {
		labels: ["Environmental", "Social", "Governance"],
		datasets: [
			{
				label: "Score",
				data: [env, soc, gov],
				backgroundColor: [
					"rgba(6,147,124,255)",
					"rgba(209,121,37,255)",
					"rgba(0,126,174,255)"
				],
				borderColor: "black",
				borderWidth: 2
			}
		]
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				labels: {
					boxWidth: 50,
					font: {
						size: 16
					},
					color: "rgb(0, 0, 0)"
				},
				position: "bottom" as const
			},
		}
	};

	useEffect(() => {
		setWidth(window.innerWidth * 300 / 1440);
		setHeight(window.outerHeight * 200 / 900);
	}, [window.innerWidth, window.innerHeight]);

	useEffect(() => {
		forceUpdate();
	}, [width, height]);

	return (
		<div>
			<Doughnut data={data} options={options} width={width} height={height} />
		</div>
	);
};

export default ESGDChart;