import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./page/Home";
import Diary from "./page/Diary";
import New from "./page/New";
import Edit from "./page/Edit";
import Button from "./components/Button";
import Header from "./components/Header";
import React, { useEffect, useReducer, useRef, useContext } from "react";

interface DiaryEntry {
  id: number;
  emotionId: number;
  content: string;
  createDate: number;
}

const mockData: DiaryEntry[] = [
  {
    id: 1,
    createDate: new Date("2025-03-01").getTime(),
    emotionId: 1,
    content: "1번 일기 내용",
  },
  {
    id: 2,
    createDate: new Date("2025-03-01").getTime(),
    emotionId: 2,
    content: "2번 일기 내용",
  },
  {
    id: 3,
    createDate: new Date("2025-03-02").getTime(),
    emotionId: 3,
    content: "3번 일기 내용",
  },
];
type Action =
  | {
      type: "CREATE";
      data: {
        id: number;
        emotionId: number;
        content: string;
        createDate: number;
      };
    }
  | {
      type: "UPDATE";
      data: {
        id: number;
        emotionId: number;
        content: string;
        createDate: number;
      };
    }
  | {
      type: "DELETE";
      id: number;
    };

function reducer(state: DiaryEntry[], action: Action) {
  switch (action.type) {
    case "CREATE":
      return [...state, action.data];
    case "UPDATE":
      return state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
    case "DELETE":
      return state.filter((item) => String(item.id) !== String(action.id));
    default:
      return state;
  }
}

export const DiaryStateContext = React.createContext<DiaryEntry[] | null>(null);
export const DiaryDispatchContext = React.createContext<{
  onCreate: (createDate: number, emotionId: number, content: string) => void;
  onUpdate: (
    id: number,
    createDate: number,
    emotionId: number,
    content: string
  ) => void;
  onDelete: (id: number) => void;
} | null>(null);

function App() {
  const [data, dispatch] = useReducer(reducer, mockData);

  const idRef = useRef(3);

  // 새로운 일기 추가
  const onCreate = (createDate: number, emotionId: number, content: string) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createDate,
        emotionId,
        content,
      },
    });
  };

  // 기존 일기 수정
  const onUpdate = (
    id: number,
    createDate: number,
    emotionId: number,
    content: string
  ) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createDate,
        emotionId,
        content,
      },
    });
  };

  // 기존 일기 삭제
  const onDelete = (id: number) => {
    dispatch({
      type: "DELETE",
      id: id,
    });
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="App">
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider
          value={{
            onCreate,
            onUpdate,
            onDelete,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </div>
  );
}

export default App;
