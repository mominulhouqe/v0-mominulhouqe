import Image from "next/image"
import { Users, Target, Award, Heart } from "lucide-react"

export const metadata = {
  title: "About Us | Strange Lifestyle",
  description: "Learn about Strange Lifestyle's mission to provide unique fashion that expresses individuality.",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About Strange Lifestyle</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We believe fashion is a form of self-expression. Our mission is to provide unique, high-quality clothing that
          helps you tell your story and express your individuality.
        </p>
      </section>

      {/* Story Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Strange Lifestyle was born from a simple idea: everyone deserves to express their unique personality through
            fashion. Founded in 2020 in Dhaka, Bangladesh, we started as a small team passionate about creating clothing
            that stands out from the crowd.
          </p>
          <p className="text-gray-600 mb-4">
            What makes us "strange" is our commitment to uniqueness. We don't follow trends – we create them. Every
            piece in our collection is carefully designed to help you express your individuality and make a statement
            wherever you go.
          </p>
          <p className="text-gray-600">
            Today, we're proud to serve customers across Bangladesh and beyond, helping them discover their unique style
            and embrace what makes them different.
          </p>
        </div>
        <div className="relative h-96">
          <Image
            src="/placeholder.svg?height=400&width=600&text=Our+Story"
            alt="Our Story"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </section>

      {/* Values Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Uniqueness</h3>
            <p className="text-gray-600">
              We celebrate what makes you different and create clothing that reflects your unique personality.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Quality</h3>
            <p className="text-gray-600">
              We use only the finest materials and craftsmanship to ensure our products last and look great.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Passion</h3>
            <p className="text-gray-600">
              Fashion is our passion, and we pour our heart into every design and customer interaction.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Community</h3>
            <p className="text-gray-600">
              We're building a community of individuals who aren't afraid to be different and express themselves.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Ahmed Rahman", role: "Founder & CEO", image: "/placeholder.svg?height=300&width=300&text=Ahmed" },
            {
              name: "Fatima Ali",
              role: "Creative Director",
              image: "/placeholder.svg?height=300&width=300&text=Fatima",
            },
            {
              name: "Karim Hassan",
              role: "Head of Operations",
              image: "/placeholder.svg?height=300&width=300&text=Karim",
            },
          ].map((member, index) => (
            <div key={index} className="text-center">
              <div className="relative h-64 w-64 mx-auto mb-4 rounded-full overflow-hidden">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold mb-1">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-gray-50 rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          To empower individuals to express their unique personality through fashion, creating a world where being
          different is celebrated and everyone feels confident in their own skin.
        </p>
      </section>
    </div>
  )
}
