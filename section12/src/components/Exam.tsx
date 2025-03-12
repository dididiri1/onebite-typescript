import { useReducer } from "react";

type Action =
  | {
      type: "INCREASE";
      data: number;
    }
  | {
      type: "DECREASE";
      data: number;
    };

function reducer(state: number, action: Action) {
  switch (action.type) {
    case "INCREASE":
      return state + action.data;
    case "DECREASE":
      return state + action.data;
    default:
      return state;
  }
}

export default function Exam() {
  const [state, dispatch] = useReducer(reducer, 0);

  const onClickPlus = () => {
    dispatch({
      type: "INCREASE",
      data: 1,
    });
  };

  const onClickMinus = () => {
    dispatch({
      type: "DECREASE",
      data: -1,
    });
  };

  return (
    <div>
      <p>{state}</p>
      <button onClick={onClickPlus}>+</button>
      <button onClick={onClickMinus}>-</button>
    </div>
  );
}
