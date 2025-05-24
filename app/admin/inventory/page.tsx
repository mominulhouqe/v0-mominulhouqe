"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Search,
  Filter,
  ArrowUpDown,
  MoreHorizontal,
  Edit,
  Package,
  AlertTriangle,
  Download,
  Upload,
  Plus,
  History,
  RefreshCw,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getProducts } from "@/lib/products"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export default function InventoryPage() {
  const router = useRouter()
  const [products, setProducts] = useState(getProducts({}))
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined)
  const [selectedStockStatus, setSelectedStockStatus] = useState<string | undefined>(undefined)
  const [showBatchUpdateDialog, setShowBatchUpdateDialog] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [batchUpdateQuantity, setBatchUpdateQuantity] = useState(0)

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = !selectedCategory || product.category === selectedCategory

    const stockStatus = getStockStatus(product.stock || 0)
    const matchesStockStatus = !selectedStockStatus || stockStatus === selectedStockStatus

    return matchesSearch && matchesCategory && matchesStockStatus
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would fetch products based on the search query
    console.log("Searching for:", searchQuery)
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value === "all" ? undefined : value)
  }

  const handleStockStatusChange = (value: string) => {
    setSelectedStockStatus(value === "all" ? undefined : value)
  }

  const getStockStatus = (stock: number) => {
    if (stock <= 0) return "out_of_stock"
    if (stock < 10) return "low_stock"
    return "in_stock"
  }

  const getStockStatusBadge = (stock: number) => {
    const status = getStockStatus(stock)
    switch (status) {
      case "out_of_stock":
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" /> Out of Stock
          </Badge>
        )
      case "low_stock":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" /> Low Stock
          </Badge>
        )
      case "in_stock":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            In Stock
          </Badge>
        )
      default:
        return null
    }
  }

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const selectAllProducts = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(filteredProducts.map((product) => product.id))
    }
  }

  const handleBatchUpdate = () => {
    // In a real app, you would make an API call to update the stock
    const updatedProducts = products.map((product) => {
      if (selectedProducts.includes(product.id)) {
        return {
          ...product,
          stock: (product.stock || 0) + batchUpdateQuantity,
        }
      }
      return product
    })
    setProducts(updatedProducts)
    setShowBatchUpdateDialog(false)
    setSelectedProducts([])
    setBatchUpdateQuantity(0)
  }

  const updateProductStock = (productId: string, newStock: number) => {
    // In a real app, you would make an API call to update the stock
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          stock: newStock,
        }
      }
      return product
    })
    setProducts(updatedProducts)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Inventory Management</h1>
          <p className="text-gray-500">Track and manage your product inventory</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={() => setShowBatchUpdateDialog(true)}
            disabled={selectedProducts.length === 0}
          >
            <RefreshCw className="h-4 w-4 mr-2" /> Batch Update
          </Button>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" /> Import
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
          <Button asChild>
            <a href="/admin/inventory/logs">
              <History className="h-4 w-4 mr-2" /> Inventory Logs
            </a>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Products</TabsTrigger>
          <TabsTrigger value="low_stock">Low Stock</TabsTrigger>
          <TabsTrigger value="out_of_stock">Out of Stock</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Product Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <form onSubmit={handleSearch} className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="search"
                      placeholder="Search products..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </form>
                <div className="flex gap-2">
                  <Select value={selectedCategory || "all"} onValueChange={handleCategoryChange}>
                    <SelectTrigger className="w-[180px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="men">Men's Clothing</SelectItem>
                      <SelectItem value="women">Women's Clothing</SelectItem>
                      <SelectItem value="accessories">Accessories</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedStockStatus || "all"} onValueChange={handleStockStatusChange}>
                    <SelectTrigger className="w-[180px]">
                      <Package className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="All Stock Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Stock Status</SelectItem>
                      <SelectItem value="in_stock">In Stock</SelectItem>
                      <SelectItem value="low_stock">Low Stock</SelectItem>
                      <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <input
                          type="checkbox"
                          checked={selectedProducts.length > 0 && selectedProducts.length === filteredProducts.length}
                          onChange={selectAllProducts}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                      </TableHead>
                      <TableHead className="w-[80px]">Image</TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          Product
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead className="text-center">
                        <div className="flex items-center justify-center">
                          Stock
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                          No products found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <input
                              type="checkbox"
                              checked={selectedProducts.includes(product.id)}
                              onChange={() => toggleProductSelection(product.id)}
                              className="h-4 w-4 rounded border-gray-300"
                            />
                          </TableCell>
                          <TableCell>
                            <div className="h-10 w-10 rounded bg-gray-100 relative overflow-hidden">
                              <img
                                src={product.imageUrl || "/placeholder.svg"}
                                alt={product.name}
                                className="absolute inset-0 w-full h-full object-cover"
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-gray-500 truncate max-w-[250px]">{product.description}</div>
                          </TableCell>
                          <TableCell>
                            <div className="font-mono text-sm">SKU-{product.id}</div>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateProductStock(product.id, Math.max(0, (product.stock || 0) - 1))}
                              >
                                -
                              </Button>
                              <span className="w-12 text-center">{product.stock || 0}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateProductStock(product.id, (product.stock || 0) + 1)}
                              >
                                +
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">{getStockStatusBadge(product.stock || 0)}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => router.push(`/admin/products/${product.id}/edit`)}>
                                  <Edit className="h-4 w-4 mr-2" /> Edit Product
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => router.push(`/admin/inventory/history/${product.id}`)}>
                                  <History className="h-4 w-4 mr-2" /> View History
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Plus className="h-4 w-4 mr-2" /> Add Stock
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
        </TabsContent>

        <TabsContent value="low_stock" className="mt-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Low Stock Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Image</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead className="text-center">Stock</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products
                      .filter((product) => (product.stock || 0) > 0 && (product.stock || 0) < 10)
                      .map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div className="h-10 w-10 rounded bg-gray-100 relative overflow-hidden">
                              <img
                                src={product.imageUrl || "/placeholder.svg"}
                                alt={product.name}
                                className="absolute inset-0 w-full h-full object-cover"
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{product.name}</div>
                          </TableCell>
                          <TableCell>
                            <div className="font-mono text-sm">SKU-{product.id}</div>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                              {product.stock} left
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button size="sm" onClick={() => router.push(`/admin/inventory/restock/${product.id}`)}>
                              <Plus className="h-4 w-4 mr-2" /> Add Stock
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="out_of_stock" className="mt-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Out of Stock Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Image</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products
                      .filter((product) => (product.stock || 0) <= 0)
                      .map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div className="h-10 w-10 rounded bg-gray-100 relative overflow-hidden">
                              <img
                                src={product.imageUrl || "/placeholder.svg"}
                                alt={product.name}
                                className="absolute inset-0 w-full h-full object-cover"
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{product.name}</div>
                          </TableCell>
                          <TableCell>
                            <div className="font-mono text-sm">SKU-{product.id}</div>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge variant="destructive">Out of Stock</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button size="sm" onClick={() => router.push(`/admin/inventory/restock/${product.id}`)}>
                              <Plus className="h-4 w-4 mr-2" /> Add Stock
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Batch Update Dialog */}
      <Dialog open={showBatchUpdateDialog} onOpenChange={setShowBatchUpdateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Batch Update Stock</DialogTitle>
            <DialogDescription>
              Update stock quantity for {selectedProducts.length} selected products.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="update-type">Update Type</Label>
              <Select defaultValue="add">
                <SelectTrigger>
                  <SelectValue placeholder="Select update type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="add">Add Stock</SelectItem>
                  <SelectItem value="subtract">Subtract Stock</SelectItem>
                  <SelectItem value="set">Set Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="0"
                value={batchUpdateQuantity}
                onChange={(e) => setBatchUpdateQuantity(Number.parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Reason (Optional)</Label>
              <Input id="reason" placeholder="e.g., New shipment arrived" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBatchUpdateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleBatchUpdate}>Update Stock</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
