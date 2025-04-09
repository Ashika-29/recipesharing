"use client"

import { createContext, useContext, useState } from "react"

const SearchContext = createContext(undefined)

export function SearchProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [dietaryFilter, setDietaryFilter] = useState("all")

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        dietaryFilter,
        setSearchTerm,
        setDietaryFilter,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider")
  }
  return context
}
