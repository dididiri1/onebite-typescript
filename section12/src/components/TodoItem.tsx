import { useContext } from "react";
import { Todo } from "../types";
import { TodoDispatchContext } from "../App";
import { useTodoDispatch } from "../hooks/useTodoDispatch";

interface Props extends Todo {
  //onClickDelete: (id: number) => void;
}

const TodoItem = (props: Props) => {
  const dispatch = useTodoDispatch();

  const onClickButton = () => {
    dispatch.onClickDelete(props.id);
  };

  return (
    <div>
      {props.id}번 {props.content}
      <button onClick={onClickButton}>삭제</button>
    </div>
  );
};

export default TodoItem;
