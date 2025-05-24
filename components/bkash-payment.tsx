"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { formatCurrency } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface BkashPaymentProps {
  amount: number
  onSuccess: (transactionId: string) => void
  onCancel: () => void
}

// This would be replaced with actual bKash API integration in production
const simulateBkashAPI = async (endpoint: string, data: any) => {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Simulate different responses based on the endpoint
  switch (endpoint) {
    case "createPayment":
      return {
        success: true,
        paymentID: `PID${Math.floor(Math.random() * 10000000)}`,
        message: "Payment initiated successfully",
      }
    case "executePayment":
      // Simulate OTP verification
      if (data.otp === "1234") {
        return {
          success: true,
          message: "OTP verified successfully",
        }
      } else {
        throw new Error("Invalid OTP")
      }
    case "confirmPayment":
      // Simulate PIN verification
      if (data.pin === "1234") {
        return {
          success: true,
          transactionId: `TRX${Math.floor(Math.random() * 10000000)
            .toString()
            .padStart(7, "0")}`,
          message: "Payment successful",
        }
      } else {
        throw new Error("Invalid PIN")
      }
    case "verifyPayment":
      // Simulate transaction verification
      if (data.transactionId.startsWith("TRX")) {
        return {
          success: true,
          verified: true,
          message: "Transaction verified successfully",
        }
      } else {
        return {
          success: false,
          verified: false,
          message: "Invalid transaction ID",
        }
      }
    default:
      throw new Error("Unknown endpoint")
  }
}

