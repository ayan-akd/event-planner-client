import { ContentLayout } from "@/components/admin-panel/content-layout";
import UserDashboardInvitationComponent from "@/components/dashboard-components/user-dashboard/UserDashboardInvitationComponent";
import { getMyCreatedInvites } from "@/services/Invitations";

export default async function InvitationsPage() {
    const  {data}  = await getMyCreatedInvites();
    return (
       <ContentLayout title="INVITATIONS">
         <UserDashboardInvitationComponent invitations={data} />
       </ContentLayout>
    );
}