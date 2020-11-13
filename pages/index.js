import React from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import Layout from "../components/layout";
import Image from "next/image";

// eslint-disable-next-line no-restricted-syntax
export default function Page() {
  const [session, loading] = useSession();
  console.log(session);
  return (
    <Layout>
      <p>Изображение сохранено в public</p>
      <p>
        Next преобразовал его в формат webp - 1,7kb, первоначальный размер 293кб
        (jpg)
      </p>
      <Image
        alt="Mountains"
        src="/mountains.jpg"
        layout="fixed"
        width={300}
        height={(300 * 475) / 700}
      />
    </Layout>
  );
}
