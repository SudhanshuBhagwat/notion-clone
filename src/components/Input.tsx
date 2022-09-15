import {
  Fragment,
  KeyboardEvent,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { getBlockTagById, IBlockTypes } from "../fixtures/Blocks";
import {
  addBlock,
  hideBlockMenu,
  IBlock,
  removeBlock,
  showBlockMenu,
  state,
} from "../pages/Home";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Menu, Transition } from "@headlessui/react";
import { ContextMenuOptions } from "../fixtures/ContextMenu";
import useMesaure from "react-use-measure";

interface Props {
  block: IBlock;
  index: number;
}

const Input: React.FC<Props> = ({ block, index }) => {
  const inputRef = useRef<any>(null);
  const [value, setValue] = useState<string>("");
  const [isHovererd, setIsHovered] = useState<boolean>(false);
  const [ref, bounds] = useMesaure();
  state.menuPosition = bounds.bottom;

  useEffect(() => {
    document.getElementById(block.id)?.focus();
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addBlock(index + 1);
    } else if (event.key === "Backspace" && inputRef.current?.lastHtml === "") {
      event.preventDefault();
      removeBlock(block.id);
    } else if (event.key === "ArrowDown") {
      //TODO implement ArrowDown
    } else if (event.key === "/") {
      showBlockMenu();
    } else {
      if (event.key === "Backspace") {
        if (value.charAt(value.length - 1) !== "/") {
          hideBlockMenu();
        }
      }
    }
  }, []);

  const handleInput = useCallback((event: ContentEditableEvent) => {
    setValue(event.target.value);
  }, []);

  function getClasses(blockType: IBlockTypes): string {
    switch (blockType) {
      case "heading-1":
        return "text-3xl font-bold";
      case "heading-2":
        return "text-xl font-semibold";
      case "heading-3":
        return "text-lg font-semibold";
      case "text":
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

  function handleFocus() {
    state.currentBlockIdx = index;
  }

  return (
    <div
      ref={ref}
      className="flex"
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      {isHovererd && (
        <Menu as="div" className="relative">
          <Menu.Button className="absolute">
            <EllipsisVerticalIcon className="h-6 w-6 text-gray-400 cursor-pointer hover:bg-gray-100 rounded-sm transition-colors" />
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
            <Menu.Items
              className={
                "absolute top-8 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              }
            >
              <div className="p-1">
                {ContextMenuOptions.map((option, idx) => {
                  return (
                    <Menu.Item key={`${option.id}-${idx}`}>
                      {({ active }) => (
                        <button
                          onClick={() => option.onClick(block.id)}
                          className={`${
                            active
                              ? "bg-violet-500 text-white"
                              : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          {option.name}
                        </button>
                      )}
                    </Menu.Item>
                  );
                })}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      )}
      <ContentEditable
        id={block.id}
        ref={inputRef}
        tagName={getBlockTagById(block.type)}
        html={value}
        onFocus={handleFocus}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        className={`block w-full ml-7 focus:outline-none ${getClasses(
          block.type
        )}`}
        placeholder="Type '/' for commands"
      />
    </div>
  );
};

export default memo(Input);
