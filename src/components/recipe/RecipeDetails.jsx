import { useEffect, useState } from "react"
import { useRecipes } from "../../contexts/recipe-context"
import { useAuth } from "../../contexts/auth-context"
import { useFavorites } from "../../contexts/favorite-context"
import { Link, useNavigate } from "react-router-dom"
import { Clock, Edit, Heart, Share2, Star, Trash2, User } from 'lucide-react'
import CookingTimer from "./CookingTimer"
import "../../styles/badge.css"
import "../../styles/button.css"
import "../../styles/card.css"
import "../../styles/recipe-details.css"

export default function RecipeDetails({ id }) {
  const { recipes, getRecipeById, deleteRecipe } = useRecipes()
  const { isAuthenticated, user } = useAuth()
  const { favorites, toggleFavorite } = useFavorites()
  const navigate = useNavigate()
  const [recipe, setRecipe] = useState(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  useEffect(() => {
    const fetchedRecipe = getRecipeById(id)
    setRecipe(fetchedRecipe)
  }, [id, recipes, getRecipeById])

  if (!recipe) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-2">Recipe not found</h2>
        <p className="text-muted-foreground mb-6">The recipe you're looking for doesn't exist or has been removed.</p>
        <Link to="/">
          <button className="btn btn-primary">Return to home</button>
        </Link>
      </div>
    )
  }

  const isFavorite = favorites.includes(recipe.id)
  const isOwner = isAuthenticated && user?.id === recipe.userId

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    alert("Recipe link has been copied to your clipboard")
  }

  const handleDelete = () => {
    deleteRecipe(recipe.id)
    alert("Your recipe has been permanently removed")
    navigate("/")
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{recipe.title}</h1>
          <p className="text-muted-foreground">By {recipe.author}</p>
        </div>

        <div className="flex gap-2">
          {isAuthenticated && (
            <button className={`btn btn-outline btn-icon ${isFavorite ? "favorite-btn active" : ""}`} onClick={() => toggleFavorite(recipe.id)}>
              <Heart className="h-4 w-4" />
              <span className="sr-only">{isFavorite ? "Remove from favorites" : "Add to favorites"}</span>
            </button>
          )}

          <button className="btn btn-outline btn-icon" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
            <span className="sr-only">Share recipe</span>
          </button>

          {isOwner && (
            <>
              <Link to={`/recipes/${recipe.id}/edit`}>
                <button className="btn btn-outline btn-icon">
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit recipe</span>
                </button>
              </Link>

              <button className="btn btn-outline btn-icon" onClick={() => setDeleteDialogOpen(true)}>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete recipe</span>
              </button>
            </>
          )}
        </div>
      </div>

      <div className="recipe-details-image">
        <img
          src={recipe.image || "https://source.unsplash.com/random/1200x800/?food"}
          alt={recipe.title}
          className="object-cover w-full h-full"
        />

        {recipe.dietary && recipe.dietary.length > 0 && (
          <div className="recipe-details-badges">
            {recipe.dietary.includes("vegetarian") && (
              <span className="badge badge-vegetarian">Vegetarian</span>
            )}
            {recipe.dietary.includes("vegan") && (
              <span className="badge badge-vegan">Vegan</span>
            )}
            {recipe.dietary.includes("gluten-free") && (
              <span className="badge badge-gluten-free">Gluten-Free</span>
            )}
          </div>
        )}
      </div>

      <div className="recipe-details-stats">
        <div className="recipe-details-stat-card">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="recipe-details-stat-value">{recipe.cookingTime} min</p>
            <p className="recipe-details-stat-label">Cooking Time</p>
          </div>
        </div>

        <div className="recipe-details-stat-card">
          <Star className="h-4 w-4" style={{ color: "#f59e0b", fill: "#f59e0b" }} />
          <div>
            <p className="recipe-details-stat-value">{recipe.rating.toFixed(1)}/5</p>
            <p className="recipe-details-stat-label">Rating</p>
          </div>
        </div>

        <div className="recipe-details-stat-card">
          <User className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="recipe-details-stat-value">{recipe.servings}</p>
            <p className="recipe-details-stat-label">Servings</p>
          </div>
        </div>

        <CookingTimer cookingTime={recipe.cookingTime} />
      </div>

      <div className="recipe-details-content">
        <div>
          <h2 className="recipe-details-ingredients-title">Ingredients</h2>
          <ul className="recipe-details-ingredients-list">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="recipe-details-ingredients-item">
                <span>{ingredient}</span>
              </li>
            ))}
          </ul>

          {recipe.substitutions && recipe.substitutions.length > 0 && (
            <div className="recipe-details-substitutions">
              <h3 className="recipe-details-substitutions-title">Substitutions</h3>
              <ul className="recipe-details-substitutions-list">
                {recipe.substitutions.map((sub, index) => (
                  <li key={index} className="recipe-details-substitutions-item">
                    <span className="recipe-details-substitutions-original">{sub.original}</span>: {sub.substitute}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div>
          <h2 className="recipe-details-instructions-title">Instructions</h2>
          <ol className="recipe-details-instructions-list">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="recipe-details-instructions-item">
                <h3 className="recipe-details-step-title">Step {index + 1}</h3>
                <p className="recipe-details-step-content">{instruction}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="recipe-details-notes">
        <h2 className="recipe-details-notes-title">Notes</h2>
        <p className="recipe-details-notes-content">{recipe.notes || "No additional notes for this recipe."}</p>
      </div>

      {deleteDialogOpen && (
        <div className="delete-confirm-modal">
          <div className="delete-confirm-content">
            <h2 className="text-xl font-bold mb-2">Are you sure?</h2>
            <p className="text-muted-foreground mb-4">
              This action cannot be undone. This will permanently delete your recipe.
            </p>
            <div className="delete-confirm-actions">
              <button className="btn btn-outline" onClick={() => setDeleteDialogOpen(false)}>
                Cancel
              </button>
              <button className="btn btn-destructive" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}