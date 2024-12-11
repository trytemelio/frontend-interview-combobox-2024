import { useEffect, useState, ChangeEvent, KeyboardEvent, FocusEventHandler, MouseEventHandler } from 'react';
import './index.css';
import { dropdownData } from './data';

export const ComboBox = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [searchText, setSearchText] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState(-1);
  const [showOptions, setShowOptions] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener('click', handleBlur);
    return () => window.removeEventListener('click', handleBlur);
  }, []);

  const filteredOptions = dropdownData.filter((opt) => opt.label.toLowerCase().includes(searchText?.toLowerCase() || ''));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Escape') {
      handleBlur();
      (e.target as HTMLAnchorElement).blur();
    }
    if(e.key === 'ArrowUp') {
      if(hoverId !== 0) {
        setHoverId(hoverId - 1);
      }
    } 
    if(e.key === 'ArrowDown') {
      if(hoverId !== filteredOptions.length - 1) {
        setHoverId(hoverId + 1);
      }
    }
    if(e.key === 'Enter') {
      setSelectedOption(filteredOptions[hoverId].label);
      setShowOptions(false);
      (e.target as HTMLAnchorElement).blur();
    }
  }

  const handleFocus = (e: FocusEventHandler<HTMLInputElement>) => {
    (e as unknown as MouseEvent).preventDefault();
    (e as unknown as MouseEvent).stopPropagation();
    setShowOptions(true);
  }

  const handleBlur =  () => { 
    setSearchText(null);
    setShowOptions(false);
    setHoverId(-1)
  }

  

  const handleOptClick = (e: MouseEventHandler<HTMLInputElement>) => {
    (e as unknown as MouseEvent).preventDefault();
    (e as unknown as MouseEvent).stopPropagation();
    setSelectedOption(e.target.dataset.value || '');
    setShowOptions(false);
  }

  return (
    <div>
      <div style={{ fontWeight: 'bold', marginBottom: 2 }}>Options</div>
      <input className='combo' placeholder='Options' onChange={handleChange} onKeyDown={handleKeyDown} onFocus={handleFocus} onClick={(e) => e.stopPropagation()} value={searchText ?? selectedOption} />
      <div className='arrowContainer'>
        <div className="arrow">&#x2304;</div>
      </div>
      {showOptions && <div className='optionList'>
        {filteredOptions.length ? filteredOptions.map((opt, id) => <div key={opt.label} data-value={opt.label} className={opt.label === selectedOption ? 'activeOption' : (hoverId === id && 'hoverOption' || '')} onClick={handleOptClick}>{opt.label}</div>)
        : <div style={{ color: 'lightgray', alignSelf: 'center' }}>No options</div>}
      </div>}
    </div>
  );
};
