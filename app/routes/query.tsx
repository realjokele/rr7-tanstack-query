import { Link } from "react-router"
import { Route } from "./+types/query"

export function loader({ request }: Route.LoaderArgs) {
  console.log("loader")
  return {
    status: new Date()
  }
}

export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
  console.log("client loader")
  const data = await serverLoader()
  return data
}

export default function Login({
  loaderData: { status }
}: Route.ComponentProps) {
  return (
    <div className="font-semibold text-blue-800">
      Login {status.toLocaleTimeString()}
      <Link to="/">Home</Link>
    </div>
  )
}
