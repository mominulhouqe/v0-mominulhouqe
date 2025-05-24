import { sendEmail } from "./email"

interface Customer {
  id?: string
  firstName: string
  lastName: string
  email: string
  address: string
  city: string
  state: string
  postalCode: string
  country: string
}

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  selectedSize?: string
  selectedColor?: string
}

interface Order {
  id: string
  date: string | Date
  items: OrderItem[]
  subtotal: number
  shipping: number
  total: number
  paymentMethod: "cod" | "bkash"
  paymentStatus: "pending" | "paid" | "failed"
  transactionId?: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
}

export async function sendOrderConfirmation(order: Order, customer: Customer) {
  return await sendEmail({
    to: customer.email,
    subject: `Order Confirmation #${order.id}`,
    template: "order-confirmation",
    data: { order, customer },
  })
}

export async function sendOrderShipped(
  order: Order,
  customer: Customer,
  trackingInfo: {
    carrier: string
    trackingNumber: string
    trackingUrl: string
    estimatedDelivery: string
  },
) {
  return await sendEmail({
    to: customer.email,
    subject: `Your Order #${order.id} Has Shipped`,
    template: "order-shipped",
    data: { order, customer, trackingInfo },
  })
}

export async function sendOrderDelivered(order: Order, customer: Customer) {
  return await sendEmail({
    to: customer.email,
    subject: `Your Order #${order.id} Has Been Delivered`,
    template: "order-delivered",
    data: { order, customer },
  })
}

export async function sendOrderCancelled(order: Order, customer: Customer, reason?: string) {
  return await sendEmail({
    to: customer.email,
    subject: `Your Order #${order.id} Has Been Cancelled`,
    template: "order-cancelled",
    data: { order, customer, reason },
  })
}

// Function to send appropriate notification based on order status change
export async function sendOrderStatusNotification(
  order: Order,
  customer: Customer,
  newStatus: Order["status"],
  additionalData?: Record<string, any>,
) {
  switch (newStatus) {
    case "processing":
      // No email needed, already sent confirmation
      return { success: true }
    case "shipped":
      return await sendOrderShipped(order, customer, additionalData?.trackingInfo)
    case "delivered":
      return await sendOrderDelivered(order, customer)
    case "cancelled":
      return await sendOrderCancelled(order, customer, additionalData?.reason)
    default:
      return { success: false, error: "Unknown order status" }
  }
}
