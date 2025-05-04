"use client";

import { Button } from "@/components/ui/button";
import { TEvent } from "@/types/event.type";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface JoinEventButtonProps {
  event: TEvent;
  currentUserId: string | null;
}

const EventItemJoinButton = ({ event, currentUserId }: JoinEventButtonProps) => {
  const router = useRouter();
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
    // If user is not logged in, redirect to login page
    if (!currentUserId) {
      router.push('/login');
      return;
    }
    
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
    if (!currentUserId) return "Join";
    if (isParticipant) return "Already Joined";
    if (isOrganizer) return "You are the Organizer";

    if (event.isPublic) {
      return "Join";
    } else {
      return "Request to Join";
    }
  };

  // Determine if button should be disabled
  // Remove the disabled state for non-logged in users so they can click to login
  const isButtonDisabled = isParticipant || isOrganizer;

  return (
    <Button
      onClick={handleJoinEvent}
      disabled={isButtonDisabled || isLoading}
    >
      {isLoading ? "Processing..." : getButtonText()}
    </Button>
  );
};

export default EventItemJoinButton;
