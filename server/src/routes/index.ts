import express from "express";
import UserRouter from "./user.router";
import WishListRouter from "./wishList.router";
import BitCoinRouter from './bitCoin.router'

const router = express.Router();

router.use("/users", UserRouter);
router.use("/wishlist", WishListRouter);
router.use('/bitcoin', BitCoinRouter)

export default router;
