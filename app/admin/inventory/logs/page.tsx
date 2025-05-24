"use client"

import type React from "react"

import { useState } from "react"
import { Calendar, Search, Filter, ArrowUpDown, Package, ArrowUp, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { addDays } from "date-fns"

// Mock inventory logs data
const inventoryLogs = [
  {
    id: "LOG-1234",
    productId: "1",
    productName: "Classic Cotton T-Shirt",
    type: "add",
    quantity: 20,
    previousStock: 5,
    newStock: 25,
    reason: "New shipment arrived",
    user: "John Admin",
    timestamp: "2023-05-15T10:30:00Z",
  },
  {
    id: "LOG-5678",
    productId: "2",
    productName: "Slim Fit Jeans",
    type: "subtract",
    quantity: 2,
    previousStock: 20,
    newStock: 18,
    reason: "Inventory adjustment",
    user: "Sarah Manager",
    timestamp: "2023-05-14T14:45:00Z",
  },
  {
    id: "LOG-9012",
    productId: "3",
    productName: "Floral Summer Dress",
    type: "add",
    quantity: 10,
    previousStock: 2,
    newStock: 12,
    reason: "Restocking",
    user: "John Admin",
    timestamp: "2023-05-13T09:15:00Z",
  },
  {
    id: "LOG-3456",
    productId: "4",
    productName: "Leather Jacket",
    type: "subtract",
    quantity: 1,
    previousStock: 9,
    newStock: 8,
    reason: "Damaged item",
    user: "Sarah Manager",
    timestamp: "2023-05-12T16:20:00Z",
  },
  {
    id: "LOG-7890",
    productId: "5",
    productName: "Running Shoes",
    type: "set",
    quantity: 15,
    previousStock: 10,
    newStock: 15,
    reason: "Inventory count",
    user: "John Admin",
    timestamp: "2023-05-11T11:10:00Z",
  },
]

export default function InventoryLogsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string | undefined>(undefined)
  const [date, setDate] = useState({
    from: addDays(new Date(), -30),
    to: new Date(),
  })

  const filteredLogs = inventoryLogs.filter((log) => {
    const matchesSearch =
      log.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.productId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.reason.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = !selectedType || log.type === selectedType

    // In a real app, you would also filter by date range
    // For this example, we'll assume all logs match the date range

    return matchesSearch && matchesType
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would fetch logs based on the search query
    console.log("Searching for:", searchQuery)
  }

  const handleTypeChange = (value: string) => {
    setSelectedType(value === "all" ? undefined : value)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "add":
        return <ArrowUp className="h-4 w-4 text-green-500" />
      case "subtract":
        return <ArrowDown className="h-4 w-4 text-red-500" />
      case "set":
        return <Package className="h-4 w-4 text-blue-500" />
      default:
        return null
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "add":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Added
          </Badge>
        )
      case "subtract":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Subtracted
          </Badge>
        )
      case "set":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Set
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Inventory Logs</h1>
          <p className="text-gray-500">Track all inventory changes</p>
        </div>
        <Button variant="outline">
          <Calendar className="h-4 w-4 mr-2" /> Export Logs
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Inventory Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search logs..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
            <div className="flex gap-2">
              <Select value={selectedType || "all"} onValueChange={handleTypeChange}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="add">Added</SelectItem>
                  <SelectItem value="subtract">Subtracted</SelectItem>
                  <SelectItem value="set">Set</SelectItem>
                </SelectContent>
              </Select>
              <DatePickerWithRange date={date} setDate={setDate} />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <div className="flex items-center">
                      Date & Time
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-center">Stock Change</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Reason</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No logs found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>
                        <div className="font-medium">{new Date(log.timestamp).toLocaleDateString()}</div>
                        <div className="text-sm text-gray-500">{new Date(log.timestamp).toLocaleTimeString()}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{log.productName}</div>
                        <div className="text-sm text-gray-500">SKU-{log.productId}</div>
                      </TableCell>
                      <TableCell>{getTypeBadge(log.type)}</TableCell>
                      <TableCell className="text-center">
                        <div className="font-medium">{log.quantity}</div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          {getTypeIcon(log.type)}
                          <span>
                            {log.previousStock} → {log.newStock}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>{log.reason}</TableCell>
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
