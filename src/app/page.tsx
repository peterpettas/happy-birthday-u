'use client'
import { useSession, signIn, signOut } from "next-auth/react";
import Head from "next/head";
import Home from "../components/Home";
import ContactsDashboard from "../components/ContactsDashboard";

export default function HomePage() {
  const { data: session } = useSession();
  
  if (session) {
    return (
      <div>
        <Head>
          <title>Birthday App</title>
          <meta name="description" content="Personalized birthday wishes" />
        </Head>
        <Home />
        {/* Your protected content here */}
        <ContactsDashboard />
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Birthday App</title>
        <meta name="description" content="Personalized birthday wishes" />
      </Head>
      <Home />
    </div>
  );
}
