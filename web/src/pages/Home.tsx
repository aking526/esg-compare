import React from "react";
import { capitalizeFirstLetter } from "../utils/stringFunctions";
import HSection from "../components/HSection";
import EnvironmentWindmillImg from "../../public/assets/environment/windmill-ga48edb172_640.jpg";
import SocialGlobeImg from "../../public/assets/social/world-ga8f31bec6_640.jpg";

const Home: React.FC = () => {
	return (
		<div className="flex flex-col my-10 mx-8 font-modern">
			<div className="mb-1">
				<div className="mb-2">
					<h1 className="text-2xl">What is ESG?</h1>
					<p className="text-lg">ESG stands for environmental, social, and governance. An ESG score is a measure of a company’s performance along these criteria.</p>
					<div className="flex flex-row border-2 p-2 shadow-light rounded-2xl">
						<div className="flex flex-row mt-2">
							<div className="flex flex-col">
								<b className="text-xl font-extrabold">(E) Environment</b>
								<p className="text-lg">Environmental criteria focus on a company’s environmental stewardship. They examine how a company uses natural resources and impacts the environment. Factors may include a company’s efforts to reduce greenhouse gases, decrease carbon emissions, conserve water, reduce waste and toxic emissions, and water pollution. </p>
							</div>
							<img
								src={EnvironmentWindmillImg}
								alt="Tree Windmill Sustainability"
								className="rounded-2xl"
								width="384px"
								height="268.8px"
							/>
						</div>
						<div className="flex flex-row mt-2 ml-2">
							<div className="flex flex-col">
								<b className="text-xl font-extrabold">(S) Social</b>
								<p className="mx-2 text-lg text-justify">Social criteria focus on how a company manages its relationships with its workforce and its community. They include a company’s labor relations, efforts on workplace diversity and equity, adherence to safe and healthy working conditions, and commitment to human rights.</p>
							</div>
							<img
								src={SocialGlobeImg}
								alt="World Hands Unity"
								className="relative rounded-2xl m-3 float-right left-auto"
								width="100px"
							/>
						</div>
					</div>
				</div>
				{/*<div className="flex flex-row mt-1">*/}
				{/*	<HSection metric="Environment" factors={[*/}
				{/*		"Energy Efficiency",*/}
				{/*		"Green House Gas Emissions",*/}
				{/*		"Deforestation",*/}
				{/*		"Water Management"*/}
				{/*	]}/>*/}
				{/*	<HSection metric="Social" factors={[*/}
				{/*		"Diversity and Inclusion",*/}
				{/*		"Working Conditions",*/}
				{/*		"Employee Relations",*/}
				{/*		"Community Relations",*/}
				{/*		"Human Rights",*/}
				{/*		"Child Labor"*/}
				{/*	]} />*/}
				{/*	<HSection metric="Governance" factors={[*/}
				{/*		"Board Structure",*/}
				{/*		"Business ethics",*/}
				{/*		"Shareholder democracy",*/}
				{/*		"Executive compensation"*/}
				{/*	]} />*/}
				{/*</div>*/}
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