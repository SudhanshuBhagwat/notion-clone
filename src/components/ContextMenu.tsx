import React from "react"

const ContextMenu = () => {
  return (
    <div className="bg-white w-60 px-1 rounded-md shadow-md">
      <ul className="flex flex-col gap-1 py-1">
        <ListItem isActive={false}>Text</ListItem>
        <ListItem isActive={true}>H1</ListItem>
      </ul>
    </div>
  )
}

interface Props {
  children: React.ReactNode;
  isActive: boolean;
}

const ListItem: React.FC<Props> = ({ children, isActive }) => {
  return <div className={`${isActive ? 'bg-slate-100' : ''} rounded-sm`}>
    <li className="px-3 py-1">
      {children}
    </li>
  </div>
}

export default ContextMenu;
