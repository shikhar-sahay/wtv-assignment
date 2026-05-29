"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/authStore"
import styles from "./LoginForm.module.scss"
import useApi from "@/hooks/useApi"

export default function LoginForm() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const { post, loading, error } = useApi()

  const setTokens = useAuthStore(
    (state) => state.setTokens
  )

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    try {
      const data = await post(
        "/auth/token/",
        {
          username,
          password,
        }
      )

      setTokens(
        data.access,
        data.refresh
      )

      console.log("Login success")
      router.push("/")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Login Panel</h1>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className={styles.input}
        disabled={loading}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
        disabled={loading}
        required
      />

      {error && <p className={styles.error}>{error === "Something went wrong" ? "Invalid credentials" : error}</p>}

      <button
        type="submit"
        className={styles.button}
        disabled={loading}
      >
        {loading ? "Loading..." : "Login"}
      </button>
    </form>
  )
}