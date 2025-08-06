import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/api/config";

const fetchLiveNews = async () => {
  const response = await axios.get(`${BASE_URL}/news/liveNews`);
  return response.data;
};

const useLiveNews = () => {
  return useQuery({
    queryKey: ["live-news"],
    queryFn: fetchLiveNews,
  });
};

export default useLiveNews;
