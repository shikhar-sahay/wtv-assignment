"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { loginUser } from "@/services/auth"
import { useAuthStore } from "@/store/authStore"

export default function LoginPage() {
  const router = useRouter()

  const setTokens = useAuthStore(
    (state) => state.setTokens
  )

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [error, setError] = useState("")

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    try {
      setError("")

      const data = await loginUser(
        username,
        password
      )

      setTokens(
        data.access,
        data.refresh
      )

      router.push("/")
    } catch {
      setError("Invalid credentials")
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "300px",
        }}
      >
        <h1>Login</h1>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button type="submit">
          Login
        </button>

        {error && <p>{error}</p>}
      </form>
    </main>
  )
}