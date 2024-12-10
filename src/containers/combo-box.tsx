import React, { useState } from "react";
import { ComboBox } from "../components";
import { DropdownData, dropdownData } from "../data";

export const ComboBoxContainer = () => {
  const [selectedOption, setSelectedOption] = useState<DropdownData | null>(
    null
  );

  const onChange = (option: DropdownData | null) => {
    setSelectedOption(option);
  };
  return (
    <div className="card">
      {selectedOption ? (
        <p>Selected option: {selectedOption.label}</p>
      ) : (
        <p> Select an option</p>
      )}
      <ComboBox
        options={dropdownData}
        value={selectedOption}
        onChange={onChange}
        placeholder="Select an option"
      />
    </div>
  );
};
