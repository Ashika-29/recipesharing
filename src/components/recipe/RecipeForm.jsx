import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useRecipes } from "../../contexts/recipe-context"
import { useAuth } from "../../contexts/auth-context"
import { X, Plus } from 'lucide-react'
import "../../styles/form.css"
import "../../styles/button.css"
import "../../styles/card.css"

// Helper function to generate UUID
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export default function RecipeForm({ recipeId }) {
  const navigate = useNavigate()
  const { addRecipe, updateRecipe, getRecipeById } = useRecipes()
  const { user, isAuthenticated } = useAuth()

  const emptyRecipe = {
    title: "",
    image: "",
    cookingTime: 30,
    servings: 4,
    ingredients: [""],
    instructions: [""],
    dietary: [],
    notes: "",
    substitutions: [],
  }

  const [recipe, setRecipe] = useState(emptyRecipe)
  const [newSubstitution, setNewSubstitution] = useState({ original: "", substitute: "" })

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login?redirect=/recipes/new")
      return
    }

    if (recipeId) {
      const existingRecipe = getRecipeById(recipeId)
      if (existingRecipe) {
        setRecipe(existingRecipe)
      }
    }
  }, [recipeId, getRecipeById, isAuthenticated, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setRecipe((prev) => ({ ...prev, [name]: value }))
  }

  const handleNumberChange = (e) => {
    const { name, value } = e.target
    setRecipe((prev) => ({ ...prev, [name]: Number.parseInt(value) || 0 }))
  }

  const handleDietaryChange = (value) => {
    setRecipe((prev) => {
      const dietary = prev.dietary || []
      return {
        ...prev,
        dietary: dietary.includes(value) ? dietary.filter((item) => item !== value) : [...dietary, value],
      }
    })
  }

  const handleIngredientChange = (index, value) => {
    setRecipe((prev) => {
      const ingredients = [...(prev.ingredients || [])]
      ingredients[index] = value
      return { ...prev, ingredients }
    })
  }

  const addIngredient = () => {
    setRecipe((prev) => ({
      ...prev,
      ingredients: [...(prev.ingredients || []), ""],
    }))
  }

  const removeIngredient = (index) => {
    setRecipe((prev) => {
      const ingredients = [...(prev.ingredients || [])]
      ingredients.splice(index, 1)
      return { ...prev, ingredients }
    })
  }

  const handleInstructionChange = (index, value) => {
    setRecipe((prev) => {
      const instructions = [...(prev.instructions || [])]
      instructions[index] = value
      return { ...prev, instructions }
    })
  }

  const addInstruction = () => {
    setRecipe((prev) => ({
      ...prev,
      instructions: [...(prev.instructions || []), ""],
    }))
  }

  const removeInstruction = (index) => {
    setRecipe((prev) => {
      const instructions = [...(prev.instructions || [])]
      instructions.splice(index, 1)
      return { ...prev, instructions }
    })
  }

  const handleSubstitutionChange = (e) => {
    const { name, value } = e.target
    setNewSubstitution((prev) => ({ ...prev, [name]: value }))
  }

  const addSubstitution = () => {
    if (newSubstitution.original && newSubstitution.substitute) {
      setRecipe((prev) => ({
        ...prev,
        substitutions: [...(prev.substitutions || []), { ...newSubstitution }],
      }))
      setNewSubstitution({ original: "", substitute: "" })
    }
  }

  const removeSubstitution = (index) => {
    setRecipe((prev) => {
      const substitutions = [...(prev.substitutions || [])]
      substitutions.splice(index, 1)
      return { ...prev, substitutions }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!isAuthenticated || !user) {
      alert("Please log in to create or edit recipes")
      return
    }

    if (!recipe.title || !recipe.ingredients?.length || !recipe.instructions?.length) {
      alert("Please fill in all required fields")
      return
    }

    const completeRecipe = {
      id: recipeId || uuidv4(),
      userId: user.id,
      author: user.name,
      rating: recipe.rating || 0,
      ...recipe,
    }

    if (recipeId) {
      updateRecipe(completeRecipe)
      alert("Your recipe has been successfully updated")
    } else {
      addRecipe(completeRecipe)
      alert("Your recipe has been successfully created")
    }

    navigate(`/recipes/${completeRecipe.id}`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-8">
        <div className="card">
          <div className="card-content pt-6">
            <div className="space-y-4">
              <div className="form-group">
                <label className="form-label" htmlFor="title">Recipe Title *</label>
                <input
                  id="title"
                  className="form-input"
                  name="title"
                  value={recipe.title}
                  onChange={handleChange}
                  placeholder="Enter recipe title"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="image">Image URL</label>
                <input
                  id="image"
                  className="form-input"
                  name="image"
                  value={recipe.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                />
                <p className="form-helper">Enter a URL for your recipe image</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label" htmlFor="cookingTime">Cooking Time (minutes) *</label>
                  <input
                    id="cookingTime"
                    className="form-input"
                    name="cookingTime"
                    type="number"
                    min="1"
                    value={recipe.cookingTime}
                    onChange={handleNumberChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="servings">Servings *</label>
                  <input
                    id="servings"
                    className="form-input"
                    name="servings"
                    type="number"
                    min="1"
                    value={recipe.servings}
                    onChange={handleNumberChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Dietary Options</label>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="vegetarian"
                      className="form-checkbox"
                      checked={recipe.dietary?.includes("vegetarian") || false}
                      onChange={() => handleDietaryChange("vegetarian")}
                    />
                    <label htmlFor="vegetarian" className="form-label font-normal">
                      Vegetarian
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="vegan"
                      className="form-checkbox"
                      checked={recipe.dietary?.includes("vegan") || false}
                      onChange={() => handleDietaryChange("vegan")}
                    />
                    <label htmlFor="vegan" className="form-label font-normal">
                      Vegan
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="gluten-free"
                      className="form-checkbox"
                      checked={recipe.dietary?.includes("gluten-free") || false}
                      onChange={() => handleDietaryChange("gluten-free")}
                    />
                    <label htmlFor="gluten-free" className="form-label font-normal">
                      Gluten-Free
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content pt-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="form-label">Ingredients *</label>
                  <button type="button" className="btn btn-outline btn-sm" onClick={addIngredient}>
                    <Plus className="h-4 w-4 mr-1" /> Add Ingredient
                  </button>
                </div>

                {recipe.ingredients?.map((ingredient, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      className="form-input"
                      value={ingredient}
                      onChange={(e) => handleIngredientChange(index, e.target.value)}
                      placeholder={`Ingredient ${index + 1}`}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-ghost btn-icon"
                      onClick={() => removeIngredient(index)}
                      disabled={recipe.ingredients?.length === 1}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </button>
                  </div>
                ))}
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="form-label">Substitutions (Optional)</label>
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={addSubstitution}
                    disabled={!newSubstitution.original || !newSubstitution.substitute}
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add Substitution
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-2">
                  <input
                    className="form-input"
                    name="original"
                    value={newSubstitution.original}
                    onChange={handleSubstitutionChange}
                    placeholder="Original ingredient"
                  />
                  <input
                    className="form-input"
                    name="substitute"
                    value={newSubstitution.substitute}
                    onChange={handleSubstitutionChange}
                    placeholder="Substitute with"
                  />
                </div>

                {recipe.substitutions?.map((sub, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2 p-2 bg-muted rounded-md">
                    <div className="flex-1">
                      <span className="font-medium">{sub.original}</span>
                      <span className="mx-2">→</span>
                      <span>{sub.substitute}</span>
                    </div>
                    <button type="button" className="btn btn-ghost btn-icon" onClick={() => removeSubstitution(index)}>
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content pt-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="form-label">Instructions *</label>
                <button type="button" className="btn btn-outline btn-sm" onClick={addInstruction}>
                  <Plus className="h-4 w-4 mr-1" /> Add Step
                </button>
              </div>

              {recipe.instructions?.map((instruction, index) => (
                <div key={index} className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">Step {index + 1}</span>
                    <button
                      type="button"
                      className="btn btn-ghost btn-icon ml-auto"
                      onClick={() => removeInstruction(index)}
                      disabled={recipe.instructions?.length === 1}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </button>
                  </div>
                  <textarea
                    className="form-textarea"
                    value={instruction}
                    onChange={(e) => handleInstructionChange(index, e.target.value)}
                    placeholder={`Describe step ${index + 1}`}
                    required
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content pt-6">
            <div className="form-group">
              <label className="form-label" htmlFor="notes">Additional Notes (Optional)</label>
              <textarea
                id="notes"
                className="form-textarea"
                name="notes"
                value={recipe.notes}
                onChange={handleChange}
                placeholder="Add any tips, variations, or additional information"
                rows={4}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button type="button" className="btn btn-outline" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">{recipeId ? "Update Recipe" : "Create Recipe"}</button>
        </div>
      </div>
    </form>
  )
}