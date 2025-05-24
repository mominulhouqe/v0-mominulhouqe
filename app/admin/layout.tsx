import type React from "react"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/auth"
import AdminSidebar from "@/components/admin/admin-sidebar"
import AdminHeader from "@/components/admin/admin-header"

export const metadata = {
  title: "Admin Dashboard | Strange Lifestyle",
  description: "Admin dashboard for Strange Lifestyle e-commerce platform",
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check for admin authentication
  const cookieStore = cookies()
  const token = cookieStore.get("admin-token")?.value

  if (!token) {
    redirect("/admin/login")
  }

  try {
    const payload = await verifyToken(token)
    if (!payload || payload.role !== "admin") {
      redirect("/admin/login")
    }
  } catch (error) {
    redirect("/admin/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
