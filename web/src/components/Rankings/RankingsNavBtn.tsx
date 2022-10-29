import React from "react";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/20/solid";

interface RankingsNavBtnProps {
	handleClick: Function;
	dir: string;
	color: string;
}

const RankingsNavBtn: React.FC<RankingsNavBtnProps> = ({ handleClick, dir, color }) => {
	return (
		<div
			className="mx-1 p-1 hover:cursor-pointer"
			onClick={() => {
				handleClick();
			}}
		>
			{ dir === "left" ?
					<ArrowLeftCircleIcon className={`h-7 w-7 ${color}`}/>
					:
					<ArrowRightCircleIcon className={`h-7 w-7 ${color}`}/>
			}
		</div>
	);
};

export default RankingsNavBtn;