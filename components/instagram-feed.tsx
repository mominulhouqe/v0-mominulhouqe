import Image from "next/image"
import Link from "next/link"
import { Instagram } from "lucide-react"

const instagramPosts = [
  {
    id: 1,
    image: "/placeholder.svg?height=300&width=300&text=Insta+1",
    likes: 245,
    comments: 12,
  },
  {
    id: 2,
    image: "/placeholder.svg?height=300&width=300&text=Insta+2",
    likes: 189,
    comments: 8,
  },
  {
    id: 3,
    image: "/placeholder.svg?height=300&width=300&text=Insta+3",
    likes: 312,
    comments: 15,
  },
  {
    id: 4,
    image: "/placeholder.svg?height=300&width=300&text=Insta+4",
    likes: 156,
    comments: 6,
  },
  {
    id: 5,
    image: "/placeholder.svg?height=300&width=300&text=Insta+5",
    likes: 278,
    comments: 11,
  },
  {
    id: 6,
    image: "/placeholder.svg?height=300&width=300&text=Insta+6",
    likes: 203,
    comments: 9,
  },
]

export default function InstagramFeed() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {instagramPosts.map((post) => (
        <Link
          key={post.id}
          href="https://instagram.com/strangelifestyle"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative aspect-square overflow-hidden rounded-lg"
        >
          <Image
            src={post.image || "/placeholder.svg"}
            alt={`Instagram post ${post.id}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
              <Instagram className="h-8 w-8 mx-auto mb-2" />
              <div className="text-sm">
                <span className="block">{post.likes} likes</span>
                <span className="block">{post.comments} comments</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
