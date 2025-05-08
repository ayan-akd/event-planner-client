import { Button } from "@/components/ui/button";
import { verifyPayment } from "@/services/Participants";
import Link from "next/link";
import React from "react";

const PaymentPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | undefined }>;
}) => {
  const searchId = await searchParams;
  const resPaymentVerify = await verifyPayment(searchId?.order_id as string);
  return (
    <div>
      {resPaymentVerify?.data[0]?.bank_status === "Success" ? (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
          <div className="w-full max-w-2xl p-4 bg-white shadow-2xl dark:bg-gray-900 sm:p-10 sm:rounded-3xl">
            <div className="text-center">
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full dark:bg-green-700">
                <svg
                  className="h-12 w-12 text-green-600 dark:text-green-100"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  ></path>
                </svg>
              </div>
              <h1 className="text-4xl font-extrabold text-green-700 dark:text-green-400">
                Payment Successful!
              </h1>
              <p className="mt-4 text-lg text-gray-800 dark:text-gray-300">
                Thank you for your purchase.
              </p>
              <p className="mt-6 text-xl text-black dark:text-gray-400">
                You can view your participation details at{" "}
                <Link
                  className="italic underline text-primary"
                  href="/dashboard/user/participation"
                >
                  My Participation
                </Link>
              </p>
              <p className="mt-4 text-sm text-gray-700 dark:text-gray-400">
                If you have any questions or need further assistance, feel free
                to contact us at:
                <a
                  href="mailto:admin@eliteai.tools"
                  className="font-medium text-black dark:text-indigo-400 underline"
                >
                  support@evenzo.com
                </a>
              </p>
            </div>
            <div className="mt-8 text-center">
              <Link href="/">
                <Button>Back to Home</Button>
              </Link>
            </div>
          </div>
        </div>
      ) : resPaymentVerify?.data[0]?.bank_status === "Failed" ? (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
          <div className="w-full max-w-2xl p-4 bg-white shadow-2xl dark:bg-gray-900 sm:p-10 sm:rounded-3xl">
            <div className="text-center">
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-rose-100 rounded-full dark:bg-rose-700">
                <svg
                  className="h-12 w-12 text-red-600 dark:text-red-100"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h1 className="text-4xl font-extrabold text-rose-700 dark:text-rose-400">
                Payment Failed!
              </h1>
              <p className="mt-4 text-lg text-gray-800 dark:text-gray-300">
                Sorry, your payment could not be processed.
              </p>
              <p className="mt-6 text-xl text-blue-600 dark:text-blue-400">
                Please try again or contact support if the issue persists.
              </p>
              <p className="mt-4 text-sm text-gray-700 dark:text-gray-400">
                If you have any questions or need further assistance, feel free
                to contact us at:
                <a
                  href="mailto:admin@eliteai.tools"
                  className="font-medium text-indigo-600 dark:text-indigo-400 underline"
                >
                  support@evenzo.com
                </a>
              </p>
            </div>
            <div className="mt-8 text-center">
              <Link href="/">
                <Button>Back to Home</Button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
          <div className="w-full max-w-2xl p-4 bg-white shadow-2xl dark:bg-gray-900 sm:p-10 sm:rounded-3xl">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">
                Invalid Access
              </h2>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                You are not authorized to view this page or no payment was
                found.
              </p>
            </div>
            <div className="mt-8 text-center">
              <Link href="/">
                <Button>Back to Home</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
