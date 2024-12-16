import { useState, useEffect, KeyboardEvent, ChangeEvent } from "react";
import "./index.css";

type Option = {
  label: string;
  value: string;
};

interface ComboBoxProps {
  id?: string;
  options: Option[];
  placeholder?: string;
  onChange?: (option: Option | null) => void;
  value?: Option | null;
  defaultValue?: Option | null;
  className?: string;
  onSearch: (searchText: string) => void;
}

export const ComboBox = ({
  id = "combo-box",
  options,
  placeholder = "Select an option",
  onChange,
  value: controlledValue,
  defaultValue,
  className = "",
  onSearch,
}: ComboBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(defaultValue?.label || "");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);

  // Handle controlled value updates
  useEffect(() => {
    if (controlledValue !== undefined) {
      setInputValue(controlledValue?.label || "");
    }
  }, [controlledValue]);

  useEffect(() => {
    const filtered = options.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filtered);
    setHighlightedIndex(-1);
  }, [inputValue, options]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onSearch(newValue);
    setIsOpen(true);

    if (onChange && newValue === "") {
      onChange(null);
    }
  };

  const selectOption = (option: Option) => {
    setInputValue(option.label);
    setIsOpen(false);
    setHighlightedIndex(-1);
    onChange?.(option);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setIsOpen(true);
        setHighlightedIndex((prev: number) =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setIsOpen(true);
        setHighlightedIndex((prev: number) => (prev > 0 ? prev - 1 : prev));
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          selectOption(filteredOptions[highlightedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  return (
    <div
      className={`combo-box ${className}`}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsOpen(false);
        }
      }}
      tabIndex={-1}
    >
      <input
        type="text"
        role="combobox"
        aria-controls={`${id}-listbox`}
        aria-expanded={isOpen}
        aria-activedescendant={
          highlightedIndex >= 0 ? `${id}-option-${highlightedIndex}` : undefined
        }
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
      />
      {isOpen && (
        <ul id={`${id}-listbox`} role="listbox" className="combo-box-options">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={option.value}
                id={`${id}-option-${index}`}
                role="option"
                aria-selected={highlightedIndex === index}
                className={`combo-box-option ${
                  highlightedIndex === index ? "highlighted" : ""
                } ${
                  controlledValue?.label?.toLowerCase() ===
                  option.label.toLowerCase()
                    ? "selected"
                    : ""
                }`}
                onClick={() => selectOption(option)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                {option.label}
              </li>
            ))
          ) : (
            <li className="combo-box-no-results">No results</li>
          )}
        </ul>
      )}
    </div>
  );
};
