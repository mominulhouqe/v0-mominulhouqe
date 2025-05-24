"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Product } from "@/lib/types"

export default function ProductTabs({ product }: { product: Product }) {
  const [activeTab, setActiveTab] = useState("description")

  return (
    <Tabs defaultValue="description" value={activeTab} onValueChange={setActiveTab} className="mt-8">
      <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-flex">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="details">Product Details</TabsTrigger>
        <TabsTrigger value="size-guide">Size Guide</TabsTrigger>
      </TabsList>
      <TabsContent value="description" className="mt-6">
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl
            aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam
            nisl, eu aliquam nisl nisl sit amet nisl.
          </p>
          <h3 className="text-lg font-medium mt-6 mb-2">Features</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Premium quality materials for durability and comfort</li>
            <li>Versatile design suitable for various occasions</li>
            <li>Easy care and maintenance</li>
            <li>Available in multiple colors and sizes</li>
          </ul>
        </div>
      </TabsContent>
      <TabsContent value="details" className="mt-6">
        <Table>
          <TableBody>
            <TableRow>
              <TableHead className="w-[200px]">Material</TableHead>
              <TableCell>100% Cotton</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Care Instructions</TableHead>
              <TableCell>Machine wash cold, tumble dry low</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Country of Origin</TableHead>
              <TableCell>Bangladesh</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Style</TableHead>
              <TableCell>Casual</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Available Colors</TableHead>
              <TableCell>
                <div className="flex gap-1">
                  {product.colors?.map((color) => (
                    <div
                      key={color}
                      className="w-6 h-6 rounded-full border border-gray-300"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Available Sizes</TableHead>
              <TableCell>{product.sizes?.join(", ")}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TabsContent>
      <TabsContent value="size-guide" className="mt-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Size</TableHead>
                <TableHead>Chest (inches)</TableHead>
                <TableHead>Waist (inches)</TableHead>
                <TableHead>Hips (inches)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>XS</TableCell>
                <TableCell>34-36</TableCell>
                <TableCell>28-30</TableCell>
                <TableCell>34-36</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>S</TableCell>
                <TableCell>36-38</TableCell>
                <TableCell>30-32</TableCell>
                <TableCell>36-38</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>M</TableCell>
                <TableCell>38-40</TableCell>
                <TableCell>32-34</TableCell>
                <TableCell>38-40</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>L</TableCell>
                <TableCell>40-42</TableCell>
                <TableCell>34-36</TableCell>
                <TableCell>40-42</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>XL</TableCell>
                <TableCell>42-44</TableCell>
                <TableCell>36-38</TableCell>
                <TableCell>42-44</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>XXL</TableCell>
                <TableCell>44-46</TableCell>
                <TableCell>38-40</TableCell>
                <TableCell>44-46</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Note: This size guide is approximate. For the best fit, we recommend taking your own measurements and
          comparing them to the size chart.
        </p>
      </TabsContent>
    </Tabs>
  )
}
