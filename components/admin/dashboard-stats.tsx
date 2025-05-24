"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, DollarSign, ShoppingCart, Users, Package } from "lucide-react"

// In a real app, this would fetch from your API
const fetchDashboardStats = async () => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return {
    revenue: {
      current: 24780,
      previous: 22025,
      percentChange: 12.5,
    },
    orders: {
      current: 356,
      previous: 329,
      percentChange: 8.2,
    },
    customers: {
      current: 1245,
      previous: 1182,
      percentChange: 5.3,
    },
    products: {
      current: 86,
      previous: 88,
      percentChange: -2.1,
    },
  }
}

export default function DashboardStats() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getStats = async () => {
      try {
        const data = await fetchDashboardStats()
        setStats(data)
      } catch (error) {
        console.error("Error fetching dashboard stats:", error)
      } finally {
        setLoading(false)
      }
    }

    getStats()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="h-12 w-12 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
              <div className="flex items-center mt-4">
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <h3 className="text-2xl font-bold">${stats.revenue.current.toLocaleString()}</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div className="flex items-center mt-4">{/* Placeholder for additional content */}</div>
          <div className="flex items-center mt-4">
            {stats.revenue.percentChange > 0 ? (
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
            )}
            <span
              className={`text-sm font-medium ${stats.revenue.percentChange > 0 ? "text-green-500" : "text-red-500"}`}
            >
              {stats.revenue.percentChange > 0 ? "+" : ""}
              {stats.revenue.percentChange}%
            </span>
            <span className="text-sm text-gray-500 ml-1">from last month</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Orders</p>
              <h3 className="text-2xl font-bold">{stats.orders.current}</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <ShoppingCart className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            {stats.orders.percentChange > 0 ? (
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
            )}
            <span
              className={`text-sm font-medium ${stats.orders.percentChange > 0 ? "text-green-500" : "text-red-500"}`}
            >
              {stats.orders.percentChange > 0 ? "+" : ""}
              {stats.orders.percentChange}%
            </span>
            <span className="text-sm text-gray-500 ml-1">from last month</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Customers</p>
              <h3 className="text-2xl font-bold">{stats.customers.current}</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            {stats.customers.percentChange > 0 ? (
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
            )}
            <span
              className={`text-sm font-medium ${stats.customers.percentChange > 0 ? "text-green-500" : "text-red-500"}`}
            >
              {stats.customers.percentChange > 0 ? "+" : ""}
              {stats.customers.percentChange}%
            </span>
            <span className="text-sm text-gray-500 ml-1">from last month</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Products</p>
              <h3 className="text-2xl font-bold">{stats.products.current}</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
              <Package className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            {stats.products.percentChange > 0 ? (
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
            )}
            <span
              className={`text-sm font-medium ${stats.products.percentChange > 0 ? "text-green-500" : "text-red-500"}`}
            >
              {stats.products.percentChange > 0 ? "+" : ""}
              {stats.products.percentChange}%
            </span>
            <span className="text-sm text-gray-500 ml-1">from last month</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
