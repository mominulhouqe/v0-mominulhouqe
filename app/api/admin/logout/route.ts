import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    const cookieStore = cookies()

    // Clear admin session cookie
    cookieStore.delete("auth-token")

    return NextResponse.json({
      success: true,
      message: "Admin logged out successfully",
    })
  } catch (error) {
    console.error("Admin logout error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}
