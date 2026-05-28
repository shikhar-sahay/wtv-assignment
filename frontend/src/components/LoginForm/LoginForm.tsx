"use client"

import { useState } from "react"
import styles from "./LoginForm.module.scss"

export default function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    console.log({
      username,
      password,
    })
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

      <button type="submit" className={styles.button}>
        Login
      </button>
    </form>
  )
}