import React from "react";
import { motion } from "framer-motion";
import StylingProps from "../types/StylingProps";

const ContainerVariants = {
	initial: {
		transition: {
			staggerChildren: 0.2
		}
	},
	animate: {
		transition: {
			staggerChildren: 0.2
		}
	}
};

const DotVariants = {
	initial: {
		y: "0%"
	},
	animate: {
		y: "100%"
	}
}

const DotTransition = {
	duration: 0.5,
	yoyo: Infinity,
	ease: "easeInOut"
};

const DotStyle = "block m-2 w-8 h-8 bg-slate-900 rounded-full";

const ThreeDotLoader: React.FC<StylingProps> = ({ styles }) => {
	return (
		<div className={`pt-10 w-full flex justify-center items-center ${styles}`}>
			<motion.div className="w-40 h-20 flex space-around" variants={ContainerVariants} initial="initial" animate="animate">
				<motion.span className={DotStyle} variants={DotVariants} transition={DotTransition} />
				<motion.span className={DotStyle} variants={DotVariants} transition={DotTransition} />
				<motion.span className={DotStyle} variants={DotVariants} transition={DotTransition} />
			</motion.div>
		</div>
	);
};

export default ThreeDotLoader;