"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Package,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  Tag,
  UserCog,
  Boxes,
  LineChart,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const sidebarLinks = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    title: "Products",
    icon: Package,
    href: "/admin/products",
    submenu: [
      { title: "All Products", href: "/admin/products" },
      { title: "Add Product", href: "/admin/products/new" },
      { title: "Categories", href: "/admin/products/categories" },
    ],
  },
  {
    title: "Inventory",
    icon: Boxes,
    href: "/admin/inventory",
    submenu: [
      { title: "Stock Management", href: "/admin/inventory" },
      { title: "Inventory Logs", href: "/admin/inventory/logs" },
    ],
  },
  {
    title: "Orders",
    icon: ShoppingBag,
    href: "/admin/orders",
    submenu: [
      { title: "All Orders", href: "/admin/orders" },
      { title: "Pending", href: "/admin/orders?status=pending" },
      { title: "Processing", href: "/admin/orders?status=processing" },
      { title: "Completed", href: "/admin/orders?status=completed" },
      { title: "Cancelled", href: "/admin/orders?status=cancelled" },
    ],
  },
  {
    title: "Customers",
    icon: Users,
    href: "/admin/customers",
  },
  {
    title: "Discounts",
    icon: Tag,
    href: "/admin/discounts",
  },
  {
    title: "Analytics",
    icon: LineChart,
    href: "/admin/analytics",
    submenu: [
      { title: "Sales Overview", href: "/admin/analytics" },
      { title: "Product Performance", href: "/admin/analytics?tab=products" },
      { title: "Customer Insights", href: "/admin/analytics?tab=customers" },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/admin/settings",
    submenu: [
      { title: "General", href: "/admin/settings" },
      { title: "Payment", href: "/admin/settings?tab=payment" },
      { title: "Shipping", href: "/admin/settings?tab=shipping" },
    ],
  },
  {
    title: "Users",
    icon: UserCog,
    href: "/admin/users",
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({})

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  const isActive = (href: string) => pathname === href

  const handleLogout = () => {
    // Clear the admin session cookie
    document.cookie = "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    // Redirect to login page
    window.location.href = "/admin/login"
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <Link href="/admin" className="flex items-center">
          <span className="text-xl font-bold text-primary">Admin Panel</span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon

            if (link.submenu) {
              return (
                <Collapsible key={link.title} open={openMenus[link.title]} onOpenChange={() => toggleMenu(link.title)}>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn("w-full justify-start mb-1", isActive(link.href) && "bg-gray-100 text-primary")}
                    >
                      <Icon className="h-5 w-5 mr-2" />
                      {link.title}
                      {openMenus[link.title] ? (
                        <ChevronDown className="h-4 w-4 ml-auto" />
                      ) : (
                        <ChevronRight className="h-4 w-4 ml-auto" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="pl-9 space-y-1">
                      {link.submenu.map((subItem) => (
                        <Link key={subItem.href} href={subItem.href}>
                          <Button
                            variant="ghost"
                            className={cn(
                              "w-full justify-start text-sm",
                              isActive(subItem.href) && "bg-gray-100 text-primary",
                            )}
                          >
                            {subItem.title}
                          </Button>
                        </Link>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )
            }

            return (
              <Link key={link.title} href={link.href}>
                <Button
                  variant="ghost"
                  className={cn("w-full justify-start mb-1", isActive(link.href) && "bg-gray-100 text-primary")}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {link.title}
                </Button>
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200">
        <Button variant="ghost" className="w-full justify-start text-red-500" onClick={handleLogout}>
          <LogOut className="h-5 w-5 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  )
}
