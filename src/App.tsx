import "./App.scss";
import { ComboBoxContainer } from "./containers/combo-box";
import { MultiComboBoxContainer } from "./containers/multi-combo-box";
const App = () => {
  return (
    <div className="center gap-1">
      <ComboBoxContainer />
      <MultiComboBoxContainer />
    </div>
  );
};

export default App;
