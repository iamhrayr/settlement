import { useQuery } from "@tanstack/react-query";

import { settlementService } from "../services/settlement";
import { settlementsQueryKey } from "../queryClient";

export const useGetAllSettlements = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [settlementsQueryKey],
    queryFn: settlementService.getAll,
  });

  return {
    settlements: data,
    isLoading,
    isError,
  };
};
