"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { format, subDays, subMonths } from "date-fns"
import { Button } from "@/components/ui/button"
import { Download, Calendar, TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for charts
const salesData = [
  { name: "Jan", sales: 4000, orders: 120 },
  { name: "Feb", sales: 3000, orders: 90 },
  { name: "Mar", sales: 5000, orders: 150 },
  { name: "Apr", sales: 4500, orders: 135 },
  { name: "May", sales: 6000, orders: 180 },
  { name: "Jun", sales: 5500, orders: 165 },
  { name: "Jul", sales: 7000, orders: 210 },
  { name: "Aug", sales: 6500, orders: 195 },
  { name: "Sep", sales: 8000, orders: 240 },
  { name: "Oct", sales: 7500, orders: 225 },
  { name: "Nov", sales: 9000, orders: 270 },
  { name: "Dec", sales: 10000, orders: 300 },
]

const dailySalesData = [
  { name: "Mon", sales: 1200 },
  { name: "Tue", sales: 1900 },
  { name: "Wed", sales: 1500 },
  { name: "Thu", sales: 2100 },
  { name: "Fri", sales: 2500 },
  { name: "Sat", sales: 1800 },
  { name: "Sun", sales: 1400 },
]

const categoryData = [
  { name: "Men's Clothing", value: 35 },
  { name: "Women's Clothing", value: 45 },
  { name: "Accessories", value: 20 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

const topProducts = [
  { id: "1", name: "Classic Cotton T-Shirt", category: "Men's Clothing", sales: 120, revenue: 2998.8 },
  { id: "3", name: "Floral Summer Dress", category: "Women's Clothing", sales: 95, revenue: 3799.05 },
  { id: "2", name: "Slim Fit Jeans", category: "Men's Clothing", sales: 85, revenue: 4249.15 },
  { id: "4", name: "Leather Jacket", category: "Women's Clothing", sales: 65, revenue: 8449.35 },
  { id: "5", name: "Running Shoes", category: "Accessories", sales: 60, revenue: 5399.4 },
]

export default function AnalyticsPage() {
  const [date, setDate] = useState({
    from: subMonths(new Date(), 1),
    to: new Date(),
  })

  const [dateRange, setDateRange] = useState("30days")

  const handleDateRangeChange = (value: string) => {
    setDateRange(value)
    const today = new Date()

    switch (value) {
      case "7days":
        setDate({
          from: subDays(today, 7),
          to: today,
        })
        break
      case "30days":
        setDate({
          from: subDays(today, 30),
          to: today,
        })
        break
      case "90days":
        setDate({
          from: subDays(today, 90),
          to: today,
        })
        break
      case "year":
        setDate({
          from: subDays(today, 365),
          to: today,
        })
        break
      default:
        break
    }
  }

  // Calculate summary metrics
  const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0)
  const totalOrders = salesData.reduce((sum, item) => sum + item.orders, 0)
  const averageOrderValue = totalSales / totalOrders

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Sales Analytics</h1>
          <p className="text-gray-500">Track your store performance and sales metrics</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={dateRange} onValueChange={handleDateRangeChange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
          {dateRange === "custom" && <DatePickerWithRange date={date} setDate={setDate} />}
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" /> Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <h3 className="text-2xl font-bold">${totalSales.toLocaleString()}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm font-medium text-green-500">+12.5%</span>
              <span className="text-sm text-gray-500 ml-1">from previous period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Orders</p>
                <h3 className="text-2xl font-bold">{totalOrders.toLocaleString()}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm font-medium text-green-500">+8.2%</span>
              <span className="text-sm text-gray-500 ml-1">from previous period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Average Order Value</p>
                <h3 className="text-2xl font-bold">${averageOrderValue.toFixed(2)}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm font-medium text-green-500">+3.7%</span>
              <span className="text-sm text-gray-500 ml-1">from previous period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
                <h3 className="text-2xl font-bold">3.2%</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Package className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
              <span className="text-sm font-medium text-red-500">-1.2%</span>
              <span className="text-sm text-gray-500 ml-1">from previous period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
              <CardDescription>
                {format(date.from || new Date(), "PPP")} - {format(date.to || new Date(), "PPP")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                    <Legend />
                    <Line type="monotone" dataKey="sales" name="Revenue" stroke="#3b82f6" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Orders</CardTitle>
                <CardDescription>Daily order trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dailySalesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="sales" name="Orders" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
                <CardDescription>Distribution of sales by product category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
              <CardDescription>Products with the highest sales volume</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Units Sold</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell className="text-right">{product.sales}</TableCell>
                        <TableCell className="text-right">${product.revenue.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Acquisition</CardTitle>
                <CardDescription>New customers over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="orders" name="New Customers" stroke="#3b82f6" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Demographics</CardTitle>
                <CardDescription>Customer age distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { age: "18-24", count: 120 },
                        { age: "25-34", count: 250 },
                        { age: "35-44", count: 180 },
                        { age: "45-54", count: 90 },
                        { age: "55+", count: 40 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="age" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" name="Customers" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
