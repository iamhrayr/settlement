import { useCallback, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { settlementService } from "../services/settlement";
import { Settlement } from "../types/Settlement";
import { invalidateSettlementsQueries } from "../queryClient";

export const useUpdateSettlementAmount = (settlement: Settlement) => {
  const [amount, setAmount] = useState(settlement.amount ?? 0);

  const toast = useToast();

  const mutation = useMutation({
    mutationFn: settlementService.updateSettlementAmount,
    onSuccess: invalidateSettlementsQueries,
    onError: (err) => {
      const message =
        err instanceof AxiosError
          ? err.response?.data?.error
          : "Something went wrong";

      toast({
        description: message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });

  const onSubmit = useCallback(() => {
    const { uuid, status: clientStatus } = settlement;
    mutation.mutate({ uuid, amount, clientStatus });
  }, [mutation, amount, settlement]);

  return {
    onSubmit,
    isLoading: mutation.isPending,
    amount,
    setAmount,
  };
};
