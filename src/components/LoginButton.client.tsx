import { signIn } from "next-auth/react";

const LoginButton = () => {
  return (
    <>
      <button onClick={() => signIn("google")}>Sign in with Google</button>
      <button onClick={() => signIn("facebook")}>Sign in with Facebook</button>
      <button onClick={() => signIn()}>Sign in with Email</button>
    </>
  );
};

export default LoginButton;
