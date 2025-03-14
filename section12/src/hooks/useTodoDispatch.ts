import { TodoDispatchContext } from "../App";
import { useContext } from "react";

export function useTodoDispatch() {
  const dispatch = useContext(TodoDispatchContext);
  if (!dispatch) throw new Error("TodoDispatchContext에 문제가 있다.!)");
  return dispatch;
}
