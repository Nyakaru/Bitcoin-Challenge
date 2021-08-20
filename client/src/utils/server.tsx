import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

import { Auth } from "../interface";

const baseUrl = "http://localhost:5000/";

export const DEFAULT_USER_AUTH = {
  token: "",
  userId: 0
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

export const UseAppQuery = (url: string, configurations: object) => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [serverError, setServerError] = useState(null);
  const { message } = getStoredUserAuth();
  const authHeader = `Bearer ${message}`;
  axios.defaults.baseURL = "https://hidden-everglades-98624.herokuapp.com/api";
  axios.defaults.headers.common["Authorization"] = authHeader;
  useEffect(() => {
    setIsLoading(true);
    const queryData = async () => {
      try {
        const resp = await axios.get(url, {
          ...configurations,
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await resp?.data;
        setApiData(data);
        setIsLoading(false);
      } catch (error: any) {
        setServerError(error.message);
        setIsLoading(false);
      }
    };
    queryData();
  }, [url, configurations]);
  return { isLoading, apiData, serverError };
};
