import useSwr from "swr";
import Link from "next/link";
import Layout from "../components/layout";

const fetcher = (url) => fetch(url).then((res) => res.json());

// eslint-disable-next-line no-restricted-syntax
export default function Index() {
  const { data, error } = useSwr("/api/users", fetcher);

  if (error) return <div>Failed to load users</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Layout>
      <ul>
        {data.map((user) => (
          <li key={user.id}>
            <Link href="/user/[id]" as={`/user/${user.id}`}>
              <a>{`User ${user.id}`}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
