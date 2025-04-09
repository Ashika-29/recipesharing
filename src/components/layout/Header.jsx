import { Link } from "react-router-dom"
import { UtensilsCrossed } from 'lucide-react'
import { UserNav } from "./UserNav"
import "../../styles/header.css"

export default function Header() {
  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="header-logo">
          <UtensilsCrossed className="h-6 w-6" />
          <span>Flavor Exchange</span>
        </Link>

        <div className="header-actions">
          <UserNav />
        </div>
      </div>
    </header>
  )
}