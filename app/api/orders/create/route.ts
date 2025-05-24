import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { sendEmail } from "@/lib/email"

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication required",
        },
        { status: 401 },
      )
    }

    const orderData = await request.json()

    // Validate order data
    if (!orderData.items || !Array.isArray(orderData.items) || orderData.items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid order data",
        },
        { status: 400 },
      )
    }

    // Create order
    const order = {
      id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId: user.id,
      date: new Date().toISOString(),
      status: "pending",
      paymentStatus: "pending",
      ...orderData,
    }

    // Send confirmation email (will gracefully handle missing API key)
    try {
      await sendEmail({
        to: orderData.customer.email,
        subject: `Order Confirmation - #${order.id}`,
        template: "order-confirmation",
        data: { order, customer: orderData.customer },
      })
    } catch (emailError) {
      console.warn("Email notification failed:", emailError)
      // Don't fail the order creation if email fails
    }

    return NextResponse.json({
      success: true,
      order,
      message: "Order created successfully",
    })
  } catch (error) {
    console.error("Order creation error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create order",
      },
      { status: 500 },
    )
  }
}
