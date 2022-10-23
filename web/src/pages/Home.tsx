import React from "react";
import { capitalizeFirstLetter } from "../utils/stringFunctions";
import HSection from "../components/HSection";

const Home: React.FC = () => {
	return (
		<div className="flex flex-col my-16 mx-10">
			<div className="mb-1">
				<div>
					<h1 className="text-2xl">What is ESG?</h1>
					<p>ESG stands for Environmental, Social, and Governance. ESG examines a company’s behavior and performance on a wide range of environmental, social, and governance criteria to identify its impact on our world and its material risks. There is no definitive set of ESG metrics and no standardized approach to the calculation of ESG metrics.  However, one thing is clear. ESG factors have become increasingly important in identifying investment opportunities. ESG gives investors a fuller understanding of the companies - . they help investors measure the ethical impact of an investment in a company; they also help investors understand the material risks and growth opportunities of a company.</p>
				</div>
				<div className="flex flex-row mt-1">
					<HSection metric="Environment" factors={[
						"Energy Efficiency",
						"Green House Gas Emissions",
						"Deforestation",
						"Water Management"
					]}/>
					<HSection metric="Social" factors={[
						"Diversity and Inclusion",
						"Working Conditions",
						"Employee Relations",
						"Community Relations",
						"Human Rights",
						"Child Labor"
					]} />
					<HSection metric="Governance" factors={[
						"Board Structure",
						"Business ethics",
						"Shareholder democracy",
						"Executive compensation"
					]} />
				</div>
				<div>
					<h1 className="text-xl">Why are ESG ratings important?</h1>
				</div>
			</div>
			<div className="mt-2">
				<h1 className="text-2xl">Ratings Methodology</h1>
				<p>See full methodology here: <a className="text-blue-600" href="https://app.esgenterprise.com/uploads/ESG-Enterprise-Risk-Ratings-MethodologyV3.pdf">ESG Enterprise</a></p>
			</div>
		</div>
	);
};

export default Home;