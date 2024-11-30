"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFromSchema } from "@/formValidation/formSchema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BiLogoGoogle } from "react-icons/bi";
import Link from "next/link";
import { useEmailAndPassword } from "@/hooks/useSignUp";
import { useUser } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";

const LoginCard = () => {
  const signInWithEmailAndPass = useEmailAndPassword();
  const user = useUser()

  const form = useForm({
    resolver: zodResolver(loginFromSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  if (user.isSignedIn) {
   window.location.href = '/'
  }

  const onSubmit = async (data) => {
    const email = data.email;
    const password = data.password;
    const result = await signInWithEmailAndPass(email, password);
    if (result.status === 'complete') {
      console.log('trigger')
       window.location.href = "/"
    }
  };

  return (
    <div className=" px-20 w-8/12 max-md:w-full max-sm:px-0">
      <Card className="w-full max-sm:border-none">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>  
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Jhon.doe@gmail.com" {...field} />
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
                      <Input placeholder="******" {...field} type='password'/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Link
                href={"/forgot-password"}
                className="text-sm text-center w-full font-semibold hover:underline flex justify-end mt-3 text-primary"
              >
                Forgot password
              </Link>
              <Button className="w-full">Login</Button>
              
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex items-center justify-center flex-col gap-3">
          <h1 className="text-gray-400">or</h1>
          <Link href={"/sign-up"} className="hover:underline text-primary">sign up now</Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginCard;
