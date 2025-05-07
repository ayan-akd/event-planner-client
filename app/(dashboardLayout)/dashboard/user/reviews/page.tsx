import { ContentLayout } from "@/components/admin-panel/content-layout";
import UserDashboardReviewComponent from "@/components/dashboard-components/user-dashboard/Review";
import { getAllReviews } from "@/services/Review";

export default async function ReviewsPage() {
  const { data } = await getAllReviews();
  return (
    <div>
      <ContentLayout title="ALL REVIEWS">
        <UserDashboardReviewComponent review={data} />
      </ContentLayout>
    </div>
  );
}
