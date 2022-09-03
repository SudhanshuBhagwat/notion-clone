import React, { useEffect, useState } from "react";
import { AllowedBlocks } from "../fixtures/Blocks";
import { changeBlock, hideBlockMenu } from "../pages/Home";

const BlockMenu = () => {
  const [currentBlockIdx, setCurrentBlockIdx] = useState<number>(-1);

  const handleKeyDown = (event: any) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setCurrentBlockIdx((currentIdx) =>
        Math.min(AllowedBlocks.length - 1, currentIdx + 1)
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setCurrentBlockIdx((currentIdx) => Math.max(0, currentIdx - 1));
    } else if (event.key === "Enter") {
      event.preventDefault();
    } else if (event.key === "Escape") {
      event.preventDefault();
      hideBlockMenu();
    }
  };

  function handleClick(id: string, index: number) {
    hideBlockMenu();
    changeBlock(id);
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="bg-white w-60 px-1 rounded-md shadow-md">
      <ul id="blockMenu" className="flex flex-col gap-1 py-1">
        {AllowedBlocks.map((block, idx) => (
          <li
            key={`${block.id}-${idx}`}
            onMouseOver={() => {
              setCurrentBlockIdx(idx);
            }}
          >
            <ListItem
              isActive={currentBlockIdx === idx}
              onClick={() => handleClick(block.id, idx)}
            >
              {block.placeholder}
            </ListItem>
          </li>
        ))}
      </ul>
    </div>
  );
};

interface Props {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const ListItem: React.FC<Props> = ({ children, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`${
        isActive ? "bg-slate-200" : ""
      } rounded-sm hover:bg-slate-200 cursor-pointer select-none`}
    >
      <span className="px-3 py-2">{children}</span>
    </div>
  );
};

export default BlockMenu;
