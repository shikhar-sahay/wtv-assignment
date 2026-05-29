"use client"

import { useEffect, useState } from "react"
import ItemList from "@/components/ItemList/ItemList"
import { Item } from "@/types/item"
import { useAuthStore } from "@/store/authStore"
import { useRequireAuth } from "@/hooks/useRequireAuth"
import useApi from "@/hooks/useApi"
import styles from "./page.module.scss"

export default function Home() {
  useRequireAuth()

  const logout = useAuthStore((state) => state.logout)

  const [items, setItems] = useState<Item[]>([])
  const { get, patch, loading, error } = useApi()

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await get("/api/items/")
        if (Array.isArray(data)) {
          setItems(data)
        }
      } catch (err) {
        console.error(err)
      }
    }

    fetchItems()
  }, [get])

  const handleEdit = async (id: string, newValue: string) => {
    try {
      const updatedItem = await patch(`/api/items/${id}/`, { value: newValue })

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? updatedItem : item
        )
      )
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>Data Panel</h1>

        <div className={styles.userMenu}>
          <span className={styles.username}>Administrator</span>
          <button onClick={logout} className={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </header>

      <div className={styles.statsBar}>
        <div className={styles.statCard}>
          Total items: <strong>{items.length}</strong>
        </div>
        <div className={styles.statCard}>
          <span className={styles.dot} /> Sync: <strong>Postgres DB</strong>
        </div>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      {loading && items.length === 0 ? (
        <div className={styles.loading}>Synchronizing database items...</div>
      ) : (
        <ItemList items={items} onEdit={handleEdit} />
      )}
    </main>
  )
}