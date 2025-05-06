import { ContentLayout } from "@/components/admin-panel/content-layout";
import AdminEvents from "@/components/dashboard-components/admin-dashboard/AdminEvents/AdminEvents";
import { getAllEvents } from "@/services/Event";

export default async function AdminEventsPage({
  searchParams,
}: {
  searchParams: Promise<{ searchTerm: string; page: string }>;
}) {
  const { searchTerm, page } = await searchParams;
  const { data } = await getAllEvents(searchTerm, page);
  return (
    <ContentLayout title="EVENTS">
      <div>
        <AdminEvents events={data} />
      </div>
    </ContentLayout>
  );
}
