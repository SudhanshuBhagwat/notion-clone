import { KeyboardEvent, useEffect, useRef } from "react";
import { addBlock, removeBlock } from "../pages/Home";
import { BlockType } from "./Block";

interface Props {
  type: BlockType;
}

const Input: React.FC<Props> = ({ type }) => {
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleEnterPress(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      addBlock();
    } else if (event.key === "Backspace" && inputRef.current?.textContent === "") {
      event.preventDefault();
      removeBlock();
    }
  }

  function getClasses(blockType: BlockType): string {
    switch(blockType) {
      case 'H1':
        return "text-3xl font-bold";
      case 'Text':
        return "text-normal font-normal";
      default:
        return "";
    }
  }

  return <div ref={inputRef} onKeyDown={handleEnterPress} className={`focus:outline-none ${getClasses(type)}`} contentEditable placeholder="Type '/' for commands"></div>
}

export default Input;
