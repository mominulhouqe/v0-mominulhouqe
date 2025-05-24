import { Resend } from "resend"

// Initialize Resend with proper error handling
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function sendOrderConfirmation(order: any, customer: any) {
  // If no API key is configured, return success but log warning
  if (!resend || !process.env.RESEND_API_KEY) {
    console.warn("Resend API key not configured. Email notification skipped.")
    return {
      success: true,
      message: "Email service not configured",
    }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || "orders@strangelifestyle.com",
      to: [customer.email],
      subject: `Order Confirmation - #${order.id}`,
      html: generateOrderConfirmationEmail(order, customer),
    })

    if (error) {
      console.error("Resend error:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Email sending failed:", error)
    return { success: false, error: "Failed to send email" }
  }
}

export async function sendShippingUpdate(order: any, customer: any, trackingNumber: string) {
  if (!resend || !process.env.RESEND_API_KEY) {
    console.warn("Resend API key not configured. Email notification skipped.")
    return { success: true, message: "Email service not configured" }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || "orders@strangelifestyle.com",
      to: [customer.email],
      subject: `Your Order Has Shipped - #${order.id}`,
      html: generateShippingUpdateEmail(order, customer, trackingNumber),
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    return { success: false, error: "Failed to send email" }
  }
}

export async function sendDeliveryConfirmation(order: any, customer: any) {
  if (!resend || !process.env.RESEND_API_KEY) {
    console.warn("Resend API key not configured. Email notification skipped.")
    return { success: true, message: "Email service not configured" }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || "orders@strangelifestyle.com",
      to: [customer.email],
      subject: `Order Delivered - #${order.id}`,
      html: generateDeliveryConfirmationEmail(order, customer),
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    return { success: false, error: "Failed to send email" }
  }
}

export async function sendOrderCancellation(order: any, customer: any, reason: string) {
  if (!resend || !process.env.RESEND_API_KEY) {
    console.warn("Resend API key not configured. Email notification skipped.")
    return { success: true, message: "Email service not configured" }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || "orders@strangelifestyle.com",
      to: [customer.email],
      subject: `Order Cancelled - #${order.id}`,
      html: generateOrderCancellationEmail(order, customer, reason),
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    return { success: false, error: "Failed to send email" }
  }
}

// Email template functions remain the same...
function generateOrderConfirmationEmail(order: any, customer: any): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Order Confirmation</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #8b5cf6; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .order-details { background: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
        .item { border-bottom: 1px solid #eee; padding: 10px 0; }
        .total { font-weight: bold; font-size: 18px; color: #8b5cf6; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Strange Lifestyle</h1>
          <h2>Order Confirmation</h2>
        </div>
        <div class="content">
          <p>Dear ${customer.firstName} ${customer.lastName},</p>
          <p>Thank you for your order! We're excited to confirm that we've received your order and it's being processed.</p>
          
          <div class="order-details">
            <h3>Order Details</h3>
            <p><strong>Order Number:</strong> #${order.id}</p>
            <p><strong>Order Date:</strong> ${new Date(order.date).toLocaleDateString()}</p>
            <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
            
            <h4>Items Ordered:</h4>
            ${order.items
              .map(
                (item: any) => `
              <div class="item">
                <strong>${item.name}</strong><br>
                Size: ${item.size} | Color: ${item.color}<br>
                Quantity: ${item.quantity} × $${item.price} = $${(item.quantity * item.price).toFixed(2)}
              </div>
            `,
              )
              .join("")}
            
            <div style="margin-top: 15px;">
              <p>Subtotal: $${order.subtotal.toFixed(2)}</p>
              <p>Shipping: $${order.shipping.toFixed(2)}</p>
              <p class="total">Total: $${order.total.toFixed(2)}</p>
            </div>
          </div>
          
          <div class="order-details">
            <h3>Shipping Address</h3>
            <p>
              ${customer.firstName} ${customer.lastName}<br>
              ${customer.address}<br>
              ${customer.city}, ${customer.state} ${customer.postalCode}<br>
              ${customer.country}
            </p>
          </div>
          
          <p>We'll send you another email when your order ships. If you have any questions, please don't hesitate to contact us.</p>
          
          <p>Thank you for shopping with Strange Lifestyle!</p>
        </div>
      </div>
    </body>
    </html>
  `
}

function generateShippingUpdateEmail(order: any, customer: any, trackingNumber: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Your Order Has Shipped</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #8b5cf6; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .tracking { background: white; padding: 15px; margin: 15px 0; border-radius: 5px; text-align: center; }
        .tracking-number { font-size: 24px; font-weight: bold; color: #8b5cf6; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Strange Lifestyle</h1>
          <h2>Your Order Has Shipped!</h2>
        </div>
        <div class="content">
          <p>Dear ${customer.firstName} ${customer.lastName},</p>
          <p>Great news! Your order #${order.id} has been shipped and is on its way to you.</p>
          
          <div class="tracking">
            <h3>Tracking Information</h3>
            <p>Tracking Number:</p>
            <div class="tracking-number">${trackingNumber}</div>
            <p>You can track your package using this number on our shipping partner's website.</p>
          </div>
          
          <p>Your order should arrive within 3-5 business days. We'll send you another email when it's delivered.</p>
          
          <p>Thank you for shopping with Strange Lifestyle!</p>
        </div>
      </div>
    </body>
    </html>
  `
}

function generateDeliveryConfirmationEmail(order: any, customer: any): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Order Delivered</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #10b981; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .success { background: white; padding: 15px; margin: 15px 0; border-radius: 5px; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Strange Lifestyle</h1>
          <h2>Order Delivered!</h2>
        </div>
        <div class="content">
          <p>Dear ${customer.firstName} ${customer.lastName},</p>
          
          <div class="success">
            <h3>🎉 Your order has been delivered!</h3>
            <p>Order #${order.id} was successfully delivered to your address.</p>
          </div>
          
          <p>We hope you love your new items from Strange Lifestyle! If you have any issues with your order, please don't hesitate to contact us.</p>
          
          <p>We'd love to hear about your experience. Consider leaving a review on our website!</p>
          
          <p>Thank you for choosing Strange Lifestyle!</p>
        </div>
      </div>
    </body>
    </html>
  `
}

function generateOrderCancellationEmail(order: any, customer: any, reason: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Order Cancelled</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #ef4444; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .cancellation { background: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Strange Lifestyle</h1>
          <h2>Order Cancelled</h2>
        </div>
        <div class="content">
          <p>Dear ${customer.firstName} ${customer.lastName},</p>
          
          <div class="cancellation">
            <h3>Order Cancellation Notice</h3>
            <p><strong>Order Number:</strong> #${order.id}</p>
            <p><strong>Reason:</strong> ${reason}</p>
            <p><strong>Refund Amount:</strong> $${order.total.toFixed(2)}</p>
          </div>
          
          <p>Your order has been cancelled and a full refund will be processed within 3-5 business days.</p>
          
          <p>If you have any questions about this cancellation, please contact our customer service team.</p>
          
          <p>We apologize for any inconvenience and hope to serve you again in the future.</p>
        </div>
      </div>
    </body>
    </html>
  `
}
