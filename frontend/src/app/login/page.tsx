"use client"

import LoginForm from "@/components/LoginForm/LoginForm"

export default function LoginPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoginForm />
    </main>
  )
}