import { Resend } from "resend"

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY)

// Email sender address
const FROM_EMAIL = process.env.FROM_EMAIL || "orders@stylishthreads.com"

export type EmailTemplate = "order-confirmation" | "order-shipped" | "order-delivered" | "order-cancelled"

interface SendEmailOptions {
  to: string
  subject: string
  template: EmailTemplate
  data: Record<string, any>
}

export async function sendEmail({ to, subject, template, data }: SendEmailOptions) {
  try {
    // Get the appropriate email template
    const htmlContent = await renderEmailTemplate(template, data)

    // Send the email
    const { data: response, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html: htmlContent,
    })

    if (error) {
      console.error("Error sending email:", error)
      return { success: false, error }
    }

    return { success: true, messageId: response?.id }
  } catch (error) {
    console.error("Failed to send email:", error)
    return { success: false, error }
  }
}

// Function to render the appropriate email template
async function renderEmailTemplate(template: EmailTemplate, data: Record<string, any>): Promise<string> {
  switch (template) {
    case "order-confirmation":
      return renderOrderConfirmationEmail(data)
    case "order-shipped":
      return renderOrderShippedEmail(data)
    case "order-delivered":
      return renderOrderDeliveredEmail(data)
    case "order-cancelled":
      return renderOrderCancelledEmail(data)
    default:
      throw new Error(`Unknown email template: ${template}`)
  }
}

// Email template renderers
function renderOrderConfirmationEmail(data: Record<string, any>): string {
  const { order, customer } = data

  // Format items for display
  const itemsList = order.items
    .map(
      (item: any) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name} ${item.selectedSize ? `(Size: ${item.selectedSize})` : ""}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.quantity}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">$${item.price.toFixed(2)}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">$${(item.price * item.quantity).toFixed(2)}</td>
    </tr>
  `,
    )
    .join("")

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Order Confirmation</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; padding: 20px 0; border-bottom: 1px solid #eee; }
        .logo { font-size: 24px; font-weight: bold; color: #000; }
        .order-details { margin: 20px 0; }
        .order-summary { margin: 20px 0; }
        table { width: 100%; border-collapse: collapse; }
        th { text-align: left; padding: 10px; border-bottom: 2px solid #eee; }
        .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #777; }
        .button { display: inline-block; padding: 10px 20px; background-color: #000; color: #fff; text-decoration: none; border-radius: 4px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Stylish Threads</div>
        </div>
        
        <h1>Thank you for your order!</h1>
        <p>Hello ${customer.firstName},</p>
        <p>We've received your order and are working on it now. Here's a summary of what you ordered:</p>
        
        <div class="order-details">
          <h2>Order Details</h2>
          <p><strong>Order Number:</strong> ${order.id}</p>
          <p><strong>Order Date:</strong> ${new Date(order.date).toLocaleDateString()}</p>
          <p><strong>Payment Method:</strong> ${order.paymentMethod === "cod" ? "Cash on Delivery" : "bKash"}</p>
          ${order.transactionId ? `<p><strong>Transaction ID:</strong> ${order.transactionId}</p>` : ""}
        </div>
        
        <div class="order-summary">
          <h2>Order Summary</h2>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsList}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" style="text-align: right; padding: 10px;"><strong>Subtotal:</strong></td>
                <td style="padding: 10px;">$${order.subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td colspan="3" style="text-align: right; padding: 10px;"><strong>Shipping:</strong></td>
                <td style="padding: 10px;">$${order.shipping.toFixed(2)}</td>
              </tr>
              <tr>
                <td colspan="3" style="text-align: right; padding: 10px;"><strong>Total:</strong></td>
                <td style="padding: 10px;"><strong>$${order.total.toFixed(2)}</strong></td>
              </tr>
            </tfoot>
          </table>
        </div>
        
        <div class="shipping-info">
          <h2>Shipping Information</h2>
          <p>${customer.firstName} ${customer.lastName}</p>
          <p>${customer.address}</p>
          <p>${customer.city}, ${customer.state} ${customer.postalCode}</p>
          <p>${customer.country}</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/account/orders/${order.id}" class="button">Track Your Order</a>
        </div>
        
        <p>If you have any questions about your order, please contact our customer service team.</p>
        
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Stylish Threads. All rights reserved.</p>
          <p>123 Fashion Street, Style City, SC 12345</p>
        </div>
      </div>
    </body>
    </html>
  `
}

