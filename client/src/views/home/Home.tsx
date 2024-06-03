import {
  Container,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Spinner,
  VStack,
  Button,
  HStack,
  TableCaption,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

import { NewSettlementSection } from "./NewSettlementSection";
import { useGetAllSettlements } from "../../hooks/useGetAllSettlements";
import { StatusChip } from "../../components/StatusChip";

export const Home = () => {
  const { settlements, isLoading } = useGetAllSettlements();

  if (isLoading || !settlements) {
    return (
      <Container padding={10}>
        <Spinner />
      </Container>
    );
  }

  return (
    <Container padding={10}>
      <VStack spacing={4} alignItems="stretch">
        <NewSettlementSection />

        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>#</Th>
                <Th>status</Th>
                <Th isNumeric>amount</Th>
                <Th>actions</Th>
              </Tr>
            </Thead>
            {settlements.length === 0 && (
              <TableCaption textAlign="center">
                No any settlement yet.
              </TableCaption>
            )}
            <Tbody>
              {settlements.map((settlement) => {
                return (
                  <Tr key={settlement.uuid}>
                    <Td textOverflow="ellipsis" overflow="hidden" maxW={120}>
                      {settlement.uuid}
                    </Td>
                    <Td>
                      <StatusChip status={settlement.status} />
                    </Td>
                    <Td isNumeric>{settlement.amount}</Td>
                    <Td>
                      <HStack spacing={2}>
                        <Button
                          size="xs"
                          color="teal"
                          as={ReactRouterLink}
                          variant="outline"
                          to={`update-settlement/${settlement.uuid}`}
                          target="_blank"
                        >
                          Party A
                        </Button>

                        <Button
                          size="xs"
                          color="green"
                          as={ReactRouterLink}
                          variant="outline"
                          to={`respond-settlement/${settlement.uuid}`}
                          target="_blank"
                        >
                          Party B
                        </Button>
                      </HStack>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </Container>
  );
};
