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
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterValidationSchema } from "./RegisterValidationSchema";
import { userRegister } from "@/services/AuthServices.ts";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PasswordInput } from "@/components/ui/password-input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { motion } from "framer-motion";

const RegisterForm = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(RegisterValidationSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Securing your account...", {
      description: "We're encrypting your information",
    });

    try {
      const res = await userRegister(data);
      if (res?.success) {
        toast.success("Welcome aboard!", {
          id: toastId,
          description: "Your account has been successfully created",
        });
        router.push("/login");
      } else {
        toast.error("Registration incomplete", {
          id: toastId,
          description: res?.message || "Please review your details",
        });
      }
    } catch (error) {
      toast.error("Secure connection failed", {
        id: toastId,
        description: "Please check your network and try again",
      });
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.1] p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl border-none bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <CardHeader className="space-y-1 text-center">
            <h1 className="text-2xl font-bold tracking-tight">
              Create account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your details to get started
            </p>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">Full name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Full name"
                            className="h-11"
                          />
                        </FormControl>
                        <FormMessage className="text-xs font-light" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">Username</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Username"
                            className="h-11"
                          />
                        </FormControl>
                        <FormMessage className="text-xs font-light" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Email address"
                            type="email"
                            className="h-11"
                          />
                        </FormControl>
                        <FormMessage className="text-xs font-light" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">Password</FormLabel>
                        <FormControl>
                          <PasswordInput
                            {...field}
                            placeholder="Create password"
                            className="h-11"
                          />
                        </FormControl>
                        <FormMessage className="text-xs font-light" />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 rounded-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Create account
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter className="flex justify-center">
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default RegisterForm;
