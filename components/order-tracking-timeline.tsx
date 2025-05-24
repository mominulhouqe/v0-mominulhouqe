import { CheckCircle, Clock, Package, Truck, XCircle } from "lucide-react"

type TimelineItem = {
  status: string
  date: string
  description: string
}

type OrderTrackingTimelineProps = {
  timeline: TimelineItem[]
}

export default function OrderTrackingTimeline({ timeline }: OrderTrackingTimelineProps) {
  // Sort timeline by date (newest first)
  const sortedTimeline = [...timeline].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "order_placed":
        return <Package className="h-5 w-5 text-blue-500" />
      case "payment_confirmed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "processing":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "shipped":
        return <Truck className="h-5 w-5 text-blue-500" />
      case "out_for_delivery":
        return <Truck className="h-5 w-5 text-orange-500" />
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "cancelled":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="space-y-4">
      {sortedTimeline.map((item, index) => (
        <div key={index} className="flex">
          <div className="mr-4 flex flex-col items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
              {getStatusIcon(item.status)}
            </div>
            {index < sortedTimeline.length - 1 && <div className="h-full w-0.5 bg-gray-200 mt-1"></div>}
          </div>
          <div className="pt-1.5 pb-8">
            <p className="text-sm font-medium">
              {new Date(item.date).toLocaleDateString()} at {new Date(item.date).toLocaleTimeString()}
            </p>
            <p className="mt-1 text-gray-600">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
