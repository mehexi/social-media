import RegisterCard from "./componants/RegisterCard";
import RegisterLogo from "./componants/RegisterLogo";

export const metadata = {
  title: "Sign up",
};

export default function SignUp() {
  return (
    <section className="h-screen w-screen flex items-center">
      <RegisterCard />
      <RegisterLogo/>
    </section>
  );
}
