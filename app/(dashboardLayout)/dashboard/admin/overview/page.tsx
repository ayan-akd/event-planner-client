import { ContentLayout } from "@/components/admin-panel/content-layout";
import AdminDashboardOverview from "@/components/dashboard-components/admin-dashboard/AdminDashboardOverview/AdminDashboardOverview";
import { getAllEvents } from "@/services/Event";
import { getAllUsers } from "@/services/User";

export default async function AdminReviewsPage() {
  const { data: users } = await getAllUsers();
  const { data: events } = await getAllEvents(null);

  return (
    <div>
      <ContentLayout title="OVERVIEW">
        <AdminDashboardOverview events={events?.result} users={users?.result} />
      </ContentLayout>
    </div>
  );
}
