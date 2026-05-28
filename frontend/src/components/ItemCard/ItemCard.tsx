import styles from "./ItemCard.module.scss"
import { Item } from "@/types/item"

interface Props {
  item: Item
}

export default function ItemCard({ item }: Props) {
  return (
    <div className={styles.card}>
      <h2>{item.key}</h2>
      <p>{item.value}</p>
    </div>
  )
}