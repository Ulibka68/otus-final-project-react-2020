import React from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import Layout from "../components/layout";

// eslint-disable-next-line no-restricted-syntax
export default function Page() {
  const [session, loading] = useSession();
  console.log(session);
  return <Layout></Layout>;
}
