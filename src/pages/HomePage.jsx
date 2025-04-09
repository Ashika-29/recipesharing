import RecipeFeed from "../components/recipe/RecipeFeed"
import { SearchBar } from "../components/search/SearchBar"
import { Link } from "react-router-dom"
import { PlusCircle } from 'lucide-react'
import "../styles/button.css"

export default function HomePage() {
  return (
    <main className="container py-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Flavor Exchange</h1>
          <p className="text-muted-foreground">Discover and share delicious recipes</p>
        </div>
        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
          <SearchBar />
          <Link to="/recipes/new">
            <button className="btn btn-primary w-full sm:w-auto">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Recipe
            </button>
          </Link>
        </div>
      </div>

      <RecipeFeed />
    </main>
  )
}