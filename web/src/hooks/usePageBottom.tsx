import { useEffect, useState } from "react";

export function usePageBottom() {
	const [bottom, setBottom] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const isBottom = window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight;
			setBottom(isBottom);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return bottom;
}