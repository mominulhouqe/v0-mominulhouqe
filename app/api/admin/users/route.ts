import { NextResponse } from "next/server"
import { getAllUsers, createUser, isAdmin } from "@/lib/auth"

export async function GET() {
  try {
    const hasAdminAccess = await isAdmin()
    if (!hasAdminAccess) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 403 },
      )
    }

    const users = await getAllUsers()
    return NextResponse.json({
      success: true,
      users,
    })
  } catch (error) {
    console.error("Get users error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const hasAdminAccess = await isAdmin()
    if (!hasAdminAccess) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 403 },
      )
    }

    const userData = await request.json()

    // Validate required fields
    if (!userData.name || !userData.email || !userData.password) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 },
      )
    }

    const user = await createUser(userData)
    const { password, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Create user error:", error)

    if (error instanceof Error && error.message === "User already exists") {
      return NextResponse.json(
        {
          success: false,
          message: "Email already in use",
        },
        { status: 409 },
      )
    }

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}
