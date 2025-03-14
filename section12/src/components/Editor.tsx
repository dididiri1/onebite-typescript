import { useState, useRef, useContext } from "react";
import { TodoDispatchContext } from "../App";
import { useInput } from "../hooks/useInput";
import { useTodoDispatch } from "../hooks/useTodoDispatch";

interface Props {
  //onClickAdd: (text: string) => void;
}

const Editor = () => {
  const [text, setText, onChangeInput] = useInput();
  const contentRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useTodoDispatch();

  const onClickButton = () => {
    if (text === "") {
      alert("텍스트를 입력하세요.");
      contentRef.current?.focus();
      return;
    }

    dispatch.onClickAdd(text);
    setText("");
  };

  return (
    <div>
      <input ref={contentRef} value={text} onChange={onChangeInput} />
      <button onClick={onClickButton}>추가</button>
    </div>
  );
};

export default Editor;
