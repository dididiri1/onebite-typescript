import { Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import New from "./page/New";
import Edit from "./page/Edit";
import Detail from "./page/Detail";
import "./App.css";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { Diary } from "./types";
import {
  createDiary,
  deleteDiary,
  fetchDiaries,
  updateDiary,
} from "./api/diaryApi";

type Action =
  | {
      type: "INIT";
      data: Diary[];
    }
  | {
      type: "CREATE";
      data: Diary;
    }
  | {
      type: "UPDATE";
      data: Diary;
    }
  | {
      type: "DELETE";
      id: number;
    };

function reducer(state: Diary[], action: Action) {
  let nextState;
  switch (action.type) {
    case "INIT":
      nextState = action.data;
      break;
    case "CREATE":
      nextState = [...state, action.data];
      break;
    case "UPDATE":
      nextState = state.map((item) =>
        item.id === action.data.id ? action.data : item
      );
      break;
    case "DELETE":
      nextState = state.filter((item) => item.id !== action.id);
      break;
    default:
      return state;
  }

  return nextState;
}

export const DiaryStateContext = React.createContext<Diary[] | null>(null);
export const DiaryDispatchContext = React.createContext<{
  onCreate: (createdDate: number, emotionId: number, content: string) => void;
  onUpdate: (
    id: number,
    createdDate: number,
    emotionId: number,
    content: string
  ) => void;
  onDelete: (id: number) => void;
} | null>(null);

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const [isLoading, setIsLoading] = useState(true);

  const idRef = useRef(2);

  useEffect(() => {
    fetchDiaries()
      .then((res) => {
        const responseData = res.data.data;
        dispatch({
          type: "INIT",
          data: responseData,
        });
      })
      .catch((err) => {
        console.log("일기 목록 불러오기 실패:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // 일기 등록 기능
  const onCreate = (
    createdDate: number,
    emotionId: number,
    content: string
  ) => {
    createDiary({ createdDate, emotionId, content })
      .then((res) => {
        dispatch({
          type: "CREATE",
          data: res.data.data,
        });
      })
      .catch((err) => {
        console.log("일기 등록 실패:", err);
      });
  };

  // 일기 수정 기능
  const onUpdate = (
    id: number,
    createdDate: number,
    emotionId: number,
    content: string
  ) => {
    updateDiary(id, { createdDate, emotionId, content })
      .then((res) => {
        dispatch({ type: "UPDATE", data: res.data.data });
      })
      .catch((err) => {
        console.log("일기 수정 실패:", err);
      });
  };

  // 일기 삭제 기능
  const onDelete = (id: number) => {
    deleteDiary(id).then((res) => {
      dispatch({ type: "DELETE", id });
    });
  };

  if (isLoading) {
    return <div>데이터 로딩중입니다...</div>;
  }

  return (
    <div className="App">
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/edit/:id" element={<Edit />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </div>
  );
}

export default App;
