import { NextResponse } from "next/server"
import { sendOrderConfirmation } from "@/lib/notifications"

export async function POST(request: Request) {
  try {
    const orderData = await request.json()

    // In a real application, you would save the order to your database here
    // const savedOrder = await db.orders.create(orderData);

    // Send order confirmation email
    const emailResult = await sendOrderConfirmation(
      {
        id: orderData.id,
        date: orderData.date,
        items: orderData.items,
        subtotal: orderData.subtotal,
        shipping: orderData.shipping,
        total: orderData.total,
        paymentMethod: orderData.paymentMethod,
        paymentStatus: orderData.paymentStatus,
        transactionId: orderData.transactionId,
        status: orderData.status,
      },
      {
        firstName: orderData.customer.firstName,
        lastName: orderData.customer.lastName,
        email: orderData.customer.email,
        address: orderData.customer.address,
        city: orderData.customer.city,
        state: orderData.customer.state,
        postalCode: orderData.customer.postalCode,
        country: orderData.customer.country,
      },
    )

    if (!emailResult.success) {
      console.error("Failed to send order confirmation email:", emailResult.error)
      // Continue with order processing even if email fails
    }

    return NextResponse.json({
      success: true,
      orderId: orderData.id,
      emailSent: emailResult.success,
    })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ success: false, error: "Failed to create order" }, { status: 500 })
  }
}
