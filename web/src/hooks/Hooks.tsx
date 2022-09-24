import { useEffect, useRef, useState } from "react";

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

export function useUpdateEffect(callback: Function, dependencies: []) {
	const firstRenderRef = useRef(true);

	useEffect(() => {
		if (firstRenderRef.current) {
			firstRenderRef.current = false;
			return;
		}
		return callback();
	}, dependencies);
}

export function useToggle (defaultValue: boolean) {
	const [value, setValue] = useState(defaultValue);

	const toggleValue = (value: any) => {
		setValue(currentValue => typeof value === "boolean" ? value : !currentValue)
	};

	return [value, toggleValue];
}