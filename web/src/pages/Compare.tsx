import React from "react";
import CInputField from "../components/Compare/CInputField";

const Compare: React.FC = () => {
	const params = new Proxy(new URLSearchParams(window.location.search), {
		get: (searchParams, prop: string) => searchParams.get(prop)
	});

	// @ts-ignore
	const go = params.go;

	if (go) {
		return (
			<div>

			</div>
		);
	}

	return (
		<div>
			<CInputField />
			<CInputField />
		</div>
	);
};

export default Compare;