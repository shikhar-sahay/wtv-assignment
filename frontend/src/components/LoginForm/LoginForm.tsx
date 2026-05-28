"use client"

import { useState } from "react"
import { useAuthStore } from "@/store/authStore"
import styles from "./LoginForm.module.scss"
import api from "@/services/api"
import useApi from "@/hooks/useApi"

export default function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const setTokens = useAuthStore(
    (state) => state.setTokens
  )

  const { loading, error } = useApi()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    setTokens("fake-access", "fake-refresh")

    console.log(api.defaults.baseURL)

    console.log("Logged in")
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Login</h1>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className={styles.input}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
      />

      {error && <p>{error}</p>}

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