"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Search, MoreHorizontal, Edit, Trash, Copy, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// Mock discounts data
const discounts = [
  {
    id: "DISC-1234",
    code: "SUMMER23",
    type: "percentage",
    value: 20,
    minPurchase: 50,
    maxDiscount: 100,
    startDate: "2023-06-01",
    endDate: "2023-08-31",
    usageLimit: 1000,
    usageCount: 342,
    isActive: true,
  },
  {
    id: "DISC-5678",
    code: "WELCOME10",
    type: "percentage",
    value: 10,
    minPurchase: 0,
    maxDiscount: null,
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    usageLimit: null,
    usageCount: 1245,
    isActive: true,
  },
  {
    id: "DISC-9012",
    code: "FREESHIP",
    type: "fixed",
    value: 5,
    minPurchase: 30,
    maxDiscount: null,
    startDate: "2023-05-15",
    endDate: "2023-07-15",
    usageLimit: 500,
    usageCount: 123,
    isActive: true,
  },
  {
    id: "DISC-3456",
    code: "FLASH50",
    type: "percentage",
    value: 50,
    minPurchase: 100,
    maxDiscount: 200,
    startDate: "2023-05-20",
    endDate: "2023-05-22",
    usageLimit: 200,
    usageCount: 198,
    isActive: false,
  },
  {
    id: "DISC-7890",
    code: "LOYALTY25",
    type: "percentage",
    value: 25,
    minPurchase: 75,
    maxDiscount: 150,
    startDate: "2023-06-15",
    endDate: "2023-09-15",
    usageLimit: 300,
    usageCount: 0,
    isActive: true,
  },
]

export default function DiscountsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [showExpired, setShowExpired] = useState(false)

  const today = new Date().toISOString().split("T")[0]

  const filteredDiscounts = discounts.filter((discount) => {
    const matchesSearch = discount.code.toLowerCase().includes(searchQuery.toLowerCase())
    const isExpired = discount.endDate < today
    return matchesSearch && (showExpired || !isExpired)
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would fetch discounts based on the search query
    console.log("Searching for:", searchQuery)
  }

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    // In a real app, you would show a toast notification
    console.log(`Copied ${code} to clipboard`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Discounts & Coupons</h1>
          <p className="text-gray-500">Manage promotional discounts and coupon codes</p>
        </div>
        <Button asChild>
          <a href="/admin/discounts/new">
            <Plus className="h-4 w-4 mr-2" /> Create Discount
          </a>
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Discount List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search by code..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
            <div className="flex items-center space-x-2">
              <Switch id="show-expired" checked={showExpired} onCheckedChange={setShowExpired} />
              <Label htmlFor="show-expired">Show expired</Label>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Validity</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDiscounts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No discounts found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDiscounts.map((discount) => {
                    const isExpired = discount.endDate < today
                    const isActive = discount.isActive && !isExpired

                    return (
                      <TableRow key={discount.id}>
                        <TableCell>
                          <div className="font-medium">{discount.code}</div>
                          <div className="text-sm text-gray-500">{discount.id}</div>
                        </TableCell>
                        <TableCell>
                          <div>
                            {discount.type === "percentage"
                              ? `${discount.value}% off`
                              : `$${discount.value.toFixed(2)} off`}
                          </div>
                          {discount.minPurchase > 0 && (
                            <div className="text-sm text-gray-500">
                              Min. purchase: ${discount.minPurchase.toFixed(2)}
                            </div>
                          )}
                          {discount.maxDiscount && (
                            <div className="text-sm text-gray-500">
                              Max. discount: ${discount.maxDiscount.toFixed(2)}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                            <span>
                              {new Date(discount.startDate).toLocaleDateString()} -{" "}
                              {new Date(discount.endDate).toLocaleDateString()}
                            </span>
                          </div>
                          {isExpired && <div className="text-sm text-red-500">Expired</div>}
                        </TableCell>
                        <TableCell>
                          <div>
                            {discount.usageCount} / {discount.usageLimit ? discount.usageLimit : "∞"}
                          </div>
                          {discount.usageLimit && (
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                              <div
                                className="bg-primary h-1.5 rounded-full"
                                style={{
                                  width: `${Math.min(100, (discount.usageCount / discount.usageLimit) * 100)}%`,
                                }}
                              ></div>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {isActive ? (
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
                              <DropdownMenuItem onClick={() => router.push(`/admin/discounts/${discount.id}/edit`)}>
                                <Edit className="h-4 w-4 mr-2" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => copyToClipboard(discount.code)}>
                                <Copy className="h-4 w-4 mr-2" /> Copy Code
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash className="h-4 w-4 mr-2" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
