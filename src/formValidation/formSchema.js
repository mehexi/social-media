const { z } = require("zod");

export const loginFromSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password must be at least 6 characters"),
});

export const regFromSchema = z
  .object({
    username: z.string().min(1, "UserName is Required"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 6 characters"),
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