import { ContentLayout } from "@/components/admin-panel/content-layout";
import UserDashboardParticipationComponent from "@/components/dashboard-components/user-dashboard/UserDashboardParticipationComponent";
import { getAllParticipantsForLoggedInUser } from "@/services/Participants";

export default async function ParticipationPage() {
  const { data } = await getAllParticipantsForLoggedInUser();

  return (
    <ContentLayout title="Participation">
      <UserDashboardParticipationComponent participation={data} />
    </ContentLayout>
  );
}
