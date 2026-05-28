"use client"

import { useEffect, useState } from "react"
import ItemList from "@/components/ItemList/ItemList"
import { Item } from "@/types/item"
import { getItems, updateItem } from "@/services/items"
import { useAuthStore } from "@/store/authStore"
import { useRequireAuth } from "@/hooks/useRequireAuth"

export default function Home() {
  useRequireAuth()

  const logout = useAuthStore((state) => state.logout)

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

  const handleEdit = async (id: string, newValue: string) => {
    try {
      const updatedItem = await updateItem(id, newValue)

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? updatedItem : item
        )
      )
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main style={{ padding: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
        <button onClick={logout}>
          Logout
        </button>
      </div>

      <ItemList items={items} onEdit={handleEdit} />
    </main>
  )
}