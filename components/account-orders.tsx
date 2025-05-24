import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"

// Mock order data
const orders = [
  {
    id: "ORD-1234",
    date: "May 15, 2023",
    status: "Delivered",
    total: 129.99,
    items: [
      { name: "Classic Cotton T-Shirt", quantity: 2, price: 24.99 },
      { name: "Slim Fit Jeans", quantity: 1, price: 49.99 },
    ],
  },
  {
    id: "ORD-5678",
    date: "April 28, 2023",
    status: "Processing",
    total: 89.99,
    items: [{ name: "Leather Jacket", quantity: 1, price: 129.99 }],
  },
]

export default function AccountOrders() {
  if (orders.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
        <Button asChild>
          <a href="/products">Start Shopping</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div key={order.id} className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">Order #{order.id}</h3>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    order.status === "Delivered" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <p className="text-sm text-gray-500">Placed on {order.date}</p>
            </div>
            <div className="mt-2 sm:mt-0">
              <p className="font-medium">{formatCurrency(order.total)}</p>
            </div>
          </div>

          <div className="p-4">
            <h4 className="font-medium mb-2">Items</h4>
            <ul className="space-y-2">
              {order.items.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>
                    {item.quantity} x {item.name}
                  </span>
                  <span>{formatCurrency(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t p-4 flex justify-end">
            <Button variant="outline" size="sm">
              View Order Details
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
