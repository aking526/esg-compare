import React, { useState } from "react";
import { components, default as ReactSelect, OptionProps } from "react-select";
import MyOption from "../../types/MyOption";

const Option: React.FC<OptionProps> = (props) => {
	return (
		<div>
			<components.Option {...props}>
				<input
					type="checkbox"
					checked={props.isSelected}
					onChange={() => null}
				/>{" "}
				<label>{props.label}</label>
			</components.Option>
		</div>
	);
};

interface FilterDropdownProps {
	options: MyOption[];
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ options }) => {
	const [optionSelected, setOptionSelected] = useState<any | null>(null);

	const handleChange = (selected?: MyOption | MyOption[] | null) => setOptionSelected(selected);

	return (
		<span
			className="inline-block"
			data-toggle="popover"
			data-trigger="focus"
			data-content="Please select industry/ies"
		>
			<ReactSelect
				options={options}
				isMulti
				closeMenuOnSelect={false}
				hideSelectedOptions={false}
				components={{
					Option
				}}

				onChange={handleChange}
				// allowSelectAll={true}
				value={optionSelected}
			/>
		</span>
	);
};

export default FilterDropdown;