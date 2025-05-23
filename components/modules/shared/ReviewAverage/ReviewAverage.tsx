import { TReview } from "@/types/review.type";
import { getAverageRating } from "@/utils/getAverageRating";
import { Star } from "lucide-react";
import React from "react";

const ReviewAverage = ({ reviews }: { reviews: TReview[] }) => {
  return (
    <div className="flex items-center space-x-1">
      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
      <span className="text-sm font-medium">{getAverageRating(reviews)}</span>
      <span className="text-sm text-muted-foreground">
        ({reviews?.length} reviews)
      </span>
    </div>
  );
};

export default ReviewAverage;
