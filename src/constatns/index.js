import axios from "axios";
export const BASE_URL = "https://api.alefmenu.com";
export const FETCHER = (url) => axios.get(url).then((res) => res.data);
export const options = {
  DELIVERY: "delivery",
  TAKEAWAY: "takeaway",
  INRESTAURANT: "inRestaurant",
};

export const axiosBase = axios.create({ baseURL: BASE_URL });
