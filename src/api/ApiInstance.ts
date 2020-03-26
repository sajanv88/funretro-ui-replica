import { AppEvent } from "../utils/AppEvent";

const axios = require("axios");

export const Api = axios.create({
  baseURL: `${window.location.protocol}//${window.location.host}`,
  timeout: 0,
  headers: { contentType: "application/json" }
});

Api.interceptors.response.use(
  function(response: any) {
    return response.data;
  },
  function(error: any) {
    return Promise.reject(error);
  }
);
