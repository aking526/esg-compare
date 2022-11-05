import React from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";

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
					<ArrowLeftIcon className={`h-6 w-6 ${color}`}/>
					:
					<ArrowRightIcon className={`h-6 w-6 ${color}`}/>
			}
		</div>
	);
};

export default RankingsNavBtn;