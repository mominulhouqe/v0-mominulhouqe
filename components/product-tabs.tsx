import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Product } from "@/lib/types"

export default function ProductTabs({ product }: { product: Product }) {
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="specifications">Specifications</TabsTrigger>
        <TabsTrigger value="care">Care Instructions</TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="mt-6">
        <div className="prose max-w-none">
          <h3 className="text-lg font-semibold mb-4">Product Description</h3>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-gray-600">
            This unique piece from Strange Lifestyle is designed to help you express your individuality. Made with
            high-quality materials and attention to detail, it's perfect for those who want to stand out from the crowd.
          </p>
        </div>
      </TabsContent>

      <TabsContent value="specifications" className="mt-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Available Sizes</h4>
              <p className="text-gray-600">{product.sizes?.join(", ") || "One Size"}</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Available Colors</h4>
              <p className="text-gray-600">{product.colors?.join(", ") || "As shown"}</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Material</h4>
              <p className="text-gray-600">Premium cotton blend</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Origin</h4>
              <p className="text-gray-600">Made in Bangladesh</p>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="care" className="mt-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Care Instructions</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Machine wash cold with like colors</li>
            <li>• Do not bleach</li>
            <li>• Tumble dry low heat</li>
            <li>• Iron on low temperature if needed</li>
            <li>• Do not dry clean</li>
          </ul>
        </div>
      </TabsContent>
    </Tabs>
  )
}
