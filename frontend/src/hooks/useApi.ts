"use client"

import { useState, useCallback } from "react"
import api from "@/services/api"

export default function useApi() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const request = useCallback(
    async (
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
    },
    []
  )

  return {
    loading,
    error,

    get: useCallback(
      (url: string) => request("get", url),
      [request]
    ),

    post: useCallback(
      (url: string, data?: unknown) => request("post", url, data),
      [request]
    ),

    put: useCallback(
      (url: string, data?: unknown) => request("put", url, data),
      [request]
    ),

    patch: useCallback(
      (url: string, data?: unknown) => request("patch", url, data),
      [request]
    ),

    delete: useCallback(
      (url: string) => request("delete", url),
      [request]
    ),
  }
}