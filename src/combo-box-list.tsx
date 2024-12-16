import { DropdownDataList } from './data';

interface ComboBoxListProps {
  labelPlaceholder: string;
  filteredOptions: DropdownDataList;
  highlightedIndex: number;
  handleOptionClick: (value: string) => void;
}

export default function ComboBoxList({
  labelPlaceholder,
  filteredOptions,
  highlightedIndex,
  handleOptionClick
}: ComboBoxListProps) {
  return (
    <>
      <ul id={`${labelPlaceholder}-listbox`} role="listbox" className="combo-box-listbox">
        {filteredOptions.length > 0 ? (
          filteredOptions.map((option, index) => (
            <li
              key={option.label}
              role="option"
              aria-selected={highlightedIndex === index}
              onClick={() => handleOptionClick(option.label)}
              className={`combo-box-option ${highlightedIndex === index ? 'highlighted' : ''}`}>
              {option.label}
            </li>
          ))
        ) : (
          <p>No result</p>
        )}
      </ul>
    </>
  );
}
