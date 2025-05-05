import { ContentLayout } from "@/components/admin-panel/content-layout";
import AdminDashboardUsersComponent from "@/components/dashboard-components/admin-dashboard/AdminDashboardUsersComponent";
import { getAllUsers } from "@/services/User";

export default async function AdminUsersPage({searchParams}: {searchParams: Promise<{searchTerm: string; page: string, limit: string}>}) {
  const {searchTerm, page, limit} = await searchParams;
  const {data} = await getAllUsers(searchTerm, page, limit);
  return (
    <ContentLayout title="USERS">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">All Users</h1>
      </div>
      <AdminDashboardUsersComponent users = {data} />
    </ContentLayout>
  );
}
