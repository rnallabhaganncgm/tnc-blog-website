import axios from "axios";

const options = {
  baseURL: process.env.APP_URL,
  timeout: 10000,
};

const API = axios.create(options);
export const APIRefresh = axios.create(options);
APIRefresh.interceptors.response.use((response) => response);

API.interceptors.request.use((config) => config);

API.interceptors.response.use((response) => response);

export default API;
