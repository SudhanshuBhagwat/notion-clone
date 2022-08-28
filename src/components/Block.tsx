import Input from "./Input";
import ContextMenu from "../components/ContextMenu";
import { useState } from "react";
import { IBlock } from "../pages/Home";

interface Props {
  block: IBlock
  index: number;
}

const Block: React.FC<Props> = ({ block, index }) => {
  const [isMenuVisible, showIsMenuVisible] = useState<boolean>(false);

  return <div>
    <Input block={block} index={index} showIsMenuVisible={showIsMenuVisible}/>
    {isMenuVisible && <ContextMenu />}
  </div>
}

export default Block;
