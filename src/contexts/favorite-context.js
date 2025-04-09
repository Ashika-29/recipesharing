"use client"

import { createContext, useContext, useState, useEffect } from "react"

const FavoriteContext = createContext(undefined)

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([])

  // Load favorites from localStorage on initial render
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites")
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (recipeId) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(recipeId)) {
        return prevFavorites.filter((id) => id !== recipeId)
      } else {
        return [...prevFavorites, recipeId]
      }
    })
  }

  return <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>{children}</FavoriteContext.Provider>
}

export function useFavorites() {
  const context = useContext(FavoriteContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoriteProvider")
  }
  return context
}