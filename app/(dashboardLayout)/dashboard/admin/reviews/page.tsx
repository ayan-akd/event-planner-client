import { ContentLayout } from "@/components/admin-panel/content-layout";
import AdminDashboardReviewComponent from "@/components/dashboard-components/admin-dashboard/Reviews";
import { getAllReviewsForAdmin } from "@/services/Review";

export default async function AdminReviewsPage() {
  const { data } = await getAllReviewsForAdmin();
  return (
    <div>
      <ContentLayout title="REVIEWS">
        <AdminDashboardReviewComponent review={data} />
      </ContentLayout>
    </div>
  );
}
