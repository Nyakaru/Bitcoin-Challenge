import { Get, Route, Tags, Post, Body, Path } from "tsoa";
import { Wishlist } from "../models";
import {
  createWishList,
  getWishList,
  IWishlistPayload} from "../repositories/wishList";

@Route("wishlist")
@Tags("Wishlist")
export default class WishlistController {
  @Get("/:id")
  public async getWishList(@Path() id: string,  start: string='',
  end: string = ''): Promise<{wishList:Array<Wishlist>; total: number}> {
    return getWishList(Number(id), start, end);
  }

  @Post("/add")
  public async createWishlist(@Body() body: IWishlistPayload): Promise<Wishlist> {
    return createWishList(body);
  }
}
