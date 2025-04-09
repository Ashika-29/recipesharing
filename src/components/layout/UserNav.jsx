import { Link } from "react-router-dom"
import { useAuth } from "../../contexts/auth-context"
import { BookMarked, LogOut, Settings, User } from 'lucide-react'
import "../../styles/button.css"

export function UserNav() {
  const { isAuthenticated, user, logout } = useAuth()

  if (!isAuthenticated || !user) {
    return (
      <Link to="/login">
        <button className="btn btn-outline">Sign In</button>
      </Link>
    )
  }

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2)

  return (
    <div className="user-nav">
      <div className="user-avatar">
        <div className="avatar">
          <div className="avatar-fallback">{initials}</div>
        </div>
      </div>
      <div className="user-menu">
        <div className="user-info">
          <p className="user-name">{user.name}</p>
          <p className="user-email">{user.email}</p>
        </div>
        <div className="user-menu-items">
          <button className="user-menu-item">
            <User className="h-4 w-4 mr-2" />
            <span>Profile</span>
          </button>
          <button className="user-menu-item">
            <BookMarked className="h-4 w-4 mr-2" />
            <span>My Recipes</span>
          </button>
          <button className="user-menu-item">
            <Settings className="h-4 w-4 mr-2" />
            <span>Settings</span>
          </button>
          <button className="user-menu-item" onClick={logout}>
            <LogOut className="h-4 w-4 mr-2" />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </div>
  )
}