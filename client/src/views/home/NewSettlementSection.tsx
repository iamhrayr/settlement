import { useDisclosure, Heading, Button, VStack } from "@chakra-ui/react";
import { NewSettlementModal } from "./NewSettlementModal";

export const NewSettlementSection = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <VStack spacing={4}>
      <Heading size="sm" textAlign="center">
        Click the link below to create a new settlement
      </Heading>

      <Button colorScheme="blue" onClick={onOpen}>
        New Settlement
      </Button>

      <NewSettlementModal isOpen={isOpen} onClose={onClose} />
    </VStack>
  );
};
