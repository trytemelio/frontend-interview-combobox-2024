import React, { useState } from "react";
import { MultiComboBox } from "../components";
import { DropdownData, dropdownData } from "../data";

export const MultiComboBoxContainer = () => {
  const [selectedOption, setSelectedOption] = useState<DropdownData[]>([]);

  const onChange = (options: DropdownData[]) => {
    setSelectedOption(options);
  };
  return (
    <div className="card">
      <MultiComboBox
        options={dropdownData}
        value={selectedOption}
        onChange={onChange}
        placeholder="Select options"
      />
    </div>
  );
};
