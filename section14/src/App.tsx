import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./page/Home";
import Detail from "./page/Detail";
import New from "./page/New";
import Edit from "./page/Edit";
import React, { useState, useContext, useEffect, useReducer } from "react";
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

export function useDiaryDispatch() {
  const dispatch = useContext(DiaryDispatchContext);
  if (!dispatch) throw new Error("DiaryDispatchContext에 문제가 있다.");
  return dispatch;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const [data, dispatch] = useReducer(reducer, []);

  //const idRef = useRef(0);

  useEffect(() => {
    fetchDiaries()
      .then((res) => {
        const responseData = res.data.data;
        console.log("res: " + JSON.stringify(responseData));
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

  // 새로운 일기 추가
  const onCreate = (
    createdDate: number,
    emotionId: number,
    content: string
  ) => {
    createDiary({ createdDate, emotionId, content })
      .then((res) => {
        dispatch({ type: "CREATE", data: res.data.data });
      })
      .catch((err) => {
        console.error("일기 생성 실패:", err);
      });
  };

  // 기존 일기 수정
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
        console.error("일기 수정 실패:", err);
      });
  };

  // 기존 일기 삭제
  const onDelete = async (id: number) => {
    try {
      await deleteDiary(id);
      dispatch({ type: "DELETE", id });
    } catch (err) {
      console.error("일기 삭제 실패:", err);
    }
  };

  if (isLoading) {
    return <div>데이터 로딩중입니다...</div>;
  }

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
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/edit/:id" element={<Edit />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </div>
  );
}

export default App;
