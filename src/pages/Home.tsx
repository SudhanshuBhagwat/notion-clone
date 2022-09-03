import type { NextPage } from "next";
import { nanoid } from "nanoid";
import { proxy, useSnapshot } from "valtio";
import { useEffect, useRef } from "react";
import { IBlockTypes } from "../fixtures/Blocks";
import BlockMenu from "../components/BlockMenu";
import Input from "../components/Input";

export interface IBlock {
  id: string;
  type: IBlockTypes;
}

const blocks: IBlock[] = [
  {
    id: "1",
    type: "heading-1",
  },
  {
    id: "2",
    type: "text",
  },
  {
    id: "3",
    type: "heading-3",
  },
];

// State
export const state = proxy({
  blocks,
  currentBlockIdx: 0,
  isBlockMenuVisible: false
});

export function hideBlockMenu() {
  state.isBlockMenuVisible = false;
}

export function showBlockMenu() {
  state.isBlockMenuVisible = true;
}

export function addBlock(index: number) {
  if(state.isBlockMenuVisible) return;
  state.blocks.splice(index, 0, {
    id: nanoid(),
    type: "text",
  });
}

export function removeBlock(id: string) {
  if (state.blocks.length > 1) {
    state.blocks = state.blocks.filter(
      (currentBlock) => currentBlock.id !== id
    );
  }
}

export function changeBlock(id: IBlockTypes) {
  const currentBlockIdx = state.currentBlockIdx;
  const currentBlock =  state.blocks[currentBlockIdx];
  const currentBlockId = currentBlock!.id;
  const newBlock = {
    id: currentBlockId,
    type: id
  }
  state.blocks.splice(currentBlockIdx, 1, newBlock);
  state.isBlockMenuVisible = false;
}

const Home: NextPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { blocks, isBlockMenuVisible } = useSnapshot(state);

  useEffect(() => {
    const allBlocks = containerRef.current?.querySelectorAll(".block");
    if (allBlocks) {
      (allBlocks[allBlocks?.length - 1] as HTMLElement)?.focus();
    }
  }, [blocks]);

  return (
    <div>
      <h1 className="text-4xl font-bold">Home</h1>
      <div ref={containerRef} className="mt-4 flex flex-col gap-2">
        {blocks.map((block, index) => (
          <Input key={`${block.id}-${index}`} block={block} index={index} />
        ))}
      </div>
      {isBlockMenuVisible && <BlockMenu />}
    </div>
  );
};

export default Home;
