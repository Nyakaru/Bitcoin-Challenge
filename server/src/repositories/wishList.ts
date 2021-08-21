import { getRepository, Between, MoreThanOrEqual, LessThanOrEqual } from "typeorm";
import axios, { AxiosResponse } from "axios";

import { Wishlist } from "../models";
import { checkPrime } from "../utils";

export interface IWishlistPayload {
  date: string;
  userId: number;
}

export interface GetTotal {
  id: number;
  start: string;
  end: string;
}

export interface Total {
  total: number
}

export const getWishList = async (id: number, start: string, end: string): Promise<{wishList:Array<Wishlist>; total: number}> => {
  const wishListRepository = getRepository(Wishlist);
  const dayParams=(start && end)?{day: Between(start, end)}:{
    ...(start && {day: MoreThanOrEqual(start)}),
    ...(end && {day: LessThanOrEqual(end)})
  }
  const wishList =  await wishListRepository.find({ userId: id, ...dayParams});
  let total = wishList.reduce((a, b) =>  (a + b.value), 0);
  return {total, wishList};
};

export const createWishList = async (
  payload: IWishlistPayload
): Promise<Wishlist> => {
  const { date } = payload;
  const bitCoin: AxiosResponse = await axios.get(
    `https://api.coindesk.com/v1/bpi/historical/close.json?start=${date.trim()}&end=${date.trim()}`
  );
  const { data } = bitCoin;

  //@ts-ignore
  const value = Math.trunc(Object.values(data["bpi"])[0]);
  const arr = Array.from(String(value), Number);

  let total = 0;
  arr.forEach(function (element) {
    const isPrime = checkPrime(element);
    if (isPrime) {
      total += 1;
    }
  });
  const request = {
    day: date,
    value: value,
    prime: total,
    userId: payload.userId,
  };

  const wishListRepository = getRepository(Wishlist);
  const wishList = new Wishlist();
  return wishListRepository.save({
    ...wishList,
    ...request,
  });
};

export const getWishListTotal = async (
  payload: GetTotal
): Promise<Total> => {
  const wishListRepository = getRepository(Wishlist);
  const wishList = await wishListRepository.find({ userId: payload.id });
  let total = 0;
  wishList.map((item) => {
    if (item.day.trim() >= payload.start && item.day.trim() <= payload.end) {
      total = total + item.value;
    }
  });

  return {total : total};
};
