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
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { assets } from "@/assets/assets";

// Schema validation
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [isShow, setIsShow] = React.useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="max-w-md w-full mx-auto mt-16 px-6 py-8 rounded-2xl shadow-xl border bg-white">
      {/* Header */}
      <div className="flex flex-col items-center mb-8">
        <Link href={"/"}>
          <Image
            src={assets.logo}
            alt="Logo"
            width={64}
            height={64}
            className="mb-4"
          />
        </Link>
        <h1 className="text-2xl font-bold text-violet-700">
          Login to Your Account
        </h1>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="example@mail.com"
                    {...field}
                    className="bg-white text-black"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={isShow ? "text" : "password"}
                      placeholder="Your password"
                      {...field}
                      className="bg-white text-black pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setIsShow(!isShow)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-violet-600"
                      tabIndex={-1}
                    >
                      {isShow ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Forget Password */}
          <div className="text-right">
            <Link
              href="/resetPassword"
              className="text-sm text-violet-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 rounded-md"
          >
            Login
          </Button>
        </form>
      </Form>

      {/* Footer */}
      <p className="text-center text-sm text-gray-600 mt-5">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-violet-600 font-medium hover:underline"
        >
          Register here
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
