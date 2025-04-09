import { useEffect, useState } from "react"
import { useRecipes } from "../../contexts/recipe-context"
import { useSearch } from "../../contexts/search-context"
import RecipeCard from "./RecipeCard"
import { useAuth } from "../../contexts/auth-context"
import { useFavorites } from "../../contexts/favorite-context"
import "../../styles/tabs.css"
import "../../styles/badge.css"

export default function RecipeFeed() {
  const { recipes, fetchRecipes, loading } = useRecipes()
  const { searchTerm, dietaryFilter, setDietaryFilter } = useSearch()
  const { isAuthenticated } = useAuth()
  const { favorites } = useFavorites()
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    fetchRecipes()
  }, [fetchRecipes])

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch =
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients.some((ing) => ing.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesDietary = dietaryFilter === "all" || (recipe.dietary && recipe.dietary.includes(dietaryFilter))

    return matchesSearch && matchesDietary
  })

  const favoriteRecipes = filteredRecipes.filter((recipe) => favorites.includes(recipe.id))

  return (
    <div className="tabs">
      <div className="flex justify-between items-center mb-4">
        <div className="tabs-list">
          <button 
            className="tabs-trigger" 
            data-state={activeTab === "all" ? "active" : ""} 
            data-value="all"
            onClick={() => setActiveTab("all")}
          >
            All Recipes
          </button>
          {isAuthenticated && (
            <button 
              className="tabs-trigger" 
              data-state={activeTab === "favorites" ? "active" : ""} 
              data-value="favorites"
              onClick={() => setActiveTab("favorites")}
            >
              My Favorites
              {favorites.length > 0 && <span className="badge badge-secondary ml-2">{favorites.length}</span>}
            </button>
          )}
        </div>

        <div className="filter-container">
          <span
            className={`badge ${dietaryFilter === "all" ? "badge-default" : "badge-outline"} badge-clickable`}
            onClick={() => setDietaryFilter("all")}
          >
            All
          </span>
          <span
            className={`badge ${dietaryFilter === "vegetarian" ? "badge-default" : "badge-outline"} badge-clickable`}
            onClick={() => setDietaryFilter("vegetarian")}
          >
            Vegetarian
          </span>
          <span
            className={`badge ${dietaryFilter === "vegan" ? "badge-default" : "badge-outline"} badge-clickable`}
            onClick={() => setDietaryFilter("vegan")}
          >
            Vegan
          </span>
          <span
            className={`badge ${dietaryFilter === "gluten-free" ? "badge-default" : "badge-outline"} badge-clickable`}
            onClick={() => setDietaryFilter("gluten-free")}
          >
            Gluten-Free
          </span>
        </div>
      </div>

      <div className="tabs-content" data-state={activeTab === "all" ? "active" : ""} data-value="all">
        {loading ? (
          <div className="text-center py-10">Loading recipes...</div>
        ) : filteredRecipes.length === 0 ? (
          <div className="text-center py-10">
            <h3 className="text-lg font-medium">No recipes found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>

      <div className="tabs-content" data-state={activeTab === "favorites" ? "active" : ""} data-value="favorites">
        {!isAuthenticated ? (
          <div className="text-center py-10">
            <h3 className="text-lg font-medium">Sign in to see your favorites</h3>
            <p className="text-muted-foreground">Save recipes to access them later</p>
          </div>
        ) : favoriteRecipes.length === 0 ? (
          <div className="text-center py-10">
            <h3 className="text-lg font-medium">No favorite recipes yet</h3>
            <p className="text-muted-foreground">Start saving recipes you love</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}