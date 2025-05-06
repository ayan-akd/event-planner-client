import { ContentLayout } from "@/components/admin-panel/content-layout";
import UserDashboardReviewComponent from "@/components/dashboard-components/user-dashboard/Review";
import { getLoggedInUserEvent } from "@/services/Event";
import { getAllReviews } from "@/services/Review";

export default async function ReviewsPage({
  searchParams,
}: {
  searchParams: Promise<{ searchTerm: string; page: string }>;
}) {
  const { searchTerm, page } = await searchParams;
  // const { data } = await getLoggedInUserEvent(undefined);
  const { data } = await getAllReviews();
  return (
    <div>
      <ContentLayout title="ALL REVIEWS">
        <UserDashboardReviewComponent review={data} />
      </ContentLayout>
    </div>
  );
}
