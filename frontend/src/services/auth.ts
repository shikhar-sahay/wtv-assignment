import api from "./api"

interface LoginResponse {
  access: string
  refresh: string
}

export const loginUser = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const response = await api.post(
    "/auth/token/",
    {
      username,
      password,
    }
  )

  return response.data
}