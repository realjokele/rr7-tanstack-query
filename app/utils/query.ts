import { remember } from "@epic-web/remember";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = remember("query", () => new QueryClient());
