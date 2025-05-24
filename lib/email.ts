import { Resend } from "resend"

// Initialize Resend with proper error handling
let resend: Resend | null = null

try {
  if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "re_123456789") {
    resend = new Resend(process.env.RESEND_API_KEY)
  }
} catch (error) {
  console.warn("Resend initialization failed:", error)
}

export interface EmailData {
  to: string
  subject: string
  template: string
  data: any
}

export async function sendEmail({ to, subject, template, data }: EmailData) {
  // If no API key is configured, return success but log warning
  if (!resend || !process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === "re_123456789") {
    console.warn("Resend API key not configured. Email notification skipped.")
    return {
      success: true,
      message: "Email service not configured - notification skipped",
    }
  }

  try {
    const html = generateEmailTemplate(template, data)

    const { data: emailData, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || "orders@strangelifestyle.com",
      to: [to],
      subject,
      html,
    })

    if (error) {
      console.error("Resend error:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data: emailData }
  } catch (error) {
    console.error("Email sending failed:", error)
    return { success: false, error: "Failed to send email" }
  }
}

function generateEmailTemplate(template: string, data: any): string {
  const baseStyle = `
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { background: #8b5cf6; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
      .content { padding: 20px; background: #f9f9f9; }
      .card { background: white; padding: 20px; margin: 15px 0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
      .button { display: inline-block; background: #8b5cf6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
      .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
    </style>
  `

  switch (template) {
    case "order-confirmation":
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Order Confirmation</title>
          ${baseStyle}
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Strange Lifestyle</h1>
              <h2>Order Confirmation</h2>
            </div>
            <div class="content">
              <p>Dear ${data.customer.firstName} ${data.customer.lastName},</p>
              <p>Thank you for your order! We're excited to confirm that we've received your order and it's being processed.</p>
              
              <div class="card">
                <h3>Order Details</h3>
                <p><strong>Order Number:</strong> #${data.order.id}</p>
                <p><strong>Order Date:</strong> ${new Date(data.order.date).toLocaleDateString()}</p>
                <p><strong>Total:</strong> $${data.order.total.toFixed(2)}</p>
              </div>
              
              <p>We'll send you another email when your order ships.</p>
              <p>Thank you for shopping with Strange Lifestyle!</p>
            </div>
            <div class="footer">
              <p>© 2024 Strange Lifestyle. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `

    case "order-shipped":
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Order Shipped</title>
          ${baseStyle}
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Strange Lifestyle</h1>
              <h2>Your Order Has Shipped!</h2>
            </div>
            <div class="content">
              <p>Dear ${data.customer.firstName} ${data.customer.lastName},</p>
              <p>Great news! Your order #${data.order.id} has been shipped.</p>
              
              <div class="card">
                <h3>Tracking Information</h3>
                <p><strong>Tracking Number:</strong> ${data.trackingInfo?.trackingNumber || "TRK" + Date.now()}</p>
                <p><strong>Carrier:</strong> ${data.trackingInfo?.carrier || "Standard Shipping"}</p>
              </div>
              
              <p>Thank you for shopping with Strange Lifestyle!</p>
            </div>
            <div class="footer">
              <p>© 2024 Strange Lifestyle. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `

    default:
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Strange Lifestyle</title>
          ${baseStyle}
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Strange Lifestyle</h1>
            </div>
            <div class="content">
              <p>Thank you for being a valued customer!</p>
            </div>
            <div class="footer">
              <p>© 2024 Strange Lifestyle. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
  }
}
