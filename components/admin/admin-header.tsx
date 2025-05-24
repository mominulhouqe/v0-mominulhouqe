"use client"

import { useState } from "react"
import { Bell, Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AdminSidebar from "./admin-sidebar"

export default function AdminHeader() {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false)

  return (
    <>
      <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden mr-2"
            onClick={() => setShowMobileSidebar(!showMobileSidebar)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="relative hidden md:block">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input type="search" placeholder="Search..." className="pl-8 w-[300px]" />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </Button>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-sm font-medium">A</span>
            </div>
            <span className="ml-2 font-medium hidden md:block">Admin</span>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {showMobileSidebar && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowMobileSidebar(false)} />
          <div className="fixed inset-y-0 left-0 w-64 bg-white">
            <div className="flex justify-end p-4">
              <Button variant="ghost" size="icon" onClick={() => setShowMobileSidebar(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <AdminSidebar />
          </div>
        </div>
      )}
    </>
  )
}
