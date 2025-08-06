import { apiRequest } from "./api";

export const getTopNews = async () => {
  return apiRequest("get", "/news/web/topNews");
};

export const getNews = async () => {
  return apiRequest("get", "/news/web");
};

export const getLatestNews = async (limit = 12) => {
  const numericLimit = typeof limit === "number" ? limit : 12;
  return apiRequest("get", `/news/latest?limit=${numericLimit}`);
};

export const getVideoNews = async (limit = 12) => {
  const numericLimit = typeof limit === "number" ? limit : 12;
  return apiRequest("get", `/news/videoNews?limit=${numericLimit}`);
};
export const getPopularNews = async () => {
  return apiRequest("get", `/news/popularPost`);
};

export const getAllPopularNews = async (limit = 12) => {
  const numericLimit = typeof limit === "number" ? limit : 12;
  return apiRequest("get", `/news/popularNews?limit=${numericLimit}`);
};

export const useSearchNews = async (query) => {
  if (!query || query.trim() === "") {
    return { news: [] };
  }
  return apiRequest("get", `/news/web/search?q=${encodeURIComponent(query.trim())}`);
};
