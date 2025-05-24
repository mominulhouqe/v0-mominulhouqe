import { cookies } from "next/headers"
import type { NextRequest } from "next/server"
import { SignJWT, jwtVerify } from "jose"

// Secret key for JWT signing and verification
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key")

// Admin credentials
const ADMIN_USERNAME = "admin-strange"
const ADMIN_PASSWORD = "strange"

interface User {
  id: string
  name: string
  email: string
  password: string
  role?: string
}

// In a real app, this would be a database
// For this example, we'll use an in-memory store
const users: User[] = []

export async function login(username: string, password: string) {
  // Check if credentials match admin credentials
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // Create admin session
    const token = await new SignJWT({
      username,
      role: "admin",
      name: "Admin User",
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(JWT_SECRET)

    return { success: true, token }
  }

  // Check customer credentials (in a real app, this would query a database)
  // For now, we'll use a mock user
  const user = users.find((u) => u.email === username && u.password === password)
  if (user) {
    const token = await new SignJWT({
      username: user.email,
      role: user.role,
      name: user.name,
      id: user.id,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(JWT_SECRET)

    return { success: true, token }
  }

  return { success: false, message: "Invalid credentials" }
}

export async function verifyAuth(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value

  if (!token) {
    return null
  }

  try {
    const verified = await jwtVerify(token, JWT_SECRET)
    return verified.payload
  } catch (error) {
    return null
  }
}

export async function getUser() {
  const cookieStore = cookies()
  const token = cookieStore.get("auth-token")?.value

  if (!token) {
    return null
  }

  try {
    const verified = await jwtVerify(token, JWT_SECRET)
    return verified.payload
  } catch (error) {
    return null
  }
}

export async function isAdmin() {
  const user = await getUser()
  return user?.role === "admin"
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  return users.find((user) => user.email === email)
}

export async function getUserById(id: string): Promise<User | undefined> {
  return users.find((user) => user.id === id)
}

export async function createUser(user: User): Promise<User> {
  // Check if user already exists
  const existingUser = await getUserByEmail(user.email)
  if (existingUser) {
    throw new Error("User already exists")
  }

  // Add user to the array
  users.push(user)
  return user
}

export async function verifyToken(token: string) {
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
