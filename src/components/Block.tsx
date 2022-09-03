import Input from "./Input";
import { useState, memo } from "react";
import { IBlock } from "../pages/Home";
import BlockMenu from "./BlockMenu";

interface Props {
  block: IBlock
  index: number;
}

const Block: React.FC<Props> = ({ block, index }) => {
  const [isMenuVisible, showIsMenuVisible] = useState<boolean>(false);

  return <div>
    <Input block={block} index={index} isMenuVisible={isMenuVisible} showIsMenuVisible={showIsMenuVisible}/>
    {isMenuVisible && <BlockMenu showIsMenuVisible={showIsMenuVisible}/>}
  </div>
}

export default memo(Block);
