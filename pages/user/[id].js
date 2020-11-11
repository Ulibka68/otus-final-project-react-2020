import { useRouter } from 'next/router'
import useSwr from 'swr'
// https://nextjs.org/docs/basic-features/data-fetching#swr
// The team behind Next.js has created a React hook for data fetching called SWR.
// We highly recommend it if you’re fetching data on the client side.
// It handles caching, revalidation, focus tracking, refetching on interval, and more.
// And you can use it like so:

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function User() {
  const router = useRouter()
  const { data, error } = useSwr(`/api/user/${router.query.id}`, fetcher)

  if (error) return <div>Failed to load user</div>
  if (!data) return <div>Loading...</div>

  return <div>{data.name}</div>
}
