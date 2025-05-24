import { NextResponse } from "next/server"
import { sendOrderConfirmation } from "@/lib/notifications"

export async function POST(request: Request) {
  try {
    const orderData = await request.json()

    // Validate required fields
    if (!orderData.id || !orderData.customer?.email) {
      return NextResponse.json({ success: false, error: "Missing required order data" }, { status: 400 })
    }

    // In a real application, you would save the order to your database here
    // const savedOrder = await db.orders.create(orderData);

    // Send order confirmation email (with fallback if email service is not configured)
    let emailResult = { success: true, message: "Email service not configured" }

    try {
      emailResult = await sendOrderConfirmation(
        {
          id: orderData.id,
          date: orderData.date || new Date().toISOString(),
          items: orderData.items || [],
          subtotal: orderData.subtotal || 0,
          shipping: orderData.shipping || 0,
          total: orderData.total || 0,
          paymentMethod: orderData.paymentMethod || "Unknown",
          paymentStatus: orderData.paymentStatus || "pending",
          transactionId: orderData.transactionId || "",
          status: orderData.status || "confirmed",
        },
        {
          firstName: orderData.customer.firstName || "",
          lastName: orderData.customer.lastName || "",
          email: orderData.customer.email,
          address: orderData.customer.address || "",
          city: orderData.customer.city || "",
          state: orderData.customer.state || "",
          postalCode: orderData.customer.postalCode || "",
          country: orderData.customer.country || "",
        },
      )
    } catch (emailError) {
      console.error("Email service error:", emailError)
      // Continue with order processing even if email fails
    }

    return NextResponse.json({
      success: true,
      orderId: orderData.id,
      emailSent: emailResult.success,
      message: "Order created successfully",
    })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ success: false, error: "Failed to create order" }, { status: 500 })
  }
}
