import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/components/cart-provider"
import { AuthProvider } from "@/components/auth-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Strange Lifestyle | Unique Fashion & Clothing Store",
  description:
    "Discover unique clothing that expresses your individuality. Quality fashion for every occasion at Strange Lifestyle.",
  keywords: "fashion, clothing, lifestyle, unique style, trendy clothes, online shopping",
  authors: [{ name: "Strange Lifestyle" }],
  creator: "Strange Lifestyle",
  publisher: "Strange Lifestyle",
  openGraph: {
    title: "Strange Lifestyle | Unique Fashion & Clothing Store",
    description: "Discover unique clothing that expresses your individuality. Quality fashion for every occasion.",
    url: "https://strangelifestyle.com",
    siteName: "Strange Lifestyle",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Strange Lifestyle - Unique Fashion",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Strange Lifestyle | Unique Fashion & Clothing Store",
    description: "Discover unique clothing that expresses your individuality.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <AuthProvider>
            <CartProvider>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <Toaster />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
