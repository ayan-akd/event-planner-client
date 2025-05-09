"use client";
import { useUser } from "@/context/UserContext";
import { refundParticipantPayment } from "@/services/Participants";
import { TParticipant } from "@/types/participant.type";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Refund = ({ participant }: { participant: TParticipant }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const createdDate = new Date(participant.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  //    Handle Refund
  const handleRefund = async () => {
    const refundLoading = toast.loading("Processing refund...");
    setIsLoading(true);
    const payload = {
      userId: user?.userId as string,
      eventId: participant?.eventId,
      participantId: participant?.id,
    };
    try {
      const res = await refundParticipantPayment(payload);
      console.log(res);
      if (res.success) {
        toast.success(res.message, { id: refundLoading });
        setIsLoading(true);
      } else {
        toast.error(res.message, { id: refundLoading });
        setIsLoading(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error("Refund failed!", {
        id: refundLoading,
      });
    }
  };
  return (
    <div className="space-y-4 text-sm text-gray-700">
      <div className="space-y-1">
        <p>
          <strong>Customer Name:</strong> {participant?.user?.name}
        </p>
        <p>
          <strong>Payment Amount:</strong> ৳{participant?.event?.fee}
        </p>
        <p>
          <strong>Payment Gateway:</strong> Shurjo Pay
        </p>
        <p>
          <strong>Participant Request Date:</strong> {createdDate}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Refund Amount</label>
        <input
          type="number"
          value={participant?.event?.fee}
          readOnly
          className="w-full border rounded px-3 py-2 text-sm bg-gray-100"
        />
      </div>

      <p className="text-yellow-600 text-sm">
        ⚠️ Refunding this payment is irreversible. The amount will be refunded
        within 3-5 working days.
      </p>

      <div className="flex justify-end gap-2 pt-4">
        <button
          onClick={handleRefund}
          className="cursor-pointer px-4 py-2 rounded bg-red-600 text-white text-sm hover:bg-red-700"
        >
          {isLoading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            "Confirm Refund"
          )}
        </button>
      </div>
    </div>
  );
};

export default Refund;
