import api from "./api"
import { Item } from "@/types/item"

export const getItems = async (): Promise<Item[]> => {
  const response = await api.get("/api/items/")

  return response.data
}

export const updateItem = async (
  id: string,
  value: string
): Promise<Item> => {
  const response = await api.patch(
    `/api/items/${id}/`,
    { value }
  )

  return response.data
}