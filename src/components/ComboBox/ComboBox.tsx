import React, { useState, useRef, useCallback } from 'react';
import styles from './ComboBox.module.scss';
import { useClickAway } from '../../hooks/useClickAway';

export interface ComboBoxOption<T> {
  label: string;
  value: T;
}

export type ComBoxOptions<T> = ComboBoxOption<T>[];

interface ComboBoxProps<T> {
  options: ComboBoxOption<T>[];
  multiselect?: boolean;
  name?: string;
  label?: string;
  setSelectedOptions: React.Dispatch<React.SetStateAction<ComboBoxOption<T>[]>>;
  selectedOptions: ComboBoxOption<T>[];
}

const ComboBox = <T extends string>({
  options,
  multiselect = false,
  name = 'combobox-input',
  label = 'Options',
  setSelectedOptions,
  selectedOptions,
}: ComboBoxProps<T>) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [filteredOptions, setFilteredOptions] =
    useState<ComboBoxOption<T>[]>(options);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useClickAway({
    handler: () => setIsOpen(false),
    ref: wrapperRef,
  });

  const filterOptions = useCallback(
    (value: string) => {
      const filtered = options.filter((option) =>
        option.label.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
    },
    [options]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);
      setIsOpen(true);
      filterOptions(value);
      setSelectedIndex(-1);
    },
    [filterOptions]
  );

  const handleSelectOption = useCallback(
    (option: ComboBoxOption<T>) => {
      if (multiselect) {
        const alreadySelected = selectedOptions.some(
          (selected) => selected.value === option.value
        );
        if (!alreadySelected) {
          setSelectedOptions((prev) => [...prev, option]);
        }
        setInputValue('');
      } else {
        setSelectedOptions([option]);
        setInputValue(option.label);
      }
      setIsOpen(false);
    },
    [multiselect, selectedOptions, setSelectedOptions]
  );

  const removeSelectedOption = useCallback(
    (option: ComboBoxOption<T>) => {
      setSelectedOptions((prev) =>
        prev.filter((selected) => selected.value !== option.value)
      );
    },
    [setSelectedOptions]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (filteredOptions.length === 0) return;

      const { key } = e;

      const handleArrowDown = () => {
        setSelectedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        );

        if (!isOpen) {
          setIsOpen(true);
        }
      };

      const handleArrowUp = () => {
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        );
      };

      const handleEnter = () => {
        if (selectedIndex >= 0) {
          handleSelectOption(filteredOptions[selectedIndex]);
        }
      };

      const handleEscape = () => {
        setIsOpen(false);
      };

      const handleBackspace = () => {
        if (!inputValue && selectedOptions.length > 0) {
          const lastSelectedOption =
            selectedOptions[selectedOptions.length - 1];
          removeSelectedOption(lastSelectedOption);
        }
      };

      const keyHandlers: { [key: string]: () => void } = {
        ArrowDown: handleArrowDown,
        ArrowUp: handleArrowUp,
        Enter: handleEnter,
        Escape: handleEscape,
        Backspace: handleBackspace,
      };

      if (keyHandlers[key]) {
        e.preventDefault();
        keyHandlers[key]();
      }
    },
    [
      isOpen,
      filteredOptions,
      setSelectedIndex,
      selectedIndex,
      handleSelectOption,
      inputValue,
      selectedOptions,
      removeSelectedOption,
      setIsOpen,
    ]
  );

  return (
    <div className={styles.comboBox} ref={wrapperRef}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>

      <div className={styles.wrapper}>
        {multiselect && (
          <div className={styles.tags}>
            {selectedOptions.map((option) => (
              <div key={option.value} className={styles.tag}>
                {option.label}
                <button
                  type='button'
                  className={styles.tagRemove}
                  onClick={() => removeSelectedOption(option)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          id={name}
          type='text'
          ref={inputRef}
          value={inputValue}
          onKeyDown={handleKeyDown}
          onClick={() => setIsOpen(true)}
          onChange={handleInputChange}
          placeholder={multiselect ? 'Select options' : 'Select an option'}
          className={styles.input}
          aria-expanded={isOpen}
          aria-controls='combobox-listbox'
          aria-activedescendant={
            selectedIndex >= 0 ? `option-${selectedIndex}` : undefined
          }
        />
        <button
          type='button'
          className={styles.toggle}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label='Toggle dropdown'
        >
          {isOpen ? '▲' : '▼'}
        </button>
      </div>

      {isOpen && (
        <ul
          id='combobox-listbox'
          role='listbox'
          className={styles.listbox}
          aria-labelledby={name}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => {
              const isSelected = selectedOptions.some(
                (selected) => selected.value === option.value
              );

              return (
                <li
                  key={option.value}
                  id={`option-${index}`}
                  role='option'
                  aria-selected={selectedIndex === index}
                  className={`${styles.option} ${
                    selectedIndex === index ? styles.highlighted : ''
                  } ${isSelected ? styles.selectedLabel : ''}`}
                  onClick={() => handleSelectOption(option)}
                >
                  {option.label}
                </li>
              );
            })
          ) : (
            <li className={styles.noResults}>No options</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default ComboBox;
