import axios from "axios";

import { Settlement, SettlementStatus } from "../types/Settlement";

export const baseURL = "http://localhost:3333";

const http = axios.create({
  baseURL,
  timeout: 10000,
});

class SettlementService {
  getAll = async () => {
    const res = await http.get<Settlement[]>("/settlements");
    return res.data;
  };

  createNewSettlement = ({ amount }: { amount: number }) => {
    return http.post("/settlements", { amount });
  };

  updateSettlementAmount = ({
    uuid,
    amount,
    clientStatus,
  }: {
    uuid: string;
    amount: number;
    clientStatus: SettlementStatus;
  }) => {
    return http.post(`/settlements/${uuid}/modify-amount`, {
      amount,
      clientStatus,
    });
  };

  updateSettlementStatus = ({
    uuid,
    status,
    response,
  }: {
    uuid: string;
    status: SettlementStatus;
    response?: string;
  }) => {
    return http.post(`/settlements/${uuid}/respond`, {
      status,
      response,
    });
  };

  getSettlement = async (uuid: string) => {
    const res = await http.get<Settlement>(`/settlements/${uuid}`);
    return res.data;
  };
}

export const settlementService = new SettlementService();
