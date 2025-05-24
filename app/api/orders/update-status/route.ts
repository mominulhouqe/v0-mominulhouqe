import { NextResponse } from "next/server"
import { sendOrderStatusNotification } from "@/lib/notifications"

export async function POST(request: Request) {
  try {
    const { orderId, newStatus, customer, order, additionalData } = await request.json()

    // In a real application, you would update the order in your database here
    // const updatedOrder = await db.orders.update({ id: orderId }, { status: newStatus });

    // Send notification based on the new status
    const emailResult = await sendOrderStatusNotification(order, customer, newStatus, additionalData)

    if (!emailResult.success) {
      console.error(`Failed to send ${newStatus} notification email:`, emailResult.error)
      // Continue with order processing even if email fails
    }

    return NextResponse.json({
      success: true,
      orderId,
      status: newStatus,
      emailSent: emailResult.success,
    })
  } catch (error) {
    console.error("Error updating order status:", error)
    return NextResponse.json({ success: false, error: "Failed to update order status" }, { status: 500 })
  }
}
