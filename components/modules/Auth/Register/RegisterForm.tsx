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
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { LoaderCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterValidationSchema } from "./RegisterValidationSchema";

const RegisterForm = () => {
  const form = useForm({
    resolver: zodResolver(RegisterValidationSchema),
  });
  const {
    formState: { isSubmitting },
  } = form;

  // Register Form Handle
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="max-w-md w-full bg-white border p-7 md:p-10 rounded">
        <div className="flex gap-2 border-b pb-3 mb-6">
          <div className="space-y-1">
            <h2 className="font-bold text-lg md:text-2xl">Evenzo</h2>
            <p className="text-xs">Create Account For More Features</p>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full mt-2 cursor-pointer">
              {isSubmitting ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Register"
              )}
            </Button>
            <p className="mt-2 text-center text-sm">
              Already have an account? &nbsp;
              <Link href="/login" className="font-bold hover:underline">
                Login
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;
