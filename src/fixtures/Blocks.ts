export interface IBlockType {
  id: string;
  tag: keyof JSX.IntrinsicElements;
  placeholder: string;
}

export type IBlockTypes = typeof AllowedBlocks[number]['id']
export type IBlockTags = typeof AllowedBlocks[number]['tag']

export function getBlockTagById(givenId: IBlockTypes) {
  return [...AllowedBlocks].filter(block => {
    if(block.id === givenId) {
      return true;
    } 
  })[0]?.tag;
}

export const AllowedBlocks = [
  {
    id: 'heading-1',
    tag: 'h1',
    placeholder: 'Heading 1'
  },
  {
    id: 'heading-2',
    tag: 'h2',
    placeholder: 'Heading 2'
  },
  {
    id: 'heading-3',
    tag: 'h3',
    placeholder: 'Heading 3'
  },
  {
    id: 'text',
    tag: 'p',
    placeholder: 'Text'
  },
] as const;
