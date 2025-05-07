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

import { useRouter } from "next/navigation";
import { TEvent } from "@/types/event.type";
import { joinEventFreeOrPaid } from "@/services/Participants";
const CreatePayment = ({
  paymentData,
  event,
}: {
  paymentData: PaymentData;
  event: TEvent;
}) => {
  const router = useRouter();
  const { userId, eventId } = paymentData;
  const { setIsLoading } = useUser();
  //  Form
  const form = useForm({
    resolver: zodResolver(paymentValidationSchema),
    defaultValues: {
      title: event?.title,
      organizer: event?.organizer?.name,
    },
  });
  const {
    formState: { isSubmitting },
  } = form;

  //  Button Text
  const buttonText = () => {
    if (event.isPublic && event?.fee === 0) {
      return "Join";
    } else if (!event?.isPublic && event?.fee === 0) {
      return "Request to Join";
    } else {
      return "Pay to Join";
    }
  };
  //  Form Handle
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    //  Loading State
    const createPayment = toast.loading("Processing...");
    const modifiedData = {
      userId,
      eventId,
    };
    try {
      //  Make Payment API Call
      const res = await joinEventFreeOrPaid(modifiedData);
      console.log(res);
      if (res?.data?.isPremium) {
        router.push(res?.data?.checkout_url);
      } else if (!res?.data?.isPremium) {
        toast.success("Joined Successful!", { id: createPayment });
        router.push(`/dashboard/profile`);
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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Title</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="organizer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Organizer</FormLabel>
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
              buttonText()
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreatePayment;
