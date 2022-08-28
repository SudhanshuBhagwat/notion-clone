import { Fragment, KeyboardEvent, memo, useEffect, useRef, useState } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { AllowedBlocks, getBlockTagById, IBlockTypes } from "../fixtures/Blocks";
import { addBlock, IBlock, removeBlock } from "../pages/Home";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Menu, Transition } from "@headlessui/react";

interface Props {
  block: IBlock;
  index: number;
  showIsMenuVisible: (value: boolean) => void;
}

const Input: React.FC<Props> = ({ block, index, showIsMenuVisible }) => {
  const inputRef = useRef<any>(null);
  const [value, setValue] = useState<string>("");
  const [isHovererd, setIsHovered] = useState<boolean>(false);

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

  function handleMouseOver() {
    setIsHovered(true);
  }
  
  function handleMouseLeave() {
    setIsHovered(false);
  }

  return <div className="flex" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
    {isHovererd && 
      <Menu as="div" className="relative">
        <Menu.Button className="absolute">
          <EllipsisVerticalIcon className="h-6 w-6 text-gray-400 cursor-pointer hover:bg-gray-100 rounded-sm transition-colors"/>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className={"absolute top-8 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"}>
            <div className="p-1">
              {AllowedBlocks.map((block, idx) => {
                return <Menu.Item key={`${block.id}-${idx}`}>
                  {({ active }) => (
                    <button className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                      {block.placeholder}
                    </button>
                  )}
                </Menu.Item>
              })}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    }
    <ContentEditable id={block.id} ref={inputRef} tagName={getBlockTagById(block.type)} html={value} onChange={handleInput} onKeyDown={handleKeyDown} className={`w-full ml-7 focus:outline-none ${getClasses(block.type)}`} placeholder="Type '/' for commands"/>
  </div>
}

export default memo(Input);
