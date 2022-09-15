import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { AllowedBlocks, IBlockTypes } from "../fixtures/Blocks";
import { changeBlock, hideBlockMenu, state } from "../pages/Home";

const BlockMenu = () => {
  const [currentBlockIdx, setCurrentBlockIdx] = useState<number>(-1);

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
          setCurrentBlockIdx(idx);
        }}
      >
        <ListItem
          isActive={currentBlockIdx === idx}
          onClick={() => handleClick(block.id)}
        >
          {block.placeholder}
        </ListItem>
      </li>
    ));
  }, [currentBlockIdx]);

  return (
    <div className="absolute" style={{
      top: state.menuPosition + 10,
      left: 50
    }}>
      <div className="bg-white w-60 px-1 rounded-md shadow-md">
        <ul id="blockMenu" className="flex flex-col gap-1 py-1">
          {renderBlocks}
        </ul>
      </div>
    </div>
  );
};

interface Props {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const ListItem: React.FC<Props> = memo(({ children, isActive, onClick }) => {
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
});

export default BlockMenu;
