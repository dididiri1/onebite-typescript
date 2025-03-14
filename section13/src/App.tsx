import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./page/Home";
import Diary from "./page/Diary";
import New from "./page/New";
import Edit from "./page/Edit";
import Button from "./components/Button";
import Header from "./components/Header";
import { useEffect, useReducer, useRef } from "react";

interface Diary {
  id: number;
  emotionId: number;
  content: string;
  createDate: number;
}

const mockData: Diary[] = [
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
    };

function reducer(state: Diary[], action: Action) {
  switch (action.type) {
    case "CREATE":
      return [...state, action.data];
    case "UPDATE":
      return state.filter((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
    default:
      return state;
  }
}

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

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="App">
      <Header
        title={"Header"}
        leftChild={<Button text={"left"} />}
        rightChild={<Button text={"right"} />}
      ></Header>

      <button
        onClick={() => {
          onCreate(new Date().getTime(), 1, "Hello");
        }}
      >
        일기 추가
      </button>

      <button
        onClick={() => {
          onUpdate(1, new Date().getTime(), 1, "수정된 일기힙니다.");
        }}
      >
        일기 수정
      </button>

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
