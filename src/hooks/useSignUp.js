import { useSignIn } from "@clerk/nextjs";

export const useEmailAndPassword = () => {
  const { signIn } = useSignIn();

  const handleEmailSignIn = async (email, password) => {
    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      return result;
    } catch (error) {
      return {error: {message: error.message}};
    }
  };

  return handleEmailSignIn;
};
