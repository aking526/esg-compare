import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface RankingsNavBtnProps {
	handleClick: Function;
	icon: any;
	color: string;
}

const RankingsNavBtn: React.FC<RankingsNavBtnProps> = ({ handleClick, icon, color }) => {
	return (
		<div
			className="mx-1 p-1"
			onClick={() => {
				handleClick();
			}}
		>
			<FontAwesomeIcon color={color} icon={icon} />
		</div>
	);
};

export default RankingsNavBtn;