import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { authenticateUser, createToken } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing email or password",
        },
        { status: 400 },
      )
    }

    // Authenticate user
    const authResult = await authenticateUser(email, password)

    if (!authResult.success || !authResult.user) {
      return NextResponse.json(
        {
          success: false,
          message: authResult.message || "Invalid credentials",
        },
        { status: 401 },
      )
    }

    // Create JWT token
    const token = await createToken(authResult.user)

    // Set session cookie
    const cookieStore = cookies()
    cookieStore.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
      sameSite: "lax",
    })

    // Return user data
    return NextResponse.json({
      success: true,
      user: authResult.user,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}
