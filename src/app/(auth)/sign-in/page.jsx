import LoginCard from "./componants/LoginCard";
import LoginLogo from "./componants/LoginLogo";

export const metadata = {
  title: "Sign In to App",
};

export default function Signin() {
  return (
    <section className="h-screen w-screen flex items-center">
      <LoginCard />
      <LoginLogo/>
    </section>
  );
}
