const axios = require("axios");

export const Api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 0,
  headers: { contentType: "application/json" }
});

Api.interceptors.response.use(
  function(response: any) {
    return response.data;
  },
  function(error: any) {
    console.log(error.response, "cool");
    return Promise.reject(error);
  }
);
