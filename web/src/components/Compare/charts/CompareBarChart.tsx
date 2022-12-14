import React from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ChartData
} from "chart.js";
import { Bar } from "react-chartjs-2";
import IBCCompany from "../../../types/IBCCompany";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

interface CompareBarChartProps {
	companyA: IBCCompany;
	companyB: IBCCompany;
}

const CompareBarChart: React.FC<CompareBarChartProps> = ({ companyA, companyB }) => {
	const labels = ["Environmental", "Social", "Governance", "Total"];
	const data: ChartData<"bar"> = {
		labels,
		datasets: [
			{
				label: companyA.name,
				data: companyA.ratings,
				backgroundColor: "rgba(255, 99, 132, 0.5)",
				borderColor: "black",
				borderWidth: 1,
				animation: false
			},
			{
				label: companyB.name,
				data: companyB.ratings,
				backgroundColor: "rgba(53, 162, 235, 0.5)",
				borderColor: "black",
				borderWidth: 1,
				animation: false
			}
		]
	};


	const options = {
		responsive: true,
		plugins: {
			animation: false,
			legend: {
				position: 'top' as const,
			},
			title: {
				display: true,
				text: "ESG Ratings Comparison",
				font: {
					size: 24
				},
				padding: {
					top: window.outerHeight * 40 / 900
				}
			},
		},
	};

	return (
		<div>
			<Bar data={data} options={options} height={window.outerHeight * 550 / 900} width={window.innerWidth * 1200 / 1440}/>
		</div>
	);
};

export default CompareBarChart;