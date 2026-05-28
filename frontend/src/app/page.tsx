"use client"

import { useState } from "react"
import itemsData from "@/data/items.json"
import ItemList from "@/components/ItemList/ItemList"
import { Item } from "@/types/item"

export default function Home() {
  const [items, setItems] = useState<Item[]>(itemsData)

  const handleEdit = (id: string, newValue: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, value: newValue }
          : item
      )
    )
  }

  return (
    <main style={{ padding: "2rem" }}>
      <ItemList items={items} onEdit={handleEdit} />
    </main>
  )
}