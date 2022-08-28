import React from "react";
import StylingProps from "../types/StylingProps";

interface TextDataFormatProps extends StylingProps {
	text: string;
	data: string | number;
}

const TextDataFormat: React.FC<TextDataFormatProps> = ({ text, data, styles }) => {
	return (
		<p className={styles}><strong>{text}</strong> {data}</p>
	);
};

export default TextDataFormat;