function renderOrderShippedEmail(data: Record<string, any>): string {
  const { order, customer, trackingInfo } = data

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Your Order Has Shipped</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; padding: 20px 0; border-bottom: 1px solid #eee; }
        .logo { font-size: 24px; font-weight: bold; color: #000; }
        .tracking-info { margin: 20px 0; padding: 15px; background-color: #f9f9f9; border-radius: 4px; }
        .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #777; }
        .button { display: inline-block; padding: 10px 20px; background-color: #000; color: #fff; text-decoration: none; border-radius: 4px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Stylish Threads</div>
        </div>
        
        <h1>Your Order is on the Way!</h1>
        <p>Hello ${customer.firstName},</p>
        <p>Great news! Your order #${order.id} has been shipped and is on its way to you.</p>
        
        <div class="tracking-info">
          <h2>Tracking Information</h2>
          <p><strong>Carrier:</strong> ${trackingInfo.carrier}</p>
          <p><strong>Tracking Number:</strong> ${trackingInfo.trackingNumber}</p>
          <p><strong>Estimated Delivery:</strong> ${trackingInfo.estimatedDelivery}</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${trackingInfo.trackingUrl}" class="button">Track Package</a>
        </div>
        
        <p>If you have any questions about your delivery, please contact our customer service team.</p>
        
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Stylish Threads. All rights reserved.</p>
          <p>123 Fashion Street, Style City, SC 12345</p>
        </div>
      </div>
    </body>
    </html>
  `
}

function renderOrderDeliveredEmail(data: Record<string, any>): string {
  const { order, customer } = data

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Your Order Has Been Delivered</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; padding: 20px 0; border-bottom: 1px solid #eee; }
        .logo { font-size: 24px; font-weight: bold; color: #000; }
        .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #777; }
        .button { display: inline-block; padding: 10px 20px; background-color: #000; color: #fff; text-decoration: none; border-radius: 4px; }
        .review-button { display: inline-block; padding: 10px 20px; background-color: #4a154b; color: #fff; text-decoration: none; border-radius: 4px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Stylish Threads</div>
        </div>
        
        <h1>Your Order Has Been Delivered!</h1>
        <p>Hello ${customer.firstName},</p>
        <p>Your order #${order.id} has been delivered. We hope you love your new items!</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <p>How did we do?</p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/account/orders/${order.id}/review" class="review-button">Write a Review</a>
        </div>
        
        <p>If you have any issues with your order, please contact our customer service team within 7 days.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/products" class="button">Shop Again</a>
        </div>
        
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Stylish Threads. All rights reserved.</p>
          <p>123 Fashion Street, Style City, SC 12345</p>
        </div>
      </div>
    </body>
    </html>
  `
}

function renderOrderCancelledEmail(data: Record<string, any>): string {
  const { order, customer, reason } = data

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Your Order Has Been Cancelled</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; padding: 20px 0; border-bottom: 1px solid #eee; }
        .logo { font-size: 24px; font-weight: bold; color: #000; }
        .cancellation-info { margin: 20px 0; padding: 15px; background-color: #f9f9f9; border-radius: 4px; }
        .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #777; }
        .button { display: inline-block; padding: 10px 20px; background-color: #000; color: #fff; text-decoration: none; border-radius: 4px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Stylish Threads</div>
        </div>
        
        <h1>Your Order Has Been Cancelled</h1>
        <p>Hello ${customer.firstName},</p>
        <p>We're sorry to inform you that your order #${order.id} has been cancelled.</p>
        
        <div class="cancellation-info">
          <h2>Cancellation Details</h2>
          <p><strong>Reason:</strong> ${reason || "As requested"}</p>
          <p><strong>Refund Status:</strong> ${order.refundStatus || "Processing"}</p>
        </div>
        
        <p>If you have any questions about this cancellation or your refund, please contact our customer service team.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/products" class="button">Continue Shopping</a>
        </div>
        
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Stylish Threads. All rights reserved.</p>
          <p>123 Fashion Street, Style City, SC 12345</p>
        </div>
      </div>
    </body>
    </html>
  `
}
