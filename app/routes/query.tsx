import { useQuery } from "@tanstack/react-query"
import { Route } from "./+types/query"

import { Link, useFetcher } from "react-router"

import { queryClient } from "~/utils/query-client"

export function loader({ request }: Route.LoaderArgs) {
  console.log("loader")
  return {
    status: new Date()
  }
}

export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
  console.log("clientLoader")
  const cachedData = queryClient.getQueryData<ReturnType<typeof serverLoader>>([
    "status",
    "date"
  ])

  if (!cachedData) {
    console.log("clientLoader: Reload data")
    const serverData = await serverLoader()
    queryClient.setQueryData(["status", "date"], serverData)
    return serverData
  }

  return cachedData
}

clientLoader.hydrate = true as const

export default function Login({}: Route.ComponentProps) {
  const fetcher = useFetcher()
  const { data } = useQuery<Route.ComponentProps["loaderData"]>({
    queryKey: ["status", "date"],
    gcTime: 1000
  })
  if (!data) return <div>Loading</div>
  const status = data.status
  return (
    <div className="font-semibold text-blue-800">
      Login {status.toLocaleTimeString()}
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/other-page">Page</Link>
        </li>
      </ul>
    </div>
  )
}
