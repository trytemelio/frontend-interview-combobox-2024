import { useEffect, useState } from "react";
import "./App.scss";
import { ComboBox } from "./components/combo-box/combo-box";
import { dropdownData } from "./data";
import TagsGroup from "./components/tags/tag-group";

const autoincompletes = [
  "Option 1",
  "Option 2",
  "Option 3",
  "Option 4",
  "Option 5",
  "Option 6",
  "Option 7",
];

const App = () => {
  const [mutltselected, setMutltselected] = useState<any[]>([]);
  const [selectNew, setSelectNew] = useState("");
  const [dropDownData, setDropDownData] = useState(dropdownData);

  const [selectedOption, setSelectedOption] = useState("");
  const [query, setQuery] = useState("");
  const [filteredOptions, setFilteredOptions] =
    useState<string[]>(autoincompletes);

  useEffect(() => {
    const filtered = autoincompletes.filter((option) =>
      option.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [query, autoincompletes]);

  const handleSelect = (selectedValue: string) => {
    setSelectedOption(selectedValue);
  };

  const handleMultiSelect = (selectedValue: string) => {
    if (mutltselected.length > 0) {
      setMutltselected([...mutltselected, selectedValue]);
    } else {
      setMutltselected([selectedValue]);
    }

    setDropDownData((prevData) =>
      prevData.filter((item: any) => item?.value !== selectedValue?.value)
    );
  };

  return (
    <div className="center">
      <div className="card">
        <ComboBox
          value={selectedOption}
          label="Single Select"
          autoCompleteList={filteredOptions}
          itemOnClick={handleSelect}
          placeholder={"Type here..."}
          handleInputChange={(e: any) => {
            setSelectedOption(e.target.value);
            setQuery(e.target.value);
          }}
        />

        <div style={{ display: "flex", gap: "2rem", flexDirection: "column" }}>
          <ComboBox
            value={selectNew}
            label="Multi Select"
            autoCompleteList={dropDownData}
            renderOption={(item: any) => item?.label}
            itemOnClick={handleMultiSelect}
            handleInputChange={(e: any) => {
              setSelectNew(e.target.value);
            }}
          />
          {mutltselected.length > 0 && <TagsGroup list={mutltselected} />}
        </div>
      </div>
    </div>
  );
};

export default App;
