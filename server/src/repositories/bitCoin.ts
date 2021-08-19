import axios, { AxiosResponse } from "axios";
import { v4 as uuidv4 } from "uuid";

import { checkTotalPrime } from "../utils";

export const bitCoin = async (
  start: string,
  end: string
): Promise<
  {
    id: string;
    key: string;
    total: number;
    primeNumbers: string;
    number: number;
  }[]
> => {
  const bitCoin: AxiosResponse = await axios.get(
    `https://api.coindesk.com/v1/bpi/historical/close.json?start=${start.trim()}&end=${end.trim()}`
  );
  const { data } = bitCoin;
  const { bpi } = data;
  const keys = Object.keys(bpi);

  let response: {
    id: string;
    key: string;
    total: number;
    primeNumbers: string;
    number: number;
  }[] = [];
  keys.forEach((key, index) => {
    const arr = Array.from(String(Math.trunc(bpi[key])), Number);
    if (checkTotalPrime(arr).totalPrime == true) {
      response.push({
        id: uuidv4(),
        key: key,
        total: checkTotalPrime(arr).total,
        primeNumbers: checkTotalPrime(arr).nums,
        number: Math.trunc(bpi[key]),
      });
    }
  });
  return response;
};
