import { ContentLayout } from "@/components/admin-panel/content-layout";
import UserDashboardNotificationComponent from "@/components/dashboard-components/user-dashboard/Notifications/UserDashboardNotificationComponent";
import { getMyReceivedInvites } from "@/services/Invitations";

export default async function NotificationsPage() {
  const { data } = await getMyReceivedInvites();
  return (
    <ContentLayout title="NOTIFICATIONS">
      <UserDashboardNotificationComponent data={data} />
    </ContentLayout>
  );
}
