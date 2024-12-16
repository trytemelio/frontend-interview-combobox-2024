import React, { useState, useEffect } from "react";
import "./combo-box.scss";

interface ComboBoxProps {
  name: string;
  value: string;
}

export const ComboBox = () => {
  const options: ComboBoxProps[] = [
    { name: "Option 1", value: "1" },
    { name: "Option 2", value: "2" },
    { name: "Option 3", value: "3" },
  ];

  const [isDropDownVisible, setIsDropDownVisible] = useState<boolean>(false);
  const [filteredOptions, setFilteredOptions] = useState<ComboBoxProps[]>(
    options
  );
  const [hilightedIndex, setHilightedIndex] = useState<number>(-1);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    const normalizedInput = inputValue.trim().replace(/\s+/g, " ");
    const results = options.filter((option) =>
    option.name.toLowerCase().includes(normalizedInput.toLowerCase()) ||
    option.value.toLowerCase().includes(normalizedInput.toLowerCase())
  );
    setFilteredOptions(results);
    setHilightedIndex(-1);
  }, [inputValue]);

  const handleClickOptions = (option: ComboBoxProps) => {
    setInputValue(option.name);
    setIsDropDownVisible(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isDropDownVisible || filteredOptions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHilightedIndex((prev) => (prev + 1) % filteredOptions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHilightedIndex((prev) =>
        prev === 0 || prev === -1 ? filteredOptions.length - 1 : prev - 1
      );
    } else if (e.key === "Enter" && hilightedIndex >= 0) {
      e.preventDefault();
      handleClickOptions(filteredOptions[hilightedIndex]);
    } else if (e.key === "Escape") {
      setIsDropDownVisible(false);
    }
  };

  return (
    <div className="combo-box">
      <div className="options">Options</div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => setIsDropDownVisible(true)}
        onBlur={() => setTimeout(() => setIsDropDownVisible(false), 150)}
        onKeyDown={handleKeyDown}
        aria-expanded={isDropDownVisible}
        aria-controls="dropdown"
        placeholder="Option"
      />
      {isDropDownVisible && (
        <ul id="dropdown" className="dropdown">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option: ComboBoxProps, index: number) => (
              <li
                key={option.value}
                className={`dropdown-item ${
                  hilightedIndex === index ? "hilighted" : ""
                }`}
                onMouseDown={() => handleClickOptions(option)}
                aria-selected={hilightedIndex === index}
              >
                {option.name}
              </li>
            ))
          ) : (
            <li className="dropdown-item no-option">No options available</li>
          )}
        </ul>
      )}
    </div>
  );
};
