import { Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import New from "./page/New";
import Edit from "./page/Edit";
import Detail from "./page/Detail";
import "./App.css";
import React, { useReducer, useRef } from "react";
import { Diary } from "./types";

const mockData: Diary[] = [
  {
    id: 1,
    emotionId: 1,
    content: "일기내용입니다. 1",
    createdDate: new Date("2025-05-02").getTime(),
  },
  {
    id: 2,
    emotionId: 3,
    content: "일기내용입니다. 2",
    createdDate: new Date("2025-05-01").getTime(),
  },
];

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
  const [data, dispatch] = useReducer(reducer, mockData);

  const idRef = useRef(2);

  // 일기 등록 기능
  const onCreate = (
    createdDate: number,
    emotionId: number,
    content: string
  ) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  // 일기 수정 기능
  const onUpdate = (
    id: number,
    createdDate: number,
    emotionId: number,
    content: string
  ) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  // 일기 삭제 기능
  const onDelete = (id: number) => {
    dispatch({ type: "DELETE", id });
  };

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
