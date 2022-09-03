import React, { useEffect, useState } from "react";
import { AllowedBlocks } from "../fixtures/Blocks";

interface BlockMenuProps {
  showIsMenuVisible: (value: boolean) => void;
}

const BlockMenu: React.FC<BlockMenuProps> = ({ showIsMenuVisible }) => {
  const [currentBlockIdx, setCurrentBlockIdx] = useState<number>(-1);

  const handleKeyDown = (event: any) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setCurrentBlockIdx(currentIdx => Math.min(AllowedBlocks.length - 1, currentIdx + 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setCurrentBlockIdx(currentIdx => Math.max(0, currentIdx - 1));
    }
  };

  function handleClick() {
    showIsMenuVisible(false);
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="bg-white w-60 px-1 rounded-md shadow-md">
      <ul id="blockMenu" className="flex flex-col gap-1 py-1">
        {AllowedBlocks.map((block, idx) => (
          <ListItem key={`${block.id}-${idx}`} isActive={currentBlockIdx === idx} onClick={handleClick}>
            {block.placeholder}
          </ListItem>
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
      <li className="px-3 py-1">{children}</li>
    </div>
  );
};

export default BlockMenu;
