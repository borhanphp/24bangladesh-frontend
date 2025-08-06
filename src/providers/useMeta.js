import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/api/config";

const fetchMeta = async () => {
  const response = await axios.get(`${BASE_URL}/meta/web`);
  return response.data;
};

const useMeta = () => {
  return useQuery({
    queryKey: ["meta"],
    queryFn: fetchMeta,
  });
};

export default useMeta;
