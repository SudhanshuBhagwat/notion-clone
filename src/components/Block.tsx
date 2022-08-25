import Input from "./Input";
import ContextMenu from "../components/ContextMenu";
import { useState } from "react";

export type BlockType = 'Text' | 'H1'; 

interface Props {
  type: BlockType;
}

const Block: React.FC<Props> = ({ type }) => {
  const [isMenuVisible, showIsMenuVisible] = useState<boolean>(false);

  function renderBlock(blockType: BlockType) {
    switch(blockType) {
      case 'H1':
        return <Input type={blockType} showIsMenuVisible={showIsMenuVisible}/>
      case 'Text':
        return <Input type={blockType} showIsMenuVisible={showIsMenuVisible}/>
      default:
        return null;
    }
  }

  return <div>
    {renderBlock(type)}
    {isMenuVisible && <ContextMenu />}
  </div>
}

export default Block;
