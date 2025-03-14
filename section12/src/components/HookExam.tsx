import { useState } from "react";

export function useInput(): [
  string,
  React.Dispatch<React.SetStateAction<string>>,
  (e: React.ChangeEvent<HTMLInputElement>) => void
] {
  const [input, setInput] = useState("");

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return [input, setInput, onChangeInput];
}

const HookExam = () => {
  const [input, setInput, onChange] = useInput();

  const onClickButton = () => {
    if (input === "") {
      alert("텍스트를 입력하세요.");

      return;
    }

    setInput("");
  };

  return (
    <div>
      <input value={input} onChange={onChange} />
      <button onClick={onClickButton}>추가</button>
    </div>
  );
};

export default HookExam;
