export interface LoginRequest {
  username: string
  password: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  username: string
  email: string
}

const BASE_URL = import.meta.env.MODE === 'production' 
  ? `${import.meta.env.VITE_API_URL || 'https://todo-app-production-f9b6.up.railway.app'}/api/auth`
  : 'http://localhost:8081/api/auth'

export const login = async (loginData: LoginRequest): Promise<AuthResponse> => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  })
  
  if (!response.ok) {
    try {
      const error = await response.json()
      throw new Error(error.error || 'Login failed')
    } catch (jsonError) {
      throw new Error(`Login failed: ${response.status} ${response.statusText}`)
    }
  }
  
  try {
    return await response.json()
  } catch (error) {
    throw new Error('Invalid response from server')
  }
}

export const register = async (registerData: RegisterRequest): Promise<AuthResponse> => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registerData),
  })
  
  if (!response.ok) {
    try {
      const error = await response.json()
      throw new Error(error.error || 'Registration failed')
    } catch (jsonError) {
      throw new Error(`Registration failed: ${response.status} ${response.statusText}`)
    }
  }
  
  try {
    return await response.json()
  } catch (error) {
    throw new Error('Invalid response from server')
  }
}

export const logout = async (): Promise<void> => {
  const token = localStorage.getItem('authToken')
  if (token) {
    await fetch(`${BASE_URL}/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
  }
  localStorage.removeItem('authToken')
  localStorage.removeItem('user')
}