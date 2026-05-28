import items from "@/data/items.json"
import ItemList from "@/components/ItemList/ItemList"

export default function Home() {
  return (
    <main style={{ padding: "2rem" }}>
      <ItemList items={items} />
    </main>
  )
}