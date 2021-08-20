import express from "express";
import BitCoinController from "../controllers/bitCoin.controller";

const router = express.Router();

router.get("/", async (req, res) => {
    const controller = new BitCoinController();
    //@ts-ignore
    const response = await controller.bitCoin(req.query.start, req.query.end);
    return res.send(response);
  });

export default router;
