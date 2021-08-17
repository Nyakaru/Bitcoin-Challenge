import { Route, Tags, Post, Body } from "tsoa";

import { User } from "../models"
import { GeneralResponse } from "../../index";

import {
  createUser,
  loginUser
} from "../repositories/user";

@Route("users")
@Tags("User")
export default class UserController {
  @Post("/signup")
  public async createUser(@Body() body: User): Promise<GeneralResponse> {
    return createUser(body);
  }

  @Post("/login")
  public async loginUser(@Body() body: User): Promise<GeneralResponse> {
    return loginUser(body);
  }
}
