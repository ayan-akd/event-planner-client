import React from "react";
import CreateReview from "./CreateReview";
import ReviewItem from "./ReviewItem";
import { getSpecificReviewsForSpecificEvent } from "@/services/Review";
import { TReview } from "@/types/review.type";
import ReviewAverage from "../../shared/ReviewAverage/ReviewAverage";
import { ReviewSummary } from "./ReviewSummary";

const Reviews = async ({ eventId }: { eventId: string }) => {
  const { data } = await getSpecificReviewsForSpecificEvent(eventId);
  return (
    <div className="w-full mt-6">
      <div>
        <ReviewSummary reviews={data} />
      </div>
      <div className="flex justify-around my-4">
        <h4 className="font-bold">Reviews ( {data?.length || 0} )</h4>
        <CreateReview />
      </div>

      {data?.length > 0 ? (
        <>
          {data?.map((review: TReview) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </>
      ) : (
        <div className="text-center p-4">
          <p className="dark:text-white">No Review Found</p>
        </div>
      )}
    </div>
  );
};

export default Reviews;
