import { useEffect, useRef, useState } from "react";

export function useCalculateHeight() {
	// @ts-ignore
	const [height, setHeight] = useState<number>(window.innerHeight - document.getElementById("top-bar")?.offsetHeight - document.getElementById("search-bar")?.offsetHeight);

	useEffect(() => {
		const handleResize = () => {
			// @ts-ignore
			let h = window.innerHeight - document.getElementById("top-bar").offsetHeight - document.getElementById("search-bar").offsetHeight;
			setHeight(h);
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return height;
}
