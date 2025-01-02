import { useSignUp } from "@clerk/nextjs";
import {useRouter} from 'next/navigation'
import { toast } from "./use-toast";

export const useRegister = () => {
    const { signUp } = useSignUp();
    const router = useRouter()
  
    const handleRegister = async (email, password, username) => {
      try {
        const result = await signUp.create({
          email_address: email, 
          password: password,   
          username: username,
        });

        return result;
      } catch (error) {
        console.error("Error creating user:", error);
        return { error: { message: error.message } };
      }
    };
  
    return handleRegister;
  };
  