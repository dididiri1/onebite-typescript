import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./page/Home";
import Detail from "./page/Detail";
import New from "./page/New";
import Edit from "./page/Edit";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import { useEffect } from "react";
import { listDiary } from "./features/diary/diarySlice";
import { Diary } from "./types";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const stored = localStorage.getItem("diary");
    const data: Diary[] = stored ? JSON.parse(stored) : [];
    if (Array.isArray(data)) {
      dispatch(listDiary(data));
    }
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
