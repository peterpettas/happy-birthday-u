import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav>
      {session ? (
        <p>Signed in as {session.user.email}</p>
      ) : (
        <p>You are not signed in</p>
      )}
    </nav>
  );
};

export default Navbar;
