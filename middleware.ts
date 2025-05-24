import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "@/lib/auth"

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath =
    path === "/" ||
    path === "/login" ||
    path === "/register" ||
    path === "/products" ||
    path === "/about" ||
    path === "/contact" ||
    path === "/categories" ||
    path.startsWith("/products/") ||
    path.startsWith("/api/auth/login") ||
    path.startsWith("/api/auth/register") ||
    path.startsWith("/_next") ||
    path.startsWith("/favicon")

  // Define admin paths
  const isAdminPath = path.startsWith("/admin")
  const isAdminLoginPath = path === "/admin/login"

  // Get tokens from cookies
  const sessionToken = request.cookies.get("session")?.value
  const authToken = request.cookies.get("auth-token")?.value

  // Handle admin paths
  if (isAdminPath && !isAdminLoginPath) {
    if (!authToken) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }

    // Verify admin token
    const tokenResult = await verifyToken(authToken)
    if (!tokenResult.success || tokenResult.payload?.role !== "admin") {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  // Handle protected customer paths
  const isProtectedPath = path.startsWith("/account") || path.startsWith("/checkout") || path.startsWith("/orders")

  if (isProtectedPath && !sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Verify customer session for protected paths
  if (isProtectedPath && sessionToken) {
    const tokenResult = await verifyToken(sessionToken)
    if (!tokenResult.success) {
      // Clear invalid token
      const response = NextResponse.redirect(new URL("/login", request.url))
      response.cookies.delete("session")
      return response
    }
  }

  // Redirect authenticated users away from auth pages
  if ((path === "/login" || path === "/register") && sessionToken) {
    const tokenResult = await verifyToken(sessionToken)
    if (tokenResult.success) {
      return NextResponse.redirect(new URL("/account", request.url))
    }
  }

  // Redirect authenticated admin away from admin login
  if (isAdminLoginPath && authToken) {
    const tokenResult = await verifyToken(authToken)
    if (tokenResult.success && tokenResult.payload?.role === "admin") {
      return NextResponse.redirect(new URL("/admin", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/account/:path*", "/checkout", "/orders/:path*", "/login", "/register"],
}