export default function BkashPayment({ amount, onSuccess, onCancel }: BkashPaymentProps) {
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [pin, setPin] = useState("")
  const [transactionId, setTransactionId] = useState("")
  const [paymentId, setPaymentId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "verifying" | "success" | "error">("idle")
  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleSubmitPhone = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!phoneNumber || phoneNumber.length < 11) {
      setError("Please enter a valid bKash account number")
      return
    }

    setIsLoading(true)

    try {
      // In production, this would be a real API call to bKash
      const response = await simulateBkashAPI("createPayment", {
        phoneNumber,
        amount,
      })

      setPaymentId(response.paymentID)
      setStep(2)
      setCountdown(120) // 2 minute countdown for OTP

      toast({
        title: "OTP Sent",
        description: "A verification code has been sent to your phone",
      })
    } catch (error: any) {
      console.error("Error initiating payment:", error)
      setError(error.message || "Failed to initiate payment. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmitOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!otp || otp.length < 4) {
      setError("Please enter a valid OTP")
      return
    }

    setIsLoading(true)

    try {
      // In production, this would be a real API call to bKash
      await simulateBkashAPI("executePayment", {
        paymentId,
        otp,
      })

      setStep(3)
    } catch (error: any) {
      console.error("Error verifying OTP:", error)
      setError(error.message || "Failed to verify OTP. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmitPin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!pin || pin.length < 4) {
      setError("Please enter a valid PIN")
      return
    }

    setIsLoading(true)

    try {
      // In production, this would be a real API call to bKash
      const response = await simulateBkashAPI("confirmPayment", {
        paymentId,
        pin,
      })

      setTransactionId(response.transactionId)
      setStep(4)

      toast({
        title: "Payment Successful",
        description: "Your payment has been processed successfully",
      })
    } catch (error: any) {
      console.error("Error processing payment:", error)
      setError(error.message || "Failed to process payment. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyTransaction = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!transactionId) {
      setError("Please enter your transaction ID")
      return
    }

    setVerificationStatus("verifying")

    try {
      // In production, this would be a real API call to bKash
      const response = await simulateBkashAPI("verifyPayment", {
        transactionId,
      })

      if (response.verified) {
        setVerificationStatus("success")
        // Wait a moment to show success message before completing
        setTimeout(() => {
          onSuccess(transactionId)
        }, 1500)
      } else {
        setVerificationStatus("error")
        setError("Invalid transaction ID. Please check and try again.")
      }
    } catch (error: any) {
      console.error("Error verifying transaction:", error)
      setVerificationStatus("error")
      setError(error.message || "Failed to verify transaction. Please try again.")
    }
  }

  const handleResendOtp = async () => {
    setIsLoading(true)
    setError("")

    try {
      // In production, this would be a real API call to bKash
      await simulateBkashAPI("createPayment", {
        phoneNumber,
        amount,
      })

      setCountdown(120) // Reset countdown

      toast({
        title: "OTP Resent",
        description: "A new verification code has been sent to your phone",
      })
    } catch (error: any) {
      console.error("Error resending OTP:", error)
      setError(error.message || "Failed to resend OTP. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-center mb-6">
          <div className="relative h-12 w-32">
            <Image src="/placeholder.svg?height=48&width=128" alt="bKash Logo" fill className="object-contain" />
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-xl font-bold mb-2">bKash Payment</h2>
          <p className="text-gray-600">Amount: {formatCurrency(amount)}</p>
        </div>

        {step === 1 && (
          <form onSubmit={handleSubmitPhone} className="space-y-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">
                bKash Account Number
              </label>
              <Input
                id="phone"
                type="tel"
                placeholder="01XXXXXXXXX"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex space-x-2">
              <Button type="button" variant="outline" className="flex-1" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Next"
                )}
              </Button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmitOtp} className="space-y-4">
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">A verification code has been sent to {phoneNumber}</p>
              <div className="text-center">
                <span className="text-sm font-medium">
                  {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, "0")}
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="otp" className="block text-sm font-medium mb-1">
                Enter OTP
              </label>
              <Input
                id="otp"
                type="text"
                placeholder="Enter 4-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex space-x-2">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify"
                )}
              </Button>
            </div>

            {countdown === 0 && (
              <Button
                type="button"
                variant="ghost"
                className="w-full text-primary"
                onClick={handleResendOtp}
                disabled={isLoading}
              >
                Resend OTP
              </Button>
            )}
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmitPin} className="space-y-4">
            <div>
              <label htmlFor="pin" className="block text-sm font-medium mb-1">
                Enter bKash PIN
              </label>
              <Input
                id="pin"
                type="password"
                placeholder="Enter your PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex space-x-2">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Confirm Payment"
                )}
              </Button>
            </div>
          </form>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertTitle>Payment Successful</AlertTitle>
              <AlertDescription>
                Your payment has been processed successfully. Please verify your transaction details below.
              </AlertDescription>
            </Alert>

            <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
              <p className="text-sm font-medium mb-1">Transaction Details:</p>
              <p className="text-sm mb-1">
                <span className="font-medium">Amount:</span> {formatCurrency(amount)}
              </p>
              <p className="text-sm mb-1">
                <span className="font-medium">Phone:</span> {phoneNumber}
              </p>
              <p className="text-sm mb-3">
                <span className="font-medium">Transaction ID:</span> {transactionId}
              </p>
              <p className="text-xs text-gray-500">
                Please save this transaction ID for your reference. You'll need to enter it below to complete your
                payment.
              </p>
            </div>

            <form onSubmit={handleVerifyTransaction} className="space-y-4">
              <div>
                <label htmlFor="transactionId" className="block text-sm font-medium mb-1">
                  Confirm Transaction ID
                </label>
                <Input
                  id="transactionId"
                  type="text"
                  placeholder="Enter your transaction ID"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter the transaction ID you received from bKash to verify your payment
                </p>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              {verificationStatus === "success" && (
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertTitle>Payment Verified</AlertTitle>
                  <AlertDescription>Your payment has been verified successfully.</AlertDescription>
                </Alert>
              )}

              {verificationStatus === "error" && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Verification Failed</AlertTitle>
                  <AlertDescription>
                    We couldn't verify your payment. Please check the transaction ID and try again.
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex space-x-2">
                <Button type="button" variant="outline" className="flex-1" onClick={onCancel}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={verificationStatus === "verifying" || verificationStatus === "success"}
                >
                  {verificationStatus === "verifying" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : verificationStatus === "success" ? (
                    "Verified"
                  ) : (
                    "Complete Payment"
                  )}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
