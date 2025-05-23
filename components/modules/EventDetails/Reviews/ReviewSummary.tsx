"use client";

import { TReview } from "@/types/review.type";
import { Star } from "lucide-react";

type Review = {
  rating: number;
};

type Props = {
  reviews: TReview[];
};

const getAverageRating = (reviews: Review[]) => {
  if (reviews.length === 0) return 0;
  const total = reviews.reduce((sum, r) => sum + r.rating, 0);
  return +(total / reviews.length).toFixed(2);
};

const getRatingDistribution = (reviews: Review[]) => {
  const total = reviews.length;
  return [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => r.rating === star).length;
    const percent = total === 0 ? 0 : Math.round((count / total) * 100);
    return { star, count, percent };
  });
};

export const ReviewSummary = ({ reviews }: Props) => {
  const average = getAverageRating(reviews);
  const total = reviews.length;
  const distribution = getRatingDistribution(reviews);

  return (
    <div className="space-y-4 rounded-lg border p-4">
      {/* Top: Average rating */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1 text-yellow-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={18}
              fill={i < Math.round(average) ? "#facc15" : "none"}
              strokeWidth={1.5}
            />
          ))}
        </div>
        <p className="font-semibold text-gray-900">{average} out of 5</p>
      </div>
      <p className="text-sm text-gray-600">{total} global ratings</p>

      {/* Rating  */}
      <div className="space-y-2">
        {distribution.map(({ star, percent }) => (
          <div key={star} className="flex items-center space-x-2">
            <span className="w-12 text-sm text-gray-700">{star} star</span>
            <div className="relative h-3 flex-1 rounded bg-gray-200">
              <div
                className="absolute left-0 top-0 h-3 rounded bg-yellow-400"
                style={{ width: `${percent}%` }}
              />
            </div>
            <span className="w-10 text-right text-sm text-gray-700">
              {percent}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
