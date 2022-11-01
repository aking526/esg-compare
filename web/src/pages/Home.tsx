import React from "react";
import EnvironmentNatureImg from "../../assets/environment/pexels-philip-ackermann-1666021.jpg";
import SocialFactoryImg from "../../assets/social/remy-gieling-KP6XQIEjjPA-unsplash.jpg";
import GovernanceMeetingImg from "../../assets/governance/pexels-fauxels-3183172.jpg";

const Home: React.FC = () => {
	return (
		<div className="font-modern">
			<div className="flex flex-col my-10 mx-[7.78vw]">
				<div className="mb-1">
					<div className="mb-2">
						<div className="flex flex-row">
							<b className="text-5xl text-main-red font-extrabold mr-16">What is ESG?</b>
							<div className="flex flex-col ml-16 mt-2.5 text-3xl">
								<p className="mb-2">ESG stands for environmental, social, and governance. </p>
								<p className="mt-2">An ESG rating is a measure of a company’s performance along these criteria.</p>
							</div>
						</div>
						<div className="flex flex-row justify-between mt-10">
							<div className="flex flex-col p-2 hover:shadow-light pt-4 w-[30%] bg-contrast-gray">
								<b className="text-4xl text-main-red font-extrabold ml-1.5">(E) Environmental</b>
								<div className="flex justify-center px-8 py-8">
									<p className="text-2xl">Environmental criteria focus on a company’s environmental stewardship. The environmental segment of ESG examines how a company uses natural resources and impacts the environment. Environmental factors are primarily concerned with climate change issues.</p>
								</div>
							</div>
							<img
								src={EnvironmentNatureImg}
								alt="Tree Windmill Sustainability"
								className="w-[30%] mt-0.5 hover:shadow-light"
							/>
							<div className="p-2 hover:shadow-light pt-10 w-[30%] bg-contrast-gray">
								<ul className="flex flex-col justify-center text-2xl px-8">
									<li className="mb-2">&#x2022; Reducing greenhouse gasses</li>
									<li className="mb-2">&#x2022; Decreasing carbon emissions and fossil fuel use</li>
									<li className="mb-2">&#x2022; Conserving water and other natural resources</li>
									<li className="mb-2">&#x2022; Reducing waste and toxic emissions</li>
									<li className="mb-2">&#x2022; Adopting clean technology</li>
									<li className="mb-2">&#x2022; Adopting green building practices</li>
								</ul>
							</div>
						</div>
						<div className="flex flex-row justify-between mt-10">
							<img
								src={SocialFactoryImg}
								alt="Factory Workers"
								className="w-[30%] hover:shadow-light"
							/>
							<div className="flex flex-col hover:shadow-light p-2 pt-4 w-[30%] h-[547px] bg-contrast-gray">
								<b className="text-4xl font-extrabold text-main-red ml-1.5">(S) Social</b>
								<div className="flex justify-center px-8 py-8">
									<p className="text-2xl">Social criteria focus on a company's social responsibility. The social segment of ESG examines how a company manages its relationships with its workforce and other stakeholders in its community. Social factors are primarily concerned with social consequences of business decisions.</p>
								</div>
							</div>
							<div className="p-2 hover:shadow-light pt-10 w-[30%] bg-contrast-gray">
								<ul className="flex flex-col justify-center text-2xl px-8">
									<li className="mb-2">&#x2022; Labor management</li>
									<li className="mb-2">&#x2022; Human capital development</li>
									<li className="mb-2">&#x2022; Supply chain labor standards</li>
									<li className="mb-2">&#x2022; Safe and healthy working standards</li>
									<li className="mb-2">&#x2022; Product safety and quality</li>
									<li className="mb-2">&#x2022; Privacy and data security</li>
								</ul>
							</div>
						</div>
						<div className="flex flex-row justify-between mt-10">
							<div className="flex flex-col p-2 hover:shadow-light pt-4 w-[30%] bg-contrast-gray">
								<b className="text-4xl font-extrabold text-main-red ml-1.5">(G) Governance</b>
								<div className="flex justify-center px-8 py-8">
									<p className="text-2xl">Governance criteria focus on the integrity of a company’s governance structure. The governance segment of ESG examines whether a company’s leadership is operating within an ethical and responsible framework. Governance factors are primarily concerned with leadership accountability.</p>
								</div>
							</div>
							<div className="p-2 hover:shadow-light pt-10 w-[30%] bg-contrast-gray">
								<ul className="flex flex-col justify-center text-2xl px-8">
									<li className="mb-2">&#x2022; Board diversity</li>
									<li className="mb-2">&#x2022; Executive pay</li>
									<li className="mb-2">&#x2022; Corporate ownership structure and control</li>
									<li className="mb-2">&#x2022; Accounting compliance and transparency</li>
									<li className="mb-2">&#x2022; Business ethics</li>
									<li className="mb-2">&#x2022; Financial system instability</li>
								</ul>
							</div>
							<img
								src={GovernanceMeetingImg}
								alt="Corporate Governance"
								className="w-[30%] hover:shadow-light"
							/>
						</div>
					</div>
				</div>
				<div className="mt-10 bg-band p-5 hover:shadow-light">
					<h1 className="text-2xl">Ratings Methodology</h1>
					<p>The ESG ratings used on this website are derived from the ESG ratings published by ESG Enterprise. See their full methodology here: <a className="text-blue-600" href="https://app.esgenterprise.com/uploads/ESG-Enterprise-Risk-Ratings-MethodologyV3.pdf">ESG Enterprise Ratings Methodology</a>.</p>
				</div>
			</div>
		<div className="flex flex-col mt-3 py-5 text-white bg-black px-28">
			<h1 className="text-sm mb-1.5">Disclaimer</h1>
			<p className="text-xs mb-1">This website is not engaged in rendering legal, accounting, investment, or other professional advice or services. Your use of this website and of any content, information, or data accessed on or through this website is at your own risk. We do not make any warranties about or otherwise guarantee the accuracy or completeness of any content, information, or data accessed on or through this website. Certain content, information, or data accessed through or on this website may be inaccurate, incomplete, or not appropriate for a particular purpose.</p>
			<p className="text-xs">All information, text, data, images, graphics, graphs, charts, or material contained in this website have been provided here solely for informational purposes based upon information generally available to the public, with the exception of the shown ESG scores and ratings, which have been sourced from ESG Enterprise (<a className="text-blue-600" href="esgenterprise.com">esgenterprise.com</a>). Different parties may utilize different methodologies and data inputs in arriving at their ESG scores and ratings, and thus ESG scores and ratings for any particular company may vary.</p>
		</div>
	</div>
	);
};

export default Home;