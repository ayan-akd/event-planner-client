import React from "react";
import CreateReview from "./CreateReview";
import { reviewsData, TFakeReviewType } from "@/faker/reviews";
import ReviewItem from "./ReviewItem";

const Reviews = async () => {
  return (
    <div className="max-w-lg mt-6">
      <div className="flex justify-around mb-4">
        <h4 className="font-bold">Reviews ( {0} )</h4>
        <CreateReview />
      </div>

      {reviewsData?.length > 0 ? (
        <>
          {reviewsData?.map((review: TFakeReviewType) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </>
      ) : (
        <div className="text-center p-4">
          <p>No Review Found</p>
        </div>
      )}
    </div>
  );
};

export default Reviews;
