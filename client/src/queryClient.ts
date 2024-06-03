import { QueryClient } from "@tanstack/react-query";

export const settlementsQueryKey = "settlements";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const invalidateSettlementsQueries = () => {
  queryClient.invalidateQueries({
    queryKey: [settlementsQueryKey],
  });
};
