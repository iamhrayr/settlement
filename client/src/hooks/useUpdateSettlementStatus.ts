import { useMutation } from "@tanstack/react-query";
import { settlementService } from "../services/settlement";
import { useCallback, useState } from "react";
import { SettlementStatus } from "../types/Settlement";
import { invalidateSettlementsQueries } from "../queryClient";

export const useUpdateSettlementStatus = () => {
  const [response, setResponse] = useState("");
  const mutation = useMutation({
    mutationFn: settlementService.updateSettlementStatus,
    onSuccess: invalidateSettlementsQueries,
  });

  const agree = useCallback(
    (uuid: string) => {
      mutation.mutate({
        uuid,
        status: SettlementStatus.Settled,
        response,
      });
    },
    [mutation, response]
  );

  const dispute = useCallback(
    (uuid: string) => {
      mutation.mutate({
        uuid,
        status: SettlementStatus.Disputed,
        response,
      });
    },
    [mutation, response]
  );

  return {
    agree,
    dispute,
    response,
    setResponse,
    isLoading: mutation.isPending,
    isError: mutation.isError,
  };
};
