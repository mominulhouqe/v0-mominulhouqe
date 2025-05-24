"use client"

import { useState } from "react"

import type React from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/components/ui/use-toast"

// Mock reviews data
const mockReviews = [
  {
    id: "1",
    productId: "1",
    userId: "user1",
    userName: "John Doe",
    rating: 5,
    title: "Excellent quality!",
    comment: "I'm very impressed with the quality of this product. It exceeded my expectations.",
    date: "2023-04-15T10:30:00Z",
    helpful: 12,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    productId: "1",
    userId: "user2",
    userName: "Sarah Smith",
    rating: 4,
    title: "Great product, but...",
    comment:
      "The product is great overall, but I wish it came in more colors. The fabric is comfortable and the fit is perfect.",
    date: "2023-04-10T14:45:00Z",
    helpful: 8,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    productId: "1",
    userId: "user3",
    userName: "Michael Johnson",
    rating: 5,
    title: "Perfect fit!",
    comment: "The size guide was spot on. This fits me perfectly and the quality is excellent.",
    date: "2023-04-05T09:15:00Z",
    helpful: 5,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const reviews = [
  {
    id: 1,
    name: "Sarah Ahmed",
    rating: 5,
    date: "2 weeks ago",
    comment: "Amazing quality and unique design! I get so many compliments when wearing this.",
    verified: true,
  },
  {
    id: 2,
    name: "Rafiq Hassan",
    rating: 4,
    date: "1 month ago",
    comment: "Great product, fits perfectly. The material is very comfortable.",
    verified: true,
  },
  {
    id: 3,
    name: "Fatima Khan",
    rating: 5,
    date: "2 months ago",
    comment: "Love the style! Exactly what I was looking for. Will definitely order more.",
    verified: true,
  },
]

export default function ProductReviews({ productId }: { productId: string }) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [reviewsState, setReviewsState] = useState([...mockReviews, ...reviews])
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: "",
    comment: "",
  })
  const [showReviewForm, setShowReviewForm] = useState(false)

  const handleRatingChange = (rating: number) => {
    setNewReview((prev) => ({ ...prev, rating }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewReview((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to leave a review.",
        variant: "destructive",
      })
      return
    }

    if (!newReview.title || !newReview.comment) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields.",
        variant: "destructive",
      })
      return
    }

    // In a real app, you would submit the review to your backend
    const review = {
      id: `review-${Date.now()}`,
      productId,
      userId: user.id,
      userName: user.name,
      rating: newReview.rating,
      title: newReview.title,
      comment: newReview.comment,
      date: new Date().toISOString(),
      helpful: 0,
      avatar: "/placeholder.svg?height=40&width=40",
    }

    setReviewsState([review, ...reviewsState])
    setNewReview({
      rating: 5,
      title: "",
      comment: "",
    })
    setShowReviewForm(false)

    toast({
      title: "Review submitted",
      description: "Thank you for your review!",
    })
  }

  const markHelpful = (reviewId: string) => {
    setReviewsState(
      reviewsState.map((review) => {
        if (review.id === reviewId) {
          return { ...review, helpful: review.helpful + 1 }
        }
        return review
      }),
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold">Customer Reviews ({reviewsState.length})</h3>
          <div className="flex items-center mt-1">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="ml-2 text-gray-600">
              {(
                reviewsState.reduce((acc, review) => acc + review.rating, 0) / Math.max(1, reviewsState.length)
              ).toFixed(1)}{" "}
              out of 5
            </span>
          </div>
        </div>
        <Button onClick={() => setShowReviewForm(!showReviewForm)}>
          {showReviewForm ? "Cancel" : "Write a Review"}
        </Button>
      </div>

      {showReviewForm && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <Label htmlFor="rating" className="block mb-2">
                Rating
              </Label>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingChange(star)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-8 w-8 ${star <= newReview.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="title" className="block mb-2">
                Review Title
              </Label>
              <input
                type="text"
                id="title"
                name="title"
                value={newReview.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Summarize your experience"
                required
              />
            </div>
            <div>
              <Label htmlFor="comment" className="block mb-2">
                Review
              </Label>
              <Textarea
                id="comment"
                name="comment"
                value={newReview.comment}
                onChange={handleInputChange}
                className="w-full"
                placeholder="Share your experience with this product"
                rows={4}
                required
              />
            </div>
            <Button type="submit">Submit Review</Button>
          </form>
        </div>
      )}

      <div className="space-y-6">
        {reviewsState.length === 0 ? (
          <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
        ) : (
          reviewsState.map((review) => (
            <div key={review.id} className="border-b pb-6">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.userName || review.name} />
                  <AvatarFallback>{(review.userName || review.name).charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="font-medium">{review.userName || review.name}</span>
                      {review.verified && (
                        <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mt-2">{review.comment}</p>
                  <div className="flex items-center mt-3">
                    <span className="text-sm text-gray-500 mr-2">Was this review helpful?</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => markHelpful(review.id)}
                      className="text-xs h-7 px-2"
                    >
                      Yes ({review.helpful})
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Button variant="outline" className="w-full">
        Load More Reviews
      </Button>
    </div>
  )
}
