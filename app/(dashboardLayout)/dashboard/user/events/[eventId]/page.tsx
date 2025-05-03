import { ContentLayout } from "@/components/admin-panel/content-layout";

export default async function EventsParticipantPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  return (
    <ContentLayout title="PARTICIPANTS">
      <div>
        <h1>This is the EventsParticipantPage for {eventId}</h1>
      </div>
    </ContentLayout>
  );
}
