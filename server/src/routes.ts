import { Router } from "express";

import { Settlement, SettlementStatus } from "./entity/Settlement";
import { AppDataSource } from "./data-source";

const router = Router();
const settlementRepo = AppDataSource.getRepository(Settlement);

router.post("/settlements", async (req, res) => {
  try {
    const { amount } = req.body;

    const newSettlement = settlementRepo.create({
      amount,
      status: SettlementStatus.Pending,
    });
    await settlementRepo.save(newSettlement);

    return res.json({ uuid: newSettlement.uuid });
  } catch {
    return res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/settlements", async (req, res) => {
  try {
    const allSettlement = await settlementRepo.find();
    return res.json(allSettlement);
  } catch {
    return res.status(500).json({ error: "Something went wrong" });
  }
});

router.post("/settlements/:uuid/modify-amount", async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const { amount, clientStatus } = req.body;

    const settlement = await settlementRepo.findOneBy({ uuid });

    if (!settlement) {
      return res.status(404).json({ error: "Settlement not found." });
    }

    if (clientStatus !== settlement.status) {
      return res.status(400).json({
        error: "Status modified, please reload the page.",
      });
    }

    if (settlement.status === SettlementStatus.Settled) {
      return res.status(400).json({ error: "Party B has already agreed." });
    }

    settlement.amount = amount;
    settlement.status = SettlementStatus.Pending;
    settlement.lastResponse = "";
    await settlementRepo.save(settlement);

    broadcastUpdate(settlement.uuid, settlement);

    return res.send("ok");
  } catch {
    return res.status(500).json({ error: "Something went wrong" });
  }
});

router.post("/settlements/:uuid/respond", async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const { status, response } = req.body;

    const settlement = await settlementRepo.findOneBy({ uuid });

    if (!settlement) {
      return res.status(404).json({ error: "Settlement not found." });
    }

    if (settlement.status !== SettlementStatus.Pending) {
      return res.status(400).json({ error: "Cannot update." });
    }

    settlement.status = status;
    settlement.lastResponse = response;
    await settlementRepo.save(settlement);

    return res.send("ok");
  } catch {
    return res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/settlements/:uuid", async (req, res) => {
  try {
    const uuid = req.params.uuid;

    const settlement = await settlementRepo.findOneBy({ uuid });

    if (!settlement) {
      return res.status(404).json({ error: "Settlement not found." });
    }

    return res.json(settlement);
  } catch {
    return res.status(500).json({ error: "Something went wrong" });
  }
});

const clients: Record<string, any> = {};

router.get("/subscribe/:uuid", async (req, res) => {
  const { uuid } = req.params;
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const settlement = await settlementRepo.findOneBy({ uuid });

  if (!clients[uuid]) {
    clients[uuid] = [];
  }

  clients[uuid].push(res);

  if (settlement) {
    res.write(`data: ${JSON.stringify({ settlement })}\n\n`);
  }

  req.on("close", () => {
    clients[uuid] = clients[uuid].filter((client: any) => client !== res);
  });
});

function broadcastUpdate(uuid: string, settlement: Settlement) {
  if (clients[uuid]) {
    clients[uuid].forEach((client: any) => {
      client.write(`data: ${JSON.stringify({ settlement })}\n\n`);
    });
  }
}

export default router;
