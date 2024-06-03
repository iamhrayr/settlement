import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { settlementService } from "../services/settlement";
import { invalidateSettlementsQueries } from "../queryClient";

export const useCreateNewSettlement = (onSuccess: () => void) => {
  const [amount, setAmount] = useState(0);
  const mutation = useMutation({
    mutationFn: settlementService.createNewSettlement,
    onSuccess: () => {
      invalidateSettlementsQueries();
      onSuccess();
    },
  });

  return {
    amount,
    setAmount,
    submit: () => mutation.mutate({ amount }),
    isLoading: mutation.isPending,
    isError: mutation.isError,
  };
};
