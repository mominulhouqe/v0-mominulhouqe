"use client"

import { useState } from "react"
import { Check, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface OrderStatusUpdateProps {
  order: any // Replace with your Order type
  onStatusUpdate: (newStatus: string) => void
}

export function OrderStatusUpdate({ order, onStatusUpdate }: OrderStatusUpdateProps) {
  const { toast } = useToast()
  const [status, setStatus] = useState(order.status)
  const [isUpdating, setIsUpdating] = useState(false)
  const [trackingNumber, setTrackingNumber] = useState("")
  const [carrier, setCarrier] = useState("DHL")
  const [estimatedDelivery, setEstimatedDelivery] = useState("")

  const handleStatusUpdate = async () => {
    setIsUpdating(true)

    try {
      let additionalData = {}

      // If status is being updated to shipped, include tracking info
      if (status === "shipped") {
        if (!trackingNumber || !carrier || !estimatedDelivery) {
          toast({
            title: "Missing information",
            description: "Please provide all tracking information",
            variant: "destructive",
          })
          setIsUpdating(false)
          return
        }

        additionalData = {
          trackingInfo: {
            carrier,
            trackingNumber,
            trackingUrl: getTrackingUrl(carrier, trackingNumber),
            estimatedDelivery,
          },
        }
      }

      const response = await fetch("/api/orders/update-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: order.id,
          newStatus: status,
          order: order,
          customer: order.customer,
          additionalData,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update order status")
      }

      const result = await response.json()

      toast({
        title: "Status updated",
        description: `Order status has been updated to ${status}${result.emailSent ? " and notification email sent" : ""}`,
      })

      onStatusUpdate(status)
    } catch (error) {
      console.error("Error updating status:", error)
      toast({
        title: "Error updating status",
        description: "There was a problem updating the order status",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  // Helper function to generate tracking URLs based on carrier
  const getTrackingUrl = (carrier: string, trackingNumber: string): string => {
    switch (carrier) {
      case "DHL":
        return `https://www.dhl.com/en/express/tracking.html?AWB=${trackingNumber}`
      case "FedEx":
        return `https://www.fedex.com/fedextrack/?trknbr=${trackingNumber}`
      case "UPS":
        return `https://www.ups.com/track?tracknum=${trackingNumber}`
      default:
        return `https://www.google.com/search?q=${carrier}+tracking+${trackingNumber}`
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Order Status</CardTitle>
        <CardDescription>Change the status and notify the customer</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {status === "shipped" && (
          <div className="space-y-4 border-t pt-4">
            <div className="space-y-2">
              <Label htmlFor="carrier">Shipping Carrier</Label>
              <Select value={carrier} onValueChange={setCarrier}>
                <SelectTrigger id="carrier">
                  <SelectValue placeholder="Select carrier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DHL">DHL</SelectItem>
                  <SelectItem value="FedEx">FedEx</SelectItem>
                  <SelectItem value="UPS">UPS</SelectItem>
                  <SelectItem value="USPS">USPS</SelectItem>
                  <SelectItem value="Sundarban">Sundarban Courier</SelectItem>
                  <SelectItem value="Pathao">Pathao</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tracking">Tracking Number</Label>
              <Input
                id="tracking"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Enter tracking number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="delivery">Estimated Delivery Date</Label>
              <Input
                id="delivery"
                type="date"
                value={estimatedDelivery}
                onChange={(e) => setEstimatedDelivery(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleStatusUpdate} disabled={isUpdating || status === order.status}>
          {isUpdating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" />
              Update Status
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
