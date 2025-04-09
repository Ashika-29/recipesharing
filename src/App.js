import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/auth-context"
import { RecipeProvider } from "./contexts/recipe-context"
import { FavoriteProvider } from "./contexts/favorite-context"
import { SearchProvider } from "./contexts/search-context"
import Header from "./components/layout/Header"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RecipeDetailsPage from "./pages/RecipeDetailsPage"
import NewRecipePage from "./pages/NewRecipePage"
import EditRecipePage from "./pages/EditRecipePage"
import "./styles/globals.css"

function App() {
  return (
    <AuthProvider>
      <RecipeProvider>
        <FavoriteProvider>
          <SearchProvider>
            <Router>
              <Header />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/recipes/:id" element={<RecipeDetailsPage />} />
                <Route path="/recipes/new" element={<NewRecipePage />} />
                <Route path="/recipes/:id/edit" element={<EditRecipePage />} />
              </Routes>
            </Router>
          </SearchProvider>
        </FavoriteProvider>
      </RecipeProvider>
    </AuthProvider>
  )
}

export default App