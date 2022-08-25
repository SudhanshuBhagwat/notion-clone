import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { addBlock, removeBlock } from "../pages/Home";
import { BlockType } from "./Block";

interface Props {
  type: BlockType;
  showIsMenuVisible: (value: boolean) => void;
}

const Input: React.FC<Props> = ({ type, showIsMenuVisible }) => {
  const inputRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleEnterPress(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      showIsMenuVisible(false);
      addBlock();
    } else if (event.key === "Backspace" && inputRef.current?.textContent === "") {
      event.preventDefault();
      showIsMenuVisible(false);
      removeBlock();
    } else if (event.key === "/") {
      showIsMenuVisible(true);
    } else {
      if (event.key === "Backspace") {
        if (value.charAt(value.length - 1) === "/") {
          showIsMenuVisible(false);
        }
      }  
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

  return <div ref={inputRef} onKeyDown={handleEnterPress} onInput={event => setValue(event.target.innerText)} className={`focus:outline-none ${getClasses(type)}`} contentEditable placeholder="Type '/' for commands"></div>
}

export default Input;
