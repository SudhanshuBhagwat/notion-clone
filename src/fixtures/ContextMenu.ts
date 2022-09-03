import { removeBlock } from "../pages/Home"

export const ContextMenuOptions = [
  {
    id: 'delete',
    name: 'Delete',
    onClick: (blockId: string) => {
      removeBlock(blockId);
    }
  }
]
