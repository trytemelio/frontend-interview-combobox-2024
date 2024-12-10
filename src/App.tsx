import "./App.scss";
import { ComboBox } from "./combo-box";
import { dropdownData } from "./data"

const App = () => {
  function onSelect(selectedValue: Object) {
    console.log(selectedValue)
  }
  return (
    <div className="center">
      <div className="card">
        <ComboBox list={dropdownData} onSelect={onSelect} />
      </div>
    </div>
  );
};

export default App;
