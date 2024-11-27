import { useSignUp } from "@clerk/nextjs";
import {useRouter} from 'next/navigation'

export const useRegister = () => {
    const { signUp } = useSignUp();
    const router = useRouter()
  
    const handleRegister = async (email, password, username) => {
      try {
        const result = await signUp.create({
          email_address: email, 
          password: password,   
          username: username,
          redirectUrl: '/',
        });

        return result;
      } catch (error) {
        console.error("Error creating user:", error.message);
        return null;
      }
    };
  
    return handleRegister;
  };
  