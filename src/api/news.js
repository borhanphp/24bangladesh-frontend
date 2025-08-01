import { apiRequest } from "./api";

export const useGetTopNews = async () => {
  return apiRequest("get", "/news/web/topNews");
};

export const useGetNews = async () => {
  return apiRequest("get", "/news/web");
};

export const useGetLatestNews = async (limit = 12) => {
  const numericLimit = typeof limit === "number" ? limit : 12;
  return apiRequest("get", `/news/latest?limit=${numericLimit}`);
};

export const useVideoNews = async (limit = 12) => {
  const numericLimit = typeof limit === "number" ? limit : 12;
  return apiRequest("get", `/news/videoNews?limit=${numericLimit}`);
};
export const usePopularNews = async () => {
  return apiRequest("get", `/news/popularPost`);
};

export const useAllPopularNews = async (limit = 12) => {
  const numericLimit = typeof limit === "number" ? limit : 12;
  return apiRequest("get", `/news/popularNews?limit=${numericLimit}`);
};
