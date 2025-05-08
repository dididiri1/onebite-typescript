import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./page/Home";
import Detail from "./page/Detail";
import New from "./page/New";

import Edit from "./page/Edit";
import { useDispatch } from "react-redux";
import { AppDisaptch } from "./store";
import { useEffect } from "react";
import { fetchDiariesThunk } from "./features/diarySlice";

function App() {
  const dispatch = useDispatch<AppDisaptch>();

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
