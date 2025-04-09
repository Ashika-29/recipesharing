import { Search } from 'lucide-react'
import { useSearch } from "../../contexts/search-context"
import "../../styles/search.css"

export function SearchBar() {
  const { searchTerm, setSearchTerm } = useSearch()

  return (
    <div className="search-container">
      <Search className="search-icon" />
      <input
        type="search"
        placeholder="Search recipes or ingredients..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  )
}