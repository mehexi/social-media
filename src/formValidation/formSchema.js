const { z } = require("zod");

export const loginFromSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password must be at least 6 characters"),
});

export const regFromSchema = z
  .object({
    username: z.string().min(4, "UserName Must be 4 character Long"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "password do not match",
    path: ["confirmPassword"],
  })
  .transform(({email,password,username})=>({email,password,username}))


  export const tweetSchema = z.object({
    content: z.string().min(1, "Content is required").max(280, "Content is too long"),
    parentTweetId: z.string().optional(),
    images: z.array(z.instanceof(File)).max(4, "You can upload up to 4 images").optional(),
  });

  export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(8, "Current password must be at least 8 characters"),
    newPassword: z.string().min(8, "New password must be at least 8 characters"),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from the current password",
    path: ["newPassword"],
  });
