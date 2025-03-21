import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./page/Home";
import Detail from "./page/Detail";
import New from "./page/New";
import Edit from "./page/Edit";
import React, { useContext, useEffect, useReducer, useRef } from "react";
import { Diary } from "./types";

const mockData: Diary[] = [
  {
    id: 1,
    createdDate: new Date("2025-03-01").getTime(),
    emotionId: 1,
    content: "1번 일기 내용",
  },
  {
    id: 2,
    createdDate: new Date("2025-03-03").getTime(),
    emotionId: 2,
    content: "2번 일기 내용",
  },
  {
    id: 3,
    createdDate: new Date("2025-02-02").getTime(),
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
        createdDate: number;
      };
    }
  | {
      type: "UPDATE";
      data: {
        id: number;
        emotionId: number;
        content: string;
        createdDate: number;
      };
    }
  | {
      type: "DELETE";
      id: number;
    };

function reducer(state: Diary[], action: Action) {
  switch (action.type) {
    case "CREATE":
      return [...state, action.data];
    case "UPDATE":
      return state.map((item) =>
        item.id === action.data.id ? action.data : item
      );
    case "DELETE":
      return state.filter((item) => item.id !== action.id);
    default:
      return state;
  }
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

export function useDiaryDispatch() {
  const dispatch = useContext(DiaryDispatchContext);
  if (!dispatch) throw new Error("DiaryDispatchContext에 문제가 있다.");
  return dispatch;
}

function App() {
  const [data, dispatch] = useReducer(reducer, mockData);

  const idRef = useRef(3);

  // 새로운 일기 추가
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

  // 기존 일기 수정
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
            <Route path="/diary/:id" element={<Detail />} />
            <Route path="/edit/:id" element={<Edit />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </div>
  );
}

export default App;
