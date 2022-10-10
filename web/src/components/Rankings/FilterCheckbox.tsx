import React, { ChangeEventHandler } from "react";

interface FilterCheckboxProps {
	label: string;
	value: boolean;
	onChange: ChangeEventHandler<HTMLInputElement>;
}

const FilterCheckbox: React.FC<FilterCheckboxProps> = ({ label, value, onChange }) => {
	return (
		<div>
			<form>
				<input type="checkbox" checked={value} onChange={onChange}/>
				<label className="ml-2">{label}</label>
			</form>
		</div>
	);
};

export default FilterCheckbox;