import React, { useRef, useState } from "react";
import { ComboBox } from "../components";
import { DropdownData, dropdownData } from "../data";

export const ComboBoxContainer = () => {
  const [selectedOption, setSelectedOption] = useState<DropdownData | null>(
    null
  );
  const [options, setOptions] = useState<DropdownData[]>([]);
  const timer = useRef<number | null>(null);

  const onChange = (option: DropdownData | null) => {
    setSelectedOption(option);
  };
  const onSearchInputChange = (searchText: string) => {
    timer.current && clearTimeout(timer.current);
    if (searchText.trim()) {
      timer.current = setTimeout(() => {
        fetch(`https://rickandmortyapi.com/api/character/?name=${searchText}`)
          .then((res) => res.json())
          .then((res) =>
            setOptions(
              res?.results?.map((op) => ({
                label: op.name,
                value: op.id,
              })) || []
            )
          )
          .catch((err) => console.log(err));
      }, 500);
      return;
    }
    setOptions([]);
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
