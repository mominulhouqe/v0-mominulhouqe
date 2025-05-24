import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath = path === "/login" || path === "/register" || path === "/"

  // Define admin paths
  const isAdminPath = path.startsWith("/admin")

  // Get the session token from cookies
  const sessionToken = request.cookies.get("session")?.value

  // If trying to access admin path without being logged in, redirect to login
  if (isAdminPath) {
    // In a real app, you would check if the user is an admin
    // For this example, we'll use a special admin token
    const isAdmin = sessionToken === "admin-token"

    if (!sessionToken || !isAdmin) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  // If trying to access protected path without being logged in, redirect to login
  if (!isPublicPath && !sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // If trying to access login/register while logged in, redirect to home
  if (isPublicPath && sessionToken && path !== "/") {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: ["/admin/:path*", "/account/:path*", "/checkout", "/login", "/register"],
}
