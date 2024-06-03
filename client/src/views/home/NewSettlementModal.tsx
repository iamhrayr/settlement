import { FC } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
} from "@chakra-ui/react";

import { useCreateNewSettlement } from "../../hooks/useCreateNewSettlement";

interface NewSettlementModalProps {
  isOpen: boolean;
  onClose(): void;
}

export const NewSettlementModal: FC<NewSettlementModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { isLoading, submit, amount, setAmount } =
    useCreateNewSettlement(onClose);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Settlement</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <form onSubmit={submit}>
            <Input
              type="number"
              value={amount}
              placeholder="Settlement amount"
              onChange={(e) => setAmount(Number(e.target.value) ?? 0)}
            />
          </form>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={submit} isLoading={isLoading}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
