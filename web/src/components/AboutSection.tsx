import React from "react";

interface AboutSectionProps {
	title: string;
	text: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({title, text}) => {
	return (
		<div className="flex flex-col justify-center items-center my-2">
			<h2 className="text-3xl">{title}</h2>
			<p className="my-3 text-base">{text}</p>
		</div>
	);
};

export default AboutSection;