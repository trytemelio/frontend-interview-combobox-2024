import "./App.scss";
import { ComboBox } from "./combo-box";
import { dropdownData } from "./data";

const App = () => {
  return (
    <div className="center">
      <div className="card">
        <ComboBox dropdownData={dropdownData} />
      </div>
    </div>
  );
};

export default App;
