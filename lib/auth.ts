import { cookies } from "next/headers"
import type { NextRequest } from "next/server"
import { SignJWT, jwtVerify } from "jose"
import bcrypt from "bcryptjs"

// Secret key for JWT signing and verification
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "strange-lifestyle-super-secret-key-2024")

// Admin credentials
const ADMIN_USERNAME = "admin-strange"
const ADMIN_PASSWORD = "strange"

export interface User {
  id: string
  name: string
  email: string
  password: string
  role: "admin" | "customer" | "manager" | "editor" | "staff" | "viewer"
  createdAt: Date
  lastLogin?: Date
  isActive: boolean
}

// In-memory user store (in production, this would be a database)
const users: User[] = [
  {
    id: "admin-1",
    name: "Admin User",
    email: "admin@strangelifestyle.com",
    password: bcrypt.hashSync("strange", 10),
    role: "admin",
    createdAt: new Date(),
    isActive: true,
  },
]

// Authentication functions
export async function authenticateUser(
  email: string,
  password: string,
): Promise<{ success: boolean; user?: Omit<User, "password">; message?: string }> {
  try {
    // Check admin credentials first
    if (email === "admin@strangelifestyle.com" && password === "strange") {
      const adminUser = users.find((u) => u.email === "admin@strangelifestyle.com")
      if (adminUser) {
        const { password: _, ...userWithoutPassword } = adminUser
        return { success: true, user: userWithoutPassword }
      }
    }

    // Check regular users
    const user = users.find((u) => u.email === email && u.isActive)
    if (!user) {
      return { success: false, message: "Invalid email or password" }
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return { success: false, message: "Invalid email or password" }
    }

    // Update last login
    user.lastLogin = new Date()

    const { password: _, ...userWithoutPassword } = user
    return { success: true, user: userWithoutPassword }
  } catch (error) {
    console.error("Authentication error:", error)
    return { success: false, message: "Authentication failed" }
  }
}

export async function createUser(userData: Omit<User, "id" | "createdAt" | "isActive">): Promise<User> {
  // Check if user already exists
  const existingUser = users.find((u) => u.email === userData.email)
  if (existingUser) {
    throw new Error("User already exists")
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(userData.password, 10)

  const newUser: User = {
    id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    ...userData,
    password: hashedPassword,
    role: userData.role || "customer",
    createdAt: new Date(),
    isActive: true,
  }

  users.push(newUser)
  return newUser
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  return users.find((user) => user.email === email && user.isActive)
}

export async function getUserById(id: string): Promise<User | undefined> {
  return users.find((user) => user.id === id && user.isActive)
}

export async function getAllUsers(): Promise<Omit<User, "password">[]> {
  return users.map(({ password, ...user }) => user)
}

export async function updateUser(id: string, updates: Partial<User>): Promise<User | null> {
  const userIndex = users.findIndex((u) => u.id === id)
  if (userIndex === -1) return null

  users[userIndex] = { ...users[userIndex], ...updates }
  return users[userIndex]
}

export async function deleteUser(id: string): Promise<boolean> {
  const userIndex = users.findIndex((u) => u.id === id)
  if (userIndex === -1) return false

  users[userIndex].isActive = false
  return true
}

// JWT Token functions
export async function createToken(user: Omit<User, "password">): Promise<string> {
  return await new SignJWT({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET)
}

export async function verifyToken(token: string): Promise<{ success: boolean; payload?: any; error?: string }> {
  try {
    const verified = await jwtVerify(token, JWT_SECRET)
    return {
      success: true,
      payload: verified.payload,
    }
  } catch (error) {
    return {
      success: false,
      error: "Invalid or expired token",
    }
  }
}

export async function verifyAuth(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value || request.cookies.get("session")?.value

  if (!token) {
    return null
  }

  const result = await verifyToken(token)
  return result.success ? result.payload : null
}

export async function getCurrentUser(): Promise<Omit<User, "password"> | null> {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get("auth-token")?.value || cookieStore.get("session")?.value

    if (!token) {
      return null
    }

    const result = await verifyToken(token)
    if (!result.success || !result.payload) {
      return null
    }

    const user = await getUserById(result.payload.id)
    if (!user) {
      return null
    }

    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
  } catch (error) {
    console.error("Get current user error:", error)
    return null
  }
}

export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser()
  return user?.role === "admin"
}

export async function hasRole(requiredRole: User["role"]): Promise<boolean> {
  const user = await getCurrentUser()
  if (!user) return false

  const roleHierarchy = {
    admin: 5,
    manager: 4,
    editor: 3,
    staff: 2,
    customer: 1,
    viewer: 0,
  }

  const userLevel = roleHierarchy[user.role] || 0
  const requiredLevel = roleHierarchy[requiredRole] || 0

  return userLevel >= requiredLevel
}

// Admin login function
export async function adminLogin(
  username: string,
  password: string,
): Promise<{ success: boolean; token?: string; message?: string }> {
  try {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const adminUser = users.find((u) => u.role === "admin")
      if (adminUser) {
        const { password: _, ...userWithoutPassword } = adminUser
        const token = await createToken(userWithoutPassword)
        return { success: true, token }
      }
    }

    return { success: false, message: "Invalid admin credentials" }
  } catch (error) {
    console.error("Admin login error:", error)
    return { success: false, message: "Login failed" }
  }
}
