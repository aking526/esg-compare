import React from "react";

interface FilterCheckboxProps {
	label: string;
	value: boolean;
	onChange: Function;
}

const FilterCheckbox: React.FC<FilterCheckboxProps> = ({ label, value, onChange }) => {
	return (
		<div>
			<label>
				<input type="checkbox" checked={value} onChange={() => onChange}/>
			</label>
		</div>
	);
};

export default FilterCheckbox;