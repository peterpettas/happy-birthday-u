import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const Home: React.FC = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <div>
        <h1>Welcome to your Birthday App!</h1>
        <p>Welcome {session.user?.name}. Signed In As</p>
        <p>{session.user?.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-start">
      <p>Not Signed In</p>
      <button onClick={() => signIn('google')}>Sign in with google</button>
      <button onClick={() => signIn('facebook')}>Sign in with facebook</button>
    </div>
  );
};

export default Home;
