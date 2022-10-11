import { useEffect, useRef, useState } from "react";

export function useCalculateHeight() {
	const [height, setHeight] = useState<null | number>(null);

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
