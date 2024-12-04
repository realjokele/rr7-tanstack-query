import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Route } from "./+types/query";

import { Link } from "react-router";

import { queryClient } from "~/utils/query";
import { useQuery } from "@tanstack/react-query";

export function loader({ request }: Route.LoaderArgs) {
  console.log("loader");
  return {
    status: new Date(),
  };
}

const queryDetails = (loader: () => Promise<{ status: Date }>) => ({
  queryKey: ["status"],
  queryFn: async () => await loader(),
});

export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
  console.log("clientLoader");
  const data = queryClient.getQueryData<ReturnType<typeof serverLoader>>([
    "status",
  ]);

  if (!data) {
    const serverData = await serverLoader();
    queryClient.setQueryData(["status"], serverData);
    return serverData;
  }

  return data;
}

clientLoader.hydrate = true;

export default function Login({
  loaderData: { status },
}: Route.ComponentProps) {
  return (
    <div className="font-semibold text-blue-800">
      Login {status.toLocaleTimeString()}
      <Link to="/">Home</Link>
      <ReactQueryDevtools client={queryClient} initialIsOpen={false} />
    </div>
  );
}
