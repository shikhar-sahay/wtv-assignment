"use client"

import { useEffect, useState } from "react"

import { useRouter } from "next/navigation"

import { useAuthStore } from "@/store/authStore"

export const useRequireAuth = () => {
  const router = useRouter()

  const accessToken = useAuthStore(
    (state) => state.accessToken
  )

  const [mounted, setMounted] =
    useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (
      mounted &&
      !accessToken
    ) {
      router.push("/login")
    }
  }, [
    mounted,
    accessToken,
    router,
  ])

  return {
    accessToken,
    mounted,
  }
}