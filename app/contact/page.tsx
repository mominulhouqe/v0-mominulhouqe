import type { Metadata } from "next"
import ContactPageClient from "./ContactPageClient"

export const metadata: Metadata = {
  title: "Contact Us | Strange Lifestyle",
  description:
    "Get in touch with Strange Lifestyle. We're here to help with any questions about our products or services.",
}

export default function ContactPage() {
  return <ContactPageClient />
}
