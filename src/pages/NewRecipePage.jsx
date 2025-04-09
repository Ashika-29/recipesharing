import RecipeForm from "../components/recipe/RecipeForm"
import { Link } from "react-router-dom"
import { ChevronLeft } from 'lucide-react'
import "../styles/button.css"

export default function NewRecipePage() {
  return (
    <main className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <Link to="/">
          <button className="btn btn-ghost pl-0">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to recipes
          </button>
        </Link>
      </div>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Create New Recipe</h1>
        <RecipeForm />
      </div>
    </main>
  )
}