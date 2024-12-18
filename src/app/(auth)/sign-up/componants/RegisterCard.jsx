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
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ArrowLeft, ChevronLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const RegisterCard = () => {
  const user = useUser();
  const router = useRouter();

  if (user.isSignedIn) {
    window.location.href = "/";
  }

  const [loading, setLoading] = useState(false);

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
    setLoading(true);
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
        })
        .finally(() => setLoading(false));
    } else {
      console.error("Sign-up failed.");
    }
  };

  const handleGoBack = () => {
    router.push('/login')
  }

  return (
    <div className=" px-20 w-8/12 max-md:w-full max-sm:px-0">
      <Card className="w-full max-sm:border-none">
        <CardHeader className="">
          <div className="flex space-x-3">
            <Button variant='ghost' size='icon' onClick={handleGoBack}><ChevronLeft/></Button>
          <div>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create a New Account</CardDescription>
          </div>
          </div>
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
              {loading ? (
                <Button className="rounded-full" disabled>
                  <span className="animate-spin">
                    <Loader2 />
                  </span>
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="rounded-full"
                  disabled={
                    loading ||
                    form.formState.isSubmitting 
                  }
                >
                  {loading ? "Registering..." : "Register"}
                </Button>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterCard;
