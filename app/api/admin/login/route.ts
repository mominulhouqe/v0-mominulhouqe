import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { adminLogin } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing username or password",
        },
        { status: 400 },
      )
    }

    // Authenticate admin
    const result = await adminLogin(username, password)

    if (!result.success || !result.token) {
      return NextResponse.json(
        {
          success: false,
          message: result.message || "Invalid credentials",
        },
        { status: 401 },
      )
    }

    // Set admin session cookie
    const cookieStore = cookies()
    cookieStore.set("auth-token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
      sameSite: "lax",
    })

    return NextResponse.json({
      success: true,
      message: "Admin login successful",
    })
  } catch (error) {
    console.error("Admin login error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}
