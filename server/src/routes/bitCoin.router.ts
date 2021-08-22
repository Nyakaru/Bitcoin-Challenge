import express from "express";
import BitCoinController from "../controllers/bitCoin.controller";

const router = express.Router();

router.get("/", async (req, res) => {
    const controller = new BitCoinController();
    const response = await controller.bitCoin(req.query?.start?.toString(), req.query?.end?.toString());
    return res.send(response);
  });

export default router;
