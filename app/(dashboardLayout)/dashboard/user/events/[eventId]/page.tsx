import { ContentLayout } from "@/components/admin-panel/content-layout";
import EventsParticipantList from "@/components/dashboard-components/user-dashboard/EventsParticipantList/EventsParticipantList";
import { getSingleEvents } from "@/services/Event";

export default async function EventsParticipantPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const { data: eventData } = await getSingleEvents(eventId);
  return (
    <ContentLayout title="PARTICIPANTS">
      <div>
        <EventsParticipantList participants={eventData} />
      </div>
    </ContentLayout>
  );
}
