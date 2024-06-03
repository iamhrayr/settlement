import { useQuery } from "@tanstack/react-query";

import { settlementService } from "../services/settlement";
import { settlementsQueryKey } from "../queryClient";

export const useGetSettlement = (uuid: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [settlementsQueryKey, uuid],
    queryFn: () => settlementService.getSettlement(uuid),
  });

  return {
    settlement: data,
    isLoading,
    isError,
  };
};
