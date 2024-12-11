// Finish the code here.
// Feel free to modify any of the code in this project, this is just a starting point if it's helpful.

import { useState, useEffect, useRef } from "react";
import styles from "./combo-box.module.css";
interface ComboBoxProps {
  autoCompleteList: any[];
  itemOnClick: (value: string) => void;
  label?: string;
  placeholder?: string;
  renderOption?: any;
  value?: string;
  handleInputChange?: any;
}

export const ComboBox = ({
  autoCompleteList,
  itemOnClick,
  label,
  placeholder,
  renderOption,
  value,
  handleInputChange,
}: ComboBoxProps) => {
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case "ArrowDown":
        setHighlightedIndex((prevIndex) =>
          Math.min(autoCompleteList.length - 1, prevIndex + 1)
        );
        setIsMenuOpen(true);
        break;
      case "ArrowUp":
        setHighlightedIndex((prevIndex) => Math.max(0, prevIndex - 1));
        setIsMenuOpen(true);
        break;
      case "Enter":
        if (highlightedIndex >= 0) {
          itemOnClick(autoCompleteList[highlightedIndex]);
          setIsMenuOpen(false);
          inputRef.current?.blur();
        }
        break;
      case "Escape":
        setIsMenuOpen(false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (highlightedIndex >= 0 && dropdownRef.current) {
      const highlightedOption = dropdownRef.current.children[
        highlightedIndex
      ] as HTMLElement;
      if (highlightedOption) {
        highlightedOption.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [highlightedIndex]);

  return (
    <div className={styles.outercombobox}>
      {label && <label className="text-red-500"> {label}</label>}
      <div className={styles.combobox}>
        <div className={styles.input}>
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              setIsMenuOpen(true);
            }}
            placeholder={placeholder || "Search"}
            autoComplete="off"
            aria-autocomplete="list"
            aria-controls="dropdown"
            aria-expanded={isMenuOpen}
          />
          <button
            aria-label="Toggle"
            type="button"
            className={styles.toggleIcon}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? "▲" : "▼"}
          </button>
        </div>

        {isMenuOpen && (
          <div ref={dropdownRef} className={styles.dropdown}>
            {autoCompleteList.length > 0 ? (
              autoCompleteList.map((option, index) => (
                <div
                  key={option}
                  className={` ${
                    index === highlightedIndex && styles.highlighted
                  }`}
                  onClick={() => {
                    itemOnClick(option);
                    setIsMenuOpen(false);
                  }}
                  style={{
                    padding: "2px 10px",
                    cursor: "pointer",
                    borderRadius: "4px",
                    backgroundColor:
                      index === highlightedIndex ? "#b3d4fc" : "transparent",
                  }}
                >
                  {renderOption ? renderOption(option) : `${option}`}
                </div>
              ))
            ) : (
              <div className={styles.option}>No results</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
