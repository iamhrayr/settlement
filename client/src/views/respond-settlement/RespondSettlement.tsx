import { useParams } from "react-router-dom";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Button,
  Center,
  Container,
  HStack,
  Heading,
  Input,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";

import { useUpdateSettlementStatus } from "../../hooks/useUpdateSettlementStatus";
import { useGetRealTimeSettlement } from "../../hooks/useGetRealTimeSettlement";
import { SettlementStatus } from "../../types/Settlement";

export const RespondSettlement = () => {
  const { uuid } = useParams<{ uuid: string }>();

  const { settlement, isLoading, isError } = useGetRealTimeSettlement(uuid!);

  const { agree, dispute, response, setResponse } = useUpdateSettlementStatus();

  if (isLoading) {
    return (
      <Center flex={1} height="100%">
        <Spinner />
      </Center>
    );
  }

  if (isError || !settlement || !uuid) {
    return <Text textAlign="center">Something went wrong</Text>;
  }

  const disabled = settlement.status !== SettlementStatus.Pending;
  const alertStatus =
    settlement.status === SettlementStatus.Disputed ? "warning" : "success";

  return (
    <Container paddingY={6}>
      <VStack spacing={4}>
        <Heading>Amount: {settlement.amount}</Heading>

        {disabled && (
          <Alert status={alertStatus}>
            <AlertIcon />
            You cannot update settlement when the status is
            <Text fontWeight="bold" ml={1}>
              {settlement.status}
            </Text>
          </Alert>
        )}
        <Input
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Leave a note if you want..."
          isDisabled={disabled}
        />

        <HStack>
          <Button
            leftIcon={<CheckIcon fontSize={10} />}
            colorScheme="teal"
            onClick={() => agree(uuid)}
            isDisabled={disabled}
          >
            Confirm
          </Button>
          <Button
            leftIcon={<CloseIcon fontSize={10} />}
            colorScheme="red"
            onClick={() => dispute(uuid)}
            isDisabled={disabled}
          >
            Dispute
          </Button>
        </HStack>
      </VStack>
    </Container>
  );
};
