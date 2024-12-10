// Finish the code here.
// Feel free to modify any of the code in this project, this is just a starting point if it's helpful.

import React, { useEffect, useRef, useState } from "react";
import { DropdownDataList } from "./data";
import "./combo-box.css"

interface ComboBoxProps {
  list: DropdownDataList,
  onSelect: Function
}

export const ComboBox = (props: ComboBoxProps) => {
  const { list, onSelect } = props
  const [searchKey, setSearchKey] = useState("")
  const [matchingList, setMatchingList] = useState(list)
  const [showMatchingList, setShowMatchingList] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const comboBoxRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMatchingList(list.filter(({ label }) => label.toLowerCase().startsWith(searchKey.toLowerCase().trim())))
    }, 200);

    return () => {
      clearTimeout(timeout)
    }
  }, [searchKey])

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick)
    return () => { }
  }, [])

  function handleDocumentClick({ target }: Event) {
    if (!comboBoxRef.current?.contains(target as Node)) {
      setShowMatchingList(false)
    }
  }

  function handleSearchKeyChange(e: React.FormEvent<HTMLInputElement>) {
    setSearchKey(e.currentTarget.value)
  }

  function handleArrowKeys(e: React.KeyboardEvent<HTMLInputElement>) {
    switch (e.key) {
      case "ArrowDown":
        activeIndex + 1 < matchingList.length && setActiveIndex(activeIndex + 1)
        break;
      case "ArrowUp":
        activeIndex >= 0 && setActiveIndex(activeIndex - 1)
        break;
      case "Enter":
        if (activeIndex >= 0 && activeIndex < matchingList.length) {
          setSearchKey(matchingList[activeIndex].label)
          setShowMatchingList(false)
          inputRef.current?.blur()
          onSelect(matchingList[activeIndex])
        }
        break;
      case "Escape":
        setShowMatchingList(false)
        inputRef.current?.blur()
        break;
    }
  }

  function handleInputFocus() {
    setShowMatchingList(true)
    setActiveIndex(-1)
  }

  function handleListClick({ target }: React.MouseEvent<HTMLDivElement>) {
    const newTarget = target as HTMLElement
    const value = newTarget.dataset.value
    const index = newTarget.dataset.index
    value && setSearchKey(value)
    value && setShowMatchingList(false)

    index && onSelect(matchingList[parseInt(index)])
  }

  return <div className="combo-box" ref={comboBoxRef}>
    <div className={showMatchingList ? "combo-search combo-search-active" : "combo-search"}>
      <input
        className="combo-input"
        ref={inputRef}
        type="text"
        value={searchKey}
        onKeyDown={handleArrowKeys}
        onFocus={handleInputFocus}
        onChange={handleSearchKeyChange}
        tabIndex={0}
        aria-labelledby="tab-3"
      />
    </div>
    {
      showMatchingList && <div className="matching-list" onClick={handleListClick}>
        {!!matchingList.length && matchingList.map(({ label }, index) => <div className={index === activeIndex ? "list-item active" : "list-item"} key={index} data-value={label} data-index={index}>{label}</div>)}
        {!matchingList.length && <div className="no-result">No results</div>}
      </div>
    }
  </div>;
};
