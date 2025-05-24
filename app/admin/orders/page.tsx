"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Search,
  Filter,
  ArrowUpDown,
  MoreHorizontal,
  Eye,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  Truck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"

// Mock orders data
const orders = [
  {
    id: "ORD-1234",
    customer: {
      name: "John Doe",
      email: "john.doe@example.com",
    },
    date: "2023-05-15",
    status: "delivered",
    paymentStatus: "paid",
    paymentMethod: "bkash",
    total: 129.99,
    items: 3,
  },
  {
    id: "ORD-5678",
    customer: {
      name: "Jane Smith",
      email: "jane.smith@example.com",
    },
    date: "2023-05-14",
    status: "processing",
    paymentStatus: "paid",
    paymentMethod: "bkash",
    total: 89.99,
    items: 2,
  },
  {
    id: "ORD-9012",
    customer: {
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
    },
    date: "2023-05-14",
    status: "pending",
    paymentStatus: "pending",
    paymentMethod: "cod",
    total: 59.99,
    items: 1,
  },
  {
    id: "ORD-3456",
    customer: {
      name: "Emily Davis",
      email: "emily.davis@example.com",
    },
    date: "2023-05-13",
    status: "delivered",
    paymentStatus: "paid",
    paymentMethod: "bkash",
    total: 149.99,
    items: 4,
  },
  {
    id: "ORD-7890",
    customer: {
      name: "Michael Wilson",
      email: "michael.wilson@example.com",
    },
    date: "2023-05-12",
    status: "cancelled",
    paymentStatus: "refunded",
    paymentMethod: "bkash",
    total: 79.99,
    items: 2,
  },
]

export default function OrdersPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(searchParams.get("status") || undefined)

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = !selectedStatus || order.status === selectedStatus

    return matchesSearch && matchesStatus
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would fetch orders based on the search query
    console.log("Searching for:", searchQuery)
  }

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value === "all" ? undefined : value)
    // In a real app, you would update the URL and fetch orders based on the status
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <Clock className="h-3 w-3 mr-1" /> Pending
          </Badge>
        )
      case "processing":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Truck className="h-3 w-3 mr-1" /> Processing
          </Badge>
        )
      case "delivered":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" /> Delivered
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <XCircle className="h-3 w-3 mr-1" /> Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Paid
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pending
          </Badge>
        )
      case "refunded":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            Refunded
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Orders</h1>
        <p className="text-gray-500">Manage customer orders</p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Order List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search orders..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
            <div className="flex gap-2">
              <Select value={selectedStatus || "all"} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" /> Export
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <div className="flex items-center">
                      Order ID
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      Date
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No orders found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div>{order.customer.name}</div>
                        <div className="text-sm text-gray-500">{order.customer.email}</div>
                      </TableCell>
                      <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          {getPaymentStatusBadge(order.paymentStatus)}
                          <span className="text-xs text-gray-500">
                            {order.paymentMethod === "bkash" ? "bKash" : "Cash on Delivery"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div>{formatCurrency(order.total)}</div>
                        <div className="text-xs text-gray-500">{order.items} items</div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => router.push(`/admin/orders/${order.id}`)}>
                              <Eye className="h-4 w-4 mr-2" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Truck className="h-4 w-4 mr-2" /> Update Status
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
