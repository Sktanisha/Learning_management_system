import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react"

type UserRole = "student" | "admin" | "instructor"

type User = {
  id: string
  name: string
  email: string
  role: UserRole
  profileImage?: string
}

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (user: User, token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
)

export const AuthProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Restore user after page refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    const token = localStorage.getItem("token")

    if (storedUser && token) {
      try {
        const parsedUser: User = JSON.parse(storedUser)
        setUser(parsedUser)
      } catch {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
      }
    }

    setIsLoading(false)
  }, [])

  const login = (user: User, token: string) => {
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(user))

    setUser(user)
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")

    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider",
    )
  }

  return context
}