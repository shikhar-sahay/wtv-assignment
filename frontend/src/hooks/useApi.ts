"use client"

import { useState } from "react"
import api from "@/services/api"

export default function useApi() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const request = async (
    method: "get" | "post" | "put" | "delete" | "patch",
    url: string,
    data?: unknown
  ) => {
    try {
      setLoading(true)
      setError(null)

      const response = await api({
        method,
        url,
        data,
      })

      return response.data
    } catch (err: any) {
      setError(
        err.response?.data?.detail ||
        "Something went wrong"
      )

      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,

    get: (url: string) =>
      request("get", url),

    post: (url: string, data?: unknown) =>
      request("post", url, data),

    put: (url: string, data?: unknown) =>
      request("put", url, data),

    patch: (url: string, data?: unknown) =>
      request("patch", url, data),

    delete: (url: string) =>
      request("delete", url),
  }
}