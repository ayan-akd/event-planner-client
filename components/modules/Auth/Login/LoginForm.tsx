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
import { loginValidationSchema } from "./LoginValidationSchema";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { userLogin } from "@/services/AuthServices.ts";
import { useUser } from "@/context/UserContext";
import { PasswordInput } from "@/components/ui/password-input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import Image from "next/image";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setIsLoading } = useUser();
  const form = useForm({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {
    formState: { isSubmitting },
  } = form;

  // Handle form submission
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const loginUser = toast.loading("Authenticating...");
    try {
      const res = await userLogin(data);
      setIsLoading(true);
      if (res?.success) {
        toast.success(res?.message, { id: loginUser });
        const redirectPath = searchParams.get("redirectPath") || "/dashboard";
        router.push(redirectPath);
      } else {
        toast.error(res?.message, { id: loginUser });
      }
    } catch {
      toast.error("Authentication failed. Please try again.", {
        id: loginUser,
      });
    }
  };

  // Handle demo credentials login
  const handleDemoLogin = async (type: "user" | "admin") => {
    const role = type === "admin" ? "Admin" : "User";
    const loginToast = toast.loading(`Logging in as ${role}...`);

    const credentials = {
      email:
        type === "admin"
          ? process.env.NEXT_PUBLIC_DEMO_ADMIN_EMAIL
          : process.env.NEXT_PUBLIC_DEMO_USER_EMAIL,
      password:
        type === "admin"
          ? process.env.NEXT_PUBLIC_DEMO_ADMIN_PASSWORD
          : process.env.NEXT_PUBLIC_DEMO_USER_PASSWORD,
    };

    try {
      const res = await userLogin(credentials);
      setIsLoading(true);
      if (res?.success) {
        toast.success(`Welcome, ${role}!`, { id: loginToast });
        const redirectPath =
          searchParams.get("redirectPath") || (type === "admin" ? "/" : "/");
        router.push(redirectPath);
      } else {
        toast.error(res?.message, { id: loginToast });
      }
    } catch {
      toast.error("Demo login failed. Please try again.", { id: loginToast });
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center space-y-4 pb-2">
            <CardTitle className="text-2xl font-bold tracking-tight">
              Welcome back
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </CardHeader>

          <CardContent className="pt-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <div className="space-y-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="your@email.com"
                            className="h-10"
                            autoComplete="email"
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel className="text-sm font-medium">
                            Password
                          </FormLabel>
                        </div>
                        <FormControl>
                          <PasswordInput
                            {...field}
                            placeholder="••••••••"
                            className="h-10"
                            autoComplete="current-password"
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-10 dark:text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Sign In
                </Button>
              </form>
            </Form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Quick Access
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-9 text-xs"
                onClick={() => handleDemoLogin("user")}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                ) : (
                  <span className="mr-2">👤</span>
                )}
                Demo User
              </Button>

              <Button
                variant="outline"
                className="h-9 text-xs"
                onClick={() => handleDemoLogin("admin")}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                ) : (
                  <span className="mr-2">🔒</span>
                )}
                Demo Admin
              </Button>
            </div>
          </CardContent>

          <CardFooter className="flex justify-center pt-0">
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-primary hover:underline"
              >
                Create one
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginForm;
