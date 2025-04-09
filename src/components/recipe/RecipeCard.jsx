import { Link } from "react-router-dom"
import { Clock, Heart, Star, User } from 'lucide-react'
import { useFavorites } from "../../contexts/favorite-context"
import { useAuth } from "../../contexts/auth-context"
import "../../styles/recipe-card.css"
import "../../styles/badge.css"
import "../../styles/card.css"

export default function RecipeCard({ recipe }) {
  const { favorites, toggleFavorite } = useFavorites()
  const { isAuthenticated, user } = useAuth()

  const isFavorite = favorites.includes(recipe.id)
  const isOwner = isAuthenticated && user?.id === recipe.userId

  return (
    <div className="card recipe-card">
      <Link to={`/recipes/${recipe.id}`}>
        <div className="recipe-card-image">
          <img src={recipe.image || "https://source.unsplash.com/random/600x400/?food"} alt={recipe.title} />
          {recipe.dietary && recipe.dietary.length > 0 && (
            <div className="recipe-card-badges">
              {recipe.dietary.includes("vegetarian") && <span className="badge badge-vegetarian">Vegetarian</span>}
              {recipe.dietary.includes("vegan") && <span className="badge badge-vegan">Vegan</span>}
              {recipe.dietary.includes("gluten-free") && <span className="badge badge-gluten-free">Gluten-Free</span>}
            </div>
          )}
        </div>
      </Link>

      <div className="recipe-card-content">
        <div className="recipe-card-title">
          <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
          {isAuthenticated && (
            <button className={`favorite-btn ${isFavorite ? "active" : ""}`} onClick={() => toggleFavorite(recipe.id)}>
              <Heart className="h-5 w-5" />
              <span className="sr-only">{isFavorite ? "Remove from favorites" : "Add to favorites"}</span>
            </button>
          )}
        </div>

        <div className="recipe-card-meta">
          <div className="recipe-card-meta-item">
            <Clock className="h-4 w-4" />
            {recipe.cookingTime} min
          </div>
          <div className="recipe-card-meta-item">
            <Star className="h-4 w-4" />
            {recipe.rating.toFixed(1)}
          </div>
          {isOwner && <span className="badge badge-outline">Your Recipe</span>}
        </div>

        <div className="recipe-card-author">
          <User className="h-3 w-3" />
          By {recipe.author}
        </div>
      </div>
    </div>
  )
}