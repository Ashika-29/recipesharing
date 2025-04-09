"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Helper function to generate UUID
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Load user data from localStorage on initial render
  useEffect(() => {
    const storedAuth = localStorage.getItem("auth")
    if (storedAuth) {
      const { user, isAuthenticated } = JSON.parse(storedAuth)
      setUser(user)
      setIsAuthenticated(isAuthenticated)
    }
  }, [])

  // Save auth state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify({ user, isAuthenticated }))
  }, [user, isAuthenticated])

  const login = (email, password) => {
    // In a real app, this would validate against a backend
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const user = users.find((u) => u.email === email && u.password === password)

    if (user) {
      const { password, ...userWithoutPassword } = user
      setUser(userWithoutPassword)
      setIsAuthenticated(true)
      return true
    }

    return false
  }

  const register = (name, email, password) => {
    // In a real app, this would call a backend API
    const users = JSON.parse(localStorage.getItem("users") || "[]")

    // Check if email already exists
    if (users.some((u) => u.email === email)) {
      return false
    }

    const newUser = {
      id: uuidv4(),
      name,
      email,
      password,
    }

    localStorage.setItem("users", JSON.stringify([...users, newUser]))

    const { password: _, ...userWithoutPassword } = newUser

    setUser(userWithoutPassword)
    setIsAuthenticated(true)

    return true
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}