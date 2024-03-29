"use client";

import { registerFormSchema } from "@/app/lib/form-schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import { z } from "zod";

const RegisterPage = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
  });

  const onSubmit = (values: z.infer<typeof registerFormSchema>) => {
    console.log(values);
  };

  return (
    <div className="px-24 py-12 h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">Monito</h1>
        <h2 className="text-base">
          Already have an account?{" "}
          <span
            className="text-primary font-semibold cursor-pointer"
            onClick={() => router.push("/login")}
          >
            Sign In
          </span>
        </h2>
      </div>
      <div className="flex items-center mt-20">
        <Image
          src="/images/auth-image/man-illustration.jpg"
          alt="Auth Illustration"
          width={600}
          height={600}
        />
        <div className="w-full px-12 space-y-4">
          <h1 className="font-bold text-4xl">Welcome to Monito!</h1>
          <h2 className="text-base text-muted-foreground">
            Create your account
          </h2>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Full Name"
                          {...field}
                          className="border-primary h-14"
                        />
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
                      <FormControl>
                        <Input
                          placeholder="Username"
                          {...field}
                          className="border-primary h-14"
                        />
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
                      <FormControl>
                        <Input
                          placeholder="Password"
                          className="border-primary h-14"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-10 items-center">
                  <Button type="submit" className="px-12 py-6">
                    Register
                  </Button>
                  <h2 className="text-primary">Login as guest</h2>
                </div>
              </form>
            </Form>
            <div className="flex items-center gap-8 mt-12 text-muted-foreground">
              <h2>Register with : </h2>
              <Button className="rounded-full" size="icon">
                <FaGoogle />
              </Button>
              <Button className="rounded-full" size="icon">
                <FaFacebook />
              </Button>
              <Button className="rounded-full" size="icon">
                <FaTwitter />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
