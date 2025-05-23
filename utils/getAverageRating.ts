import { TReview } from "@/types/review.type";

export const getAverageRating = (reviews: TReview[]) => {
  if (!reviews || reviews.length === 0) return 0;

  const totalRating = reviews.reduce(
    (sum, review) => sum + (review.rating || 0),
    0
  );
  const average = totalRating / reviews.length;

  return Math.round(average * 10) / 10;
};
