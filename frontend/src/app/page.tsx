"use client"

import { useEffect, useState } from "react"
import ItemList from "@/components/ItemList/ItemList"
import { Item } from "@/types/item"
import { getItems, updateItem } from "@/services/items"

export default function Home() {
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItems()
        setItems(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchItems()
  }, [])

  const handleEdit = async (
    id: string,
    newValue: string
  ) => {
    try {
      const updatedItem =
        await updateItem(id, newValue)

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id
            ? updatedItem
            : item
        )
      )
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main style={{ padding: "2rem" }}>
      <ItemList
        items={items}
        onEdit={handleEdit}
      />
    </main>
  )
}