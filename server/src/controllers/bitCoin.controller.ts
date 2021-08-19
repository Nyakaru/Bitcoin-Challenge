import { Get, Route, Tags, Path } from "tsoa";
import { bitCoin } from "../repositories/bitCoin";

@Route("bitcoin")
@Tags("Bitcoin")
export default class BitCoinController {
  @Get("/")
  public async bitCoin(
    @Path() start: string,
    end: string
  ): Promise<
    {
      id: string;
      key: string;
      total: number;
      primeNumbers: string;
      number: number;
    }[]
  > {
    return bitCoin(start, end);
  }
}
