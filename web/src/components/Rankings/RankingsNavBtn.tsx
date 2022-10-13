import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface RankingsNavBtnProps {
	handleClick: Function;
	icon: any;
}

const RankingsNavBtn: React.FC<RankingsNavBtnProps> = ({ handleClick, icon }) => {
	return (
		<div
			className="border-black border-2 rounded-lg mx-1 p-1 bg-black"
			onClick={() => {
				handleClick();
			}}
		>
			<FontAwesomeIcon color="white" icon={icon} />
		</div>
	);
};

export default RankingsNavBtn;