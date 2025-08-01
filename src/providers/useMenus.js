import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/api/config";

const fetchMenus = async () => {
  const response = await axios.get(`${BASE_URL}/menu/getMenu`);
  return response.data;
};

const useMenus = () => {
  return useQuery({
    queryKey: ["menus"],
    queryFn: fetchMenus,
  });
};

export default useMenus;
