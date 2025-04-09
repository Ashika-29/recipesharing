"use client"

import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { mockRecipes } from "../lib/mock-data"

const RecipeContext = createContext(undefined)

export function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)

  // Load recipes from localStorage on initial render
  useEffect(() => {
    const storedRecipes = localStorage.getItem("recipes")
    if (storedRecipes) {
      setRecipes(JSON.parse(storedRecipes))
    }
  }, [])

  // Save recipes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes))
  }, [recipes])

  const fetchRecipes = useCallback(() => {
    if (recipes.length > 0 || loading) return

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setRecipes(mockRecipes)
      setLoading(false)
    }, 500)
  }, [recipes, loading])

  const getRecipeById = useCallback((id) => {
    return recipes.find((recipe) => recipe.id === id) || null
  }, [recipes])

  const addRecipe = useCallback((recipe) => {
    setRecipes((prevRecipes) => [...prevRecipes, recipe])
  }, [])

  const updateRecipe = useCallback((recipe) => {
    setRecipes((prevRecipes) =>
      prevRecipes.map((r) => (r.id === recipe.id ? recipe : r))
    )
  }, [])

  const deleteRecipe = useCallback((id) => {
    setRecipes((prevRecipes) =>
      prevRecipes.filter((recipe) => recipe.id !== id)
    )
  }, [])

  // Optional: Dev tool to clear all recipes and localStorage
  const clearRecipes = useCallback(() => {
    setRecipes([])
    localStorage.removeItem("recipes")
  }, [])

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        loading,
        fetchRecipes,
        getRecipeById,
        addRecipe,
        updateRecipe,
        deleteRecipe,
        clearRecipes, // optional
      }}
    >
      {children}
    </RecipeContext.Provider>
  )
}

export function useRecipes() {
  const context = useContext(RecipeContext)
  if (context === undefined) {
    throw new Error("useRecipes must be used within a RecipeProvider")
  }
  return context
}
