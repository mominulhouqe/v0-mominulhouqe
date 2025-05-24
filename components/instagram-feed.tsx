import Image from "next/image"
import { Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock Instagram posts
const instagramPosts = [
  {
    id: "1",
    imageUrl: "/placeholder.svg?height=300&width=300&text=Instagram+1",
    likes: 124,
    comments: 8,
  },
  {
    id: "2",
    imageUrl: "/placeholder.svg?height=300&width=300&text=Instagram+2",
    likes: 98,
    comments: 12,
  },
  {
    id: "3",
    imageUrl: "/placeholder.svg?height=300&width=300&text=Instagram+3",
    likes: 156,
    comments: 24,
  },
  {
    id: "4",
    imageUrl: "/placeholder.svg?height=300&width=300&text=Instagram+4",
    likes: 87,
    comments: 5,
  },
  {
    id: "5",
    imageUrl: "/placeholder.svg?height=300&width=300&text=Instagram+5",
    likes: 213,
    comments: 18,
  },
  {
    id: "6",
    imageUrl: "/placeholder.svg?height=300&width=300&text=Instagram+6",
    likes: 76,
    comments: 3,
  },
]

export default function InstagramFeed() {
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {instagramPosts.map((post) => (
          <a
            key={post.id}
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden rounded-md"
          >
            <Image
              src={post.imageUrl || "/placeholder.svg"}
              alt={`Instagram post ${post.id}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
              <div className="text-white text-center">
                <div className="flex items-center justify-center gap-4">
                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {post.likes}
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {post.comments}
                  </div>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Button asChild variant="outline">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Instagram className="mr-2 h-4 w-4" /> Follow on Instagram
          </a>
        </Button>
      </div>
    </div>
  )
}
