import EventDetails from "@/components/modules/EventDetails";
import CommonBanner from "@/components/modules/shared/CommonBanner/CommonBanner";
import MyContainer from "@/components/modules/shared/MyContainer/MyContainer";
import { getSingleEvents } from "@/services/Event";
import React from "react";

//  Generate Meta Data
export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data } = await getSingleEvents(id);
  return {
    title: data?.title,
    description: data?.description,
    openGraph: {
      images: [
        {
          url: data?.image,
          width: 800,
          height: 600,
        },
      ],
    },
  };
}

const EventsDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <div>
      <CommonBanner mainComponentTitle="Event" subComponentTitle="Details" />
      <MyContainer>
        <EventDetails eventId={id} />
      </MyContainer>
    </div>
  );
};

export default EventsDetailsPage;
