import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  startTransition,
} from "react";
import { cleanStrings } from "../utils/indx";
import "./styles.scss";

type RawCountries = {
  name: {
    common: string;
  };
  cca2: string;
};

export const ComboBox = () => {
  const [countries, setCountries] = useState<RawCountries[]>([]);
  const [search, setSearch] = useState("");
  const [openList, setOpenList] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  const getCountries = useCallback(async () => {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const rawCountriesList = await response.json();
    if (rawCountriesList.length > 0) {
      setCountries(rawCountriesList);
    }
  }, []);

  const filteredCountriesList = useMemo(() => {
    const cleanedSearch = cleanStrings(search);
    return countries?.filter((country) => {
      const cleanedCountryName = cleanStrings(country?.name?.common);
      return cleanedCountryName.includes(cleanedSearch);
    });
  }, [search, countries]);

  const handleSearch = (value: string) => {
    if (!openList) {
      setOpenList(true);
    }
    startTransition(() => {
      setSearch(value);
    });
  };

  const handleSelection = (newCountrySelected: string) => {
    setSearch(newCountrySelected);
    setOpenList(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        setHighlightedIndex((prevIndex) => {
          if (prevIndex === null) return 0;
          return Math.min(filteredCountriesList.length - 1, prevIndex + 1);
        });
        break;
      case "ArrowUp":
        setHighlightedIndex((prevIndex) => {
          if (prevIndex === null) return 0;
          return Math.max(0, prevIndex - 1);
        });
        break;
      case "Enter":
        if (highlightedIndex !== null) {
          handleSelection(
            filteredCountriesList[highlightedIndex]?.name?.common
          );
          setOpenList(false);
        }
        break;
      case "Escape":
        setOpenList(false);
        break;
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (e.target instanceof HTMLElement) {
      if (!e.target.closest(".input-autocomplete-container")) {
        setOpenList(false);
      }
    }
  };

  useEffect(() => {
    getCountries();
  }, [getCountries]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="input-label-container">
      <span className="label">Countries</span>
      <div className="input-autocomplete-container">
        <input
          className="input-autocomplete-search"
          type="text"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setOpenList(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search for any country"
          aria-expanded={openList ? "true" : "false"}
          aria-autocomplete="list"
          aria-controls="autocomplete-list"
        />
        {openList && (
          <div className="input-autocomplete-container-list">
            <ul id="autocomplete-list" aria-labelledby="countries-search">
              {filteredCountriesList.length > 0 ? (
                filteredCountriesList.map((country, index) => (
                  <li
                    key={country.cca2}
                    className={`input-autocomplete-list-item ${
                      highlightedIndex === index ? "highlighted" : ""
                    }`}
                    onClick={() => handleSelection(country.name.common)}
                    role="option"
                    aria-selected={
                      highlightedIndex === index ? "true" : "false"
                    }
                    aria-posinset={index + 1}
                    aria-setsize={filteredCountriesList.length}
                  >
                    <span>{country.name.common}</span>
                  </li>
                ))
              ) : (
                <li>No results</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
