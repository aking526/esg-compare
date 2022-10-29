import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, ChartData } from "chart.js";

ChartJS.register(ArcElement);

interface EPCProps {
	env: number;
	soc: number;
	gov: number;
}

const ESGDChart: React.FC<EPCProps> = ({ env, soc, gov}) => {
	const [data, setData] = useState<ChartData<"doughnut">>({
		labels: ["Environment", "Social", "Governance"],
		datasets: [
			{
				label: "Score",
				data: [env, soc, gov],
				backgroundColor: [
					"#2BB02B", // rgba(43,176,43,1)
					"#FC8C03", // rgba(252,140,3,1)
					"#127ADB", // rgba(18,122,219,1)
				],
				borderColor: "black",
				borderWidth: 2
			}
		]
	});

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top" as const
			}
		}
	};

	return (
		<div className="relative">
			<Doughnut data={data} options={options} width={300} height={200} />
		</div>
	);
};

export default ESGDChart;