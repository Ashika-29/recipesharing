import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { useRecipes } from "../contexts/recipe-context"
import { useAuth } from "../contexts/auth-context"
import RecipeForm from "../components/recipe/RecipeForm"
import { ChevronLeft } from 'lucide-react'
import "../styles/button.css"

export default function EditRecipePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getRecipeById } = useRecipes()
  const { isAuthenticated, user } = useAuth()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const recipe = getRecipeById(id)

    if (!recipe) {
      navigate("/")
      return
    }

    if (!isAuthenticated || user?.id !== recipe.userId) {
      navigate("/")
      return
    }

    setLoading(false)
  }, [id, getRecipeById, isAuthenticated, user, navigate])

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <Link to={`/recipes/${id}`}>
          <button className="btn btn-ghost pl-0">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to recipe
          </button>
        </Link>
      </div>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Edit Recipe</h1>
        {!loading && <RecipeForm recipeId={id} />}
      </div>
    </main>
  )
}