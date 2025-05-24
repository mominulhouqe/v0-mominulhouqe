import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata = {
  title: "About Us | Strange Lifestyle",
  description: "Learn about Strange Lifestyle, our story, mission, and values.",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">About Strange Lifestyle</h1>

        <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-12">
          <Image
            src="/placeholder.svg?height=800&width=1200&text=Our+Story"
            alt="Strange Lifestyle Team"
            fill
            className="object-cover"
          />
        </div>

        <div className="prose prose-lg max-w-none mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p>
            Founded in 2020, Strange Lifestyle was born out of a passion for unique, high-quality clothing that makes a
            statement. What started as a small collection designed in a tiny apartment has grown into a beloved brand
            known for its distinctive style and commitment to quality.
          </p>
          <p>
            Our founder, inspired by global fashion trends and a desire to create something truly different, set out to
            build a clothing brand that challenges conventional fashion norms. The name "Strange Lifestyle" reflects our
            belief that embracing your uniqueness is something to be celebrated, not hidden.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Our Mission</h2>
          <p>
            At Strange Lifestyle, our mission is to empower individuals to express themselves through fashion that's as
            unique as they are. We believe clothing is more than just fabric—it's a form of self-expression, a statement
            about who you are and what you stand for.
          </p>
          <p>
            We're committed to creating clothing that not only looks good but feels good to wear and is made with
            respect for the people who create it and the planet we all share.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-2">Quality</h3>
                <p className="text-gray-600">
                  We never compromise on quality. From fabric selection to stitching, every detail matters.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-2">Creativity</h3>
                <p className="text-gray-600">
                  We push boundaries with innovative designs that stand out from the crowd.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-2">Sustainability</h3>
                <p className="text-gray-600">
                  We're committed to reducing our environmental impact through responsible practices.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator className="my-12" />

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Alex Johnson", role: "Founder & Creative Director" },
              { name: "Sam Taylor", role: "Head of Design" },
              { name: "Jordan Smith", role: "Production Manager" },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative w-full h-[300px] rounded-lg overflow-hidden mb-4">
                  <Image
                    src={`/placeholder.svg?height=300&width=300&text=${member.name}`}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Join the Strange Lifestyle Community</h2>
          <p className="text-gray-600 mb-6">
            Discover our latest collections and be part of our growing community of fashion enthusiasts.
          </p>
          <Button asChild size="lg">
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
