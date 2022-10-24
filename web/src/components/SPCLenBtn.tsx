import React, { useState, useEffect } from "react";

interface SPCLenBtnProps {
	initialValue: boolean;
	text: string;
	currSelected: string;
	set: Function;
}

const SPCLenBtn: React.FC<SPCLenBtnProps> = ({ initialValue, text, currSelected, set }) => {
	const [selected, setSelected] = useState(initialValue);
	const [color, setColor] = useState("");

	useEffect(() => {
		if (currSelected === text) setColor("bg-sky-300");
		else setColor("");
	}, [currSelected]);

	return (
		<button
			className={`mx-2 border-2 rounded-xl px-2 py-1 ${color}`}
			onClick={() => {
				const prevState = selected;
				setSelected(!prevState);
				if (!prevState) {
					set(text);
				}
			}}
		>
			{text}
		</button>
	);
};

export default SPCLenBtn;