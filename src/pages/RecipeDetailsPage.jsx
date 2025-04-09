import { useParams, Link } from "react-router-dom"
import RecipeDetails from "../components/recipe/RecipeDetails"
import { ChevronLeft } from 'lucide-react'
import "../styles/button.css"

export default function RecipeDetailsPage() {
  const { id } = useParams()

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

      <RecipeDetails id={id} />
    </main>
  )
}