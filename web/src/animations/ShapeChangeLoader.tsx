import React from "react";
import { motion } from "framer-motion";
import StylingProps from "../types/StylingProps";
import "../styles/ShapeChangeLoader.css";

interface ShapeChangeLoaderProps extends StylingProps {
	text: string;
}

const ShapeChangeLoader: React.FC<ShapeChangeLoaderProps> = ({ styles, text }) => {
	return (
		<motion.div
			id="scl"
			className={styles}
			animate={{
				scale: [1, 2, 2, 1, 1],
				rotate: [0, 0, 180, 360, 0],
				borderRadius: ["20%", "20%", "50%", "50%", "20%"]
			}}
			transition={{
				duration: 2,
				ease: "easeInOut",
				times: [0, 0.2, 0.5, 0.8, 1],
				repeat: Infinity,
				repeatDelay: 1
			}}
		>
			<div className="flex flex-col justify-center items-center pt-5 font-modern font-extrabold">
				<motion.p>Loading...</motion.p>
				<motion.p>{text}</motion.p>
			</div>
		</motion.div>
	);
};

export default ShapeChangeLoader;