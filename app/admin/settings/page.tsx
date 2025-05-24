"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  const [storeSettings, setStoreSettings] = useState({
    storeName: "Stylish Threads",
    storeEmail: "info@stylishthreads.com",
    storePhone: "+880 1XXX-XXXXXX",
    storeAddress: "123 Fashion Street, Dhaka, Bangladesh",
    storeCurrency: "USD",
    storeLanguage: "en",
    enableReviews: true,
    enableWishlist: true,
    enableGuestCheckout: true,
    taxRate: "5",
  })

  const [paymentSettings, setPaymentSettings] = useState({
    enableCashOnDelivery: true,
    enableBkash: true,
    bkashMerchantNumber: "01XXXXXXXXX",
    bkashApiKey: "••••••••••••••••",
    bkashApiSecret: "••••••••••••••••",
  })

  const [shippingSettings, setShippingSettings] = useState({
    enableFreeShipping: true,
    freeShippingMinimum: "100",
    localShippingRate: "5.99",
    nationalShippingRate: "9.99",
    internationalShipping: false,
    internationalShippingRate: "29.99",
  })

  const handleStoreSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setStoreSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleStoreToggleChange = (name: string, value: boolean) => {
    setStoreSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleStoreSelectChange = (name: string, value: string) => {
    setStoreSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handlePaymentSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPaymentSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handlePaymentToggleChange = (name: string, value: boolean) => {
    setPaymentSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleShippingSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setShippingSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleShippingToggleChange = (name: string, value: boolean) => {
    setShippingSettings((prev) => ({ ...prev, [name]: value }))
  }

  const saveSettings = () => {
    // In a real app, you would save the settings to the backend
    console.log("Store Settings:", storeSettings)
    console.log("Payment Settings:", paymentSettings)
    console.log("Shipping Settings:", shippingSettings)
    // Show success message
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-500">Manage your store settings</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your store information and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Store Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="storeName">Store Name</Label>
                    <Input
                      id="storeName"
                      name="storeName"
                      value={storeSettings.storeName}
                      onChange={handleStoreSettingsChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storeEmail">Store Email</Label>
                    <Input
                      id="storeEmail"
                      name="storeEmail"
                      type="email"
                      value={storeSettings.storeEmail}
                      onChange={handleStoreSettingsChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storePhone">Store Phone</Label>
                    <Input
                      id="storePhone"
                      name="storePhone"
                      value={storeSettings.storePhone}
                      onChange={handleStoreSettingsChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storeAddress">Store Address</Label>
                    <Textarea
                      id="storeAddress"
                      name="storeAddress"
                      value={storeSettings.storeAddress}
                      onChange={handleStoreSettingsChange}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Regional Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="storeCurrency">Currency</Label>
                    <Select
                      value={storeSettings.storeCurrency}
                      onValueChange={(value) => handleStoreSelectChange("storeCurrency", value)}
                    >
                      <SelectTrigger id="storeCurrency">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="BDT">BDT - Bangladeshi Taka</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storeLanguage">Language</Label>
                    <Select
                      value={storeSettings.storeLanguage}
                      onValueChange={(value) => handleStoreSelectChange("storeLanguage", value)}
                    >
                      <SelectTrigger id="storeLanguage">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="bn">Bengali</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxRate">Tax Rate (%)</Label>
                    <Input
                      id="taxRate"
                      name="taxRate"
                      type="number"
                      value={storeSettings.taxRate}
                      onChange={handleStoreSettingsChange}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Store Features</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enableReviews" className="text-base">
                        Enable Product Reviews
                      </Label>
                      <p className="text-sm text-gray-500">Allow customers to leave reviews on products</p>
                    </div>
                    <Switch
                      id="enableReviews"
                      checked={storeSettings.enableReviews}
                      onCheckedChange={(value) => handleStoreToggleChange("enableReviews", value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enableWishlist" className="text-base">
                        Enable Wishlist
                      </Label>
                      <p className="text-sm text-gray-500">Allow customers to save products to a wishlist</p>
                    </div>
                    <Switch
                      id="enableWishlist"
                      checked={storeSettings.enableWishlist}
                      onCheckedChange={(value) => handleStoreToggleChange("enableWishlist", value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enableGuestCheckout" className="text-base">
                        Enable Guest Checkout
                      </Label>
                      <p className="text-sm text-gray-500">Allow customers to checkout without creating an account</p>
                    </div>
                    <Switch
                      id="enableGuestCheckout"
                      checked={storeSettings.enableGuestCheckout}
                      onCheckedChange={(value) => handleStoreToggleChange("enableGuestCheckout", value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
              <CardDescription>Configure payment methods and options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Payment Methods</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enableCashOnDelivery" className="text-base">
                        Cash on Delivery
                      </Label>
                      <p className="text-sm text-gray-500">Allow customers to pay when they receive their order</p>
                    </div>
                    <Switch
                      id="enableCashOnDelivery"
                      checked={paymentSettings.enableCashOnDelivery}
                      onCheckedChange={(value) => handlePaymentToggleChange("enableCashOnDelivery", value)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enableBkash" className="text-base">
                        bKash Payment
                      </Label>
                      <p className="text-sm text-gray-500">Allow customers to pay using bKash mobile banking</p>
                    </div>
                    <Switch
                      id="enableBkash"
                      checked={paymentSettings.enableBkash}
                      onCheckedChange={(value) => handlePaymentToggleChange("enableBkash", value)}
                    />
                  </div>
                </div>
              </div>

              {paymentSettings.enableBkash && (
                <>
                  <Separator />
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">bKash Configuration</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="bkashMerchantNumber">Merchant Number</Label>
                        <Input
                          id="bkashMerchantNumber"
                          name="bkashMerchantNumber"
                          value={paymentSettings.bkashMerchantNumber}
                          onChange={handlePaymentSettingsChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bkashApiKey">API Key</Label>
                        <Input
                          id="bkashApiKey"
                          name="bkashApiKey"
                          type="password"
                          value={paymentSettings.bkashApiKey}
                          onChange={handlePaymentSettingsChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bkashApiSecret">API Secret</Label>
                        <Input
                          id="bkashApiSecret"
                          name="bkashApiSecret"
                          type="password"
                          value={paymentSettings.bkashApiSecret}
                          onChange={handlePaymentSettingsChange}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="shipping">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Settings</CardTitle>
              <CardDescription>Configure shipping options and rates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Shipping Options</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enableFreeShipping" className="text-base">
                        Free Shipping
                      </Label>
                      <p className="text-sm text-gray-500">Offer free shipping on orders above a minimum amount</p>
                    </div>
                    <Switch
                      id="enableFreeShipping"
                      checked={shippingSettings.enableFreeShipping}
                      onCheckedChange={(value) => handleShippingToggleChange("enableFreeShipping", value)}
                    />
                  </div>

                  {shippingSettings.enableFreeShipping && (
                    <div className="space-y-2 ml-6">
                      <Label htmlFor="freeShippingMinimum">Minimum Order Amount ($)</Label>
                      <Input
                        id="freeShippingMinimum"
                        name="freeShippingMinimum"
                        type="number"
                        value={shippingSettings.freeShippingMinimum}
                        onChange={handleShippingSettingsChange}
                      />
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Shipping Rates</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="localShippingRate">Local Shipping Rate ($)</Label>
                    <Input
                      id="localShippingRate"
                      name="localShippingRate"
                      type="number"
                      value={shippingSettings.localShippingRate}
                      onChange={handleShippingSettingsChange}
                    />
                    <p className="text-xs text-gray-500">For shipping within the city</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nationalShippingRate">National Shipping Rate ($)</Label>
                    <Input
                      id="nationalShippingRate"
                      name="nationalShippingRate"
                      type="number"
                      value={shippingSettings.nationalShippingRate}
                      onChange={handleShippingSettingsChange}
                    />
                    <p className="text-xs text-gray-500">For shipping within the country</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div>
                    <Label htmlFor="internationalShipping" className="text-base">
                      International Shipping
                    </Label>
                    <p className="text-sm text-gray-500">Enable shipping to international destinations</p>
                  </div>
                  <Switch
                    id="internationalShipping"
                    checked={shippingSettings.internationalShipping}
                    onCheckedChange={(value) => handleShippingToggleChange("internationalShipping", value)}
                  />
                </div>

                {shippingSettings.internationalShipping && (
                  <div className="space-y-2 ml-6">
                    <Label htmlFor="internationalShippingRate">International Shipping Rate ($)</Label>
                    <Input
                      id="internationalShippingRate"
                      name="internationalShippingRate"
                      type="number"
                      value={shippingSettings.internationalShippingRate}
                      onChange={handleShippingSettingsChange}
                    />
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
