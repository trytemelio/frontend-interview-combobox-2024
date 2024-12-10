import { useState } from 'react';
import { comboBoxOptions, ComBoxOptionsEnum } from './App.constants';
import './App.scss';
import ComboBox from './components/ComboBox';
import { ComboBoxOption } from './components/ComboBox/ComboBox';

const App = () => {
  const [selectedOptions, setSelectedOptions] = useState<
    ComboBoxOption<ComBoxOptionsEnum>[]
  >([]);

  return (
    <div className='center'>
      <div className='card'>
        <ComboBox
          label='Combobox Dropdown'
          options={comboBoxOptions}
          setSelectedOptions={setSelectedOptions}
          selectedOptions={selectedOptions}
        />
      </div>
    </div>
  );
};

export default App;
