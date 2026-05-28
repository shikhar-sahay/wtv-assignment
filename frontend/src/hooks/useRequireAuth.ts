"use client"

import { useEffect } from "react"

import { useRouter } from "next/navigation"

import { useAuthStore } from "@/store/authStore"

export const useRequireAuth = () => {
  const router = useRouter()

  const accessToken = useAuthStore(
    (state) => state.accessToken
  )

  useEffect(() => {
    if (!accessToken) {
      router.push("/login")
    }
  }, [accessToken, router])

  return {
    accessToken,
  }
}