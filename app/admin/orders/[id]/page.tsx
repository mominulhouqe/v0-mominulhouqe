"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft, Package, Truck, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { formatCurrency } from "@/lib/utils"
import { OrderStatusUpdate } from "@/components/admin/order-status-update"

// Mock order data - in a real app, you would fetch this from your API
const mockOrder = {
  id: "ORD-12345",
  date: "2023-05-15T10:30:00Z",
  customer: {
    id: "CUST-789",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+880 1234-567890",
    address: "123 Main St, Apt 4B",
    city: "Dhaka",
    state: "Dhaka",
    postalCode: "1000",
    country: "Bangladesh",
  },
  items: [
    {
      id: "PROD-001",
      name: "Classic White T-Shirt",
      price: 24.99,
      quantity: 2,
      selectedSize: "M",
    },
    {
      id: "PROD-002",
      name: "Slim Fit Jeans",
      price: 49.99,
      quantity: 1,
      selectedSize: "32",
    },
  ],
  subtotal: 99.97,
  shipping: 5.99,
  total: 105.96,
  paymentMethod: "bkash",
  paymentStatus: "paid",
  transactionId: "BKH123456789",
  status: "processing",
  notes: "Please leave at the front door",
}

export default function OrderDetailPage() {
  const params = useParams()
  const orderId = params.id as string
  const [order, setOrder] = useState(mockOrder)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, you would fetch the order data from your API
    // Example: fetchOrderById(orderId).then(data => setOrder(data))
    setLoading(false)
  }, [orderId])

  const handleStatusUpdate = (newStatus: string) => {
    setOrder({ ...order, status: newStatus })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-amber-100 text-amber-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing":
        return <Package className="h-4 w-4" />
      case "shipped":
        return <Truck className="h-4 w-4" />
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      case "cancelled":
        return <AlertCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <a href="/admin/orders">
              <ArrowLeft className="h-4 w-4" />
            </a>
          </Button>
          <h1 className="text-2xl font-bold">Order #{order.id}</h1>
          <Badge className={`ml-2 ${getStatusColor(order.status)} flex items-center gap-1`}>
            {getStatusIcon(order.status)}
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Badge>
        </div>
        <div className="text-sm text-gray-500">{new Date(order.date).toLocaleString()}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue="details">
            <TabsList className="mb-4">
              <TabsTrigger value="details">Order Details</TabsTrigger>
              <TabsTrigger value="customer">Customer</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center border-b pb-4">
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-gray-500">
                            Qty: {item.quantity} {item.selectedSize && `• Size: ${item.selectedSize}`}
                          </div>
                        </div>
                        <div className="text-right">
                          <div>{formatCurrency(item.price)}</div>
                          <div className="font-medium">{formatCurrency(item.price * item.quantity)}</div>
                        </div>
                      </div>
                    ))}

                    <div className="pt-4 space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>{formatCurrency(order.subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>{formatCurrency(order.shipping)}</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>{formatCurrency(order.total)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Method</span>
                        <span className="font-medium">
                          {order.paymentMethod === "cod" ? "Cash on Delivery" : "bKash"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Status</span>
                        <Badge variant={order.paymentStatus === "paid" ? "default" : "outline"}>
                          {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                        </Badge>
                      </div>
                      {order.transactionId && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Transaction ID</span>
                          <span className="font-mono text-sm">{order.transactionId}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Address</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      <p className="font-medium">
                        {order.customer.firstName} {order.customer.lastName}
                      </p>
                      <p>{order.customer.address}</p>
                      <p>
                        {order.customer.city}, {order.customer.state} {order.customer.postalCode}
                      </p>
                      <p>{order.customer.country}</p>
                      <p className="pt-2 text-sm text-gray-500">{order.customer.phone}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {order.notes && (
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Order Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{order.notes}</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="customer">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium">Contact Information</h3>
                      <div className="mt-2 space-y-1">
                        <p>
                          <span className="text-gray-500">Name:</span> {order.customer.firstName}{" "}
                          {order.customer.lastName}
                        </p>
                        <p>
                          <span className="text-gray-500">Email:</span> {order.customer.email}
                        </p>
                        <p>
                          <span className="text-gray-500">Phone:</span> {order.customer.phone}
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium">Shipping Address</h3>
                      <div className="mt-2 space-y-1">
                        <p>{order.customer.address}</p>
                        <p>
                          {order.customer.city}, {order.customer.state} {order.customer.postalCode}
                        </p>
                        <p>{order.customer.country}</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between">
                      <Button variant="outline" asChild>
                        <a href={`/admin/customers/${order.customer.id}`}>View Customer Profile</a>
                      </Button>
                      <Button variant="outline" asChild>
                        <a href={`mailto:${order.customer.email}`}>Send Email</a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>Timeline of events for this order</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex">
                      <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Order Created</p>
                        <p className="text-sm text-gray-500">{new Date(order.date).toLocaleString()}</p>
                        <p className="text-sm mt-1">Order was placed by customer</p>
                      </div>
                    </div>

                    {/* Additional history items would be dynamically generated based on order events */}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <OrderStatusUpdate order={order} onStatusUpdate={handleStatusUpdate} />
        </div>
      </div>
    </div>
  )
}
