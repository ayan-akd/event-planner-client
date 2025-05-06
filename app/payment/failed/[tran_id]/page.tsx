import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";


const EventsDetailsPage = async ({
  params,
}: {
    params: Promise<{ tran_id: string }>;
}) => {
  const { tran_id } = await params;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <AlertCircle className="text-red-600 w-16 h-16 mb-4" />
      <h1 className="text-2xl font-bold text-red-600">Payment Failed</h1>
      <p className="mt-2 text-gray-600">
        Unfortunately, your transaction could not be completed.
      </p>
      <p className="text-sm text-gray-400 mt-1">
        Transaction ID: {tran_id || "Unknown"}
      </p>

      <Button className="mt-6 text-white">
        <Link href="/">Go to Home</Link>
      </Button>
    </div>
  );
};

export default EventsDetailsPage;
