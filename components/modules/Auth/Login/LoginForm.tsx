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
import { loginValidationSchema } from "./LoginValidationSchema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { userLogin } from "@/services/AuthServices.ts";
import { useUser } from "@/context/UserContext";
import { PasswordInput } from "@/components/ui/password-input";

const LoginForm = () => {
  const router = useRouter();
  const { setIsLoading } = useUser();
  const form = useForm({
    resolver: zodResolver(loginValidationSchema),
  });
  const {
    formState: { isSubmitting },
  } = form;

  // Register Form Handle
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const loginUser = toast.loading("User Login...");
    try {
      const res = await userLogin(data);
      setIsLoading(true);
      if (res?.success) {
        toast.success(res?.message, { id: loginUser });
        router.push("/");
      } else {
        toast.error(res?.message, { id: loginUser });
      }
    } catch  {
      toast.error("Something went Wrong!", { id: loginUser });
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="max-w-md w-full bg-white border p-7 md:p-10 rounded">
        <div className="flex gap-2 border-b pb-3 mb-6">
          <div className="space-y-1">
            <h2 className="font-bold text-lg md:text-2xl">Evenzo</h2>
            <p className="text-xs">Welcome Back!</p>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email or Username</FormLabel>
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
                      <PasswordInput
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
                "Login"
              )}
            </Button>
            <p className="mt-2 text-center text-sm">
              Do not have any account?{" "}
              <Link href="/register" className="font-bold hover:underline">
                Register
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
