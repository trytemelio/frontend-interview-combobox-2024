import { useState, useEffect, KeyboardEvent, ChangeEvent } from "react";
import "./index.css";

type Option = {
  label: string;
  value: string;
};

interface MultiComboBoxProps {
  id?: string;
  options: Option[];
  placeholder?: string;
  onChange?: (options: Option[]) => void;
  value?: Option[];
  defaultValue?: Option[];
  className?: string;
}

export const MultiComboBox = ({
  id = "multi-combo-box",
  options,
  placeholder = "Select options",
  onChange,
  value: controlledValue,
  defaultValue = [],
  className = "",
}: MultiComboBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedOptions, setSelectedOptions] =
    useState<Option[]>(defaultValue);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);

  // Handle controlled value updates
  useEffect(() => {
    if (controlledValue !== undefined) {
      setSelectedOptions(controlledValue);
    }
  }, [controlledValue]);

  useEffect(() => {
    const filtered = options.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filtered);
    setHighlightedIndex(-1);
  }, [inputValue, options, selectedOptions]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsOpen(true);
  };

  const selectOption = (option: Option) => {
    const isAlreadySelected = selectedOptions.some(
      (selected) => selected.value === option.value
    );
    if (isAlreadySelected) {
      return;
    }
    const newSelectedOptions = [...selectedOptions, option];
    setSelectedOptions(newSelectedOptions);
    setInputValue("");
    setHighlightedIndex(-1);
    onChange?.(newSelectedOptions);
  };

  const removeOption = (optionToRemove: Option) => {
    const newSelectedOptions = selectedOptions.filter(
      (option) => option.value !== optionToRemove.value
    );
    setSelectedOptions(newSelectedOptions);
    onChange?.(newSelectedOptions);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setIsOpen(true);
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setIsOpen(true);
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
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
      case "Backspace":
        if (inputValue === "" && selectedOptions.length > 0) {
          removeOption(selectedOptions[selectedOptions.length - 1]);
        }
        break;
    }
  };

  return (
    <div
      className={`multi-combo-box ${className}`}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsOpen(false);
        }
      }}
      tabIndex={-1}
    >
      <div className="multi-combo-box-input-container">
        {selectedOptions.map((option) => (
          <span key={option.value} className="multi-combo-box-tag">
            {option.label}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeOption(option);
              }}
              className="multi-combo-box-tag-remove"
            >
              ×
            </button>
          </span>
        ))}
        <input
          type="text"
          role="combobox"
          aria-controls={`${id}-listbox`}
          aria-expanded={isOpen}
          aria-activedescendant={
            highlightedIndex >= 0
              ? `${id}-option-${highlightedIndex}`
              : undefined
          }
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          placeholder={selectedOptions.length === 0 ? placeholder : ""}
        />
      </div>
      {isOpen && (
        <ul
          id={`${id}-listbox`}
          role="listbox"
          className="multi-combo-box-options"
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={option.value}
                id={`${id}-option-${index}`}
                role="option"
                aria-selected={highlightedIndex === index}
                className={`multi-combo-box-option ${
                  highlightedIndex === index ? "highlighted" : ""
                } ${
                  selectedOptions.some(
                    (selected) => selected.value === option.value
                  )
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
            <li className="multi-combo-box-no-results">No results</li>
          )}
        </ul>
      )}
    </div>
  );
};
