import type { NavList } from "../../types/navItemtype"


const ListItem = ({key, item, className}: {key:number, item:NavList, className?: string }) => {
  return (
    <li className={className} key={key}>
      {item.title}
    </li>
  )
}

export default ListItem
