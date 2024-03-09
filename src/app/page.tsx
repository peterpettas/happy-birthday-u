import Head from "next/head";
import Home from "../components/Home";
import ContactsDashboard from "../components/ContactsDashboard";
import AddContactForm from "../components/AddContactForm";



export default function HomePage() {
  return (
    <div>
      <Head>
        <title>Birthday App</title>
        <meta name="description" content="Personalized birthday wishes" />
      </Head>
      <Home />
      <ContactsDashboard />
    </div>
  );
}
