import { Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import New from "./page/New";
import Edit from "./page/Edit";
import Detail from "./page/Detail";
import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchDiariesThunk } from "./features/diary/diarySlice";
import { AppDispatch } from "./store";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchDiariesThunk());
  }, [dispatch]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </div>
  );
}

export default App;
