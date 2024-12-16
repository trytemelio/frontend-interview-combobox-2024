import { useEffect, useRef, useState } from "react";
import { DropdownData } from "../data";
const [options, setOptions] = useState<DropdownData[]>([]);

export function useOptionsFromApi({ searchText }: { searchText: string }) {
  const timer = useRef<number | null>(null);

  const apiPromise = (text: string) => {
    fetch(`https://rickandmortyapi.com/api/character/?name=${text}`)
      .then((res) => res.json())
      .then((res) =>
        setOptions(
          res?.results?.map((op) => ({
            label: op.name,
            value: op.id,
          })) || []
        )
      )
      .catch((err) => console.log(err));
  };

  // const onSearchInputChange = () => {
  //   timer.current && clearTimeout(timer.current);
  //   timer.current = setTimeout(apiPromise, 500);
  // };

  useEffect(() => {
    timer.current = setTimeout(() => {
      apiPromise(searchText);
    }, 500);
    return () => {
      timer.current && clearTimeout(timer.current);
    };
  }, [searchText]);

  // useEffect(() => {
  //   apiPromise("");
  // }, []);

  return {
    options,
  };
}
