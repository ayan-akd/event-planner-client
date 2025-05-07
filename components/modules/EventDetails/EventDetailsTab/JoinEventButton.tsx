"use client";

import { Button } from "@/components/ui/button";
import { TEvent } from "@/types/event.type";
import { useState } from "react";
import { CustomModal } from "../../shared/CustomModal";
import CreatePayment from "../../Payment/Create-Payment";

interface JoinEventButtonProps {
  event: TEvent;
  currentUserId: string | null;
  userId: string;
}

const JoinEventButton = ({
  event,
  currentUserId,
  userId,
}: JoinEventButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is already a participant
  const isParticipant =
    currentUserId &&
    event.participants?.some(
      (participant) => participant.userId === currentUserId
    );

  // Check if user is the organizer
  const isOrganizer = currentUserId && event.organizer.id === currentUserId;

  const handleJoinEvent = async () => {
    setIsLoading(true);
    try {
    } catch (error) {
      console.error("Error joining event:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Determine button text based on event type
  const getButtonText = () => {
    if (!currentUserId) return "Login to Join";
    if (isParticipant) return "Already Joined";
    if (isOrganizer) return "You are the Organizer";

    if (event.isPublic && event?.fee === 0) {
      return "Join";
    } else if (!event?.isPublic && event?.fee === 0) {
      return "Request to Join";
    } else {
      return "Pay to Join";
    }
  };

  // Determine if button should be disabled
  const isButtonDisabled = !currentUserId || isParticipant || isOrganizer;

  // for payment: userId and eventId needed
  const paymentData = {
    userId,
    eventId: event.id,
  };

  return (
    <CustomModal
      content={
        // <CreateEvent />
        <CreatePayment paymentData={paymentData} event={event} />
      }
      trigger={
        <Button
          className="w-full my-3 dark:text-white"
          onClick={handleJoinEvent}
          disabled={isButtonDisabled || isLoading}
        >
          {isLoading ? "Processing..." : getButtonText()}
        </Button>
      }
      title="You are ready to join the event?"
    />
  );
};

export default JoinEventButton;
