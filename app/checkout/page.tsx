"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCart } from "@/components/cart-provider"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/components/ui/use-toast"
import OrderSummary from "@/components/order-summary"
import BkashPayment from "@/components/bkash-payment"

const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State/Province is required"),
  postalCode: z.string().min(4, "Postal code is required"),
  country: z.string().min(2, "Country is required"),
  paymentMethod: z.enum(["cod", "bkash"]),
  notes: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function CheckoutPage() {
  const { cart, clearCart } = useCart()
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [showBkashPayment, setShowBkashPayment] = useState(false)
  const [shippingCost, setShippingCost] = useState(5.99)
  const [transactionId, setTransactionId] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: user?.email || "",
      phone: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "Bangladesh",
      paymentMethod: "cod",
      notes: "",
    },
  })

  // Update form with user data when available
  useEffect(() => {
    if (user) {
      const nameParts = user.name.split(" ")
      const firstName = nameParts[0] || ""
      const lastName = nameParts.slice(1).join(" ") || ""

      form.setValue("email", user.email)
      form.setValue("firstName", firstName)
      form.setValue("lastName", lastName)
    }
  }, [user, form])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Calculate shipping cost based on location
    const city = form.watch("city")
    if (city === "Dhaka") {
      setShippingCost(5.99)
    } else if (city) {
      setShippingCost(9.99)
    }
  }, [form.watch("city")])

  if (!mounted) {
    return <div className="container mx-auto px-4 py-16 min-h-[60vh] flex items-center justify-center">Loading...</div>
  }

  if (cart.length === 0 && !orderPlaced) {
    router.push("/cart")
    return null
  }

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const total = subtotal + shippingCost

  const onSubmit = async (data: FormValues) => {
    if (data.paymentMethod === "bkash") {
      setShowBkashPayment(true)
      return
    }

    // Process order with Cash on Delivery
    processOrder(data)
  }

  const processOrder = async (data: FormValues) => {
    setIsSubmitting(true)

    try {
      // Generate a unique order ID
      const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`

      // Prepare order data
      const orderData = {
        id: orderId,
        date: new Date().toISOString(),
        customer: {
          id: user?.id,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          address: data.address,
          city: data.city,
          state: data.state,
          postalCode: data.postalCode,
          country: data.country,
        },
        items: cart,
        subtotal,
        shipping: shippingCost,
        total,
        paymentMethod: data.paymentMethod,
        transactionId: transactionId,
        paymentStatus: data.paymentMethod === "bkash" ? "paid" : "pending",
        status: "processing",
        notes: data.notes,
      }

      // In a real app, you would send this data to your backend
      console.log("Order data:", orderData)

      // Send order confirmation email
      const response = await fetch("/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        throw new Error("Failed to create order")
      }

      // Show success message
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase. We'll process your order soon.",
      })

      // Clear cart and show success screen
      clearCart()
      setOrderPlaced(true)
    } catch (error) {
      console.error("Error processing order:", error)
      toast({
        title: "Error placing order",
        description: "There was a problem processing your order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBkashPaymentSuccess = (txnId: string) => {
    setTransactionId(txnId)
    processOrder(form.getValues())
    setShowBkashPayment(false)
  }

  const handleBkashPaymentCancel = () => {
    setShowBkashPayment(false)
    toast({
      title: "Payment cancelled",
      description: "You can try again or choose a different payment method.",
      variant: "destructive",
    })
  }

  if (orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-[60vh] flex flex-col items-center justify-center">
        <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="h-8 w-8 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Thank you for your order!</h1>
        <p className="text-gray-500 mb-8 text-center max-w-md">
          Your order has been placed successfully. We'll send you a confirmation email shortly.
          {transactionId && (
            <>
              <br />
              <br />
              <span className="font-medium">Transaction ID: {transactionId}</span>
            </>
          )}
        </p>
        <Button asChild>
          <a href="/">Continue Shopping</a>
        </Button>
      </div>
    )
  }

  if (showBkashPayment) {
    return <BkashPayment amount={total} onSuccess={handleBkashPaymentSuccess} onCancel={handleBkashPaymentCancel} />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                  <CardDescription>Enter your shipping details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john.doe@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="+880 1XXX-XXXXXX" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea placeholder="123 Main St, Apt 4B" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Dhaka" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State/Province</FormLabel>
                          <FormControl>
                            <Input placeholder="Dhaka" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Code</FormLabel>
                          <FormControl>
                            <Input placeholder="1000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                              <SelectItem value="India">India</SelectItem>
                              <SelectItem value="Pakistan">Pakistan</SelectItem>
                              <SelectItem value="Nepal">Nepal</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Choose how you want to pay</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2 border p-4 rounded-md">
                              <RadioGroupItem value="cod" id="cod" />
                              <FormLabel htmlFor="cod" className="font-normal cursor-pointer flex-1">
                                <div className="font-medium">Cash on Delivery</div>
                                <div className="text-sm text-gray-500">Pay when you receive your order</div>
                              </FormLabel>
                            </div>
                            <div className="flex items-center space-x-2 border p-4 rounded-md">
                              <RadioGroupItem value="bkash" id="bkash" />
                              <FormLabel htmlFor="bkash" className="font-normal cursor-pointer flex-1">
                                <div className="font-medium">bKash Payment</div>
                                <div className="text-sm text-gray-500">Pay using bKash mobile banking</div>
                              </FormLabel>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Order Notes (Optional)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Any special instructions for delivery" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardFooter>
              </Card>

              <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Place Order"}
              </Button>
            </form>
          </Form>
        </div>

        <div className="lg:col-span-1">
          <OrderSummary cart={cart} subtotal={subtotal} shippingCost={shippingCost} total={total} />
        </div>
      </div>
    </div>
  )
}
