"use client";
import axios from "axios";

import { BASE_URL, WEB_TOKEN } from "./config";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Generic Axios Function
export const apiRequest = async (method, endpoint, data) => {
  try {
    const response = await axiosInstance({
      method: method,
      url: endpoint,
      data: data,
      headers: {
        webtoken: WEB_TOKEN,
      },
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "An error occurred";
    throw new Error(message);
  }
};
