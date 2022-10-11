import { useState } from "react";

export function useToggle (defaultValue: boolean) {
	const [value, setValue] = useState(defaultValue);

	const toggleValue = (value: any) => {
		setValue(currentValue => typeof value === "boolean" ? value : !currentValue)
	};

	return [value, toggleValue];
}