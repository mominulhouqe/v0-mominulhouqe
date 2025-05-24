import { NextResponse } from "next/server"
import { sendShippingUpdate, sendDeliveryConfirmation, sendOrderCancellation } from "@/lib/notifications"

export async function POST(request: Request) {
  try {
    const { orderId, status, trackingNumber, reason, customer, order } = await request.json()

    if (!orderId || !status) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // In a real application, you would update the order in your database here
    // await db.orders.update({ where: { id: orderId }, data: { status } })

    let emailResult = { success: true, message: "Email service not configured" }

    // Send appropriate email based on status
    try {
      switch (status) {
        case "shipped":
          if (trackingNumber && customer && order) {
            emailResult = await sendShippingUpdate(order, customer, trackingNumber)
          }
          break
        case "delivered":
          if (customer && order) {
            emailResult = await sendDeliveryConfirmation(order, customer)
          }
          break
        case "cancelled":
          if (customer && order && reason) {
            emailResult = await sendOrderCancellation(order, customer, reason)
          }
          break
      }
    } catch (emailError) {
      console.error("Email service error:", emailError)
      // Continue with status update even if email fails
    }

    return NextResponse.json({
      success: true,
      orderId,
      status,
      emailSent: emailResult.success,
      message: `Order status updated to ${status}`,
    })
  } catch (error) {
    console.error("Error updating order status:", error)
    return NextResponse.json({ success: false, error: "Failed to update order status" }, { status: 500 })
  }
}
