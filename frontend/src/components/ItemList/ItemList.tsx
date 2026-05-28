import styles from "./ItemList.module.scss"
import ItemCard from "../ItemCard/ItemCard"
import { Item } from "@/types/item"

interface Props {
  items: Item[]
}

export default function ItemList({ items }: Props) {
  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  )
}