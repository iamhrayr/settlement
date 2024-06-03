import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { baseURL, settlementService } from "../services/settlement";
import { queryClient, settlementsQueryKey } from "../queryClient";
import { Settlement } from "../types/Settlement";

export const useGetRealTimeSettlement = (uuid: string) => {
  useEffect(() => {
    const eventSource = new EventSource(`${baseURL}/subscribe/${uuid}`);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      queryClient.setQueryData([settlementsQueryKey, uuid], data.settlement);
    };

    return () => {
      eventSource.close();
    };
  }, [uuid]);

  const { data, isLoading, isError } = useQuery<Settlement | null>({
    queryKey: [settlementsQueryKey, uuid],
    initialData: null,
    queryFn: () => settlementService.getSettlement(uuid),
  });

  return {
    settlement: data,
    isLoading,
    isError,
  };
};
