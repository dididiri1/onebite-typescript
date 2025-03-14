import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./page/Home";
import Diary from "./page/Diary";
import New from "./page/New";
import Edit from "./page/Edit";
import Button from "./components/Button";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header
        title={"Header"}
        leftChild={<Button text={"left"} />}
        rightChild={<Button text={"right"} />}
      ></Header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/diary/:id" element={<Diary />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>

      <div>
        <img />
      </div>
    </div>
  );
}

export default App;
