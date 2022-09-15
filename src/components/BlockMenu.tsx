import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AllowedBlocks, IBlockTypes } from "../fixtures/Blocks";
import { changeBlock, hideBlockMenu, state } from "../pages/Home";

const BlockMenu = () => {
  const [currentBlockIdx, setCurrentBlockIdx] = useState<number>(-1);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleKeyDown = useCallback(
    (event: any) => {
      if (event.key === "ArrowDown") {
        setCurrentBlockIdx((currentIdx) =>
          Math.min(AllowedBlocks.length - 1, currentIdx + 1)
        );
      } else if (event.key === "ArrowUp") {
        setCurrentBlockIdx((currentIdx) => Math.max(0, currentIdx - 1));
      } else if (event.key === "Enter") {
        event.preventDefault();
        handleChange();
      } else if (event.key === "Escape") {
        event.preventDefault();
        hideBlockMenu();
      }
    },
    [currentBlockIdx]
  );

  function handleClick(id: IBlockTypes) {
    hideBlockMenu();
    changeBlock(id);
  }

  function handleChange() {
    hideBlockMenu();
    changeBlock(AllowedBlocks[currentBlockIdx]!.id);
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const renderBlocks = useMemo(() => {
    return AllowedBlocks.map((block, idx) => (
      <li
        key={`${block.id}-${idx}`}
        onMouseOver={() => {
          setIsHovered(true);
          setCurrentBlockIdx(idx);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
      >
        <ListItem
          isHovered={isHovered}
          isActive={currentBlockIdx === idx}
          onClick={() => handleClick(block.id)}
        >
          <p className="text-md">{block.title}</p>
          <span className="text-xs text-gray-500">{block.description}</span>
        </ListItem>
      </li>
    ));
  }, [currentBlockIdx]);

  return (
    <div
      className="absolute"
      style={{
        top: state.menuPosition + 10,
        left: 50,
      }}
    >
      <div className="bg-white w-60 px-1 rounded-md shadow-md">
        <ul
          id="blockMenu"
          className="flex flex-col gap-1 py-1 h-44 overflow-y-auto"
        >
          {renderBlocks}
        </ul>
      </div>
    </div>
  );
};

interface Props {
  children: React.ReactNode;
  isHovered: boolean;
  isActive: boolean;
  onClick: () => void;
}

const ListItem: React.FC<Props> = memo(({ children, isActive, isHovered, onClick }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && !isHovered) {
      const node = ref?.current as HTMLDivElement;
      node.scrollIntoView({
        block: 'center',
        inline: 'nearest'
      });
    }
  }, [isActive]);

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={`${
        isActive ? "bg-slate-200" : ""
      } rounded-sm hover:bg-slate-200 cursor-pointer select-none`}
    >
      <div className="px-3 py-2">{children}</div>
    </div>
  );
});

export default BlockMenu;
