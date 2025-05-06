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

const JoinEventButton = ({ event, currentUserId, userId }: JoinEventButtonProps) => {
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
      // Handle different join flows based on event type
      if (event.isPublic && event.fee === 0) {
        // Public & Free: instant acceptance
        console.log("Joining public free event");
        // API call to join event
      } else if (event.isPublic && event.fee > 0) {
        // Public & Paid: payment flow → Pending approval
        console.log("Initiating payment for public paid event");
        // Redirect to payment flow
      } else if (!event.isPublic && event.fee === 0) {
        // Private & Free: Pending approval
        console.log("Requesting to join private free event");
        // API call to request joining
      } else {
        // Private & Paid: payment flow → Pending approval
        console.log("Requesting to join private paid event with payment");
        // API call to request joining with payment
      }
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

    if (event.isPublic) {
      return "Join";
    } else {
      return "Request to Join";
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
          <CreatePayment paymentData={paymentData} />
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
          title="You are ready to join the event!"
      />
  );
};

export default JoinEventButton;
