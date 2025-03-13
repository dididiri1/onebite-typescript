import { useState } from "react";

export function useInput(): [
  string,
  (e: React.ChangeEvent<HTMLInputElement>) => void
] {
  const [input, setInput] = useState("");

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return [input, onChangeInput];
}
