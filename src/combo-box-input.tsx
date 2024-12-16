import { KeyboardEventHandler } from 'react';
import { FaChevronDown } from 'react-icons/fa';

interface ComboBoxInputProps {
  labelPlaceholder: string;
  isOpen: boolean;
  inputValue: string;
  handleInputChange: React.ChangeEventHandler<HTMLInputElement>;
  setIsOpen: (value: boolean) => void;
  handleKeyDown: KeyboardEventHandler;
}

export default function ComboBoxInput({
  labelPlaceholder,
  isOpen,
  inputValue,
  handleInputChange,
  setIsOpen,
  handleKeyDown
}: ComboBoxInputProps) {
  return (
    <>
      <label id={`${labelPlaceholder}-label`} className="combo-box-label">
        {labelPlaceholder}
      </label>
      <div className="combo-box-wrapper">
        <div className="combo-box-input-wrapper">
          <input
            type="text"
            role="combobox"
            aria-expanded={isOpen}
            aria-controls={`${labelPlaceholder}-listbox`}
            aria-labelledby={`${labelPlaceholder}-label`}
            aria-autocomplete="list"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onClick={() => setIsOpen(!isOpen)}
            className="combo-box-input"
          />
          <FaChevronDown onClick={() => setIsOpen(!isOpen)} />
        </div>
      </div>
    </>
  );
}
