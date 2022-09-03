import Input from "./Input";
import { memo } from "react";
import { IBlock, state } from "../pages/Home";
import BlockMenu from "./BlockMenu";
import { useSnapshot } from "valtio";

interface Props {
  block: IBlock
  index: number;
}

const Block: React.FC<Props> = ({ block, index }) => {
  const { isBlockMenuVisible } = useSnapshot(state);

  return <div>
    <Input block={block} index={index} />
  </div>
}

export default memo(Block);
