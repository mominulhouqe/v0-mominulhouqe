"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, ArrowUpDown, MoreHorizontal, Eye, Mail, Download, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock customers data
const customers = [
  {
    id: "CUST-1234",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+880 1XXX-XXXXXX",
    orders: 5,
    totalSpent: 249.95,
    lastOrder: "2023-05-15",
    status: "active",
  },
  {
    id: "CUST-5678",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+880 1XXX-XXXXXX",
    orders: 3,
    totalSpent: 189.97,
    lastOrder: "2023-05-10",
    status: "active",
  },
  {
    id: "CUST-9012",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    phone: "+880 1XXX-XXXXXX",
    orders: 1,
    totalSpent: 59.99,
    lastOrder: "2023-05-08",
    status: "active",
  },
  {
    id: "CUST-3456",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+880 1XXX-XXXXXX",
    orders: 8,
    totalSpent: 429.92,
    lastOrder: "2023-05-14",
    status: "active",
  },
  {
    id: "CUST-7890",
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    phone: "+880 1XXX-XXXXXX",
    orders: 0,
    totalSpent: 0,
    lastOrder: null,
    status: "inactive",
  },
]

export default function CustomersPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCustomers = customers.filter((customer) => {
    return (
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would fetch customers based on the search query
    console.log("Searching for:", searchQuery)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Customers</h1>
          <p className="text-gray-500">Manage your customer accounts</p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" /> Add Customer
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Customer List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search customers..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" /> Export
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <div className="flex items-center">
                      Customer
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead className="text-center">Orders</TableHead>
                  <TableHead className="text-right">Total Spent</TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      Last Order
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No customers found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-gray-500">{customer.id}</div>
                      </TableCell>
                      <TableCell>
                        <div>{customer.email}</div>
                        <div className="text-sm text-gray-500">{customer.phone}</div>
                      </TableCell>
                      <TableCell className="text-center">{customer.orders}</TableCell>
                      <TableCell className="text-right">${customer.totalSpent.toFixed(2)}</TableCell>
                      <TableCell>
                        {customer.lastOrder ? new Date(customer.lastOrder).toLocaleDateString() : "Never"}
                      </TableCell>
                      <TableCell className="text-center">
                        {customer.status === "active" ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                            Inactive
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => router.push(`/admin/customers/${customer.id}`)}>
                              <Eye className="h-4 w-4 mr-2" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="h-4 w-4 mr-2" /> Send Email
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
