import Input from "./Input";

export type BlockType = 'Text' | 'H1'; 

interface Props {
  type: BlockType;
}

const Block: React.FC<Props> = ({ type }) => {
  function renderBlock(blockType: BlockType) {
    switch(blockType) {
      case 'H1':
        return <Input type={blockType}/>
      case 'Text':
        return <Input type={blockType}/>
      default:
        return null;
    }
  }

  return renderBlock(type);
}

export default Block;
