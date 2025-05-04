import { ContentLayout } from "@/components/admin-panel/content-layout";
import UserDashboardEventsComponent from "@/components/dashboard-components/user-dashboard/UserDashboardEventsComponent";
import { getLoggedInUserEvent } from "@/services/Event";

export default async function UserDashboardEventsPage({
  searchParams,
}: {
  searchParams: Promise<{ searchTerm: string; page: string }>;
}) {
  const { searchTerm, page } = await searchParams;
  const { data } = await getLoggedInUserEvent(searchTerm, page);
  return (
    <div>
      <ContentLayout title="MY EVENTS">
        <UserDashboardEventsComponent events={data} />
      </ContentLayout>
    </div>
  );
}
