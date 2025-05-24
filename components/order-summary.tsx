import type { CartItem } from "./cart-provider"
import { formatCurrency } from "@/lib/utils"

interface OrderSummaryProps {
  cart: CartItem[]
  subtotal: number
  shippingCost: number
  total: number
}

export default function OrderSummary({ cart, subtotal, shippingCost, total }: OrderSummaryProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>

      <div className="space-y-4 mb-4">
        {cart.map((item) => (
          <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex justify-between">
            <div>
              <span className="font-medium">{item.name}</span>
              <span className="text-gray-500 block text-sm">
                Qty: {item.quantity}
                {item.selectedSize && `, Size: ${item.selectedSize}`}
              </span>
            </div>
            <span>{formatCurrency(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{formatCurrency(shippingCost)}</span>
        </div>
      </div>

      <div className="border-t border-gray-200 mt-4 pt-4">
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">Including VAT</p>
      </div>
    </div>
  )
}
