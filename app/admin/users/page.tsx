"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Search, MoreHorizontal, Edit, Trash, Shield, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock users data
const users = [
  {
    id: "USER-1234",
    name: "John Admin",
    email: "john.admin@example.com",
    role: "admin",
    lastLogin: "2023-05-15T10:30:00Z",
    status: "active",
  },
  {
    id: "USER-5678",
    name: "Sarah Manager",
    email: "sarah.manager@example.com",
    role: "manager",
    lastLogin: "2023-05-14T14:45:00Z",
    status: "active",
  },
  {
    id: "USER-9012",
    name: "Mike Editor",
    email: "mike.editor@example.com",
    role: "editor",
    lastLogin: "2023-05-13T09:15:00Z",
    status: "active",
  },
  {
    id: "USER-3456",
    name: "Lisa Staff",
    email: "lisa.staff@example.com",
    role: "staff",
    lastLogin: "2023-05-10T16:20:00Z",
    status: "inactive",
  },
  {
    id: "USER-7890",
    name: "David Viewer",
    email: "david.viewer@example.com",
    role: "viewer",
    lastLogin: "2023-05-08T11:10:00Z",
    status: "active",
  },
]

export default function UsersPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would fetch users based on the search query
    console.log("Searching for:", searchQuery)
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Admin
          </Badge>
        )
      case "manager":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            Manager
          </Badge>
        )
      case "editor":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Editor
          </Badge>
        )
      case "staff":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Staff
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            Viewer
          </Badge>
        )
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-gray-500">Manage admin users and permissions</p>
        </div>
        <Button asChild>
          <a href="/admin/users/new">
            <Plus className="h-4 w-4 mr-2" /> Add User
          </a>
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Admin Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search users..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>
                        {new Date(user.lastLogin).toLocaleDateString()} at{" "}
                        {new Date(user.lastLogin).toLocaleTimeString()}
                      </TableCell>
                      <TableCell className="text-center">
                        {user.status === "active" ? (
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
                            <DropdownMenuItem onClick={() => router.push(`/admin/users/${user.id}/edit`)}>
                              <Edit className="h-4 w-4 mr-2" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Shield className="h-4 w-4 mr-2" /> Change Role
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="h-4 w-4 mr-2" /> Send Email
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash className="h-4 w-4 mr-2" /> Delete
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
