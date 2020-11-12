import { signIn } from "next-auth/client";

export default function AccessDenied() {
  return (
    <>
      <h1>Access Denied</h1>
      <p>
        <a
          href="/api/auth/signin"
          onClick={(e) => {
            e.preventDefault();
            signIn();
          }}
        >
          Для просмотра этой страницы Вам необходимо авторизоваться
        </a>
      </p>
    </>
  );
}
