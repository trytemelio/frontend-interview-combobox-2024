import './App.scss';
import { useState } from 'react';
import ComboBox from './combo-box';
import { dropdownData } from './data';

const App = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleSelect = (value: string) => {
    setSelectedOption(value);
  };
  return (
    <>
      <div className="app">
        <ComboBox options={dropdownData} labelPlaceholder="Options" onSelect={handleSelect} />
        {selectedOption && <p> {selectedOption}</p>}
      </div>
    </>
  );
};

export default App;
