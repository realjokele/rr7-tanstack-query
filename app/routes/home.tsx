import * as React from "react"

import type { Route } from "./+types/home"
import { Welcome } from "../welcome/welcome"
import { Link } from "react-router"
import { queryClient } from "~/utils/query-client"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" }
  ]
}

export default function Home() {
  React.useEffect(() => {
    const invalidate = async () => {
      console.log("invalidate")
      await queryClient.removeQueries(
        {
          queryKey: ["status"],
          exact: false,
          refetchType: "none"
        }
        // { throwOnError, cancelRefetch },
      )
    }
    invalidate()
  }, [])

  return (
    <div>
      <Welcome />
      <Link to="/query">Query</Link>
    </div>
  )
}
