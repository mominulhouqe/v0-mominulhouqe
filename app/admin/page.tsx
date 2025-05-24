export const metadata = {
  title: "Admin Dashboard | Strange Lifestyle",
  description: "Admin dashboard for Strange Lifestyle e-commerce platform",
}

export default function AdminDashboardPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to Strange Lifestyle Admin Dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900">$45,231.89</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
          </div>
          <p className="text-sm text-green-600 mt-2">+20.1% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Orders</p>
              <p className="text-3xl font-bold text-gray-900">2,350</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
          </div>
          <p className="text-sm text-blue-600 mt-2">+180.1% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Customers</p>
              <p className="text-3xl font-bold text-gray-900">1,234</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            </div>
          </div>
          <p className="text-sm text-purple-600 mt-2">+19% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Products</p>
              <p className="text-3xl font-bold text-gray-900">573</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
          </div>
          <p className="text-sm text-orange-600 mt-2">+201 from last month</p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
            <p className="text-sm text-gray-600">Latest customer orders</p>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Order ID</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Customer</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Status</th>
                    <th className="text-right py-3 text-sm font-medium text-gray-600">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-3 text-sm text-gray-900">#ORD-001</td>
                    <td className="py-3 text-sm text-gray-900">John Doe</td>
                    <td className="py-3">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Delivered
                      </span>
                    </td>
                    <td className="py-3 text-sm text-gray-900 text-right">$129.99</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-sm text-gray-900">#ORD-002</td>
                    <td className="py-3 text-sm text-gray-900">Jane Smith</td>
                    <td className="py-3">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        Processing
                      </span>
                    </td>
                    <td className="py-3 text-sm text-gray-900 text-right">$89.99</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-sm text-gray-900">#ORD-003</td>
                    <td className="py-3 text-sm text-gray-900">Bob Johnson</td>
                    <td className="py-3">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                    </td>
                    <td className="py-3 text-sm text-gray-900 text-right">$59.99</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-sm text-gray-900">#ORD-004</td>
                    <td className="py-3 text-sm text-gray-900">Alice Brown</td>
                    <td className="py-3">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Delivered
                      </span>
                    </td>
                    <td className="py-3 text-sm text-gray-900 text-right">$199.99</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
            <p className="text-sm text-gray-600">Best selling items this month</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Classic Cotton T-Shirt</p>
                  <p className="text-xs text-gray-500">245 units sold</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">$6,125.00</p>
                  <p className="text-xs text-green-600">+12%</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Slim Fit Jeans</p>
                  <p className="text-xs text-gray-500">187 units sold</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">$9,350.00</p>
                  <p className="text-xs text-green-600">+8%</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Leather Jacket</p>
                  <p className="text-xs text-gray-500">124 units sold</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">$16,120.00</p>
                  <p className="text-xs text-green-600">+15%</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Summer Dress</p>
                  <p className="text-xs text-gray-500">98 units sold</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">$4,900.00</p>
                  <p className="text-xs text-green-600">+5%</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Running Shoes</p>
                  <p className="text-xs text-gray-500">76 units sold</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">$6,840.00</p>
                  <p className="text-xs text-green-600">+3%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sales by Category */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Sales by Category</h3>
          <p className="text-sm text-gray-600">Revenue distribution across product categories</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">35%</span>
                </div>
              </div>
              <h4 className="text-sm font-medium text-gray-900">Men's Clothing</h4>
              <p className="text-xs text-gray-500">$15,831.13</p>
            </div>
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <div className="w-24 h-24 rounded-full bg-pink-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-pink-600">45%</span>
                </div>
              </div>
              <h4 className="text-sm font-medium text-gray-900">Women's Clothing</h4>
              <p className="text-xs text-gray-500">$20,354.35</p>
            </div>
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-600">20%</span>
                </div>
              </div>
              <h4 className="text-sm font-medium text-gray-900">Accessories</h4>
              <p className="text-xs text-gray-500">$9,046.41</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
