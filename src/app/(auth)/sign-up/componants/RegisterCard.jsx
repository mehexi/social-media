"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Input } from "@/components/ui/input";
import { regFromSchema } from "@/formValidation/formSchema";
import { useRegister } from "@/hooks/useRegister";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

const RegisterCard = () => {
  const form = useForm({
    resolver: zodResolver(regFromSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleRegisterUser = useRegister();

  const onSubmit = async (data) => {
    const { email, password, username } = data;

    const result = await handleRegisterUser(email, password, username);
    if (result.status === "complete") {
      const clerkUserId = result.createdUserId;
      const username = result.username;
      const data = {
        clerkUserId: clerkUserId,
        username: username,
      };
      axios
        .post("/api/makeUser", data)
        .then(() => {
          console.log("Sign-up successful:", result);
          window.location.href = "/";
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.error("Sign-up failed.");
    }
  };

  return (
    <div className=" px-20 w-8/12 max-md:w-full max-sm:px-0">
      <Card className="w-full max-sm:border-none">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create a New Account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form} autoComplete="off">
            <form
              autoComplete="off"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>User Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="John-Doe@gmail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="******"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Re type Password</FormLabel>
                      <FormControl>
                        <Input placeholder="" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <Button>Register</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterCard;
