"use client"

import { useState } from "react"
import styles from "./ItemCard.module.scss"
import { Item } from "@/types/item"

interface Props {
  item: Item
  onEdit: (id: string, newValue: string) => void
}

export default function ItemCard({ item, onEdit }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedValue, setEditedValue] = useState(item.value)

  const handleSave = () => {
    onEdit(item.id, editedValue)
    setIsEditing(false)
  }

  return (
    <div className={styles.card}>
      <h2>{item.key}</h2>

      {isEditing ? (
        <input
          value={editedValue}
          onChange={(e) => setEditedValue(e.target.value)}
          className={styles.input}
        />
      ) : (
        <p>{item.value}</p>
      )}

      <button
        onClick={() =>
          isEditing ? handleSave() : setIsEditing(true)
        }
        className={styles.button}
      >
        {isEditing ? "Save" : "Edit"}
      </button>
    </div>
  )
}