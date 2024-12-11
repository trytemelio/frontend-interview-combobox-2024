import { useCallback, useEffect, useRef, useState } from "react";
import ChevronDown from "./icons/chevron-down";
import { DropdownDataList } from "./data";
import "./combo-box.scss";

interface ComboBoxProps {
  dropdownData: DropdownDataList;
}

export const ComboBox = ({ dropdownData }: ComboBoxProps) => {
  const [searchText, setSearchText] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [filteredData, setFilteredData] = useState(dropdownData);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isReset, setIsReset] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleFocus = () => {
      setActiveIndex(0);
      setIsExpanded(true);
    };
    const handleBlur = () => {
      setIsExpanded(false);
    };

    const inputElem = inputRef.current;
    if (inputElem) {
      inputElem.addEventListener("focus", handleFocus);
      inputElem.addEventListener("blur", handleBlur);
    }

    return () => {
      if (inputElem) {
        inputElem.removeEventListener("focus", handleFocus);
        inputElem.removeEventListener("blur", handleBlur);
      }
    };
  }, []);

  useEffect(() => {
    if (isReset) {
      setFilteredData([...dropdownData]);
    } else {
      const data = dropdownData.filter((val) =>
        val.label.toLowerCase().includes(searchText.toLowerCase().trim())
      );
      setFilteredData(data);
    }
    setActiveIndex(0);
  }, [searchText, isReset, dropdownData]);

  const handleTextInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputElem = event.currentTarget;
      setIsReset(false);
      setSearchText(inputElem.value);
    },
    [],
  );

  const handleSelectItemBase = useCallback((selectedValue: string | null) => {
    setSelectedItem(selectedValue);
    setIsReset(true);

    if (!selectedValue) {
      setSearchText("");
    } else {
      const selectedData = dropdownData.find((v) => v.value === selectedValue);
      if (selectedData) {
        setSearchText(selectedData.label);
      }
    }
  }, [dropdownData]);

  const handleSelectItem = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const button = event.currentTarget;
      handleSelectItemBase(button.value);
    },
    [handleSelectItemBase],
  );

  useEffect(() => {
    function handleKeyboardEvent(event: globalThis.KeyboardEvent) {
      const dataSize = filteredData.length;
      if (event.key === "ArrowDown") {
        if (isExpanded && dataSize > 0) {
          setActiveIndex((val) => (val + 1) % dataSize);
        } else if (
          inputRef.current && inputRef.current !== document.activeElement
        ) {
          inputRef.current.focus();
        }
      } else if (event.key === "ArrowUp") {
        if (isExpanded && dataSize > 0) {
          setActiveIndex((val) => (val - 1 + dataSize) % dataSize);
        } else if (
          inputRef.current && inputRef.current !== document.activeElement
        ) {
          inputRef.current.focus();
          setActiveIndex((val) => (val - 1 + dataSize) % dataSize);
        }
      } else if (event.key === "Escape") {
        if (
          isExpanded && inputRef.current &&
          inputRef.current === document.activeElement
        ) {
          inputRef.current.parentElement?.focus();
        } else if (
          inputRef.current &&
          inputRef.current.parentElement === document.activeElement
        ) {
          handleSelectItemBase(null);
        }
      } else if (event.key === "Enter") {
        if (isExpanded && dataSize > 0) {
          const selectedValue = filteredData[activeIndex].value;
          if (selectedValue) {
            handleSelectItemBase(selectedValue);
            if (
              inputRef.current && inputRef.current === document.activeElement
            ) {
              inputRef.current.parentElement?.focus();
            }
          }
        }
      }
    }

    window.addEventListener("keydown", handleKeyboardEvent);

    return () => {
      window.removeEventListener("keydown", handleKeyboardEvent);
    };
  }, [isExpanded, activeIndex, filteredData, handleSelectItemBase]);

  return (
    <div className="container">
      <div>Options</div>
      <div
        className="combobox"
        role="combobox"
        aria-expanded={isExpanded}
        aria-controls="dropdown-menu"
      >
        <div className="combobox-input-container" tabIndex={0}>
          <input
            ref={inputRef}
            tabIndex={-1}
            className="combobox-input"
            aria-autocomplete="list"
            type="text"
            value={searchText}
            onChange={handleTextInput}
            placeholder="Options"
          />
          <button
            tabIndex={-1}
            className="combobox-input-chevron"
            onClick={() => {
              inputRef.current?.focus();
            }}
          >
            <ChevronDown />
          </button>
        </div>

        {isExpanded && (
          <div id="dropdown-menu" className="combobox-dropdown">
            {filteredData.length
              ? filteredData.map((item, i) => {
                const isActive = i === activeIndex ? "active" : "";
                const isSelected = item.value === selectedItem
                  ? "selected"
                  : "";
                return (
                  <button
                    key={item.value}
                    className={`combobox-item ${isActive} ${isSelected}`}
                    value={item.value}
                    onMouseDown={handleSelectItem}
                  >
                    {item.label}
                  </button>
                );
              })
              : <div className="combobox-item-empty">No results</div>}
          </div>
        )}
      </div>
    </div>
  );
};
