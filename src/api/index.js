import axios from "axios";
const BASE_URL = 'https://fakestoreapi.com';

const API = axios.create({
  baseURL: BASE_URL,
});



API.getAllProducts = () => {
  return API.get("/products");
};



API.categories = () => {
  return API.get(`/products/categories`);
};
API.updateEvent = (data, param) => {
  return API.patch(`/events/${param}`, data);
};
API.updateUser = (data, param) => {
  return API.patch(`/users/${param}`, data);
};







API.interceptors.request.use((config) => {
  const token = 'Token Here';
  config.headers["Authorization"] = `${token}`;
  return config;
});

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error?.message, "------erreor");
    if (
      error?.response?.data?.error === "Request failed with status code 404"
    ) {
      Cookies.remove("token");
    }
    return Promise.reject(error);
  }
);

export { API };
