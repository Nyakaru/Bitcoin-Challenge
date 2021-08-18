import { useState } from "react";
import axios, { AxiosResponse } from "axios";

import { Auth } from "../interface";

const baseUrl = "http://localhost:5000/";

export const DEFAULT_USER_AUTH = {
  token: "",
};

/** Return user auth from local storage value */
export const getStoredUserAuth = () => {
  const auth = window.localStorage.getItem("UserAuth");
  if (auth) {
    return JSON.parse(auth);
  }
  return DEFAULT_USER_AUTH;
};
export const useAuthHandler = (initialState: Auth) => {
  const [auth, setAuth] = useState(initialState);
  const setAuthStatus = (userAuth: Auth) => {
    window.localStorage.setItem("UserAuth", JSON.stringify(userAuth));
    setAuth(userAuth);
  };
  const setUnauthStatus = () => {
    window.localStorage.clear();
    setAuth(DEFAULT_USER_AUTH);
  };
  return {
    auth,
    setAuthStatus,
    setUnauthStatus,
  };
};

export const apiPostRequest = async (
  url: string,
  bodyParams: Object,
  useAuth: Boolean = false
): Promise<AxiosResponse> => {
  const requestUrl = baseUrl + url;
  if (useAuth) {
    const { message } = getStoredUserAuth();
    const authHeader = `Bearer ${message}`;
    axios.defaults.headers.common["Authorization"] = authHeader;
  }
  const response = await axios.post(requestUrl, bodyParams);
  console.log({ response });
  return response;
};

export const getData = async (url: string): Promise<AxiosResponse> => {
  const requestUrl = baseUrl + url;
  const { message } = getStoredUserAuth();
  const authHeader = `Bearer ${message}`;
  axios.defaults.headers.common["Authorization"] = authHeader;
  const response = await axios.get(requestUrl);
  const { data } = response;
  return data;
};
