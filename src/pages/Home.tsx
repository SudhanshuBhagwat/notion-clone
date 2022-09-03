import type { NextPage } from "next";
import Block from "../components/Block";
import { nanoid } from "nanoid";
import { proxy, useSnapshot } from "valtio";
import { useEffect, useRef } from "react";
import { IBlockTypes } from "../fixtures/Blocks";

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
const state = proxy({
  blocks,
});

export function addBlock(index: number) {
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

const Home: NextPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { blocks } = useSnapshot(state);

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
          <Block key={block.id} block={block} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Home;
