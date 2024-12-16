import React, { useState, useEffect, KeyboardEvent, useDeferredValue } from 'react';

import { DropdownDataList, filterItems } from './data';
import ComboBoxInput from './combo-box-input';
import ComboBoxList from './combo-box-list';
interface ComboBoxProps {
  options: DropdownDataList;
  labelPlaceholder: string;
  onSelect: (value: string) => void;
}

export default function ComboBox({ options, labelPlaceholder, onSelect }: ComboBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const deferredQuery = useDeferredValue(inputValue);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  useEffect(() => {
    const filtered = filterItems(options, deferredQuery);
    setFilteredOptions(filtered);
    setHighlightedIndex(-1);
  }, [deferredQuery, options]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setIsOpen(true);
  };

  const handleOptionClick = (option: string) => {
    setInputValue(option);
    setIsOpen(false);
    onSelect(option);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setIsOpen(true);
        setHighlightedIndex((prev) => (prev < filteredOptions.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        event.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case 'Enter':
        event.preventDefault();
        if (highlightedIndex >= 0) {
          handleOptionClick(filteredOptions[highlightedIndex].label);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  return (
    <div className="combo-box-container">
      <ComboBoxInput
        labelPlaceholder={labelPlaceholder}
        isOpen={isOpen}
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        setIsOpen={setIsOpen}
        handleKeyDown={handleKeyDown}
      />
      {isOpen && (
        <ComboBoxList
          labelPlaceholder={labelPlaceholder}
          filteredOptions={filteredOptions}
          highlightedIndex={highlightedIndex}
          handleOptionClick={handleOptionClick}
        />
      )}
    </div>
  );
}
