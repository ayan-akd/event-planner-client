// import React from 'react';

// const page = () => {
//   return (
//     <div>
//       <h1>fail</h1>
//     </div>
//   );
// };

// export default page;

// "use client";

// import { useParams, useRouter } from "next/navigation";
// import { AlertCircle } from "lucide-react";
// import { Button } from "@/components/ui/button";

// const PaymentFailPage = () => {
//   const router = useRouter();
//   const {tran_id} = useParams();

//   console.log("Transaction ID:", tran_id);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
//       <AlertCircle className="text-red-600 w-16 h-16 mb-4" />
//       <h1 className="text-2xl font-bold text-red-600">Payment Failed</h1>
//       <p className="mt-2 text-gray-600">
//         Unfortunately, your transaction could not be completed.
//       </p>
//       <p className="text-sm text-gray-400 mt-1">
//         Transaction ID: {tran_id || "Unknown"}
//       </p>

//       <Button className="mt-6" onClick={() => router.push("/")}>
//         Go to Home
//       </Button>
//     </div>
//   );
// };

// export default PaymentFailPage;
