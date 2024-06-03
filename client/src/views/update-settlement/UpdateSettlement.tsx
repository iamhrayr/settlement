import { useParams } from "react-router-dom";
import { Center, Spinner, Text } from "@chakra-ui/react";

import { useGetSettlement } from "../../hooks/useGetSettlement";
import { UpdateSettlementForm } from "./UpdateSettlementForm";

export const UpdateSettlement = () => {
  const { uuid } = useParams<{ uuid: string }>();

  const { settlement, isLoading, isError } = useGetSettlement(uuid!);

  if (isLoading) {
    return (
      <Center flex={1} height="100%">
        <Spinner />
      </Center>
    );
  }

  if (isError || !settlement) {
    return <Text textAlign="center">Something went wrong</Text>;
  }

  return <UpdateSettlementForm settlement={settlement} />;
};
