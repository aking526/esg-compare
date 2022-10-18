import React from "react";

interface SFInfoFormatterProps {
	label: string;
	value: string | number;
}

const SFInfoFormatter: React.FC<SFInfoFormatterProps> = ({ label, value }) => {
	return (
		<div><strong>{label}:</strong> {value}</div>
	);
};

export default SFInfoFormatter;