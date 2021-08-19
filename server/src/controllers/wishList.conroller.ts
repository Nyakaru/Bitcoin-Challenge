import { Get, Route, Tags, Post, Body, Path } from "tsoa";
import { Wishlist } from "../models";
import {
  createWishList,
  getWishList,
  getWishListTotal,
  IWishlistPayload,
  GetTotal,
  Total
} from "../repositories/wishList";

@Route("wishlist")
@Tags("Wishlist")
export default class WishlistController {
  @Get("/:id")
  public async getWishList(@Path() id: string): Promise<Array<Wishlist>> {
    return getWishList(Number(id));
  }

  @Post("/add")
  public async createWishlist(@Body() body: IWishlistPayload): Promise<Wishlist> {
    return createWishList(body);
  }

  @Post("/total")
  public async getWishListTotal(@Body() body: GetTotal): Promise<Total> {
    return getWishListTotal(body);
  }
}
