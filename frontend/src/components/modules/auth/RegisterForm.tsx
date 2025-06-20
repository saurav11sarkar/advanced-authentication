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

// Validation schema
const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const [isShow, setIsShow] = React.useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    console.log("Form submitted:", data);
    // handle registration logic here
  };

  return (
    <div className="max-w-md w-full mx-auto mt-14 p-8 rounded-2xl shadow-xl border border-gray-200 bg-white">
      <h2 className="text-3xl font-semibold text-center text-violet-600 mb-6">
        Create an Account
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Your full name"
                    {...field}
                    className="bg-white text-black"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    {...field}
                    className="bg-white text-black"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={isShow ? "text" : "password"}
                      placeholder="Create a secure password"
                      {...field}
                      className="bg-white text-black pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setIsShow(!isShow)}
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-violet-600"
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

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 text-white"
          >
            Register
          </Button>
        </form>
      </Form>

      {/* Footer */}
      <p className="text-center text-sm text-gray-600 mt-5">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-violet-600 hover:underline font-medium"
        >
          Log in
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
