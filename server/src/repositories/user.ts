import { hash, compare } from "bcrypt";
import { Secret, sign } from "jsonwebtoken";

import { getRepository } from "typeorm";
import { User } from "../models";
import { GeneralResponse, LoginResponse } from "../../index";

const appSecret = process.env.APP_SECRET || "somethingsecret";

const createToken = (user: User, secret: Secret) => {
  return sign(
    {
      userName: user["userName"],
      email: user["email"],
    },
    secret
  );
};

export const createUser = async (
  payload: User
): Promise<GeneralResponse> => {
  const userRepository = getRepository(User);
  const userExists = await userRepository.findOne({ email: payload.email });
  if (userExists)
    return {
      error: {
        field: "Email",
        message: "User with that email already exists",
      },
    };

  const password = await hash(payload.password, 10);

  const user = new User();
  userRepository.save({
    ...user,
    ...payload,
    password,
  });

  return {
    message: 'User successfully created',
  };
};

export const loginUser = async (
  payload: User
): Promise<LoginResponse> => {
  const userRepository = getRepository(User);
  const userExists = await userRepository.findOne({ email: payload.email });
  if (!userExists)
    return {
      error: {
        field: "User",
        message: "User does not exist",
      },
    };

  const valid = await compare(payload["password"], userExists.password);
  if (!valid) {
    return {
      error: {
        field: "Password",
        message: "Invalid password",
      },
    };
  }

  const token = createToken(userExists, appSecret);
  
  return {
    user: {
      token: token,
      userId: userExists.id,
    },
  };
};
