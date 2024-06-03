import { FC } from "react";
import { Alert, Button, Container, Input, VStack } from "@chakra-ui/react";

import { useUpdateSettlementAmount } from "../../hooks/useUpdateSettlementAmount";
import { StatusChip, statusToColor } from "../../components/StatusChip";
import { Settlement, SettlementStatus } from "../../types/Settlement";

interface UpdateSettlementFormProps {
  settlement: Settlement;
}

export const UpdateSettlementForm: FC<UpdateSettlementFormProps> = ({
  settlement,
}) => {
  const { onSubmit, isLoading, amount, setAmount } =
    useUpdateSettlementAmount(settlement);

  const isUpdateDisabled = settlement.status === SettlementStatus.Settled;
  const alertStatus =
    settlement.status === SettlementStatus.Disputed ? "error" : "success";

  return (
    <Container padding={5}>
      <VStack spacing={4}>
        <StatusChip status={settlement.status} />

        {settlement.lastResponse && (
          <Alert status={alertStatus}>{settlement.lastResponse}</Alert>
        )}

        <Input
          fontSize={32}
          fontWeight="bold"
          textAlign="center"
          color={statusToColor[settlement.status]}
          w={200}
          variant="flushed"
          value={amount}
          readOnly={isUpdateDisabled}
          onChange={(e) => setAmount(Number(e.target.value) ?? 0)}
        />

        <Button
          colorScheme="teal"
          onClick={onSubmit}
          isLoading={isLoading}
          isDisabled={isUpdateDisabled}
        >
          Update Amount
        </Button>
      </VStack>
    </Container>
  );
};
