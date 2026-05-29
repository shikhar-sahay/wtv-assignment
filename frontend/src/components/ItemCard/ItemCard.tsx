"use client"

import { useState } from "react"
import styles from "./ItemCard.module.scss"
import { Item } from "@/types/item"

interface Props {
  item: Item
  onEdit: (id: string, newValue: string) => Promise<void>
}

export default function ItemCard({ item, onEdit }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedValue, setEditedValue] = useState(item.value)
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    try {
      setLoading(true)
      await onEdit(item.id, editedValue)
      setIsEditing(false)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return ""
    try {
      const date = new Date(dateStr)
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    } catch {
      return ""
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2>{item.key}</h2>
      </div>

      <div className={styles.cardBody}>
        {isEditing ? (
          <textarea
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
            className={styles.textarea}
            disabled={loading}
            rows={3}
          />
        ) : (
          <p>{item.value}</p>
        )}
      </div>

      <div className={styles.cardFooter}>
        <span className={styles.date}>
          {item.updated_at ? `Updated: ${formatDate(item.updated_at)}` : ""}
        </span>

        <div className={styles.actions}>
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className={`${styles.button} ${styles.primaryBtn}`}
                disabled={loading}
              >
                {loading ? "..." : "Save"}
              </button>
              <button
                onClick={() => {
                  setEditedValue(item.value)
                  setIsEditing(false)
                }}
                className={`${styles.button} ${styles.secondaryBtn}`}
                disabled={loading}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className={styles.button}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  )
}