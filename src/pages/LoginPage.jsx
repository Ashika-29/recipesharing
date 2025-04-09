import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/auth-context"
import "../styles/auth.css"
import "../styles/form.css"
import "../styles/button.css"
import "../styles/card.css"

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const redirect = searchParams.get("redirect") || "/"
  const { login, register } = useAuth()

  const [activeTab, setActiveTab] = useState("login")
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleLoginChange = (e) => {
    const { name, value } = e.target
    setLoginData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRegisterChange = (e) => {
    const { name, value } = e.target
    setRegisterData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogin = (e) => {
    e.preventDefault()

    if (!loginData.email || !loginData.password) {
      alert("Please fill in all required fields")
      return
    }

    const success = login(loginData.email, loginData.password)

    if (success) {
      alert("Login successful")
      navigate(redirect)
    } else {
      alert("Invalid email or password")
    }
  }

  const handleRegister = (e) => {
    e.preventDefault()

    if (!registerData.name || !registerData.email || !registerData.password) {
      alert("Please fill in all required fields")
      return
    }

    const success = register(registerData.name, registerData.email, registerData.password)

    if (success) {
      alert("Registration successful")
      navigate(redirect)
    } else {
      alert("Email already in use")
    }
  }

  return (
    <div className="auth-container">
      <div className="card auth-card">
        <div className="auth-tabs-list">
          <button
            className="auth-tabs-trigger"
            data-state={activeTab === "login" ? "active" : "inactive"}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className="auth-tabs-trigger"
            data-state={activeTab === "register" ? "active" : "inactive"}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
        </div>

        {activeTab === "login" ? (
          <form className="auth-form" onSubmit={handleLogin}>
            <div className="auth-form-header">
              <h2 className="auth-form-title">Login</h2>
              <p className="auth-form-description">Enter your credentials to access your account</p>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="login-email">
                Email
              </label>
              <input
                id="login-email"
                className="form-input"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={loginData.email}
                onChange={handleLoginChange}
                required
              />
            </div>
            <div className="form-group">
              <div className="flex justify-between items-center">
                <label className="form-label" htmlFor="login-password">
                  Password
                </label>
              </div>
              <input
                id="login-password"
                className="form-input"
                name="password"
                type="password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />
            </div>
            <div className="auth-form-footer">
              <button type="submit" className="btn btn-primary btn-full">
                Login
              </button>
            </div>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleRegister}>
            <div className="auth-form-header">
              <h2 className="auth-form-title">Create an account</h2>
              <p className="auth-form-description">Enter your information to create a new account</p>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="register-name">
                Name
              </label>
              <input
                id="register-name"
                className="form-input"
                name="name"
                placeholder="John Doe"
                value={registerData.name}
                onChange={handleRegisterChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="register-email">
                Email
              </label>
              <input
                id="register-email"
                className="form-input"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={registerData.email}
                onChange={handleRegisterChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="register-password">
                Password
              </label>
              <input
                id="register-password"
                className="form-input"
                name="password"
                type="password"
                value={registerData.password}
                onChange={handleRegisterChange}
                required
              />
            </div>
            <div className="auth-form-footer">
              <button type="submit" className="btn btn-primary btn-full">
                Register
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}