import React, { useEffect, useRef, useState } from "react";
import { ComboBox } from "../components";
import { DropdownData, dropdownData } from "../data";
import { useOptionsFromApi } from "../hook";

export const ComboBoxContainer = () => {
  const [selectedOption, setSelectedOption] = useState<DropdownData | null>(
    null
  );

  const [searchText, setSearchText] = useState("");

  const onChange = (option: DropdownData | null) => {
    setSelectedOption(option);
  };

  const { options } = useOptionsFromApi({ searchText });

  const onSearchInputChange = (txt: string) => {
    setSearchText(txt);
  };

  return (
    <div className="card">
      {selectedOption ? (
        <p>Selected option: {selectedOption.label}</p>
      ) : (
        <p> Select an option</p>
      )}
      <ComboBox
        options={options}
        value={selectedOption}
        onChange={onChange}
        placeholder="Select an option"
        onSearch={onSearchInputChange}
      />
    </div>
  );
};
