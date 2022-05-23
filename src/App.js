import "./App.css";
import AllImages from "./components/AllImages/AllImages";
import Download from "./components/utilityButtons/Dloadupload";
import List from "./components/List/List";

function App() {
  return (
    <div className="App">
      <List />
      <AllImages />
      <Download />
    </div>
  );
}

export default App;
