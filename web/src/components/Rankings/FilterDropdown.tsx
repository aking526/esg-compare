import React, { useEffect, useState } from "react";
import { components, default as ReactSelect, OptionProps } from "react-select";
import { MyOption, TOptionsSelected } from "../../types/MyOption";

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
	title: string;
	options: MyOption[];
	passBack: Function;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ title, options, passBack }) => {
	const [optionsSelected, setOptionsSelected] = useState<TOptionsSelected | any>(null);

	const handleChange = (selected?: TOptionsSelected) => setOptionsSelected(selected);

	useEffect(() => {
		passBack(optionsSelected);
	}, [optionsSelected]);

	return (
		<span
			className="inline-block"
			data-toggle="popover"
			data-trigger="focus"
			data-content="Please select industry/ies"
		>
			{title}
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
				value={optionsSelected}
			/>
		</span>
	);
};

export default FilterDropdown;