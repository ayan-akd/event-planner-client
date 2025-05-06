"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { LoaderCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
import React from "react";
import { paymentValidationSchema } from "./ValidationCreateEvent";
import { makePayment } from "@/services/Payment";
import { Router } from "next/router";


interface PaymentData {
    userId: string;
    eventId: string;
  }

  import { useRouter } from 'next/navigation';
const CreatePayment = ( paymentData : {paymentData: PaymentData}) => {
  const router = useRouter()
  const { userId, eventId } = paymentData.paymentData;
  const { setIsLoading } = useUser();
  //  Form
  const form = useForm({
     resolver: zodResolver(paymentValidationSchema),
     defaultValues: {
      userId: userId,
      eventId: eventId,
        },
    });
  const {
    formState: { isSubmitting },
  } = form;

  //  Form Handle
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    //  Loading State
    const createPayment = toast.loading("Payment processing...");

    try {
      //  Make Payment API Call
      const res = await makePayment(data);
      console.log("Payment Response:", res);
      const redirectUrl = res.gateway_url;
      console.log("Redirect URL:", redirectUrl);
      // setIsLoading(true);

      if (redirectUrl) {
        // form.reset();
        toast.success("Redirecting to the SSLCommerz payment gateway...", {
          id: createPayment,
        });

        // Redirect the user to the payment gateway URL
        // window.location.assign(redirectUrl);
        router.push(redirectUrl)
        
      } else {
        toast.error("failed to redirect for some issue");
      }
    } catch {
      toast.error("Something went Wrong!", { id: createPayment });
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
          <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User ID</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="eventId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event ID</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full mt-2 dark:text-white cursor-pointer"
          >
            {isSubmitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Pay Now"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreatePayment;
