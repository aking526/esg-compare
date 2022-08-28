import React from "react";
import { motion } from "framer-motion";
import StylingProps from "../types/StylingProps";

const CircleLoader: React.FC<StylingProps> = ({ styles }) => {
	return (
		<div className={`relative w-20 h-20 box-border ${styles}`}>
			<motion.span
				className="block w-20 h-20 absolute top-0 left-0 rounded-full border-8 border-t-8 border-t-sky-300 box-border"
				animate={{ rotate: 360 }}
				transition={{
					loop: Infinity,
					duration: 1,
					ease: "linear"
				}}
			/>
		</div>
	);
};

export default CircleLoader;
