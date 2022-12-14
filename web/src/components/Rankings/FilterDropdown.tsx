import React, { useEffect, useState } from "react";
import { components, default as ReactSelect, OptionProps } from "react-select";
import makeAnimated from "react-select/animated";
import { MyOption, TOptionsSelected } from "../../types/MyOption";

const animatedComponents = makeAnimated();

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
			className="relative w-[17.78vw]"
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
				components={animatedComponents}
				onChange={handleChange}
				// allowSelectAll={true}
				value={optionsSelected}
			/>
		</span>
	);
};

export default FilterDropdown;