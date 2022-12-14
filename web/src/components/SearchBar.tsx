import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SBStylingProps from "../types/SBStylingProps";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

interface SearchBarProps {
  placeholder: string;
  data: string[][] | undefined;
  positioning: string;
  styles: SBStylingProps;
}

// data[i][0] ==> ticker
// data[i][1] ==> name

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, data, positioning, styles }) => {
  const [curr, setCurr] = useState<string>("");
  const [filteredData, setFilteredData] = useState<string[][] | undefined>(data);
  const [focused, setFocused] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setCurr(event.target.value);
  const onFocus = () => setFocused(true);

  useEffect(() => {
    setFocused(false);
    setCurr("");
  }, [location]);

  // Handles whether the search box is clicked or not
  useEffect(() => {
    if (!focused) {
      setCurr("");
      return;
    }

    if (curr.length !== 0) return;
    setFilteredData(data); // Resets the filtered data to show all options
  }, [focused]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      setFocused(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);


  // Sets new filter when curr is changed
  useEffect(() => {
    const newFilter = data?.filter((value: string[]) => {
      return value[0].toLowerCase().includes(curr.toLowerCase()) || value[1].toLowerCase().includes(curr.toLowerCase());
    });

    if (curr === "") setFilteredData([]);
    else setFilteredData(newFilter);
  }, [curr]);

  // adds an event listener when filteredData is change
  useEffect(() => { // handled this way because of state was not updating
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Enter") return;

      if (filteredData) {
        navigate(`/company/${filteredData[0][0]}`);
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);

    return () => document.removeEventListener("keydown", handleKeyDown, true);
  }, [filteredData]);

  const handleOnPointerDown = (event: React.PointerEvent<HTMLDivElement>) => event.stopPropagation();

  return (
    <div id="search-bar" className={`flex flex-row justify-center my-1 font-modern text-black mr-auto ml-auto ${styles.containerWidth}`} onPointerDown={handleOnPointerDown}>
      <div className={`flex flex-col ${positioning}`}>
        <input
          className={`bg-slate-200 ${styles.width} h-14 ${styles.inputTextSize} rounded-xl border-2 border-black px-3 hover:bg-white hover:border-sky-700 placeholder:${styles.inputPlaceholderTextSize}`}
          onChange={onChange}
          onFocus={onFocus}
          value={curr}
          type="text"
          placeholder={placeholder}
        />
        <div className="relative z-10">
          { ((filteredData && filteredData.length !== 0 && curr.length !== 0) || focused) &&
            <div className="absolute top-0 left-0 right-0 bottom-0">
              <ul className={`relative flex flex-col ml-auto mr-auto bg-white rounded-lg border-2 border-cyan-50 ${styles.width} ${styles.ulHeight} pt-1.5 drop-shadow-xl overflow-hidden overflow-y-auto`}>
                {filteredData && filteredData.map((value: string[], key: number) => (
                  <li className={`${styles.liTextSize} m-2 hover:bg-slate-100`} key={key}><Link to={`/company/${value[0]}`}>{value[1]} - {value[0].toUpperCase()}</Link></li>
                ))}
              </ul>
            </div>
          }
          { filteredData && filteredData.length === 0 && curr.length !== 0 && (
            <div className="absolute top-0 left-0 right-0 bottom-0">
              <ul className={`relative flex flex-col ml-auto mr-auto bg-white rounded-lg border-2 border-cyan-50 ${styles.width} ${styles.ulHeight} pt-1.5 drop-shadow-xl overflow-hidden overflow-y-auto`}>
                <li className={`${styles.liTextSize} m-2 text-gray-500`}><i>Not Found</i></li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div>
        { filteredData && filteredData.length !== 0 ?
          <Link to={`/company/${filteredData[0][0]}`}>
            <div className={`p-2 m-1 mt-2 ${styles.searchIconSize}`}>
              <MagnifyingGlassIcon className="w-6 h-6 text-white"/>
            </div>
          </Link>
            :
          <div className={`p-2 m-1 mt-2 ${styles.searchIconSize} hover:cursor-pointer`}>
            <MagnifyingGlassIcon className="w-6 h-6 text-white"/>
          </div>
        }
      </div>
    </div>
  );
};

export default SearchBar;