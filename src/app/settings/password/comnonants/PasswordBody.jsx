"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { changePasswordSchema } from "@/formValidation/formSchema";
import { toast } from "@/hooks/use-toast";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

// Component
const PasswordBody = () => {
  const [isSignOutOfOtherSessions,setSignOutOfOtherSessions] = useState(false);
  const { user } = useUser();
  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (data) => {
    const { currentPassword, newPassword } = data;
    try {
      await user.updatePassword({
        currentPassword: currentPassword,
        newPassword: newPassword,
        signOutOfOtherSessions: isSignOutOfOtherSessions,
      });
      form.reset();
      toast({
        title: "Password updated successfully",
      })
      console.log("password changed");
    } catch (error) {
      console.log(error);
      form.setError('currentPassword', {
        message: "The password you entered was incorrect.",
      })
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Current Password"
                    {...field}
                    type="password"
                  />
                </FormControl>

                <FormMessage />
                <FormDescription>
                  <Link href={'/forgotPassword'} className="text-primary">
                    Forgot Password?
                  </Link>
                </FormDescription>
              </FormItem>
            );
          }}
        />
        <Separator />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="New Password"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="confirmNewPassword"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Retype Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Retype Password"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <div>
          <Checkbox onCheckedChange={()=>setSignOutOfOtherSessions(!isSignOutOfOtherSessions)}  checked={isSignOutOfOtherSessions}/>{" "}
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
           Sign out From all other device
          </label>
        </div>
        <Button className="max-sm:w-full rounded-full w-fit mr-auto">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default PasswordBody;
