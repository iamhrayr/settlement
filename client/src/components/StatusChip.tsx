import { FC } from "react";
import { Badge } from "@chakra-ui/react";

import { SettlementStatus } from "../types/Settlement";

export const statusToColor = {
  [SettlementStatus.Pending]: "gray",
  [SettlementStatus.Settled]: "green",
  [SettlementStatus.Disputed]: "red",
};

interface StatusChipProps {
  status: SettlementStatus;
}

export const StatusChip: FC<StatusChipProps> = ({ status }) => {
  return (
    <Badge variant="outline" colorScheme={statusToColor[status]}>
      {status}
    </Badge>
  );
};
