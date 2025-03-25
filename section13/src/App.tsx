import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./page/Home";
import Detail from "./page/Detail";
import New from "./page/New";
import Edit from "./page/Edit";
import React, {
  useState,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
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

  localStorage.setItem("diary", JSON.stringify(nextState));

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

  const idRef = useRef(0);

  useEffect(() => {
    const storedData = localStorage.getItem("diary");
    if (!storedData) {
      setIsLoading(false);
      return;
    }

    const parsedData = JSON.parse(storedData);

    if (!Array.isArray(parsedData)) {
      setIsLoading(false);
      return;
    }

    let maxId = 0;
    parsedData.forEach((item) => {
      if (Number(item.id) > maxId) {
        maxId = Number(item.id);
      }
    });

    idRef.current = maxId + 1;

    dispatch({
      type: "INIT",
      data: parsedData,
    });
    setIsLoading(false);
  }, []);

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
