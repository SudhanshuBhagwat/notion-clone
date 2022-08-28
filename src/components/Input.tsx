import { KeyboardEvent, memo, useEffect, useRef, useState } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { getBlockTagById, IBlockTypes } from "../fixtures/Blocks";
import { addBlock, IBlock, removeBlock } from "../pages/Home";

interface Props {
  block: IBlock;
  index: number;
  showIsMenuVisible: (value: boolean) => void;
}

const Input: React.FC<Props> = ({ block, index, showIsMenuVisible }) => {
  const inputRef = useRef<any>(null);
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    document.getElementById(block.id)?.focus();
  }, []);

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      showIsMenuVisible(false);
      addBlock(index + 1);
    } else if (event.key === "Backspace" && inputRef.current?.lastHtml === "") {
      event.preventDefault();
      showIsMenuVisible(false);
      removeBlock(block.id);
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

  function handleInput(event: ContentEditableEvent) {
    setValue(event.target.value);
  }

  function getClasses(blockType: IBlockTypes): string {
    switch(blockType) {
      case 'heading-1':
        return "text-3xl font-bold";
      case 'heading-2':
        return "text-xl font-semibold";
      case 'heading-3':
        return "text-lg font-semibold";
      case 'text':
        return "text-normal font-normal";
      default:
        return "";
    }
  }
  
  return <ContentEditable id={block.id} ref={inputRef} tagName={getBlockTagById(block.type)} html={value} onChange={handleInput} onKeyDown={handleKeyDown} className={`focus:outline-none ${getClasses(block.type)}`} placeholder="Type '/' for commands"/>

  // return <div ref={inputRef} onKeyDown={handleEnterPress} onInput={handleInput} className={`focus:outline-none ${getClasses(block.type)}`} contentEditable placeholder="Type '/' for commands"></div>
}

export default memo(Input);
