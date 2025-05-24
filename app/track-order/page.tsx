"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Package, Truck, CheckCircle, AlertCircle, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import OrderTrackingTimeline from "@/components/order-tracking-timeline"

const formSchema = z.object({
  orderId: z.string().min(1, "Order ID is required"),
  email: z.string().email("Invalid email address"),
})

type FormValues = z.infer<typeof formSchema>

// Mock order data - in production, this would come from your database
const mockOrders = [
  {
    id: "ORD-1234",
    customer: {
      email: "test@example.com",
    },
    date: "2023-05-15T10:30:00Z",
    status: "delivered",
    items: [
      { name: "Classic Cotton T-Shirt", quantity: 2, price: 24.99 },
      { name: "Slim Fit Jeans", quantity: 1, price: 49.99 },
    ],
    total: 129.99,
    tracking: {
      carrier: "DHL Express",
      number: "DHL4587458745",
      url: "https://www.dhl.com/track/DHL4587458745",
      estimatedDelivery: "2023-05-20",
    },
    timeline: [
      { status: "order_placed", date: "2023-05-15T10:30:00Z", description: "Order placed successfully" },
      { status: "payment_confirmed", date: "2023-05-15T10:35:00Z", description: "Payment confirmed" },
      { status: "processing", date: "2023-05-16T09:15:00Z", description: "Order is being processed" },
      { status: "shipped", date: "2023-05-17T14:20:00Z", description: "Order shipped via DHL Express" },
      { status: "out_for_delivery", date: "2023-05-19T08:45:00Z", description: "Out for delivery" },
      { status: "delivered", date: "2023-05-19T15:30:00Z", description: "Delivered successfully" },
    ],
  },
  {
    id: "ORD-5678",
    customer: {
      email: "user@example.com",
    },
    date: "2023-05-18T14:20:00Z",
    status: "shipped",
    items: [{ name: "Leather Jacket", quantity: 1, price: 129.99 }],
    total: 129.99,
    tracking: {
      carrier: "FedEx",
      number: "FDX123456789",
      url: "https://www.fedex.com/track/FDX123456789",
      estimatedDelivery: "2023-05-25",
    },
    timeline: [
      { status: "order_placed", date: "2023-05-18T14:20:00Z", description: "Order placed successfully" },
      { status: "payment_confirmed", date: "2023-05-18T14:25:00Z", description: "Payment confirmed" },
      { status: "processing", date: "2023-05-19T10:30:00Z", description: "Order is being processed" },
      { status: "shipped", date: "2023-05-20T11:45:00Z", description: "Order shipped via FedEx" },
    ],
  },
]

export default function TrackOrderPage() {
  const { toast } = useToast()
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orderId: "",
      email: "",
    },
  })

  const onSubmit = async (data: FormValues) => {
    setLoading(true)

    try {
      // In production, this would be an API call to your backend
      // For now, we'll simulate with a timeout and mock data
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Find the order in our mock data
      const order = mockOrders.find((order) => order.id === data.orderId && order.customer.email === data.email)

      if (order) {
        setOrderDetails(order)
      } else {
        toast({
          title: "Order not found",
          description: "We couldn't find an order with the provided details. Please check and try again.",
          variant: "destructive",
        })
        setOrderDetails(null)
      }
    } catch (error) {
      console.error("Error fetching order:", error)
      toast({
        title: "Error tracking order",
        description: "There was a problem tracking your order. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing":
        return <Clock className="h-8 w-8 text-blue-500" />
      case "shipped":
        return <Truck className="h-8 w-8 text-blue-500" />
      case "out_for_delivery":
        return <Package className="h-8 w-8 text-orange-500" />
      case "delivered":
        return <CheckCircle className="h-8 w-8 text-green-500" />
      case "cancelled":
        return <AlertCircle className="h-8 w-8 text-red-500" />
      default:
        return <Package className="h-8 w-8 text-gray-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "processing":
        return "Processing"
      case "shipped":
        return "Shipped"
      case "out_for_delivery":
        return "Out for Delivery"
      case "delivered":
        return "Delivered"
      case "cancelled":
        return "Cancelled"
      default:
        return "Unknown"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "out_for_delivery":
        return "bg-orange-100 text-orange-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-[70vh]">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Track Your Order</h1>

        <Card>
          <CardHeader>
            <CardTitle>Order Tracking</CardTitle>
            <CardDescription>Enter your order details to track your package</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="orderId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Order ID</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. ORD-1234" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="The email used for your order" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Tracking..." : "Track Order"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {orderDetails && (
          <div className="mt-8">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Order #{orderDetails.id}</CardTitle>
                    <CardDescription>Placed on {new Date(orderDetails.date).toLocaleDateString()}</CardDescription>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(orderDetails.status)}`}>
                    {getStatusText(orderDetails.status)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-center">
                  {getStatusIcon(orderDetails.status)}
                  <div className="ml-4">
                    <h3 className="font-medium">Current Status</h3>
                    <p className="text-gray-600">
                      {orderDetails.status === "delivered"
                        ? "Your order has been delivered"
                        : orderDetails.status === "shipped"
                          ? `Your order is on the way. Estimated delivery: ${new Date(orderDetails.tracking.estimatedDelivery).toLocaleDateString()}`
                          : "Your order is being processed"}
                    </p>
                  </div>
                </div>

                {orderDetails.tracking && orderDetails.status !== "processing" && (
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <h3 className="font-medium mb-2">Tracking Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Carrier</p>
                        <p className="font-medium">{orderDetails.tracking.carrier}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Tracking Number</p>
                        <p className="font-medium">{orderDetails.tracking.number}</p>
                      </div>
                    </div>
                    {orderDetails.tracking.url && (
                      <Button variant="outline" className="mt-4" asChild>
                        <a href={orderDetails.tracking.url} target="_blank" rel="noopener noreferrer">
                          Track with {orderDetails.tracking.carrier}
                        </a>
                      </Button>
                    )}
                  </div>
                )}

                <div>
                  <h3 className="font-medium mb-4">Order Timeline</h3>
                  <OrderTrackingTimeline timeline={orderDetails.timeline} />
                </div>

                <div>
                  <h3 className="font-medium mb-2">Order Summary</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <div className="divide-y">
                      {orderDetails.items.map((item: any, index: number) => (
                        <div key={index} className="flex justify-between p-4">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                          </div>
                          <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                    <div className="bg-gray-50 p-4">
                      <div className="flex justify-between font-bold">
                        <p>Total</p>
                        <p>${orderDetails.total.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <a href="/account">View All Orders</a>
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
