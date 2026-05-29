import styles from "./ItemList.module.scss"
import ItemCard from "../ItemCard/ItemCard"
import { Item } from "@/types/item"

interface Props {
  items: Item[]
  onEdit: (id: string, newValue: string) => Promise<void>
}

export default function ItemList({ items, onEdit }: Props) {
  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
}