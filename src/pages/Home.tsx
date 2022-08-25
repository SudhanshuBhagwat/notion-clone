import type { NextPage } from "next";
import Block, { BlockType } from "../components/Block";
import { nanoid } from 'nanoid'
import { proxy, useSnapshot } from "valtio";
import { useEffect, useRef } from "react";

interface IBlock {
  id: string;
  type: BlockType;
}

const blocks: IBlock[] = [
  {
    id: "1",
    type: "H1",
  },
  {
    id: "2",
    type: "Text",
  },
]

// State
const state = proxy({
  blocks
});

export function addBlock() {
  state.blocks.push({
    id: nanoid(),
    type: "Text"
  })
}

export function removeBlock() {
  if (state.blocks.length > 1) {
    state.blocks.pop();
  }
}

const Home: NextPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { blocks } = useSnapshot(state); 

  useEffect(() => {
    const allBlocks = containerRef.current?.querySelectorAll("div");    
    if (allBlocks) {
      allBlocks[allBlocks?.length - 1]?.focus();
    }
  }, [blocks]);

  return (
    <div>
      <h1 className="text-4xl font-bold">Home</h1>
      <div ref={containerRef} className="mt-4 flex flex-col gap-2">
        {blocks.map(block => (
          <Block key={block.id} type={block.type}/>
        ))}
      </div>
    </div>
  );
};

export default Home;
