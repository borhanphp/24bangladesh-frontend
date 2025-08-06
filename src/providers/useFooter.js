import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/api/config";

const fetchFooter = async () => {
  const response = await axios.get(`${BASE_URL}/footer/web`);
  return response.data;
};

const useFooter = () => {
  return useQuery({
    queryKey: ["footer"],
    queryFn: fetchFooter,
  });
};

export default useFooter;
