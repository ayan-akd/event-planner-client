import { ContentLayout } from "@/components/admin-panel/content-layout";
import AdminDashboardUsersComponent from "@/components/dashboard-components/admin-dashboard/AdminDashboardUsersComponent";
import { getAllUsers } from "@/services/User";

export default async function AdminUsersPage({searchParams}: {searchParams: Promise<{searchTerm: string; page: string, limit: string}>}) {
  const {searchTerm, page, limit} = await searchParams;
  const {data} = await getAllUsers(searchTerm, page, limit);
  return (
    <ContentLayout title="USERS">
      <AdminDashboardUsersComponent users = {data} />
    </ContentLayout>
  );
}
