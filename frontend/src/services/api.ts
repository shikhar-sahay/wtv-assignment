import axios from "axios"
import { useAuthStore } from "@/store/authStore"

const api = axios.create({
  baseURL: "http://localhost:8000",
})

api.interceptors.request.use(
  (config) => {
    const accessToken =
      useAuthStore.getState().accessToken

    if (accessToken) {
      config.headers.Authorization =
        `Bearer ${accessToken}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use( //executes after responses return
  (response) => response,

  async (error) => {
    const originalRequest = error.config

    if (
      error.response?.status === 401 && //unauthorized (expired/invalid token)
      !originalRequest._retry
    ) {
      originalRequest._retry = true

      try {
        const refreshToken =
          useAuthStore.getState().refreshToken

        const response = await axios.post(
          "http://localhost:8000/auth/token/refresh/",
          {
            refresh: refreshToken,
          }
        )

        const newAccessToken =
          response.data.access

        useAuthStore.getState().setTokens(
          newAccessToken,
          refreshToken! //updating with fresh access token
        )

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`

        return api(originalRequest)
      } catch (refreshError) {
        useAuthStore.getState().logout()

        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default api