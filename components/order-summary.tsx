import { formatCurrency } from "@/lib/utils"
import type { CartItem } from "@/components/cart-provider"

interface OrderSummaryProps {
  cart: CartItem[]
  subtotal: number
  shippingCost: number
  total: number
}

export default function OrderSummary({ cart, subtotal, shippingCost, total }: OrderSummaryProps) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>

      <div className="space-y-3 mb-4">
        {cart.map((item) => (
          <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex justify-between text-sm">
            <span>
              {item.name} x {item.quantity}
              {item.selectedSize && ` (${item.selectedSize})`}
            </span>
            <span>{formatCurrency(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{formatCurrency(shippingCost)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg border-t pt-2">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  )
}
