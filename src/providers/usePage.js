import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/api/config";

const fetchPage = async () => {
  const response = await axios.get(`${BASE_URL}/page/web`);
  return response.data;
};

const usePage = () => {
  return useQuery({
    queryKey: ["page"],
    queryFn: fetchPage,
  });
};

export default usePage;
