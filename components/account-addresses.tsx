import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Plus } from "lucide-react"

// Mock address data
const addresses = [
  {
    id: "addr-1",
    type: "Home",
    name: "John Doe",
    address: "123 Main Street, Apt 4B",
    city: "Dhaka",
    state: "Dhaka",
    postalCode: "1000",
    country: "Bangladesh",
    phone: "+880 1XXX-XXXXXX",
    isDefault: true,
  },
  {
    id: "addr-2",
    type: "Office",
    name: "John Doe",
    address: "456 Business Avenue",
    city: "Dhaka",
    state: "Dhaka",
    postalCode: "1205",
    country: "Bangladesh",
    phone: "+880 1XXX-XXXXXX",
    isDefault: false,
  },
]

export default function AccountAddresses() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((address) => (
          <Card key={address.id} className="relative">
            {address.isDefault && (
              <span className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                Default
              </span>
            )}
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-medium">{address.type}</h3>
              </div>
              <div className="space-y-1 text-sm">
                <p>{address.name}</p>
                <p>{address.address}</p>
                <p>
                  {address.city}, {address.state} {address.postalCode}
                </p>
                <p>{address.country}</p>
                <p>{address.phone}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">
                Edit
              </Button>
              {!address.isDefault && (
                <Button variant="outline" size="sm">
                  Set as Default
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}

        <Card className="border-dashed flex flex-col items-center justify-center p-6 h-full">
          <Button variant="outline" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add New Address
          </Button>
        </Card>
      </div>
    </div>
  )
}
