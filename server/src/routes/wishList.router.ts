import express from "express";
import WishlistController from "../controllers/wishList.conroller";

const router = express.Router();

router.post("/add", async (req, res) => {
  const controller = new WishlistController();
  const response = await controller.createWishlist(req.body);
  return res.send(response);
});

router.get("/:id", async (req, res) => {
    const controller = new WishlistController();
    const response = await controller.getWishList(req.params.id, req.query?.start?.toString(), req.query?.end?.toString())
    return res.send(response);
  });

  router.post("/total", async (req, res) => {
    const controller = new WishlistController();
    const response = await controller.getWishListTotal(req.body);
    return res.send(response);
  });

export default router;
